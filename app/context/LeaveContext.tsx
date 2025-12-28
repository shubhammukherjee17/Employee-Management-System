'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, query } from 'firebase/firestore';

export interface LeaveRequest {
    id: string;
    employeeId: string;
    type: 'Sick' | 'Vacation' | 'Personal' | 'Other';
    startDate: string;
    endDate: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

interface LeaveContextType {
    leaves: LeaveRequest[];
    requestLeave: (request: Omit<LeaveRequest, 'id' | 'status'>) => Promise<void>;
    updateLeaveStatus: (id: string, status: LeaveRequest['status']) => Promise<void>;
    getEmployeeLeaves: (employeeId: string) => LeaveRequest[];
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const LeaveProvider = ({ children }: { children: React.ReactNode }) => {
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'leaves'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as LeaveRequest[];
            setLeaves(data);
        }, (error) => {
            console.error("Error fetching leaves:", error);
        });

        return () => unsubscribe();
    }, []);

    const requestLeave = async (request: Omit<LeaveRequest, 'id' | 'status'>) => {
        const newLeave: Omit<LeaveRequest, 'id'> = {
            ...request,
            status: 'Pending'
        };
        try {
            await addDoc(collection(db, 'leaves'), newLeave);
        } catch (error) {
            console.error("Error requesting leave:", error);
            alert("Failed to request leave");
        }
    };

    const updateLeaveStatus = async (id: string, status: LeaveRequest['status']) => {
        try {
            const leaveRef = doc(db, 'leaves', id);
            await updateDoc(leaveRef, { status });
        } catch (error) {
            console.error("Error updating leave status:", error);
            alert("Failed to update leave status");
        }
    };

    const getEmployeeLeaves = (employeeId: string) => {
        return leaves.filter(l => l.employeeId === employeeId);
    };

    return (
        <LeaveContext.Provider value={{ leaves, requestLeave, updateLeaveStatus, getEmployeeLeaves }}>
            {children}
        </LeaveContext.Provider>
    );
};

export const useLeaves = () => {
    const context = useContext(LeaveContext);
    if (context === undefined) {
        throw new Error('useLeaves must be used within a LeaveProvider');
    }
    return context;
};

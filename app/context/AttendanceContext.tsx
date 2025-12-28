'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, query, where, getDocs } from 'firebase/firestore';

// Define types locally for now, can move to types.ts later
export interface AttendanceRecord {
    id: string;
    employeeId: string;
    date: string;
    clockInTime: string;
    clockOutTime: string | null;
    status: 'On Time' | 'Late' | 'Absent';
}

interface AttendanceContextType {
    records: AttendanceRecord[];
    clockIn: (employeeId: string) => Promise<void>;
    clockOut: (employeeId: string) => Promise<void>;
    getTodayRecord: (employeeId: string) => AttendanceRecord | undefined;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider = ({ children }: { children: React.ReactNode }) => {
    const [records, setRecords] = useState<AttendanceRecord[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'attendance'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as AttendanceRecord[];
            setRecords(data);
        }, (error) => {
            console.error("Error fetching attendance:", error);
        });

        return () => unsubscribe();
    }, []);

    const clockIn = async (employeeId: string) => {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Check if late (after 9:30 AM)
        const isLate = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 30);

        const newRecord: Omit<AttendanceRecord, 'id'> = {
            employeeId,
            date: today,
            clockInTime: timeString,
            clockOutTime: null,
            status: isLate ? 'Late' : 'On Time'
        };

        try {
            await addDoc(collection(db, 'attendance'), newRecord);
        } catch (error) {
            console.error("Error clocking in:", error);
            alert("Failed to clock in");
        }
    };

    const clockOut = async (employeeId: string) => {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Find today's record for this employee
        // In a real app we might query Firestore directly, but filtering 'records' state is faster for UI if data is loaded
        const record = records.find(r => r.employeeId === employeeId && r.date === today && !r.clockOutTime);

        if (record) {
            try {
                const recordRef = doc(db, 'attendance', record.id);
                await updateDoc(recordRef, { clockOutTime: now });
            } catch (error) {
                console.error("Error clocking out:", error);
                alert("Failed to clock out");
            }
        } else {
            console.warn("No active clock-in record found to clock out.");
        }
    };

    const getTodayRecord = (employeeId: string) => {
        const today = new Date().toISOString().split('T')[0];
        return records.find(r => r.employeeId === employeeId && r.date === today);
    };

    return (
        <AttendanceContext.Provider value={{ records, clockIn, clockOut, getTodayRecord }}>
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => {
    const context = useContext(AttendanceContext);
    if (context === undefined) {
        throw new Error('useAttendance must be used within an AttendanceProvider');
    }
    return context;
};

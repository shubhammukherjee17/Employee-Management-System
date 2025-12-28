'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Employee } from '../types';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
    updateEmployee: (id: string, updatedEmployee: Partial<Employee>) => Promise<void>;
    deleteEmployee: (id: string) => Promise<void>;
    getEmployee: (id: string) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'employees'), orderBy('joinDate', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const employeesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Employee[];
            setEmployees(employeesData);
        }, (error) => {
            console.error("Error fetching employees:", error);
        });

        return () => unsubscribe();
    }, []);

    const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
        try {
            await addDoc(collection(db, 'employees'), employeeData);
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to add employee");
        }
    };

    const updateEmployee = async (id: string, updatedEmployee: Partial<Employee>) => {
        try {
            const employeeRef = doc(db, 'employees', id);
            await updateDoc(employeeRef, updatedEmployee);
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee");
        }
    };

    const deleteEmployee = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'employees', id));
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee");
        }
    };

    const getEmployee = (id: string) => {
        return employees.find(emp => emp.id === id);
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, getEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployees = () => {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployees must be used within an EmployeeProvider');
    }
    return context;
};

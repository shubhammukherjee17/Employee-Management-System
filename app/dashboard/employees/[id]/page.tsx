'use client';

import EmployeeForm from '@/app/components/EmployeeForm';
import { useEmployees } from '@/app/context/EmployeeContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { Employee } from '@/app/types';

export default function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
    const { getEmployee, updateEmployee } = useEmployees();
    const router = useRouter();
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const [employee, setEmployee] = useState<Employee | undefined>(undefined);

    useEffect(() => {
        if (id) {
            const emp = getEmployee(id);
            if (emp) {
                setEmployee(emp);
            } else {
                // Handle not found
                router.push('/dashboard');
            }
        }
    }, [id, getEmployee, router]);

    const handleSubmit = async (data: any) => {
        await updateEmployee(id, data);
        router.push('/dashboard');
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div className="py-2">
            <h1 className="text-2xl font-bold text-white mb-6">Edit Employee</h1>
            <EmployeeForm
                initialData={employee}
                onClose={() => router.back()}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

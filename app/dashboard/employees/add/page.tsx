'use client';

import EmployeeForm from '@/app/components/EmployeeForm';
import { useEmployees } from '@/app/context/EmployeeContext';
import { useRouter } from 'next/navigation';

export default function AddEmployeePage() {
    const { addEmployee } = useEmployees();
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        await addEmployee(data);
        router.push('/dashboard');
    };

    return (
        <div className="py-2">
            <h1 className="text-2xl font-bold text-white mb-6">Add New Employee</h1>
            <EmployeeForm onClose={() => router.back()} onSubmit={handleSubmit} />
        </div>
    );
}

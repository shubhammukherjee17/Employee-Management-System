'use client';

import EmployeeList from '@/app/components/EmployeeList';
import { useEmployees } from '@/app/context/EmployeeContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EmployeesPage() {
    const { employees, deleteEmployee } = useEmployees();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleEdit = (employee: any) => {
        router.push(`/dashboard/employees/${employee.id}`);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(id);
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="py-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Employees</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your team members</p>
                </div>
                <button
                    onClick={() => router.push('/dashboard/employees/add')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add New
                </button>
            </div>

            {/* Search Bar - Optional if EmployeeList handles it, but good to have dedicated filter here if List is just for display */}
            <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-800 rounded-xl leading-5 bg-dark-card text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-shadow"
                    placeholder="Search employees by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <EmployeeList
                employees={filteredEmployees}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

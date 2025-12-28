'use client';

import { useState, useEffect } from 'react';
import { Employee } from '../types';

interface EmployeeFormProps {
    onClose: () => void;
    onSubmit: (data: Omit<Employee, 'id'>) => void;
    initialData?: Employee | null;
}

const EmployeeForm = ({ onClose, onSubmit, initialData }: EmployeeFormProps) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        gender: 'Male',
        performance: 50,
        joinDate: '',
        salary: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({ ...initialData });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                department: '',
                role: '',
                gender: '',
                performance: 50,
                joinDate: '',
                salary: 0,
            });
        }
    }, [initialData]);

    // Removed isOpen check as this is now always rendered
    // if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData as Omit<Employee, 'id'>);
    };

    return (
        <div className="bg-dark-card rounded-3xl w-full shadow-2xl flex flex-col border border-gray-800">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                    {initialData ? 'Edit Employee' : 'Add New Employee'}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">First Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Last Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Doe"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john.doe@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone</label>
                        <input
                            type="tel"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 234 567 890"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Department</label>
                        <select
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        >
                            <option value="" className="bg-dark-card text-gray-400">Select Department</option>
                            <option value="Engineering" className="bg-dark-card">Engineering</option>
                            <option value="Product" className="bg-dark-card">Product</option>
                            <option value="Design" className="bg-dark-card">Design</option>
                            <option value="Sales" className="bg-dark-card">Sales</option>
                            <option value="Marketing" className="bg-dark-card">Marketing</option>
                            <option value="HR" className="bg-dark-card">HR</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Role/Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="Software Engineer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Gender</label>
                        <select
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                        >
                            <option value="Male" className="bg-dark-card">Male</option>
                            <option value="Female" className="bg-dark-card">Female</option>
                            <option value="Other" className="bg-dark-card">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Performance (0-100)</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                value={formData.performance}
                                onChange={(e) => setFormData({ ...formData, performance: parseInt(e.target.value) })}
                            />
                            <span className="text-white font-mono w-10 text-right">{formData.performance}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Join Date</label>
                        <input
                            type="date"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all [color-scheme:dark]"
                            value={formData.joinDate}
                            onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Salary (Annual)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                    >
                        {initialData ? 'Update Employee' : 'Add Employee'}
                    </button>
                </div>
            </form >
        </div >
    );
};

export default EmployeeForm;

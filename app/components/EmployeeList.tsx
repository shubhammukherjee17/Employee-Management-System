'use client';

import { Employee } from '../types';

interface EmployeeListProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: string) => void;
}

const EmployeeList = ({ employees, onEdit, onDelete }: EmployeeListProps) => {
    return (
        <div className="bg-dark-card rounded-3xl border border-gray-800/50 overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-gray-800/50">
                <h2 className="text-lg font-bold text-white">All Employee</h2>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-gray-900 text-gray-400 text-sm rounded-lg px-4 py-2 pl-9 border border-gray-800 focus:border-blue-500 focus:outline-none w-48"
                        />
                        <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <button className="text-gray-400 text-sm hover:text-white font-medium">See All</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-transparent text-gray-500 border-b border-gray-800/30">
                        <tr>
                            <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide">Name</th>
                            <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide">ID</th>
                            <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide">Role</th>
                            <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide">Status</th>
                            <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/30">
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No employees found.
                                </td>
                            </tr>
                        ) : employees.map((employee, idx) => (
                            <tr key={employee.id} className="group hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {/* Mock Avatar */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${idx % 3 === 0 ? 'from-blue-500 to-indigo-600' :
                                                idx % 3 === 1 ? 'from-purple-500 to-pink-600' :
                                                    'from-emerald-500 to-teal-600'
                                            }`}>
                                            {/* Using Image if real app, but gradient initials here */}
                                            {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white text-sm">{employee.firstName} {employee.lastName}</h4>
                                            <p className="text-xs text-gray-500">{employee.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-white font-medium">#{employee.id.slice(0, 6).toUpperCase()}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-300 font-normal">{employee.role}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${idx % 2 === 0 ? 'text-green-400' : 'text-blue-400'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${idx % 2 === 0 ? 'bg-green-400' : 'bg-blue-400'}`}></span>
                                        {idx % 2 === 0 ? 'Full-time' : 'Freelance'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end relative">
                                        <button className="text-gray-500 hover:text-white p-1">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                                        </button>

                                        {/* Hidden Actions for Demo - could be a dropdown */}
                                        <div className="hidden group-hover:flex absolute right-8 top-0 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-1 gap-1">
                                            <button onClick={() => onEdit(employee)} className="p-1.5 text-blue-400 hover:bg-gray-700 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                                            <button onClick={() => onDelete(employee.id)} className="p-1.5 text-red-400 hover:bg-gray-700 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;

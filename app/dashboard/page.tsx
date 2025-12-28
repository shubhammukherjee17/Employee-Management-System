'use client';

import DashboardStats from '../components/DashboardStats';
import { WorkPerformanceChart, AttendanceChart } from '../components/Charts';
import EmployeeList from '../components/EmployeeList';
import { useEmployees } from '../context/EmployeeContext';
import { useAttendance } from '../context/AttendanceContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { employees, deleteEmployee } = useEmployees();
    const { records } = useAttendance();
    const router = useRouter();

    const handleEdit = (employee: any) => {
        router.push(`/dashboard/employees/${employee.id}`);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(id);
        }
    };

    // Attendance Calculation
    // Get today's date string in same format as records (LocaleString)
    const todayStr = new Date().toLocaleDateString();

    // Safety check for records array
    const safeRecords = Array.isArray(records) ? records : [];

    // Explicitly typing 'r' as any to avoid lint errors if context types aren't fully picked up, 
    // though ideally it should be inferred.
    const todayRecords = safeRecords.filter((r: any) => r.date === todayStr);
    const total = employees.length;
    const presentCount = todayRecords.filter((r: any) => r.status === 'On Time').length;
    const lateCount = todayRecords.filter((r: any) => r.status === 'Late').length;
    const absentCount = Math.max(0, total - (presentCount + lateCount));

    return (
        <div className="py-2">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>

                <div className="flex items-center gap-4">
                    {/* Search Icon */}
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>

                    {/* Notification Icon */}
                    <button className="relative text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-dark-bg"></div>
                    </button>

                    {/* Date Picker Widget */}
                    <div className="flex items-center gap-3 bg-dark-card border border-gray-800 rounded-lg px-4 py-2 text-sm">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="font-medium text-gray-300">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>

                    {/* Add New Button */}
                    <button onClick={() => router.push('/dashboard/employees/add')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add New
                    </button>
                </div>
            </div>

            <DashboardStats />

            {/* Quick Access Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { name: 'Employees', href: '/dashboard/employees', icon: '👥', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                    { name: 'Attendance', href: '/dashboard/attendance', icon: '⏰', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
                    { name: 'Leaves', href: '/dashboard/leaves', icon: '📅', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
                    { name: 'Profile', href: '/dashboard/profile', icon: '👤', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                ].map((item, i) => (
                    <button
                        key={i}
                        onClick={() => router.push(item.href)}
                        className={`p-4 rounded-2xl border ${item.color} flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer`}
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium text-sm">{item.name}</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 h-96">
                <div className="lg:col-span-2 h-full">
                    <WorkPerformanceChart
                        data={employees.map(e => ({
                            name: `${e.firstName} ${e.lastName}`,
                            performance: e.performance || 0, // Fallback if performance not set yet
                            role: e.role
                        }))}
                    />
                </div>
                <div className="h-full">
                    <AttendanceChart present={presentCount} late={lateCount} absent={absentCount} total={total} />
                </div>
            </div>

            <div className="mb-8">
                <EmployeeList
                    employees={employees.slice(0, 3)} // Show only top 3 on dashboard
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}

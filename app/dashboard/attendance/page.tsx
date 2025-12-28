'use client';

import { useAttendance } from '@/app/context/AttendanceContext';
import { useAuth } from '@/app/context/AuthContext';
import { useState, useEffect } from 'react';

export default function AttendancePage() {
    const { user } = useAuth();
    const { records, clockIn, clockOut, getTodayRecord } = useAttendance();
    const [todayRecord, setTodayRecord] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (user) {
            setTodayRecord(getTodayRecord(user.id) || null);
        }
    }, [user, records, getTodayRecord]);

    const handleAction = async () => {
        if (!user) return;
        if (todayRecord && todayRecord.clockOutTime) return; // Already finished

        if (todayRecord) {
            await clockOut(user.id);
        } else {
            await clockIn(user.id);
        }
    };

    // Filter only my records
    const myRecords = records.filter(r => r.employeeId === user?.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="py-2">
            <h1 className="text-2xl font-bold text-white mb-6">Attendance</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Clock In/Out Section */}
                <div className="bg-dark-card p-8 rounded-3xl border border-gray-800 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="z-10 bg-dark-bg p-4 rounded-xl border border-gray-800 mb-6">
                        <span className="text-4xl font-mono text-white font-bold tracking-wider">{currentTime}</span>
                    </div>

                    <h3 className="text-xl text-gray-300 font-medium mb-2">
                        {todayRecord ? (todayRecord.clockOutTime ? "You're done for today!" : "You are clocked in") : "Ready to start?"}
                    </h3>

                    <button
                        onClick={handleAction}
                        disabled={todayRecord?.clockOutTime}
                        className={`mt-4 w-48 h-48 rounded-full border-4 flex items-center justify-center text-xl font-bold shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all transform hover:scale-105 active:scale-95 ${todayRecord && !todayRecord.clockOutTime
                            ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_0_50px_rgba(239,68,68,0.4)]'
                            : todayRecord?.clockOutTime
                                ? 'border-gray-600 text-gray-500 cursor-not-allowed'
                                : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover:shadow-[0_0_50px_rgba(34,197,94,0.4)]'
                            }`}
                    >
                        {todayRecord ? (todayRecord.clockOutTime ? "Completed" : "Clock Out") : "Clock In"}
                    </button>

                    {todayRecord && !todayRecord.clockOutTime && (
                        <p className="mt-6 text-sm text-gray-400">Started at: <span className="text-white font-medium">{todayRecord.clockInTime}</span></p>
                    )}
                </div>

                {/* Recent History */}
                <div className="bg-dark-card rounded-3xl border border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-800">
                        <h3 className="font-bold text-white">Recent Activity</h3>
                    </div>
                    <div className="overflow-y-auto max-h-[400px]">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-dark-bg text-gray-500 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                    <th className="px-6 py-3 font-medium">In</th>
                                    <th className="px-6 py-3 font-medium">Out</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {myRecords.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No records found</td>
                                    </tr>
                                ) : myRecords.map(record => (
                                    <tr key={record.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 text-white">{record.date}</td>
                                        <td className="px-6 py-4 text-green-400">{record.clockInTime}</td>
                                        <td className="px-6 py-4 text-red-400">{record.clockOutTime || '--:--'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'Late' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'
                                                }`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

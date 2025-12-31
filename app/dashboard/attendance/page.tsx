'use client';

import { useAttendance } from '@/app/context/AttendanceContext';
import { useAuth } from '@/app/context/AuthContext';
import { useState, useEffect } from 'react';

export default function AttendancePage() {
    const { user } = useAuth();
    const { records, clockIn, clockOut, getTodayRecord } = useAttendance();
    const [todayRecord, setTodayRecord] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Format time as "9:34:31 pm" (with seconds and lowercase am/pm)
    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const displayHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        return `${displayHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    };

    // Format date for display (e.g., "31 Dec 2025")
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        } catch {
            return dateString;
        }
    };

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(formatTime(new Date()));
        };
        updateTime(); // Set initial time
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    // Force re-render every minute to update duration display
    useEffect(() => {
        if (todayRecord && !todayRecord.clockOutTime) {
            const timer = setInterval(() => {
                // This will trigger a re-render to update duration
                setCurrentTime(formatTime(new Date()));
            }, 60000); // Update every minute
            return () => clearInterval(timer);
        }
    }, [todayRecord]);

    useEffect(() => {
        if (user) {
            setTodayRecord(getTodayRecord(user.id) || null);
        }
    }, [user, records, getTodayRecord]);

    // Calculate work duration
    const calculateDuration = (clockInTime: string, clockOutTime?: string | null) => {
        if (!clockOutTime) {
            // Calculate from clock in to now
            const now = new Date();
            const clockInDate = parseTimeString(clockInTime);
            if (!clockInDate) return null;
            
            const diffMs = now.getTime() - clockInDate.getTime();
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            return { hours, minutes };
        } else {
            const clockInDate = parseTimeString(clockInTime);
            const clockOutDate = parseTimeString(clockOutTime);
            if (!clockInDate || !clockOutDate) return null;
            
            const diffMs = clockOutDate.getTime() - clockInDate.getTime();
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            return { hours, minutes };
        }
    };

    // Parse time string to Date object (for today)
    const parseTimeString = (timeStr: string): Date | null => {
        try {
            const [timePart, ampm] = timeStr.split(' ');
            const [hours, minutes, seconds] = timePart.split(':').map(Number);
            const now = new Date();
            let hour24 = hours;
            if (ampm === 'pm' && hours !== 12) hour24 = hours + 12;
            if (ampm === 'am' && hours === 12) hour24 = 0;
            
            const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour24, minutes, seconds);
            return date;
        } catch {
            return null;
        }
    };

    const handleClockIn = async () => {
        if (!user || isLoading) return;
        setIsLoading(true);
        try {
            await clockIn(user.id);
        } catch (error) {
            console.error('Error clocking in:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClockOut = async () => {
        if (!user || isLoading || !todayRecord || todayRecord.clockOutTime) return;
        
        // Confirmation dialog
        const confirmed = window.confirm(
            `Are you sure you want to clock out?\n\nClock In: ${todayRecord.clockInTime}\nCurrent Time: ${currentTime}`
        );
        
        if (!confirmed) return;

        setIsLoading(true);
        try {
            await clockOut(user.id);
        } catch (error) {
            console.error('Error clocking out:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = async () => {
        if (todayRecord && !todayRecord.clockOutTime) {
            await handleClockOut();
        } else {
            await handleClockIn();
        }
    };

    // Get current work duration
    const currentDuration = todayRecord && !todayRecord.clockOutTime 
        ? calculateDuration(todayRecord.clockInTime) 
        : null;

    // Filter only my records and sort by date (newest first)
    const myRecords = records
        .filter(r => r.employeeId === user?.id)
        .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });

    return (
        <div className="py-2">
            <h1 className="text-2xl font-bold text-white mb-6">Attendance</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Clock In/Out Section */}
                <div className="bg-dark-card p-8 rounded-3xl border border-gray-800 flex flex-col items-center justify-center text-center min-h-[500px]">
                    <div className="bg-dark-bg p-6 rounded-xl border border-gray-800 mb-8 w-full">
                        <span className="text-6xl font-mono text-white font-bold tracking-wider block">
                            {currentTime || '--:--:-- --'}
                        </span>
                    </div>

                    <h3 className="text-xl text-gray-300 font-medium mb-8">
                        {todayRecord 
                            ? (todayRecord.clockOutTime 
                                ? "You're done for today!" 
                                : "You are clocked in") 
                            : "Ready to start?"}
                    </h3>

                    <div className="flex flex-col items-center gap-4">
                        {!todayRecord && (
                            <button
                                onClick={handleClockIn}
                                disabled={isLoading}
                                className="w-48 h-48 rounded-full border-4 border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover:shadow-green-500/50 flex items-center justify-center text-xl font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <span className="animate-pulse">Processing...</span>
                                ) : (
                                    "Clock In"
                                )}
                            </button>
                        )}

                        {todayRecord && !todayRecord.clockOutTime && (
                            <button
                                onClick={handleClockOut}
                                disabled={isLoading}
                                className="w-48 h-48 rounded-full border-4 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-red-500/50 flex items-center justify-center text-xl font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <span className="animate-pulse">Processing...</span>
                                ) : (
                                    "Clock Out"
                                )}
                            </button>
                        )}

                        {todayRecord && todayRecord.clockOutTime && (
                            <div className="w-48 h-48 rounded-full border-4 border-gray-600 text-gray-500 flex items-center justify-center text-xl font-bold opacity-50 cursor-not-allowed">
                                Completed
                            </div>
                        )}
                    </div>

                    {todayRecord && !todayRecord.clockOutTime && (
                        <div className="mt-8 space-y-2">
                            <p className="text-sm text-gray-400">
                                Started at: <span className="text-white font-medium">{todayRecord.clockInTime}</span>
                            </p>
                            {currentDuration && (
                                <p className="text-sm text-gray-400">
                                    Duration: <span className="text-blue-400 font-medium">
                                        {currentDuration.hours}h {currentDuration.minutes}m
                                    </span>
                                </p>
                            )}
                        </div>
                    )}

                    {todayRecord && todayRecord.clockOutTime && (
                        <div className="mt-8 space-y-2">
                            <p className="text-sm text-gray-400">
                                Clocked In: <span className="text-green-400 font-medium">{todayRecord.clockInTime}</span>
                            </p>
                            <p className="text-sm text-gray-400">
                                Clocked Out: <span className="text-red-400 font-medium">{todayRecord.clockOutTime}</span>
                            </p>
                            {(() => {
                                const duration = calculateDuration(todayRecord.clockInTime, todayRecord.clockOutTime);
                                return duration && (
                                    <p className="text-sm text-gray-400">
                                        Total Hours: <span className="text-blue-400 font-medium">
                                            {duration.hours}h {duration.minutes}m
                                        </span>
                                    </p>
                                );
                            })()}
                        </div>
                    )}
                </div>

                {/* Recent History */}
                <div className="bg-dark-card rounded-3xl border border-gray-800 overflow-hidden flex flex-col min-h-[500px]">
                    <div className="p-6 border-b border-gray-800">
                        <h3 className="font-bold text-white text-lg">Recent Activity</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-dark-bg text-gray-500 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                    <th className="px-6 py-3 font-medium">In</th>
                                    <th className="px-6 py-3 font-medium">Out</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {myRecords.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No records found
                                        </td>
                                    </tr>
                                ) : myRecords.map(record => {
                                    const duration = calculateDuration(record.clockInTime, record.clockOutTime);
                                    return (
                                        <tr key={record.id} className="hover:bg-gray-800/30 transition-colors">
                                            <td className="px-6 py-4 text-white">{formatDate(record.date)}</td>
                                            <td className="px-6 py-4 text-green-400 font-medium">{record.clockInTime}</td>
                                            <td className="px-6 py-4 text-red-400 font-medium">{record.clockOutTime || '--:--'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    record.status === 'Late' 
                                                        ? 'bg-orange-500/20 text-orange-400' 
                                                        : record.status === 'Absent'
                                                        ? 'bg-red-500/20 text-red-400'
                                                        : 'bg-green-500/20 text-green-400'
                                                }`}>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-blue-400 font-medium">
                                                {duration && record.clockOutTime 
                                                    ? `${duration.hours}h ${duration.minutes}m`
                                                    : record.clockOutTime 
                                                    ? '--' 
                                                    : 'In Progress'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

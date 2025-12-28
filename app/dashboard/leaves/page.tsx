'use client';

import { useLeaves } from '@/app/context/LeaveContext';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';

export default function LeavesPage() {
    const { user } = useAuth();
    const { requestLeave, getEmployeeLeaves } = useLeaves();
    const [activeTab, setActiveTab] = useState<'request' | 'history'>('request');

    // Form State
    const [leaveData, setLeaveData] = useState({
        type: 'Sick',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        await requestLeave({
            employeeId: user.id,
            type: leaveData.type as any,
            startDate: leaveData.startDate,
            endDate: leaveData.endDate,
            reason: leaveData.reason
        });

        alert('Leave requested successfully!');
        setLeaveData({ type: 'Sick', startDate: '', endDate: '', reason: '' });
        setActiveTab('history');
    };

    const myLeaves = user ? getEmployeeLeaves(user.id) : [];

    return (
        <div className="py-2">
            <h1 className="text-2xl font-bold text-white mb-6">Leave Management</h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('request')}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all ${activeTab === 'request' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-dark-card text-gray-400 border border-gray-800 hover:text-white'}`}
                >
                    Request Leave
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-dark-card text-gray-400 border border-gray-800 hover:text-white'}`}
                >
                    My History
                </button>
            </div>

            {activeTab === 'request' ? (
                <div className="bg-dark-card rounded-3xl border border-gray-800 p-8 max-w-2xl shadow-xl">
                    <h2 className="text-xl font-bold text-white mb-6">New Request</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Leave Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['Sick', 'Vacation', 'Personal', 'Other'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setLeaveData({ ...leaveData, type })}
                                        className={`py-2 rounded-xl text-sm font-medium border transition-all ${leaveData.type === type ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-dark-bg border-gray-700 text-gray-400 hover:border-gray-600'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Start Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:outline-none [color-scheme:dark]"
                                    value={leaveData.startDate}
                                    onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">End Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:outline-none [color-scheme:dark]"
                                    value={leaveData.endDate}
                                    onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Reason</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-gray-800 text-white focus:border-blue-500 focus:outline-none placeholder-gray-600 resize-none"
                                placeholder="Please describe why you need this leave..."
                                value={leaveData.reason}
                                onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-dark-card rounded-3xl border border-gray-800 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#111] text-gray-500 border-b border-gray-800">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Type</th>
                                    <th className="px-6 py-4 font-medium">From</th>
                                    <th className="px-6 py-4 font-medium">To</th>
                                    <th className="px-6 py-4 font-medium">Reason</th>
                                    <th className="px-6 py-4 font-medium text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {myLeaves.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No leave history found.</td>
                                    </tr>
                                ) : myLeaves.map(leave => (
                                    <tr key={leave.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{leave.type}</td>
                                        <td className="px-6 py-4 text-gray-400">{leave.startDate}</td>
                                        <td className="px-6 py-4 text-gray-400">{leave.endDate}</td>
                                        <td className="px-6 py-4 text-gray-400 truncate max-w-xs">{leave.reason}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${leave.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                                                leave.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-yellow-500/20 text-yellow-500'
                                                }`}>
                                                {leave.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';

import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const SettingsPage = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        updates: true
    });

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
                <p className="text-gray-400">Manage your account settings and preferences.</p>
            </div>

            {/* Profile Section */}
            <div className="bg-dark-card rounded-2xl p-8 border border-gray-800">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/20">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{user?.name || 'User'}</h2>
                        <p className="text-gray-400">{user?.email || 'user@example.com'}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-lg border border-blue-500/20">
                            Administrator
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                        <input
                            type="text"
                            value={user?.name || ''}
                            readOnly
                            className="w-full bg-dark-bg text-gray-500 rounded-xl px-4 py-3 border border-gray-800 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            readOnly
                            className="w-full bg-dark-bg text-gray-500 rounded-xl px-4 py-3 border border-gray-800 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-dark-card rounded-2xl p-8 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-6">Notifications</h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-400">Receive daily summaries and important alerts.</p>
                        </div>
                        <button
                            onClick={() => toggleNotification('email')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifications.email ? 'bg-blue-600' : 'bg-gray-700'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-400">Receive real-time alerts on your device.</p>
                        </div>
                        <button
                            onClick={() => toggleNotification('push')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifications.push ? 'bg-blue-600' : 'bg-gray-700'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Product Updates</p>
                            <p className="text-sm text-gray-400">Stay up to date with new features and releases.</p>
                        </div>
                        <button
                            onClick={() => toggleNotification('updates')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifications.updates ? 'bg-blue-600' : 'bg-gray-700'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.updates ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="bg-dark-card rounded-2xl p-8 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-6">Security</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Current Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-dark-bg text-white rounded-xl px-4 py-3 border border-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-dark-bg text-white rounded-xl px-4 py-3 border border-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-dark-bg text-white rounded-xl px-4 py-3 border border-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-900/20">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;

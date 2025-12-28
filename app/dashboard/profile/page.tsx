'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        phone: '',
        location: '',
        bio: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, displayName: user.name }));
            // Fetch additional profile data
            const fetchProfile = async () => {
                const docRef = doc(db, 'users', user.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(prev => ({
                        ...prev,
                        phone: data.phone || '',
                        location: data.location || '',
                        bio: data.bio || ''
                    }));
                }
            };
            fetchProfile();
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);
        try {
            await setDoc(doc(db, 'users', user.id), {
                phone: formData.phone,
                location: formData.location,
                bio: formData.bio,
                updatedAt: new Date().toISOString()
            }, { merge: true });
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="py-2">
            <h1 className="text-2xl font-bold text-white mb-8">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-dark-card rounded-3xl border border-gray-800 overflow-hidden shadow-xl sticky top-8">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                        <div className="px-8 pb-8 text-center relative">
                            <div className="w-24 h-24 rounded-full border-4 border-dark-card bg-gray-700 mx-auto -mt-12 mb-4 flex items-center justify-center text-3xl font-bold text-white">
                                {user.name.charAt(0)}
                            </div>
                            <h2 className="text-xl font-bold text-white">{user.name}</h2>
                            <p className="text-gray-500 text-sm mt-1">{user.role?.toUpperCase() || 'USER'}</p>

                            <div className="mt-6 flex justify-center gap-2">
                                <span className="px-3 py-1 bg-gray-800 rounded-lg text-xs font-medium text-gray-400">UID: {user.id.slice(0, 8)}</span>
                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`w-full mt-8 py-2.5 rounded-xl border font-medium transition-colors ${isEditing ? 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}`}
                            >
                                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-dark-card rounded-3xl border border-gray-800 p-8 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Personal Information</h3>
                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                <div className="text-white font-medium px-4 py-3 bg-dark-bg border border-gray-800 rounded-xl">
                                    {user.name}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Email</label>
                                <div className="text-white font-medium px-4 py-3 bg-dark-bg border border-gray-800 rounded-xl">
                                    {user.email}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        className="w-full text-white font-medium px-4 py-3 bg-dark-bg border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                ) : (
                                    <div className={`font-medium px-4 py-3 bg-dark-bg border border-gray-800 rounded-xl ${formData.phone ? 'text-white' : 'text-gray-500 italic'}`}>
                                        {formData.phone || 'Not set'}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Location</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="w-full text-white font-medium px-4 py-3 bg-dark-bg border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none"
                                        placeholder="San Francisco, CA"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                ) : (
                                    <div className={`font-medium px-4 py-3 bg-dark-bg border border-gray-800 rounded-xl ${formData.location ? 'text-white' : 'text-gray-500 italic'}`}>
                                        {formData.location || 'Not set'}
                                    </div>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Bio</label>
                                {isEditing ? (
                                    <textarea
                                        rows={3}
                                        className="w-full text-white font-medium px-4 py-3 bg-dark-bg border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                                        placeholder="Tell us a bit about yourself..."
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    />
                                ) : (
                                    <div className={`font-medium px-4 py-3 bg-dark-bg border border-gray-800 rounded-xl ${formData.bio ? 'text-white' : 'text-gray-500 italic'}`}>
                                        {formData.bio || 'No bio provided'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

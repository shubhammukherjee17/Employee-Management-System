'use client';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            // Double check auth on client side route change
            const stored = localStorage.getItem('ems_user');
            if (!stored) {
                router.push('/login');
            }
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null; // Or a loading spinner

    return (
        <div className="min-h-screen bg-dark-bg text-white">
            <Sidebar />
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 p-6 md:ml-64 relative z-10">
                    <div className="max-w-[1400px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

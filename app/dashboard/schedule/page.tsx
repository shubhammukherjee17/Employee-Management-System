'use client';

export default function SchedulePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-dark-card rounded-fuill flex items-center justify-center mb-6 rounded-full border border-gray-800">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Schedule</h1>
            <p className="text-gray-500 max-w-md">
                This module is currently under development. Soon you will be able to manage employee shifts and attendance here.
            </p>
        </div>
    );
}

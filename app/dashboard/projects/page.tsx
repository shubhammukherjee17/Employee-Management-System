'use client';

export default function ProjectsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-dark-card rounded-fuill flex items-center justify-center mb-6 rounded-full border border-gray-800">
                <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-500 max-w-md">
                Project management features are coming soon. Track deliverables and assign tasks to your team.
            </p>
        </div>
    );
}

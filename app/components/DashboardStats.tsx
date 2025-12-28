'use client';

import { useEmployees } from '../context/EmployeeContext';

const DashboardStats = () => {
    const { employees } = useEmployees();
    const totalEmployees = employees.length;

    // Mock data for demo to match image
    // Dynamic Stats
    const newEmployees = employees.filter(e => {
        const joinDate = new Date(e.joinDate);
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return joinDate > lastMonth;
    }).length;

    // Real Gender Stats
    const menCount = employees.filter(e => e.gender === 'Male').length;
    const womenCount = employees.filter(e => e.gender === 'Female').length;
    const womenPct = totalEmployees > 0 ? Math.round((womenCount / totalEmployees) * 100) : 0;

    const stats = [
        { label: 'Total Employee', value: totalEmployees, change: '+2.5%', changeType: 'increase', color: 'text-white' },
        { label: 'New Employee', value: newEmployees, change: `+${newEmployees}`, changeType: 'increase', color: 'text-white' },
        { label: 'Male Employee', value: menCount, change: '+5%', changeType: 'increase', color: 'text-white' },
        { label: 'Female Employee', value: `${womenPct}%`, change: '-2%', changeType: 'decrease', color: 'text-white' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-dark-card p-6 rounded-3xl border border-gray-800/50 hover:bg-gray-800/50 transition-colors group">
                    <h3 className="text-gray-500 text-sm font-medium mb-4">{stat.label}</h3>

                    <div className="flex items-end justify-between">
                        <p className="text-4xl font-bold text-white">{stat.value}</p>
                    </div>

                    <div className={`mt-4 text-xs font-semibold flex items-center gap-1.5 ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                        }`}>
                        {stat.changeType === 'increase' ? (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" /></svg>
                        ) : (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" /></svg>
                        )}
                        {stat.change}
                        <span className="text-gray-500 font-normal ml-1">Last month</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;

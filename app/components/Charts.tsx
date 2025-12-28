'use client';

interface WorkPerformanceChartProps {
    data: { name: string; performance: number; role: string }[];
}

export const WorkPerformanceChart = ({ data }: WorkPerformanceChartProps) => {
    // Sort by performance desc and take top 5
    const topPerformers = [...data].sort((a, b) => b.performance - a.performance).slice(0, 5);

    return (
        <div className="bg-dark-card rounded-3xl p-6 h-full border border-gray-800/50 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Top Performers</h3>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                    View All
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-5">
                {topPerformers.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">No performance data available</div>
                ) : (
                    topPerformers.map((emp, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <div>
                                    <span className="text-white font-medium mr-2">{emp.name}</span>
                                    <span className="text-gray-500 text-xs">{emp.role}</span>
                                </div>
                                <span className="text-blue-400 font-bold">{emp.performance}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000"
                                    style={{ width: `${emp.performance}%` }}
                                ></div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

interface AttendanceChartProps {
    present: number;
    late: number;
    absent: number;
    total: number;
}

export const AttendanceChart = ({ present, late, absent, total }: AttendanceChartProps) => {
    // Semi-Circle Gauge Calculation
    // Total arc is 180 degrees (from 180 to 360/0)
    // Radius = 80
    // Center = 100, 100

    // Percentages
    const presentPct = total > 0 ? (present / total) * 100 : 0;
    const latePct = total > 0 ? (late / total) * 100 : 0;
    const absentPct = total > 0 ? (absent / total) * 100 : 0;

    // Scale percentages to degrees (Total 180 deg)
    // 100% = 180 deg
    // deg = pct * 1.8

    const presentDeg = presentPct * 1.8;
    const lateDeg = latePct * 1.8;
    const absentDeg = absentPct * 1.8;

    // Helper to calculate arc path
    const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    };

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    // Segments calculation
    // Green (Present): Start 0 -> End presentDeg
    // Orange (Late): Start presentDeg -> End presentDeg + lateDeg
    // Blue (Absent): Start presentDeg + lateDeg -> End 180 (or accumulated)

    const endGreen = Math.min(presentDeg, 180);
    const startOrange = endGreen;
    const endOrange = Math.min(startOrange + lateDeg, 180);
    const startBlue = endOrange;
    const endBlue = Math.min(startBlue + absentDeg, 180);

    return (
        <div className="bg-dark-card rounded-3xl p-6 h-full border border-gray-800/50 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Attendance Overview</h3>
                <button className="flex items-center gap-2 text-sm text-gray-400 bg-dark-bg/50 hover:bg-dark-bg rounded-lg px-3 py-1.5 border border-gray-800 transition-colors">
                    <span>Today</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>

            {/* Gauge/Donut Hybrid */}
            <div className="relative flex items-center justify-center -mt-4">
                <svg viewBox="0 0 200 110" className="w-full h-48 overflow-visible">
                    {/* Background Track */}
                    <path d={describeArc(100, 100, 80, 0, 180)} fill="none" stroke="#2a2a2a" strokeWidth="16" strokeLinecap="round" />

                    {/* Segments */}
                    {/* Green Segment (Present) */}
                    {presentPct > 0 && <path d={describeArc(100, 100, 80, 0, endGreen)} fill="none" stroke="#22c55e" strokeWidth="16" strokeLinecap="round" />}

                    {/* Orange Segment (Late) */}
                    {latePct > 0 && <path d={describeArc(100, 100, 80, startOrange, endOrange)} fill="none" stroke="#f59e0b" strokeWidth="16" strokeLinecap="round" />}

                    {/* Blue Segment (Absent) */}
                    {absentPct > 0 && <path d={describeArc(100, 100, 80, startBlue, endBlue)} fill="none" stroke="#3b82f6" strokeWidth="16" strokeLinecap="round" />}

                    {/* Center Text represented as Total Present % calculation or just Total Attendance */}
                    <text x="100" y="85" textAnchor="middle" className="fill-white text-3xl font-bold tracking-tight">{Math.round(presentPct + latePct)}%</text>
                    <text x="100" y="105" textAnchor="middle" className="fill-gray-500 text-xs font-medium uppercase tracking-wider">Total Attendance</text>
                </svg>
            </div>

            <div className="flex justify-between items-center text-xs px-2 border-t border-gray-800/50 pt-4">
                <div className="text-center">
                    <div className="flex items-center gap-1.5 mb-1 justify-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                        <span className="text-gray-400 font-medium">On Time</span>
                    </div>
                    <span className="font-bold text-white text-sm">{Math.round(presentPct)}%</span>
                </div>
                <div className="text-center">
                    <div className="flex items-center gap-1.5 mb-1 justify-center">
                        <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                        <span className="text-gray-400 font-medium">Delay Time</span>
                    </div>
                    <span className="font-bold text-white text-sm">{Math.round(latePct)}%</span>
                </div>
                <div className="text-center">
                    <div className="flex items-center gap-1.5 mb-1 justify-center">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                        <span className="text-gray-400 font-medium">Absent</span>
                    </div>
                    <span className="font-bold text-white text-sm">{Math.round(absentPct)}%</span>
                </div>
            </div>
        </div>
    );
}

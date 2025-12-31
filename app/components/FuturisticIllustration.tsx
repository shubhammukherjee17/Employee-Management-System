'use client';

export default function FuturisticIllustration() {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
            
            {/* Main 3D Cube Structure */}
            <div className="relative w-96 h-96" style={{ perspective: '1000px' }}>
                {/* Central Hub Cube */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                    <div className="relative w-full h-full animate-rotate-3d" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Front face */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 rounded-lg backdrop-blur-sm shadow-[0_0_30px_rgba(6,182,212,0.3)]"></div>
                        {/* Back face */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-600/30 border border-purple-400/50 rounded-lg backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.3)]" style={{ transform: 'translateZ(96px) rotateY(180deg)' }}></div>
                        {/* Top face */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border border-cyan-300/30 rounded-lg backdrop-blur-sm" style={{ transform: 'rotateX(90deg) translateY(-48px) translateZ(48px)' }}></div>
                        {/* Bottom face */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 border border-purple-300/30 rounded-lg backdrop-blur-sm" style={{ transform: 'rotateX(-90deg) translateY(48px) translateZ(48px)' }}></div>
                        {/* Right face */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-lg backdrop-blur-sm" style={{ transform: 'rotateY(90deg) translateX(48px) translateZ(48px)' }}></div>
                        {/* Left face */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-lg backdrop-blur-sm" style={{ transform: 'rotateY(-90deg) translateX(-48px) translateZ(48px)' }}></div>
                    </div>
                </div>

                {/* Surrounding Cubes */}
                {[
                    { x: -80, y: -80, delay: 0 },
                    { x: 80, y: -80, delay: 0.2 },
                    { x: -80, y: 80, delay: 0.4 },
                    { x: 80, y: 80, delay: 0.6 },
                    { x: 0, y: -120, delay: 0.1 },
                    { x: 120, y: 0, delay: 0.3 },
                    { x: 0, y: 120, delay: 0.5 },
                    { x: -120, y: 0, delay: 0.7 },
                ].map((cube, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-16 h-16"
                        style={{
                            transform: `translate(calc(-50% + ${cube.x}px), calc(-50% + ${cube.y}px))`,
                        }}
                    >
                        <div className="relative w-full h-full animate-rotate-3d-slow" style={{ transformStyle: 'preserve-3d', animationDelay: `${cube.delay}s` }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border border-cyan-300/40 rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.2)]"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 border border-purple-300/40 rounded-lg backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.2)]" style={{ transform: 'translateZ(64px) rotateY(180deg)' }}></div>
                        </div>
                    </div>
                ))}

                {/* Glowing Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Lines connecting cubes */}
                    {[
                        { x1: '50%', y1: '50%', x2: '25%', y2: '25%' },
                        { x1: '50%', y1: '50%', x2: '75%', y2: '25%' },
                        { x1: '50%', y1: '50%', x2: '25%', y2: '75%' },
                        { x1: '50%', y1: '50%', x2: '75%', y2: '75%' },
                        { x1: '50%', y1: '50%', x2: '50%', y2: '20%' },
                        { x1: '50%', y1: '50%', x2: '80%', y2: '50%' },
                        { x1: '50%', y1: '50%', x2: '50%', y2: '80%' },
                        { x1: '50%', y1: '50%', x2: '20%', y2: '50%' },
                    ].map((line, i) => (
                        <line
                            key={i}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="url(#lineGradient)"
                            strokeWidth="2"
                            filter="url(#glow)"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </svg>

                {/* Floating Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
}


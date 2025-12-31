'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FuturisticIllustration from './components/FuturisticIllustration';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Nexus</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="px-5 py-2.5 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium text-sm border border-blue-100">
                ✨ The Operating System for Teams
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Sync your workforce <br />
                <span className="text-blue-600">with Nexus.</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
                Streamline attendance, manage leaves, and boost productivity with an all-in-one platform designed for modern teams.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/signup" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95">
                  Start for free
                </Link>
                <Link href="/login" className="px-8 py-4 bg-gray-100 text-gray-900 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all">
                  Live Demo
                </Link>
              </div>

              <div className="pt-8 flex items-center gap-8 text-gray-400 grayscale opacity-60">
                {/* Partner Logos (Placeholders) */}
                <div className="font-bold text-xl">Acme Inc.</div>
                <div className="font-bold text-xl">Globex</div>
                <div className="font-bold text-xl">Soylent</div>
                <div className="font-bold text-xl">Initech</div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full transform rotate-12 scale-90"></div>
              <div className="relative bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl border border-gray-800 rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
                {/* Mockup Internal */}
                <div className="aspect-[4/3] bg-gray-800 rounded-3xl overflow-hidden relative border border-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full scale-75">
                      <FuturisticIllustration />
                    </div>
                  </div>
                  {/* Floating Cards */}
                  <div className="absolute top-8 right-8 bg-gray-900/90 backdrop-blur-xl p-4 rounded-2xl border border-gray-700 shadow-xl animate-bounce duration-[3000ms] z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">Attendance</div>
                        <div className="text-green-400 text-xs font-medium">98% On Time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to run your team</h2>
            <p className="text-gray-500">Powerful features that help you manage your workforce without the complexity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Real-time Tracking", desc: "Monitor attendance and work hours in real-time with precise location data.", icon: "⚡" },
              { title: "Leave Management", desc: " streamlined leave request and approval workflows for efficient planning.", icon: "📅" },
              { title: "Performance Insights", desc: "Data-driven analytics to help you identify top performers and trends.", icon: "aaa" }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">Nexus</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
                The all-in-one operating system for modern workforce management. Sync your team, streamline operations, and scale with confidence.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" />
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 7.12 9.6.5.09.68-.22.68-.48v-1.69c-2.79.6-3.38-1.34-3.38-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.68 0 3.84-2.33 4.66-4.56 4.91.36.31.69.92.69 1.85v2.75c0 .27.18.59.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0077b5] hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors">
                  <span className="sr-only">X (Twitter)</span>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Security', 'Roadmap', 'Changelog'].map((item) => (
                  <li key={item}><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Blog', 'Contact', 'Partners'].map((item) => (
                  <li key={item}><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Documentation', 'Help Center', 'API Reference', 'Community', 'Status'].map((item) => (
                  <li key={item}><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'DPA'].map((item) => (
                  <li key={item}><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © 2025 Nexus Systems Inc. All rights reserved.
            </div>
            <div className="flex gap-6">
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

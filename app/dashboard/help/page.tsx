'use client';

import { useState } from 'react';

const HelpPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "How do I add a new employee?",
            answer: "Navigate to the 'Employee' page from the sidebar and click on the 'Add Employee' button at the top right corner. Fill in the details and click 'Add Employee'."
        },
        {
            question: "How can I change my password?",
            answer: "Go to the 'Settings' page from the sidebar. Under the 'Security' section, you will find options to change your password."
        },
        {
            question: "Can I export employee data?",
            answer: "Currently, exporting data is not supported directly from the dashboard. Please contact support if you need a manual export."
        },
        {
            question: "How do I update my profile picture?",
            answer: "Profile picture updates are currently managed by the administrator. Please reach out to HR or the IT department."
        }
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Help Center</h1>
                <p className="text-gray-400">Find answers to common questions or contact support.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* FAQs */}
                <div className="bg-dark-card rounded-2xl p-6 border border-gray-800">
                    <h2 className="text-lg font-semibold text-white mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                                >
                                    <span className={`font-medium transition-colors ${openIndex === index ? 'text-blue-400' : 'text-gray-200 group-hover:text-white'}`}>
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Support */}
                <div className="bg-dark-card rounded-2xl p-6 border border-gray-800">
                    <h2 className="text-lg font-semibold text-white mb-6">Contact Support</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Subject</label>
                            <input
                                type="text"
                                placeholder="I need help with..."
                                className="w-full bg-dark-bg text-white rounded-xl px-4 py-3 border border-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Message</label>
                            <textarea
                                rows={5}
                                placeholder="Describe your issue..."
                                className="w-full bg-dark-bg text-white rounded-xl px-4 py-3 border border-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-blue-900/20"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;

'use client';

import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { downloadCvAsPdf } from "@/app/actions/download-pdf";

const FloatingDownloadButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const pdfBuffer = await downloadCvAsPdf();
            const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const date = new Date().toISOString().split('T')[0];
            const fileName = `Thais_A_Molina_CV_${date}.pdf`;

            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
            setError('Failed to download CV. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 print:hidden">
            <button id="download-pdf-button"
                onClick={handleDownload}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-4 px-6 rounded-full
                    shadow-2xl shadow-emerald-900/50 flex items-center justify-center transition-all duration-300
                    hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                disabled={isLoading}>
                {isLoading ? (
                    <span className="animate-spin mr-2">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12m7-9v8m-4-2H3m7-6h.01M16 16v.01M12 21.01V21m0-18V4.01" />
                        </svg>
                    </span>
                ) : (
                    <FaDownload className="mr-2" />
                )}
                {isLoading ? 'Processing...' : 'Download PDF'}
            </button>
            {error && <p className="text-red-500 mt-2 text-sm bg-slate-900 p-2 rounded shadow-lg absolute bottom-16 right-0 w-max">{error}</p>}
        </div>
    );
};

export default FloatingDownloadButton;
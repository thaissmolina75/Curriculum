'use client'

import React from 'react';
import { cvData } from "@/lib/cvData";

const Languages: React.FC = () => {
    return (
        <section className="order-5 lg:order-2">
            <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center">
                <span className="bg-emerald-500/10 text-emerald-400 p-2 rounded mr-3 text-lg">06</span>
                Languages
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {cvData.languages.map((lang, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-slate-800 bg-slate-900/30 rounded-lg hover:border-emerald-500/30 transition-colors group"
                    >
                        <span className="text-lg font-semibold text-slate-200 group-hover:text-emerald-100 transition-colors">
                            {lang.name}
                        </span>
                        <span className="text-emerald-400 text-sm font-mono bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                            {lang.proficiency}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Languages;
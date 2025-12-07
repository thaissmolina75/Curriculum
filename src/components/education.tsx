import React from 'react';
import { cvData } from "@/lib/cvData";

const Education: React.FC = () => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center">
                <span className="bg-emerald-500/10 text-emerald-400 p-2 rounded mr-3 text-lg">02</span>
                Education
            </h2>
            <div className="space-y-8">
                {cvData.education.map((item, index) => (
                    <div key={index} className="group">
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">{item.degree}</h3>
                        <p className="text-emerald-400">{item.university}</p>
                        <p className="text-slate-500 font-mono text-sm mt-1">{item.dates}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
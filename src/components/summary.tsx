import React from 'react';
import LinkifySkills from "@/components/linkifySkills";

interface SummaryProps {
    summary: string;
    allSkills: { name: string; level: number }[];
}

const Summary: React.FC<SummaryProps> = ({ summary, allSkills }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
                <span className="bg-emerald-500/10 text-emerald-400 p-2 rounded mr-3 text-lg">01</span>
                Research Interests
            </h2>
            <div className="text-slate-300 leading-8 text-lg font-light">
                <LinkifySkills text={summary} allSkills={allSkills} />
            </div>
        </section>
    );
};

export default Summary;
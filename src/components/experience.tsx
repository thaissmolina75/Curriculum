import React from 'react';
import LinkifySkills from "@/components/linkifySkills";
import { Skill } from "@/lib/types";

interface ExperienceItemProps {
    title: string;
    company: string;
    dates: string;
    description: string[];
    allSkills: Skill[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ title, company, dates, description, allSkills }) => {
    return (
        <div className="relative pl-8 md:pl-10 border-l border-slate-800 pb-12 last:pb-0 timeline-line group">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-slate-950 group-hover:ring-emerald-500/20 transition-all timeline-dot"></div>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">{title}</h3>
                <span className="text-sm font-mono text-slate-500 shrink-0">{dates}</span>
            </div>

            <div className="text-emerald-400 font-semibold mb-4">{company}</div>

            <ul className="space-y-3">
                {description.map((point, index) => (
                    <li key={index} className="text-slate-400 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-slate-700 before:rounded-full">
                        <span className="text-base">
                            <LinkifySkills text={point} allSkills={allSkills} />
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface ExperienceProps {
    experience: {
        title: string;
        company: string;
        dates: string;
        description: string[];
    }[];
    allSkills: Skill[];
}

const Experience: React.FC<ExperienceProps> = ({ experience, allSkills }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center">
                <span className="bg-emerald-500/10 text-emerald-400 p-2 rounded mr-3 text-lg">04</span>
                Professional Experience
            </h2>
            <div className="mt-6">
                {experience.map((exp, index) => (
                    <ExperienceItem key={index} {...exp} allSkills={allSkills} />
                ))}
            </div>
        </section>
    );
};

export default Experience;
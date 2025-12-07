import React from 'react';

interface Skill {
    name: string;
    level: number; // 1-4
}

interface SkillsProps {
    skills: {
        [category: string]: Skill[];
    };
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center">
                <span className="bg-emerald-500/10 text-emerald-400 p-2 rounded mr-3 text-lg">05</span>
                Technical Skills
            </h2>

            <div className="space-y-8">
                {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                        <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-500 mb-4 border-b border-slate-800 pb-2">
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {skillList.map((skill) => (
                                <div
                                    key={skill.name}
                                    id={skill.name.replace(/\s+/g, '-').toLowerCase()}
                                    className="group relative bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-md overflow-hidden transition-all duration-300"
                                >
                                    {/* Proficiency Bar Background */}
                                    <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full"></div>
                                    {/* Proficiency Bar Fill */}
                                    <div
                                        className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-500"
                                        style={{ width: `${(skill.level / 4) * 100}%` }}
                                    ></div>

                                    <div className="px-3 py-2 text-sm font-medium text-slate-300 group-hover:text-emerald-100">
                                        {skill.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
import React from 'react';
import { cvData } from '@/lib/cvData';
import FloatingDownloadButton from "@/components/floatingDownloadButton";
import Header from "@/components/header";
import Summary from "@/components/summary";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Education from "@/components/education";
import Languages from "@/components/languages";

const Home: React.FC = () => {
    const allSkillsFlat = Object.values(cvData.skills).flat();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 relative">
            <FloatingDownloadButton />
            {/* Expanded max-width for a more executive feel */}
            <main className="container mx-auto max-w-5xl space-y-16">
                <Header name={cvData.name} title={cvData.title} contact={cvData.contact} />

                {/* Two column layout for larger screens: Summary on top, then Exp/Skills split or stacked */}
                <div className="space-y-16">
                    <Summary summary={cvData.summary} allSkills={allSkillsFlat} />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-16">
                            <Education education={cvData.education} />
                            <Experience experience={cvData.experience} allSkills={allSkillsFlat} />
                        </div>

                        <div className="lg:col-span-4 space-y-12">
                            <Skills skills={cvData.skills} />
                            <Languages languages={cvData.languages} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
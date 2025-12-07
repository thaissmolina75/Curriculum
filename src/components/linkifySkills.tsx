'use client';

import React from 'react';
import Link from 'next/link';
import { Skill } from "@/lib/types";

interface LinkifySkillsProps {
    text: string;
    allSkills: Skill[];
}

const LinkifySkills: React.FC<LinkifySkillsProps> = ({ text, allSkills }) => {
    const keywordMap = new Map<string, Skill>();

    allSkills.forEach(skill => {
        keywordMap.set(skill.name.toLowerCase(), skill);

        const parts = skill.name.split(/[\(\)\/&,]+/).map(s => s.trim());

        parts.forEach(part => {
            if (part.length > 1) {
                if (!keywordMap.has(part.toLowerCase())) {
                    keywordMap.set(part.toLowerCase(), skill);
                }
            }
        });
    });

    const sortedKeywords = Array.from(keywordMap.keys()).sort((a, b) => b.length - a.length);

    if (sortedKeywords.length === 0) return <>{text}</>;

    const escapedKeywords = sortedKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    text.replace(regex, (match, keyword, offset) => {
        if (offset > lastIndex) {
            parts.push(text.substring(lastIndex, offset));
        }

        const lowerKeyword = keyword.toLowerCase();
        const foundSkill = keywordMap.get(lowerKeyword);

        if (foundSkill) {
            const skillId = foundSkill.name.replace(/\s+/g, '-').toLowerCase();
            parts.push(
                <Link
                    key={`${keyword}-${offset}`}
                    href={`/#${skillId}`}
                    className="text-emerald-400 hover:text-emerald-300 font-medium underline decoration-emerald-500/30 hover:decoration-emerald-500 transition-all duration-200"
                >
                    {match}
                </Link>
            );
        } else {
            parts.push(match);
        }

        lastIndex = offset + match.length;
        return match;
    });

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return <>{parts}</>;
};

export default LinkifySkills;
import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

interface HeaderProps {
    name: string;
    title: string;
    contact: {
        phone: string;
        email: string;
        location: string;
        linkedin?: string;
        github?: string;
    };
}

const Header: React.FC<HeaderProps> = ({ name, title, contact }) => {
    return (
        <header className="border-b border-slate-800 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100 uppercase">
                        {name}
                    </h1>
                    <p className="text-xl md:text-2xl text-emerald-400 font-medium mt-3 tracking-wide">
                        {title}
                    </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 text-slate-400 text-sm md:text-base font-mono">
                    <a href={`mailto:${contact.email}`}
                        className="flex items-center hover:text-emerald-400 transition-colors group">
                        <span className="group-hover:translate-x-[-2px] transition-transform">{contact.email}</span>
                        <FaEnvelope className="ml-3 text-emerald-500/70" />
                    </a>
                    <a href={`tel:${contact.phone}`}
                        className="flex items-center hover:text-emerald-400 transition-colors group">
                        <span className="group-hover:translate-x-[-2px] transition-transform">{contact.phone}</span>
                        <FaPhone className="ml-3 text-emerald-500/70" />
                    </a>
                    {contact.linkedin && <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center hover:text-emerald-400 transition-colors group">
                        <span className="group-hover:translate-x-[-2px] transition-transform">{contact.linkedin}</span>
                        <FaLinkedin className="ml-3 text-emerald-500/70" />
                    </a>}
                    {contact.github && <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center hover:text-emerald-400 transition-colors group">
                        <span className="group-hover:translate-x-[-2px] transition-transform">{contact.github}</span>
                        <FaGithub className="ml-3 text-emerald-500/70" />
                    </a>}
                    <span className="flex items-center text-slate-500">
                        {contact.location}
                        <FaMapMarkerAlt className="ml-3 text-slate-600" />
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
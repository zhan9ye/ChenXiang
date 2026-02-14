
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-center md:text-left'}`}>
      <h2 className="text-4xl md:text-5xl font-serif text-[#2D241E] mb-4 tracking-tight">{title}</h2>
      {subtitle && <p className="text-[#764F35] font-bold uppercase tracking-[0.2em] text-xs">{subtitle}</p>}
      <div className={`mt-4 h-0.5 w-16 bg-[#E9D6BE] ${centered ? 'mx-auto' : 'mx-auto md:mx-0'}`}></div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
}) => {
  const isDark = variant === 'dark';

  // Sizing configurations
  const logoHeight =
    size === 'sm'
      ? 'h-10 sm:h-11'
      : size === 'lg'
      ? 'h-14 sm:h-16'
      : 'h-12 sm:h-14';

  return (
    <Link 
      to="/" 
      className="inline-flex items-center gap-2.5 group select-none transition-transform active:scale-98"
      title="DJ Style Hub – Wear Your Story"
    >
      <div 
        className={`relative overflow-hidden transition-all duration-300 inline-flex items-center ${
          isDark 
            ? 'bg-white px-2.5 py-1.5 rounded-xl shadow-xs' 
            : 'bg-transparent'
        }`}
      >
        <img
          src="/images/dj-logo.jpg"
          alt="DJ Style Hub – Wear Your Story"
          className={`${logoHeight} w-auto object-contain transition-transform group-hover:scale-102`}
          loading="eager"
        />
        {showTagline && !isDark && (
          <div className="hidden xl:flex flex-col border-l border-neutral-300/80 pl-2.5 ml-1 text-left">
            <span className="text-[9px] tracking-[0.24em] uppercase font-bold text-neutral-500">
              Wear Your
            </span>
            <span className="text-[9px] tracking-[0.24em] uppercase font-bold text-[#8d1a37]">
              Story
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

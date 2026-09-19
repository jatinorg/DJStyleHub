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

  return (
    <Link 
      to="/" 
      className="inline-flex items-center gap-2.5 group select-none"
      title="DJ Style Hub – Wear Your Story"
    >
      {/* Brand Monogram Icon */}
      <div className="relative overflow-hidden rounded-xl shrink-0 shadow-xs border border-amber-300/40 w-10 h-10 sm:w-11 sm:h-11">
        <img
          src="/images/dj-logo-mark.jpg"
          alt="DJ Style Hub Emblem"
          width={48}
          height={48}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left">
        <span 
          className={`font-serif tracking-tight font-bold leading-none ${
            isDark ? 'text-white' : 'text-maroon-950'
          } ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          DJ <span className={isDark ? 'text-gold-400 font-serif' : 'text-gold-600 font-serif'}>STYLE HUB</span>
        </span>
        {showTagline && (
          <span 
            className={`text-[9px] sm:text-[10px] tracking-[0.28em] uppercase font-semibold mt-0.5 ${
              isDark ? 'text-gold-300/90' : 'text-neutral-500'
            }`}
          >
            Wear Your Story
          </span>
        )}
      </div>
    </Link>
  );
};

import React from 'react';
import { CategoryType } from '../types';
import { Scissors, ShieldCheck, MessageCircle } from 'lucide-react';

interface HeroProps {
  onSelectCategory: (cat: CategoryType) => void;
  activeCategory: CategoryType;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, activeCategory }) => {
  return (
    <section className="bg-white border-b border-neutral-200 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Simple Brand Tag */}
        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Exclusive Unstitched Studio
        </span>

        {/* Clean Main Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
          Curated Dress Materials <br className="hidden sm:inline" />
          for Women &amp; Kids
        </h2>

        {/* Quiet Subtitle */}
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Pure breathable cottons, Chanderi silks, and gentle kid-friendly fabrics. Handpicked with verified yardage for flawless tailoring.
        </p>

        {/* Simple Toggle Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onSelectCategory('women')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              activeCategory === 'women'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            👗 Women's Materials
          </button>
          <button
            onClick={() => onSelectCategory('kids')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              activeCategory === 'kids'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            🧸 Kids' Materials
          </button>
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition ${
              activeCategory === 'all'
                ? 'text-neutral-900 font-bold underline underline-offset-4'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            View All
          </button>
        </div>

        {/* 3 Simple Value Points */}
        <div className="pt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-neutral-500 border-t border-neutral-100">
          <span className="flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5 text-neutral-700" />
            <span>Exact 2.5m Top Cuts</span>
          </span>
          <span className="text-neutral-300">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
            <span>100% Genuine Fabrics</span>
          </span>
          <span className="text-neutral-300">•</span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Instant WhatsApp Ordering</span>
          </span>
        </div>

      </div>
    </section>
  );
};

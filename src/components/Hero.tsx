import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, ShieldCheck, MessageCircle } from 'lucide-react';

interface HeroProps {
  currentCategory?: 'all' | 'women' | 'kids';
}

export const Hero: React.FC<HeroProps> = ({ currentCategory = 'all' }) => {
  return (
    <section className="bg-white border-b border-neutral-200 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Semantic Eyebrow */}
        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Exclusive Unstitched Studio
        </span>

        {/* Primary Page H1 */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
          Curated Dress Materials <br className="hidden sm:inline" />
          for Women &amp; Kids
        </h1>

        {/* Descriptive Subtitle */}
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Pure breathable cottons, Chanderi silks, and gentle kid-friendly fabrics. Handpicked with verified yardage for flawless tailoring with delivery across India.
        </p>

        {/* Crawlable Category Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/category/women"
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              currentCategory === 'women'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="Explore Women's Dress Materials"
          >
            👗 Women's Materials
          </Link>
          <Link
            to="/category/kids"
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
              currentCategory === 'kids'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="Explore Kids' Ethnic Dress Materials"
          >
            🧸 Kids' Materials
          </Link>
          <Link
            to="/"
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition ${
              currentCategory === 'all'
                ? 'text-neutral-900 font-bold underline underline-offset-4'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
            title="View All Dress Materials"
          >
            View All
          </Link>
        </div>

        {/* Value Propositions */}
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
          <a
            href="https://wa.me/919876543210?text=Hi%20DJ%20Style%20Hub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-700 font-medium hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Instant WhatsApp Ordering</span>
          </a>
        </div>

      </div>
    </section>
  );
};

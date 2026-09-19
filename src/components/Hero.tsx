import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf3ee] border-b border-neutral-200/80">
      {/* Background Decorative Floral Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 160C80 120 120 80 160 40M160 40C140 80 100 120 40 160M160 40C120 40 80 80 40 160" stroke="#580c22" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            {/* Tagline */}
            <div className="inline-block">
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] uppercase text-[#8d1a37]">
                TRADITION MEETS TREND
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.1]">
              Wear <br className="hidden sm:inline" />
              Your Story
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore timeless ethnic wear, modern styles and premium fabrics — all at one place.
            </p>

            {/* Shop Now CTA Button */}
            <div className="pt-2">
              <Link
                to="/category/women"
                className="inline-flex items-center gap-2 bg-[#580c22] hover:bg-[#450719] text-white px-8 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-4">
              <span className="w-6 h-2 rounded-full bg-[#580c22]" />
              <span className="w-2 h-2 rounded-full bg-neutral-300" />
              <span className="w-2 h-2 rounded-full bg-neutral-300" />
            </div>
          </div>

          {/* Right Hero Visuals with Model & Calligraphy */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Model Image with arched container */}
            <div className="relative z-10 w-full max-w-md lg:max-w-lg aspect-[4/5] rounded-t-[140px] sm:rounded-t-[180px] rounded-b-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                alt="Indian Model in Maroon Silk Saree with Traditional Gajra and Jewelry"
                width={800}
                height={1000}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
              
              {/* Subtle Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Artistic Handscript Calligraphy on Right - Exactly as in reference */}
            <div className="hidden sm:flex flex-col items-center absolute -right-2 top-1/4 z-20 pointer-events-none bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-rose-100 shadow-lg transform rotate-2">
              <span className="font-cursive text-3xl sm:text-4xl text-[#580c22] leading-tight text-center font-bold">
                More than Fashion<br />
                <span className="text-[#8d1a37]">It's You ♡</span>
              </span>
              <svg className="w-8 h-8 text-amber-600/40 mt-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

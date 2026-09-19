import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const MiddleBanner: React.FC = () => {
  return (
    <section className="py-12 bg-[#faf4f0] border-b border-neutral-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-900 leading-tight">
              Fashion for <br />
              Every You
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-lg leading-relaxed">
              From everyday essentials to special occasions, find styles that fit your story.
            </p>
            <div className="pt-2">
              <Link
                to="/category/women"
                className="inline-flex items-center gap-2 bg-[#580c22] hover:bg-[#450719] text-white px-7 py-3 rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Visual & Cursive Calligraphy */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden shadow-md border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                alt="Ethnic Apparel Collection Rack"
                width={600}
                height={375}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Cursive Note on Top-Right */}
            <div className="hidden sm:block absolute -top-4 right-2 bg-white/90 backdrop-blur-xs px-4 py-2 rounded-xl shadow-md border border-rose-100 transform rotate-1">
              <span className="font-cursive text-2xl text-[#580c22] font-bold">
                Style Inspires Confidence ♡
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

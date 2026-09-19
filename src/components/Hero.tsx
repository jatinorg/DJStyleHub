import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  tagline: string;
  headlineFirst: string;
  headlineSecond: string;
  description: string;
  image: string;
  imageAlt: string;
  cursiveAccentFirst: string;
  cursiveAccentSecond: string;
  link: string;
  buttonText: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tagline: 'TRADITION MEETS TREND',
    headlineFirst: 'Wear',
    headlineSecond: 'Your Story',
    description: 'Explore timeless ethnic wear, modern styles and premium fabrics — all at one place.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Indian Model in Maroon Silk Saree with Traditional Gajra and Jewelry',
    cursiveAccentFirst: 'More than Fashion',
    cursiveAccentSecond: "It's You ♡",
    link: '/category/women',
    buttonText: 'Shop Now',
  },
  {
    id: 2,
    tagline: 'NEW FESTIVE ARRIVALS',
    headlineFirst: 'Grace In',
    headlineSecond: 'Every Thread',
    description: 'Handcrafted unstitched suit materials, pure Chanderi silks, and intricate festive ensembles.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Elegant Indian Festive Suit and Embroidered Dupatta',
    cursiveAccentFirst: 'Handcrafted With',
    cursiveAccentSecond: 'Pure Grace ♡',
    link: '/category/women',
    buttonText: 'Explore Suits',
  },
  {
    id: 3,
    tagline: 'PURE WEAVES & HERITAGE',
    headlineFirst: 'Royal',
    headlineSecond: 'Banarasi Silks',
    description: 'Rich heritage weaves, pure mulmul cottons, and custom yardage for your dream attire.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Stack of Rich Heritage Banarasi Silk and Cotton Fabrics',
    cursiveAccentFirst: 'Style Inspires',
    cursiveAccentSecond: 'Confidence ♡',
    link: '/fabric-guide',
    buttonText: 'View Fabrics',
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance carousel every 4.5 seconds (paused on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const activeSlide = SLIDES[currentSlide];

  return (
    <section
      className="relative overflow-hidden bg-[#faf3ee] border-b border-neutral-200/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Carousel"
    >
      {/* Background Decorative Floral Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40 160C80 120 120 80 160 40M160 40C140 80 100 120 40 160M160 40C120 40 80 80 40 160"
            stroke="#580c22"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Reduced vertical padding to decrease length/height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left z-10">
            {/* Tagline */}
            <div className="inline-block">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#8d1a37] transition-all duration-300">
                {activeSlide.tagline}
              </span>
            </div>

            {/* Main Headline with smooth fade */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.12] transition-opacity duration-300">
              {activeSlide.headlineFirst} <br className="hidden sm:inline" />
              <span className="text-[#580c22]">{activeSlide.headlineSecond}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto lg:mx-0 leading-relaxed font-normal min-h-[40px]">
              {activeSlide.description}
            </p>

            {/* Shop Now CTA Button */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to={activeSlide.link}
                className="inline-flex items-center gap-2 bg-[#580c22] hover:bg-[#450719] text-white px-7 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs hover:shadow-md group active:scale-98"
              >
                <span>{activeSlide.buttonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Discreet Next / Prev Arrows for manual navigation */}
              <div className="inline-flex items-center gap-1.5 ml-1">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full border border-neutral-300 hover:border-[#580c22] text-neutral-600 hover:text-[#580c22] bg-white/90 hover:bg-white shadow-2xs transition"
                  aria-label="Previous slide"
                  title="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full border border-neutral-300 hover:border-[#580c22] text-neutral-600 hover:text-[#580c22] bg-white/90 hover:bg-white shadow-2xs transition"
                  aria-label="Next slide"
                  title="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Clickable Slider Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentSlide
                      ? 'w-7 h-2 bg-[#580c22]'
                      : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Hero Visuals with Multi-Image Crossfade Container */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Arched Image Container - Scaled down for sleek vertical length */}
            <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[360px] aspect-[4/4.6] max-h-[360px] sm:max-h-[390px] rounded-t-[120px] sm:rounded-t-[150px] rounded-b-2xl overflow-hidden shadow-lg border-4 border-white bg-neutral-100">
              {SLIDES.map((slide, idx) => (
                <img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.imageAlt}
                  width={720}
                  height={860}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}
              
              {/* Subtle Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-20" />
            </div>

            {/* Artistic Handscript Calligraphy on Right */}
            <div className="hidden sm:flex flex-col items-center absolute -right-2 sm:-right-4 top-1/4 z-20 pointer-events-none bg-white/90 backdrop-blur-xs px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border border-rose-100 shadow-md transform rotate-2 transition-transform duration-500">
              <span className="font-cursive text-2xl sm:text-3xl text-[#580c22] leading-tight text-center font-bold">
                {activeSlide.cursiveAccentFirst}<br />
                <span className="text-[#8d1a37]">{activeSlide.cursiveAccentSecond}</span>
              </span>
              <svg className="w-6 h-6 text-amber-600/40 mt-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

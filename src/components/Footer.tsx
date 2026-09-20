import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { STORE_INFO } from '../data/products';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#450719] text-neutral-300 pt-16 pb-8 border-t border-amber-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Cursive Greeting on the Right - Exactly as in reference */}
        <div className="flex justify-end mb-4">
          <span className="font-cursive text-2xl sm:text-3xl text-amber-200/90 font-bold tracking-wide">
            Thank you for being a part of our story ♡
          </span>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-amber-900/40 text-xs">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="dark" size="lg" />
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mt-2">
              Explore timeless ethnic wear, modern styles and premium unstitched fabrics. Verified yardage cuts with delivery across India.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hello%20DJ%20Style%20Hub`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {STORE_INFO.displayPhone}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Shop Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <Link to="/category/women" className="hover:text-amber-300 transition">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/category/men" className="hover:text-amber-300 transition">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/fabric-guide" className="hover:text-amber-300 transition">
                  Fabrics
                </Link>
              </li>
              <li>
                <Link to="/category/kids" className="hover:text-amber-300 transition">
                  Kids Wear
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-amber-300 transition">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-amber-300 transition">
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link to="/fabric-guide" className="hover:text-amber-300 transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay Connected & Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Subscribe to get offers, new arrivals and fashion inspiration.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-1.5 pt-1">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-amber-900/60 text-white placeholder:text-neutral-400 rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white/20 focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#6d0e29] hover:bg-[#851133] text-white font-semibold rounded-lg text-xs transition shrink-0"
              >
                {subscribed ? 'Joined!' : 'Subscribe'}
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3 text-neutral-400">
              <a href={STORE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/15 hover:text-white rounded-full transition" aria-label="Instagram">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/15 hover:text-white rounded-full transition" aria-label="Facebook">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href={STORE_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/15 hover:text-white rounded-full transition" aria-label="YouTube">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/15 hover:text-white rounded-full transition" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} DJ Style Hub. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, MessageCircle, Heart, User, ChevronDown } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { STORE_INFO } from '../data/products';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-neutral-200">
      {/* Top Maroon Announcement Bar - Exactly as reference */}
      <div className="bg-[#580c22] text-white text-[11px] sm:text-xs py-1.5 px-4 font-normal">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span>Free Shipping on Orders above ₹999</span>
            <span className="opacity-50">|</span>
            <span>Easy Returns</span>
            <span className="opacity-50">|</span>
            <span>Cash on Delivery Available</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-200">
            <a 
              href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition font-medium"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>{STORE_INFO.displayPhone}</span>
            </a>
            <span className="opacity-50">|</span>
            <Link to="/contact" className="hover:text-white transition">Track Order</Link>
            <span className="opacity-50">|</span>
            <Link to="/contact" className="hover:text-white transition">Help</Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-neutral-800 hover:text-neutral-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo with Emblem and Tagline */}
          <div className="shrink-0">
            <BrandLogo />
          </div>

          {/* Center Navigation Links - Reference Design */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-neutral-700">
            <Link
              to="/"
              className={`py-2 transition relative ${
                isActive('/') 
                  ? 'text-[#580c22] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#580c22]' 
                  : 'hover:text-[#580c22]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/category/women"
              className={`py-2 flex items-center gap-1 transition relative ${
                isActive('/category/women') 
                  ? 'text-[#580c22] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#580c22]' 
                  : 'hover:text-[#580c22]'
              }`}
            >
              <span>Women</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <Link
              to="/category/kids"
              className={`py-2 transition relative ${
                isActive('/category/kids') 
                  ? 'text-[#580c22] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#580c22]' 
                  : 'hover:text-[#580c22]'
              }`}
            >
              Kids Wear
            </Link>

            <Link
              to="/fabric-guide"
              className={`py-2 transition relative ${
                isActive('/fabric-guide') 
                  ? 'text-[#580c22] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#580c22]' 
                  : 'hover:text-[#580c22]'
              }`}
            >
              Fabrics
            </Link>

            <Link
              to="/category/women"
              className="py-2 hover:text-[#580c22] transition"
            >
              New Arrivals
            </Link>

            <Link
              to="/category/women"
              className="py-2 hover:text-[#580c22] transition text-[#8d1a37] font-semibold"
            >
              Offers
            </Link>

            <Link
              to="/about"
              className={`py-2 transition relative ${
                isActive('/about') 
                  ? 'text-[#580c22] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#580c22]' 
                  : 'hover:text-[#580c22]'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Search Bar - Exactly like reference */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for sarees, kurtas, fabrics..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-neutral-100 hover:bg-neutral-50 focus:bg-white border border-neutral-300 focus:border-[#580c22] rounded-full py-2 pl-9 pr-8 text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#580c22]/20 transition"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons: Profile, Wishlist, Cart, WhatsApp */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub,%20I'm%20looking%20for%20ethnic%20wear%20and%20fabrics`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600/15" />
            </a>

            {/* Profile Icon */}
            <Link
              to="/contact"
              className="p-2 text-neutral-700 hover:text-[#580c22] rounded-full hover:bg-neutral-100 transition"
              title="My Account / Help"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Heart Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-neutral-700 hover:text-[#580c22] rounded-full hover:bg-neutral-100 transition relative"
              title="Wishlist"
              aria-label={`Wishlist containing ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#580c22] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon with Badge */}
            <button
              onClick={onOpenCart}
              className="p-2 text-neutral-700 hover:text-[#580c22] rounded-full hover:bg-neutral-100 transition relative"
              title="Shopping Cart"
              aria-label={`Shopping bag containing ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-[#580c22] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for sarees, kurtas, fabrics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-100 border border-neutral-300 rounded-full py-2 pl-9 pr-8 text-xs focus:outline-none focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-6 py-5 space-y-4">
          <nav className="space-y-2 text-sm font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 ${isActive('/') ? 'text-[#580c22] font-bold' : 'text-neutral-700'}`}
            >
              Home
            </Link>
            <Link
              to="/category/women"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 ${isActive('/category/women') ? 'text-[#580c22] font-bold' : 'text-neutral-700'}`}
            >
              Women's Ethnic &amp; Dresses
            </Link>
            <Link
              to="/category/kids"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 ${isActive('/category/kids') ? 'text-[#580c22] font-bold' : 'text-neutral-700'}`}
            >
              Kids' Collection
            </Link>
            <Link
              to="/fabric-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-neutral-700"
            >
              Fabrics &amp; Yardage Guide
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-neutral-700"
            >
              About DJ Style Hub
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-neutral-700"
            >
              Contact &amp; Help
            </Link>
          </nav>

          <div className="pt-3 border-t border-neutral-100">
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#580c22] hover:bg-[#450719] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct Orders</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

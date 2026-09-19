import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, MessageCircle, Heart } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Minimal Top Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="tracking-wide">
            Dress Materials for Women &amp; Kids • Verified Yardage • Delivery Across India
          </p>
          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-emerald-400 font-medium transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp: {STORE_INFO.displayPhone}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Clean Logo */}
          <Link 
            to="/"
            className="cursor-pointer text-center md:text-left flex-1 md:flex-initial"
            title="DJStyleHub - Trendy Fashion & Dress Materials"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 block">
              DJ STYLE HUB
            </span>
            <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-medium block">
              Dress Materials Studio
            </span>
          </Link>

          {/* Semantic Desktop Nav Links with crawlable URLs */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <Link
              to="/"
              className={`transition-colors ${isActive('/') ? 'text-neutral-900 font-bold' : 'hover:text-neutral-900'}`}
              title="Shop All Dress Materials"
            >
              All Materials
            </Link>
            <Link
              to="/category/women"
              className={`transition-colors ${isActive('/category/women') ? 'text-neutral-900 font-bold' : 'hover:text-neutral-900'}`}
              title="Shop Women's Dress Materials & Suits"
            >
              Women's Collection
            </Link>
            <Link
              to="/category/kids"
              className={`transition-colors ${isActive('/category/kids') ? 'text-neutral-900 font-bold' : 'hover:text-neutral-900'}`}
              title="Shop Kids' Ethnic & Dress Materials"
            >
              Kids' Collection
            </Link>
            <Link
              to="/fabric-guide"
              className={`transition-colors ${isActive('/fabric-guide') ? 'text-neutral-900 font-bold' : 'hover:text-neutral-900'}`}
              title="Unstitched Fabric Yardage & Care Guide"
            >
              Yardage Guide
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${isActive('/contact') ? 'text-neutral-900 font-bold' : 'hover:text-neutral-900'}`}
              title="Contact DJStyleHub Support"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative hidden sm:block w-44 lg:w-56">
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search dress materials"
                className="w-full bg-neutral-100 border border-neutral-200 rounded-full py-1.5 pl-8 pr-6 text-xs focus:outline-none focus:bg-white focus:border-neutral-400"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-2 text-neutral-400 hover:text-neutral-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition relative"
              aria-label="View saved wishlist items"
              title="Saved items"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-neutral-900 rounded-full" />
              )}
            </button>

            {/* WhatsApp Quick Link */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub,%20I'm%20interested%20in%20dress%20materials`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold transition"
              title="Chat with DJStyleHub on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Bag Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-medium transition"
              aria-label={`Shopping bag containing ${cartCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag</span>
              {cartCount > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search input */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cotton, chanderi, kids fabrics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search dress materials mobile"
              className="w-full bg-neutral-100 border border-neutral-200 rounded-full py-2 pl-8 pr-6 text-xs focus:outline-none focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-5 space-y-4">
          <nav aria-label="Mobile Navigation" className="space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left py-2 text-sm font-semibold ${isActive('/') ? 'text-neutral-900' : 'text-neutral-600'}`}
            >
              All Dress Materials
            </Link>
            <Link
              to="/category/women"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left py-2 text-sm font-semibold ${isActive('/category/women') ? 'text-neutral-900' : 'text-neutral-600'}`}
            >
              Women's Collection
            </Link>
            <Link
              to="/category/kids"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left py-2 text-sm font-semibold ${isActive('/category/kids') ? 'text-neutral-900' : 'text-neutral-600'}`}
            >
              Kids' Collection
            </Link>
            <Link
              to="/fabric-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-sm text-neutral-600"
            >
              Yardage &amp; Fabric Guide
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-sm text-neutral-600"
            >
              Store &amp; Contact
            </Link>
          </nav>

          <div className="pt-3 border-t border-neutral-100">
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

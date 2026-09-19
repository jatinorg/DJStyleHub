import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, SlidersHorizontal, Scissors, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { CircularCategories } from '../components/CircularCategories';
import { PromoBanners } from '../components/PromoBanners';
import { TrustBar } from '../components/TrustBar';
import { MiddleBanner } from '../components/MiddleBanner';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, STORE_INFO } from '../data/products';
import { Product } from '../types';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  wishlist,
  onToggleWishlist,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const availableFabrics = useMemo(() => {
    return ['all', ...Array.from(new Set(PRODUCTS.map(p => p.fabric)))];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedFabric !== 'all' && product.fabric !== selectedFabric) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesFabric = product.fabric.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesColor = product.color.toLowerCase().includes(q);
        const matchesSubcategory = product.subcategory.toLowerCase().includes(q);
        if (!matchesName && !matchesFabric && !matchesDesc && !matchesColor && !matchesSubcategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedFabric, searchQuery, sortBy]);

  // Global SEO Schema: Organization & WebSite (Strictly without physical shop address)
  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'DJStyleHub',
      url: 'https://djstylehub.com/',
      logo: 'https://djstylehub.com/images/dj-logo-mark.jpg',
      description: 'Exclusive online store for premium ethnic wear, sarees, unstitched dress materials, and fabrics across India.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: STORE_INFO.displayPhone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi']
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'DJStyleHub',
      url: 'https://djstylehub.com/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://djstylehub.com/?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Global & Dynamic SEO */}
      <SEO
        title="DJStyleHub – Trendy Fashion & Dresses Online | Wear Your Story"
        description="Shop trendy sarees, unstitched dress materials, kurtis, and men's wear online at DJStyleHub. Wear Your Story with handcrafted styles and instant WhatsApp ordering."
        canonicalUrl="https://djstylehub.com/"
        ogType="website"
        jsonLd={homeSchema}
      />

      {/* 2. Hero Banner: 'Wear Your Story' with Cursive Accent & Model */}
      <Hero />

      {/* 3. Circular Category Avatars: 8 items */}
      <CircularCategories />

      {/* 4. Three Promo Cards: Elegant Sarees, Premium Fabrics, Stylish Men's Wear */}
      <PromoBanners />

      {/* 5. Best Sellers Section */}
      <section id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Customer Favorites, Handpicked for You
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Filter and Sort options if searching or filtering */}
            <div className="flex items-center gap-2 text-xs">
              <label htmlFor="home-sort" className="text-neutral-500">Sort by:</label>
              <select
                id="home-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#580c22]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <Link
              to="/category/women"
              className="text-xs sm:text-sm font-semibold text-[#580c22] hover:text-[#450719] inline-flex items-center gap-1 group whitespace-nowrap"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Fabric quick filter bar */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-neutral-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter:
            </span>
            {availableFabrics.slice(0, 7).map((fab) => (
              <button
                key={fab}
                onClick={() => setSelectedFabric(fab)}
                className={`px-2.5 py-1 rounded text-xs transition ${
                  selectedFabric === fab
                    ? 'bg-[#580c22] text-white'
                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {fab === 'all' ? 'All Collections' : fab}
              </button>
            ))}
          </div>

          {(selectedFabric !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedFabric('all');
                onSearchChange('');
              }}
              className="text-[#580c22] hover:underline flex items-center gap-1 text-xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Search feedback notice */}
        {searchQuery && (
          <div className="mb-4 text-xs text-neutral-600 flex justify-between items-center bg-[#faf4f0] p-2.5 rounded-lg border border-neutral-200">
            <span>Showing results for: <strong>"{searchQuery}"</strong></span>
            <button onClick={() => onSearchChange('')} className="text-[#580c22] underline font-medium">
              Clear
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 rounded-xl border border-neutral-200 p-6 space-y-3 my-4">
            <Scissors className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="font-serif font-bold text-neutral-900">No styles match your filter</h3>
            <button
              onClick={() => {
                setSelectedFabric('all');
                onSearchChange('');
              }}
              className="px-4 py-2 bg-[#580c22] text-white text-xs rounded-lg font-medium shadow-xs"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isWishlisted={wishlist.some((p) => p.id === product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </section>

      {/* 6. Four Trust Badges: Free Shipping, Secure Payments, Easy Returns, Customer Support */}
      <TrustBar />

      {/* 7. Middle Banner: 'Fashion for Every You' + Cursive Accent */}
      <MiddleBanner />
    </div>
  );
};

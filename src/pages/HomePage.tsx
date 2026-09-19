import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, SlidersHorizontal, Scissors } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { FabricGuide } from '../components/FabricGuide';
import { ContactSection } from '../components/ContactSection';
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
        if (!matchesName && !matchesFabric && !matchesDesc && !matchesColor) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedFabric, searchQuery, sortBy]);

  // Global SEO Schema: Organization & WebSite
  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'DJStyleHub',
      url: 'https://djstylehub.com/',
      logo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
      description: 'Exclusive online store for premium unstitched dress materials for women and kids across India.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-98765-43210',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi']
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: STORE_INFO.address,
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560001',
        addressCountry: 'IN'
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
    <div>
      {/* 1. Global & Dynamic SEO */}
      <SEO
        title="DJStyleHub – Trendy Fashion & Dresses Online"
        description="Shop trendy dresses and fashionable clothing online at DJStyleHub. Discover stylish collections at affordable prices with delivery across India."
        canonicalUrl="https://djstylehub.com/"
        ogType="website"
        jsonLd={homeSchema}
      />

      {/* 2. Minimalist Hero */}
      <Hero currentCategory="all" />

      {/* 3. Main Catalog Section */}
      <main id="catalog" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-neutral-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white whitespace-nowrap"
              title="All Collections"
            >
              All Materials ({PRODUCTS.length})
            </Link>
            <Link
              to="/category/women"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 whitespace-nowrap transition"
              title="Women's Dress Materials"
            >
              Women's Materials ({PRODUCTS.filter(p => p.category === 'women').length})
            </Link>
            <Link
              to="/category/kids"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 whitespace-nowrap transition"
              title="Kids' Dress Materials"
            >
              Kids' Materials ({PRODUCTS.filter(p => p.category === 'kids').length})
            </Link>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <label htmlFor="sort-select" className="text-neutral-500">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Fabric Chips */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-neutral-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Fabric:
            </span>
            {availableFabrics.map((fab) => (
              <button
                key={fab}
                onClick={() => setSelectedFabric(fab)}
                className={`px-2.5 py-1 rounded text-xs transition ${
                  selectedFabric === fab
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {fab === 'all' ? 'All' : fab}
              </button>
            ))}
          </div>

          {(selectedFabric !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedFabric('all');
                onSearchChange('');
              }}
              className="text-neutral-500 hover:text-neutral-900 flex items-center gap-1 text-xs underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Search status */}
        {searchQuery && (
          <div className="mb-4 text-xs text-neutral-600 flex justify-between items-center bg-white p-2.5 rounded-lg border border-neutral-200">
            <span>Showing results for search: <strong>"{searchQuery}"</strong></span>
            <button onClick={() => onSearchChange('')} className="text-neutral-500 underline">Clear</button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-neutral-200 p-6 space-y-3 my-6">
            <Scissors className="w-8 h-8 text-neutral-400 mx-auto" />
            <h2 className="font-serif font-bold text-neutral-900">No dress materials match your filter</h2>
            <button
              onClick={() => {
                setSelectedFabric('all');
                onSearchChange('');
              }}
              className="px-4 py-2 bg-neutral-900 text-white text-xs rounded-lg"
            >
              Show All Materials
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-2">
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
      </main>

      {/* Tailoring & Fabric Guide */}
      <FabricGuide />

      {/* Contact & Studio Inquiries */}
      <ContactSection />
    </div>
  );
};

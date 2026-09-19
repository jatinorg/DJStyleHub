import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { RotateCcw, SlidersHorizontal, Scissors } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface CategoryPageProps {
  onAddToCart: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  overrideCategory?: 'women' | 'kids';
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  onAddToCart,
  wishlist,
  onToggleWishlist,
  overrideCategory,
}) => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const activeCategory = overrideCategory || (categorySlug?.toLowerCase() === 'kids' ? 'kids' : categorySlug?.toLowerCase() === 'women' ? 'women' : null);

  if (!activeCategory) {
    return <Navigate to="/" replace />;
  }

  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const availableFabrics = useMemo(() => {
    return ['all', ...Array.from(new Set(categoryProducts.map((p) => p.fabric)))];
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter((product) => {
        if (selectedFabric !== 'all' && product.fabric !== selectedFabric) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [categoryProducts, selectedFabric, sortBy]);

  const isWomen = activeCategory === 'women';
  const pageTitle = isWomen
    ? "Women's Dresses Online | DJStyleHub"
    : "Kids' Clothing & Dress Materials Online | DJStyleHub";
  const pageDescription = isWomen
    ? "Shop premium unstitched dress materials for women at DJStyleHub. Pure Jaipuri mulmul cotton, Chanderi silks, Chikankari georgette, and festive suits with delivery across India."
    : "Discover gentle unstitched dress materials for kids at DJStyleHub. Itch-free festive kurta fabrics, soft cottons, and lehenga materials for boys and girls.";
  const canonicalUrl = `https://djstylehub.com/category/${activeCategory}`;

  // Breadcrumbs
  const breadcrumbs = [
    {
      name: isWomen ? "Women's Dresses" : "Kids' Clothing",
      url: `/category/${activeCategory}`
    }
  ];

  // Schema: BreadcrumbList + ItemList
  const categorySchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://djstylehub.com/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isWomen ? "Women's Dresses" : "Kids' Clothing",
          item: canonicalUrl
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: pageTitle,
      description: pageDescription,
      numberOfItems: categoryProducts.length,
      itemListElement: categoryProducts.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://djstylehub.com/product/${product.slug}`,
        name: product.name
      }))
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
      {/* Dynamic SEO */}
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        ogType="website"
        jsonLd={categorySchema}
      />

      {/* Semantic Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Category Header with Single H1 */}
      <header className="py-6 border-b border-neutral-200">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
          {isWomen ? "Women's Unstitched Dress Materials" : "Kids' Ethnic Dress Materials"}
        </h1>
        <p className="text-sm text-neutral-600 max-w-3xl mt-2 leading-relaxed">
          {isWomen
            ? "Explore our curated collection of women's dress materials crafted from pure mulmul cottons, luxurious Chanderi silks, and embroidered georgettes. Every set comes with exact 2.50m top cuts for seamless custom tailoring."
            : "Handpicked festive fabrics and daily cotton sets designed specifically for children. Woven with itch-free inner linings, soft skin barriers, and AZO-free hypoallergenic dyes for ages 2 to 12."}
        </p>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 mt-4">
          <Link
            to="/"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition"
          >
            All Materials ({PRODUCTS.length})
          </Link>
          <Link
            to="/category/women"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              isWomen
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Women's Collection ({PRODUCTS.filter(p => p.category === 'women').length})
          </Link>
          <Link
            to="/category/kids"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              !isWomen
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Kids' Collection ({PRODUCTS.filter(p => p.category === 'kids').length})
          </Link>
        </div>
      </header>

      {/* Filter and Sort Toolbar */}
      <section aria-label="Filters and Sorting" className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-neutral-100">
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
              {fab === 'all' ? 'All Fabrics' : fab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {selectedFabric !== 'all' && (
            <button
              onClick={() => setSelectedFabric('all')}
              className="text-neutral-500 hover:text-neutral-900 flex items-center gap-1 text-xs underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <label htmlFor="cat-sort" className="text-neutral-500">Sort:</label>
            <select
              id="cat-sort"
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
      </section>

      {/* Product Grid */}
      <main className="py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-neutral-200 p-6 space-y-3 my-6">
            <Scissors className="w-8 h-8 text-neutral-400 mx-auto" />
            <h2 className="font-serif font-bold text-neutral-900">No dress materials found for this filter</h2>
            <button
              onClick={() => setSelectedFabric('all')}
              className="px-4 py-2 bg-neutral-900 text-white text-xs rounded-lg"
            >
              Show All {isWomen ? "Women's" : "Kids'"} Materials
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
    </div>
  );
};

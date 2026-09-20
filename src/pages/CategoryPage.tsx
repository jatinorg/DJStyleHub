import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { RotateCcw, SlidersHorizontal, Scissors } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';

interface CategoryPageProps {
  onAddToCart: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  overrideCategory?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  onAddToCart,
  wishlist,
  onToggleWishlist,
  overrideCategory,
}) => {
  const { products } = useProducts();
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const activeCategory = overrideCategory || categorySlug?.toLowerCase() || 'all';

  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categoryProducts = useMemo(() => {
    const liveProducts = products.filter((p) => p.published !== false && p.name.trim() !== '' && p.price > 0);
    if (!activeCategory || activeCategory === 'all') return liveProducts;
    const target = activeCategory.toLowerCase();
    return liveProducts.filter((p) => {
      const cat = p.category.toLowerCase();
      const sub = p.subcategory.toLowerCase();
      if (target === 'sarees' || target === 'saree') return cat === 'sarees' || cat === 'women' || sub.includes('saree');
      if (target === 'kurti' || target === 'kurtis' || target === 'kurti-sets') return sub.includes('kurti') || sub.includes('suit');
      if (target === 'fabrics' || target === 'fabric') return cat === 'fabrics' || sub.includes('fabric');
      if (target === 'nightwear' || target === 'nighties') return cat === 'nightwear' || sub.includes('night') || sub.includes('kaftan');
      if (target === 'kids') return cat === 'kids' || sub.includes('kid');
      if (target === 'accessories') return cat === 'accessories' || sub.includes('accessori') || sub.includes('jhumka');
      if (target === 'home-living' || target === 'home') return cat === 'home-living' || sub.includes('home');
      return cat === target || sub.includes(target);
    });
  }, [products, activeCategory]);

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

  const isWomen = activeCategory === 'women' || activeCategory === 'sarees' || activeCategory === 'kurti';
  const pageTitle = `${activeCategory.toUpperCase()} Collection Online | DJStyleHub`;
  const pageDescription = `Shop premium ${activeCategory} ethnic collections and dress materials online at DJStyleHub with pan-India delivery.`;
  const canonicalUrl = `https://djstylehub.com/category/${activeCategory}`;

  // Breadcrumbs
  const breadcrumbs = [
    {
      name: `${activeCategory.charAt(0).toUpperCase()}${activeCategory.slice(1)}`,
      url: `/category/${activeCategory}`
    }
  ];

  // Global SEO Schema
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
          name: activeCategory.toUpperCase(),
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
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 capitalize">
          {activeCategory} Collection
        </h1>
        <p className="text-sm text-neutral-600 max-w-3xl mt-2 leading-relaxed">
          Explore our handpicked selection of {activeCategory} dress materials and ethnic wear crafted with premium fabrics and authentic weaves.
        </p>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Link
            to="/category/all"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition"
          >
            All Materials ({products.length})
          </Link>
          <Link
            to="/category/sarees"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeCategory === 'sarees'
                ? 'bg-[#580c22] text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Sarees ({products.filter(p => p.subcategory.toLowerCase().includes('saree') || p.category === 'sarees').length})
          </Link>
          <Link
            to="/category/kurti"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeCategory === 'kurti'
                ? 'bg-[#580c22] text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Kurti &amp; Sets ({products.filter(p => p.subcategory.toLowerCase().includes('kurti') || p.subcategory.toLowerCase().includes('suit')).length})
          </Link>
          <Link
            to="/category/kids"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeCategory === 'kids'
                ? 'bg-[#580c22] text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Kids' Collection ({products.filter(p => p.category === 'kids' || p.subcategory.toLowerCase().includes('kid')).length})
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
              className="px-4 py-2 bg-[#580c22] text-white text-xs rounded-lg"
            >
              Show All Materials
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

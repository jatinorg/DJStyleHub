import React, { useState, useEffect, useMemo } from 'react';
import { 
  RotateCcw, 
  MessageCircle, 
  SlidersHorizontal,
  Scissors
} from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { FabricGuide } from './components/FabricGuide';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { PRODUCTS, STORE_INFO } from './data/products';
import { Product, CartItem, CategoryType } from './types';

export function App() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('djstyle_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('djstyle_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Sync cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('djstyle_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('djstyle_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Distinct fabrics for filter buttons
  const availableFabrics = useMemo(() => {
    const relevantProducts = activeCategory === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === activeCategory);
    return ['all', ...Array.from(new Set(relevantProducts.map(p => p.fabric)))];
  }, [activeCategory]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'all' && product.fabric !== selectedFabric) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesFabric = product.fabric.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesSubcategory = product.subcategory.toLowerCase().includes(q);
        const matchesColor = product.color.toLowerCase().includes(q);
        if (!matchesName && !matchesFabric && !matchesDesc && !matchesSubcategory && !matchesColor) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, selectedFabric, searchQuery, sortBy]);

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Quick view action
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Navigation handlers
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFabricGuide = () => {
    const el = document.getElementById('fabric-guide');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedFabric('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6]">
      {/* Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedFabric('all');
          scrollToCatalog();
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) scrollToCatalog();
        }}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigateToFabricGuide={scrollToFabricGuide}
        onNavigateToContact={scrollToContact}
      />

      {/* Clean Hero */}
      <Hero
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedFabric('all');
          scrollToCatalog();
        }}
      />

      {/* Main Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full scroll-mt-20">
        
        {/* Simple Tabs Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-neutral-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedFabric('all');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              All Collections ({PRODUCTS.length})
            </button>
            <button
              onClick={() => {
                setActiveCategory('women');
                setSelectedFabric('all');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                activeCategory === 'women'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Women's Materials ({PRODUCTS.filter(p => p.category === 'women').length})
            </button>
            <button
              onClick={() => {
                setActiveCategory('kids');
                setSelectedFabric('all');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                activeCategory === 'kids'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Kids' Materials ({PRODUCTS.filter(p => p.category === 'kids').length})
            </button>
          </div>

          {/* Simple Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-neutral-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort products"
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
            <span className="text-neutral-400 mr-1">Fabric:</span>
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

          {(selectedFabric !== 'all' || searchQuery || activeCategory !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-neutral-500 hover:text-neutral-900 flex items-center gap-1 text-xs underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Search status */}
        {searchQuery && (
          <div className="mb-4 text-xs text-neutral-600 flex justify-between items-center bg-white p-2.5 rounded-lg border border-neutral-200">
            <span>Results for: <strong>"{searchQuery}"</strong></span>
            <button onClick={() => setSearchQuery('')} className="text-neutral-500 underline">Clear</button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-neutral-200 p-6 space-y-3 my-6">
            <Scissors className="w-8 h-8 text-neutral-400 mx-auto" />
            <h4 className="font-serif font-bold text-neutral-900">No materials match your selection</h4>
            <button
              onClick={resetFilters}
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
                onQuickView={handleQuickView}
                onAddToCart={handleAddToCart}
                isWishlisted={wishlist.some((p) => p.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

      </main>

      {/* Fabric Guide */}
      <FabricGuide />

      {/* Contact & Studio */}
      <ContactSection />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedFabric('all');
          scrollToCatalog();
        }}
        onNavigateToFabricGuide={scrollToFabricGuide}
        onNavigateToContact={scrollToContact}
      />

      {/* Floating WhatsApp Button */}
      <aside aria-label="WhatsApp Order Assistance" className="fixed bottom-5 right-5 z-40">
        <a
          href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub,%20I'd%20like%20to%20order%20dress%20materials`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full shadow-lg transition transform hover:scale-105"
          title="Direct WhatsApp Order"
        >
          <MessageCircle className="w-4 h-4 fill-white/20" />
          <span className="text-xs font-semibold hidden sm:inline">WhatsApp Order</span>
        </a>
      </aside>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}

export default App;

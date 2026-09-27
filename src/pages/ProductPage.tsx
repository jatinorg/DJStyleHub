import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  Scissors, 
  Check, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Share2,
  Video,
  Play
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { STORE_INFO } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';

interface ProductPageProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const { getProductBySlugOrId, products } = useProducts();
  const product = slug ? getProductBySlugOrId(slug) : undefined;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState<boolean>(!!product?.videoUrl);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  React.useEffect(() => {
    if (product?.videoUrl) {
      setShowVideo(true);
    }
  }, [product?.id, product?.videoUrl]);

  const handleShareProduct = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!product) return;
    const shareUrl = `${window.location.origin}/product/${product.slug || product.id}`;
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on DJStyleHub!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.warn('Clipboard write error:', err);
      }
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!product || !product.images || product.images.length <= 1) return;
    setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!product || !product.images || product.images.length <= 1) return;
    setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    if (diffX > 40) {
      handleNextImage();
    } else if (diffX < -40) {
      handlePrevImage();
    }
    setTouchStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (touchStartX === null) return;
    const diffX = touchStartX - e.clientX;
    if (diffX > 40) {
      handleNextImage();
    } else if (diffX < -40) {
      handlePrevImage();
    }
    setTouchStartX(null);
  };

  // Enable Keyboard Arrow Left / Right key navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, selectedImageIndex]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.published !== false && p.name.trim() !== '' && p.price > 0 && p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
      .slice(0, 4);
  }, [products, product]);

  if (!product || product.published === false || !product.name.trim() || product.price <= 0) {
    return <Navigate to="/404" replace />;
  }

  const isWishlisted = wishlist.some((p) => p.id === product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const pageTitle = `${product.name} | Buy Online | DJStyleHub`;
  const pageDescription = `Buy ${product.name} unstitched dress material online at DJStyleHub for ₹${product.price}. 100% genuine ${product.fabric} in ${product.color}. Exact yardage: Top ${product.topCut.split(' ')[0]}m, Bottom ${product.bottomCut.split(' ')[0]}m, Dupatta ${product.dupattaCut.split(' ')[0]}m. Pan-India delivery.`;
  const canonicalUrl = `https://djstylehub.com/product/${product.slug}`;

  // WhatsApp Order URL
  const getWhatsAppMessageUrl = () => {
    const text = `Hi DJ Style Hub!
I would like to order:
*${product.name}*
SKU: ${product.sku}
Category: ${product.category === 'women' ? "Women's Material" : "Girls' Material"}
Fabric: ${product.fabric}
Color: ${product.color}
Quantity: ${quantity}
Price: ₹${product.price.toLocaleString('en-IN')}
Total: ₹${(product.price * quantity).toLocaleString('en-IN')}
URL: ${canonicalUrl}

Please confirm availability and share payment/delivery options!`;
    return `https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Breadcrumbs
  const categoryName = product.category === 'women' ? "Women's Dresses" : "Girls' Clothing";
  const categoryUrl = `/category/${product.category}`;
  const breadcrumbs = [
    { name: categoryName, url: categoryUrl },
    { name: product.name, url: `/product/${product.slug}` }
  ];

  // Schema: Product + Offer + AggregateRating + BreadcrumbList
  const productSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images,
      description: product.description,
      sku: product.sku,
      mpn: product.sku,
      brand: {
        '@type': 'Brand',
        name: 'DJStyleHub'
      },
      category: categoryName,
      color: product.color,
      material: product.fabric,
      offers: {
        '@type': 'Offer',
        url: canonicalUrl,
        priceCurrency: 'INR',
        price: product.price,
        priceValidUntil: '2027-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'DJStyleHub',
          url: 'https://djstylehub.com/'
        }
      },
      aggregateRating: product.reviewCount > 0 ? {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
        bestRating: 5,
        worstRating: 1
      } : undefined
    },
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
          name: categoryName,
          item: `https://djstylehub.com${categoryUrl}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.name,
          item: canonicalUrl
        }
      ]
    }
  ];

  const primaryImageAlt = `${product.name} - ${product.fabric} dress material in ${product.color}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
      {/* Dynamic SEO & Schema */}
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        ogType="product"
        ogImage={product.images[0]}
        jsonLd={productSchema}
      />

      {/* Semantic Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Back Link */}
      <div className="pb-4">
        <Link 
          to={categoryUrl} 
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {categoryName}</span>
        </Link>
      </div>

      {/* Product Details Section */}
      <article className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-2xl border border-neutral-200 p-5 sm:p-8">
        
        {/* Gallery Column */}
        <div className="md:col-span-6 space-y-4">
          <div 
            className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 touch-pan-y cursor-grab active:cursor-grabbing select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {showVideo && product.videoUrl ? (
              <video
                src={product.videoUrl}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={primaryImageAlt}
                width={700}
                height={875}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-center transition-all duration-200 pointer-events-none"
              />
            )}

            {/* Previous & Next Navigation Arrows */}
            {!showVideo && product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-900 shadow-lg flex items-center justify-center transition border border-neutral-300 active:scale-95 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-900 shadow-lg flex items-center justify-center transition border border-neutral-300 active:scale-95 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Photo Counter Badge */}
            {!showVideo && product.images.length > 1 && (
              <div className="absolute bottom-3 right-3 z-10 bg-black/65 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-xs pointer-events-none">
                <span>{selectedImageIndex + 1} / {product.images.length}</span>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.videoUrl && (
                <span className="bg-purple-900 text-white text-[11px] font-bold uppercase px-2.5 py-1 rounded shadow-xs flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-amber-300" />
                  <span>Video Preview</span>
                </span>
              )}
              {product.badge && (
                <span className="bg-neutral-900 text-white text-[11px] font-bold uppercase px-2.5 py-1 rounded shadow-xs">
                  {product.badge}
                </span>
              )}
              <span className="bg-white/95 text-neutral-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs">
                {product.category === 'women' ? "Women's Collection" : "Girls' Collection"}
              </span>
            </div>

            {/* Share & Wishlist Buttons */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              <button
                onClick={handleShareProduct}
                className={`p-2 rounded-full shadow-md transition cursor-pointer ${
                  copied
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-white/90 text-neutral-600 hover:text-[#580c22]'
                }`}
                title={copied ? 'Link copied to clipboard!' : 'Share Product'}
                aria-label="Share product"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2 rounded-full shadow-md transition ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600'
                    : 'bg-white/90 text-neutral-600 hover:text-red-500'
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Swipe Indicator Dots on Mobile */}
          {!showVideo && product.images.length > 1 && (
            <div className="flex justify-center items-center gap-1.5 py-1">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    selectedImageIndex === idx ? 'w-6 bg-[#580c22]' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Thumbnails */}
          {(product.videoUrl || product.images.length > 1) && (
            <div className="flex gap-3 overflow-x-auto pb-1" aria-label="Product media thumbnails">
              {product.videoUrl && (
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition shrink-0 relative bg-purple-950 flex flex-col items-center justify-center text-white ${
                    showVideo
                      ? 'border-purple-600 ring-2 ring-purple-600/30'
                      : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                  title="Watch Product Video"
                >
                  <Video className="w-6 h-6 text-amber-300" />
                  <span className="text-[10px] font-bold mt-1 uppercase tracking-wider text-amber-200">Video</span>
                </button>
              )}

              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowVideo(false);
                    setSelectedImageIndex(idx);
                  }}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                    !showVideo && selectedImageIndex === idx
                      ? 'border-neutral-900 ring-2 ring-neutral-900/10'
                      : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View image thumbnail ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail view ${idx + 1}`}
                    width={80}
                    height={96}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="font-semibold text-neutral-700 uppercase tracking-wider">
                {product.subcategory} • {product.fabric}
              </span>
              <div className="flex items-center gap-1 font-semibold text-neutral-800" aria-label={`Rating ${product.rating} out of 5 stars`}>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-neutral-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product H1 */}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
              {product.name}
            </h1>

            {/* SKU, Color & Age Group */}
            <div className="flex items-center gap-4 text-xs text-neutral-500 flex-wrap">
              <span>SKU: <strong className="text-neutral-800">{product.sku}</strong></span>
              <span>•</span>
              <span>Color: <strong className="text-neutral-800">{product.color}</strong></span>
              {product.ageGroup && (
                <>
                  <span>•</span>
                  <span>Age / Size: <strong className="text-purple-900 font-bold">{product.ageGroup}</strong></span>
                </>
              )}
              <span>•</span>
              <span className="text-emerald-700 font-semibold">✓ In Stock</span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-3xl font-bold text-neutral-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-neutral-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Save {discountPercent}%
              </span>
              <span className="ml-auto text-[11px] text-neutral-500">Free Shipping above ₹1499</span>
            </div>

            {/* Exact Yardage Cuts Box */}
            <section aria-labelledby="yardage-heading" className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-neutral-900 uppercase tracking-wider">
                <Scissors className="w-4 h-4 text-neutral-700" />
                <h2 id="yardage-heading" className="text-xs font-bold">{product.specificationsTitle || 'Verified Cut Yardage Specifications'}</h2>
              </div>
              <div className="text-xs space-y-1.5 pt-1 text-neutral-700">
                {product.specifications && product.specifications.length > 0 ? (
                  product.specifications.map((spec, idx) => (
                    <div key={spec.id || idx} className={`flex justify-between ${idx < product.specifications!.length - 1 ? 'border-b border-neutral-200 pb-1' : ''}`}>
                      <span className="font-medium">{spec.label}:</span>
                      <span className="font-bold text-neutral-900">{spec.value || 'N/A'}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex justify-between border-b border-neutral-200 pb-1">
                      <span className="font-medium">Top / Kurta:</span>
                      <span className="font-bold text-neutral-900">{product.topCut}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-1">
                      <span className="font-medium">Bottom / Salwar:</span>
                      <span className="font-bold text-neutral-900">{product.bottomCut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Dupatta / Stole:</span>
                      <span className="font-bold text-neutral-900">{product.dupattaCut}</span>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Description */}
            <div className="space-y-2 text-xs text-neutral-600 leading-relaxed">
              <h2 className="font-serif text-sm font-bold text-neutral-900">Product Details &amp; Fabric Information</h2>
              <p>{product.description}</p>
            </div>

            {/* Highlights list */}
            <div className="space-y-1.5 pt-1 text-xs">
              <h3 className="font-semibold text-neutral-900">Key Features:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-neutral-600">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Buying & Ordering Actions */}
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-300 rounded-lg text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-neutral-100 font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 font-semibold text-neutral-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-neutral-100 font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-neutral-500">
                Total: <strong className="text-neutral-900 font-bold">₹{(product.price * quantity).toLocaleString('en-IN')}</strong>
              </span>
            </div>

            {/* Prominent WhatsApp Instant Order, Add to Bag & Share Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-98"
                title={`Order ${product.name} on WhatsApp`}
              >
                <MessageCircle className="w-4 h-4 fill-white/20 shrink-0" />
                <span>WhatsApp Order</span>
              </a>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                aria-label={`Add ${quantity} ${product.name} to bag`}
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>{added ? 'Added to Bag!' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={handleShareProduct}
                className="w-full py-3 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                title="Share this product"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <Share2 className="w-4 h-4 shrink-0" />}
                <span>{copied ? 'Link Copied!' : 'Share Product'}</span>
              </button>
            </div>

            {/* Assurance Strip */}
            <div className="pt-3 grid grid-cols-3 gap-2 text-center text-[10px] text-neutral-500 border-t border-neutral-100">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-neutral-700" />
                <span>100% Genuine Fabric</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-neutral-700" />
                <span>Pan-India Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-neutral-700" />
                <span>Easy 7-Day Exchange</span>
              </div>
            </div>

          </div>

        </div>

      </article>

      {/* Related Products / Internal Linking */}
      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex justify-between items-baseline mb-6">
            <div>
              <h2 id="related-heading" className="font-serif text-2xl font-bold text-neutral-900">
                You May Also Like
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                More {product.category === 'women' ? "women's dress materials" : "girls' materials"}
              </p>
            </div>
            <Link 
              to={categoryUrl} 
              className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 underline"
            >
              View All {categoryName}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onAddToCart={(p) => onAddToCart(p, 1)}
                isWishlisted={wishlist.some((p) => p.id === relProduct.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

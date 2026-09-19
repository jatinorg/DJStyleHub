import React, { useState } from 'react';
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
  ArrowLeft 
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { getProductBySlugOrId, getRelatedProducts, STORE_INFO } from '../data/products';
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
  const product = slug ? getProductBySlugOrId(slug) : undefined;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const relatedProducts = getRelatedProducts(product.id, 4);

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
Category: ${product.category === 'women' ? "Women's Material" : "Kids' Material"}
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
  const categoryName = product.category === 'women' ? "Women's Dresses" : "Kids' Clothing";
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
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={primaryImageAlt}
              width={700}
              height={875}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className="bg-neutral-900 text-white text-[11px] font-bold uppercase px-2.5 py-1 rounded shadow-xs">
                  {product.badge}
                </span>
              )}
              <span className="bg-white/95 text-neutral-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs">
                {product.category === 'women' ? "Women's Collection" : "Kids' Collection"}
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition ${
                isWishlisted
                  ? 'bg-red-50 text-red-600'
                  : 'bg-white/90 text-neutral-600 hover:text-red-500'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1" aria-label="Product image thumbnails">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                    selectedImageIndex === idx
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

            {/* SKU and Color */}
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <span>SKU: <strong className="text-neutral-800">{product.sku}</strong></span>
              <span>•</span>
              <span>Color: <strong className="text-neutral-800">{product.color}</strong></span>
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
                <h2 id="yardage-heading" className="text-xs font-bold">Verified Cut Yardage Specifications</h2>
              </div>
              <div className="text-xs space-y-1.5 pt-1 text-neutral-700">
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

            {/* Prominent WhatsApp Instant Order Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                title={`Order ${product.name} on WhatsApp`}
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Instant Order on WhatsApp</span>
              </a>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition"
                aria-label={`Add ${quantity} ${product.name} to bag`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? 'Added to Bag!' : 'Add to Bag'}</span>
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
                More {product.category === 'women' ? "women's dress materials" : "kids' materials"}
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

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const getWhatsAppLink = () => {
    const text = `Hi DJ Style Hub!
I would like to order:
*${product.name}* (SKU: ${product.sku})
Category: ${product.category}
Price: ₹${product.price.toLocaleString('en-IN')}
Color: ${product.color}

Please let me know payment and shipping details.`;
    return `https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  const productUrl = `/product/${product.slug}`;
  const imageAlt = `${product.name} - ${product.fabric} in ${product.color}`;

  return (
    <article className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      {/* Image Container with Wishlist on Top-Right */}
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
        <Link to={productUrl} className="block w-full h-full" title={product.name}>
          <img
            src={product.images[0]}
            alt={imageAlt}
            width={400}
            height={500}
            className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Button - Top Right exactly as in reference */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full shadow-xs transition z-10 ${
            isWishlisted
              ? 'bg-red-50 text-red-600'
              : 'bg-white/95 text-neutral-500 hover:text-red-500 hover:bg-white'
          }`}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Category Badge on Top-Left */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-xs text-neutral-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
            {product.subcategory}
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Title */}
          <h3 className="font-sans text-xs sm:text-[13px] font-medium text-neutral-900 line-clamp-1 hover:text-[#580c22] transition">
            <Link to={productUrl} title={product.name}>
              {product.name}
            </Link>
          </h3>

          {/* Pricing & Discount Badge - Exactly as in reference image */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-sm sm:text-base font-bold text-neutral-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-neutral-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="bg-[#580c22] text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
              {discountPercent}% OFF
            </span>
          </div>
        </div>

        {/* Action Buttons: Add to Cart + WhatsApp Order */}
        <div className="pt-2 border-t border-neutral-100 space-y-1.5">
          {/* Add to Cart Button - Matches Reference UI */}
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-2 bg-white hover:bg-[#580c22] text-[#580c22] hover:text-white border border-[#580c22] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-98 shadow-2xs"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          {/* Instant WhatsApp Order Button */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 transition active:scale-98"
            title={`Instant order ${product.name} on WhatsApp`}
          >
            <MessageCircle className="w-3 h-3 text-emerald-600 fill-emerald-600/20" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
};

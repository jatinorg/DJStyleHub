import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const getWhatsAppLink = () => {
    const text = `Hi DJ Style Hub!
I would like to order:
*${product.name}* (SKU: ${product.sku})
Category: ${product.category === 'women' ? "Women's" : "Kids'"}
Fabric: ${product.fabric}
Price: ₹${product.price.toLocaleString('en-IN')}
Color: ${product.color}

Please let me know payment and shipping details.`;
    return `https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  const productUrl = `/product/${product.slug}`;
  const imageAlt = `${product.name} - ${product.fabric} dress material in ${product.color}`;

  return (
    <article className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      {/* Image Area with crawlable link */}
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
        <Link to={productUrl} className="block w-full h-full" title={`View details for ${product.name}`}>
          <img
            src={product.images[0]}
            alt={imageAlt}
            width={450}
            height={560}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-xs text-neutral-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
            {product.category === 'women' ? "Women" : "Kids"}
          </span>
          <span className="bg-neutral-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-xs">
            {product.fabric}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full shadow-xs transition ${
            isWishlisted
              ? 'bg-red-50 text-red-600'
              : 'bg-white/90 text-neutral-500 hover:text-red-500'
          }`}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title as crawlable link */}
          <h2 className="font-serif font-bold text-sm text-neutral-900 line-clamp-1 hover:text-neutral-700">
            <Link to={productUrl} title={product.name}>
              {product.name}
            </Link>
          </h2>

          {/* Color & Yardage */}
          <p className="text-xs text-neutral-500 mt-1">
            Color: <span className="font-medium text-neutral-700">{product.color}</span>
          </p>

          <p className="text-[11px] text-neutral-500 bg-neutral-50 border border-neutral-100 rounded px-2 py-1 mt-2">
            Top: <strong>{product.topCut.split(' ')[0]}m</strong> • Bottom: <strong>{product.bottomCut.split(' ')[0]}m</strong> • Dup: <strong>{product.dupattaCut.split(' ')[0]}m</strong>
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-2 border-t border-neutral-100 space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-neutral-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-1 text-neutral-500 text-[11px]" aria-label={`Rated ${product.rating} stars out of 5`}>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Action Buttons: WhatsApp Order (Prominent) + Add to Bag */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {/* Instant WhatsApp Order */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-4 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-98 shadow-xs"
              title={`Order ${product.name} instantly on WhatsApp`}
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Add to Bag Icon Button */}
            <button
              onClick={() => onAddToCart(product)}
              className="col-span-1 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg flex items-center justify-center transition active:scale-95"
              aria-label={`Add ${product.name} to shopping bag`}
              title="Add to Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

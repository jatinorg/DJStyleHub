import React, { useState } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Star, Scissors, Check, Shield } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const getWhatsAppMessageUrl = () => {
    const text = `Hi DJ Style Hub!
I would like to order:
*${product.name}*
SKU: ${product.sku}
Category: ${product.category === 'women' ? "Women's Material" : "Kids' Material"}
Fabric: ${product.fabric}
Color: ${product.color}
Quantity: ${quantity}
Total: ₹${(product.price * quantity).toLocaleString('en-IN')}

Please share delivery timeframe and UPI / payment details.`;
    return `https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-xl relative border border-neutral-200 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 p-1.5 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Column */}
        <div className="md:w-1/2 p-5 bg-neutral-50 flex flex-col justify-between">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-neutral-200">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border ${
                    selectedImageIndex === idx ? 'border-neutral-900' : 'border-neutral-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>{product.category === 'women' ? "Women's Collection" : "Kids' Collection"} • {product.fabric}</span>
            <span className="flex items-center gap-1 font-semibold text-neutral-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-neutral-900">{product.name}</h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Color: <strong className="text-neutral-700">{product.color}</strong>
              {product.ageGroup && <> | Age/Size: <strong className="text-purple-800">{product.ageGroup}</strong></>}
              | SKU: {product.sku}
            </p>
          </div>

          <div className="flex items-baseline gap-2 py-2 border-y border-neutral-100">
            <span className="text-2xl font-bold text-neutral-900">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          </div>

          {/* Cuts Box */}
          <div className="bg-neutral-50 rounded-xl p-3 text-xs space-y-1.5 border border-neutral-200">
            <div className="flex items-center gap-1.5 font-bold text-neutral-900 mb-1">
              <Scissors className="w-3.5 h-3.5" />
              <span>{product.specificationsTitle || 'Exact Cut Yardage:'}</span>
            </div>
            {product.specifications && product.specifications.length > 0 ? (
              product.specifications.map((spec, idx) => (
                <div key={spec.id || idx} className="flex justify-between text-neutral-600">
                  <span>{spec.label}:</span>
                  <span className="font-semibold text-neutral-800">{spec.value || 'N/A'}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between text-neutral-600">
                  <span>Top / Kurta:</span>
                  <span className="font-semibold text-neutral-800">{product.topCut}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Bottom / Salwar:</span>
                  <span className="font-semibold text-neutral-800">{product.bottomCut}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Dupatta / Stole:</span>
                  <span className="font-semibold text-neutral-800">{product.dupattaCut}</span>
                </div>
              </>
            )}
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            {product.description}
          </p>

          {/* Actions */}
          <div className="pt-2 space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-300 rounded-lg text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1.5 hover:bg-neutral-100 font-bold"
                >
                  -
                </button>
                <span className="px-3 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1.5 hover:bg-neutral-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2 border rounded-lg transition ${
                  isWishlisted ? 'border-red-400 text-red-500 bg-red-50' : 'border-neutral-200 text-neutral-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Prominent Instant WhatsApp Checkout / Order */}
            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant Order on WhatsApp • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
            </a>

            {/* Add to Bag */}
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{added ? 'Added to Bag!' : 'Add to Bag'}</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-400">
            <span>✓ 100% Genuine Fabric</span>
            <span>✓ Verified Meterage</span>
            <span>✓ Safe Dispatch</span>
          </div>

        </div>
      </div>
    </div>
  );
};

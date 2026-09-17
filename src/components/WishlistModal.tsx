import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-neutral-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-600 fill-brand-600" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              Saved Wishlist ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 space-y-2">
              <Heart className="w-10 h-10 text-neutral-300 mx-auto" />
              <p className="font-serif text-base font-semibold text-neutral-700">No items saved yet</p>
              <p className="text-xs text-neutral-400">
                Click the heart icon on any dress material to bookmark your favorites.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-neutral-900 truncate">{product.name}</h4>
                  <p className="text-[11px] text-neutral-500">{product.fabric} • {product.category === 'women' ? "Women" : "Kids"}</p>
                  <p className="text-xs font-bold text-neutral-900 mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFromWishlist(product);
                    }}
                    className="p-2 bg-neutral-900 hover:bg-brand-700 text-white rounded-xl text-xs flex items-center gap-1 transition"
                    title="Move to Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="pt-3 border-t border-neutral-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-brand-700 transition"
            >
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

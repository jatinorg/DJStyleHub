import React, { useState } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Star, Scissors, Check, Shield, ChevronLeft, ChevronRight, Share2, Video } from 'lucide-react';
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

  if (!isOpen || !product) return null;

  const handleShareProduct = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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

  // Enable Keyboard Arrow Left / Right key navigation when modal is open
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, product, selectedImageIndex]);

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
Category: ${product.category === 'women' ? "Women's Material" : "Girls' Material"}
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
        {/* Top Header Actions: Share + Close */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          <button
            onClick={handleShareProduct}
            className={`p-1.5 rounded-full transition shadow-xs cursor-pointer ${
              copied ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
            }`}
            title={copied ? 'Link copied to clipboard!' : 'Share Product'}
            aria-label="Share product"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 p-1.5 rounded-full transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Column */}
        <div className="md:w-1/2 p-5 bg-neutral-50 flex flex-col justify-between">
          <div 
            className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-200 cursor-grab active:cursor-grabbing select-none"
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
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-200 pointer-events-none"
              />
            )}

            {/* Previous & Next Navigation Arrows */}
            {!showVideo && product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-900 shadow-md flex items-center justify-center transition border border-neutral-300 active:scale-95 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-900 shadow-md flex items-center justify-center transition border border-neutral-300 active:scale-95 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Photo Counter Badge */}
            {!showVideo && product.images.length > 1 && (
              <div className="absolute bottom-2.5 right-2.5 z-10 bg-black/65 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-xs pointer-events-none">
                <span>{selectedImageIndex + 1} / {product.images.length}</span>
              </div>
            )}
          </div>

          {/* Swipe Indicator Dots on Mobile */}
          {!showVideo && product.images.length > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-2">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    selectedImageIndex === idx ? 'w-5 bg-[#580c22]' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {(product.videoUrl || product.images.length > 1) && (
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {product.videoUrl && (
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border shrink-0 transition bg-purple-950 flex flex-col items-center justify-center text-white ${
                    showVideo ? 'border-purple-600 ring-2 ring-purple-600/30 font-bold' : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                  title="Watch Video"
                >
                  <Video className="w-5 h-5 text-amber-300" />
                  <span className="text-[9px] font-bold uppercase mt-0.5 text-amber-200">Video</span>
                </button>
              )}

              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowVideo(false);
                    setSelectedImageIndex(idx);
                  }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border shrink-0 transition ${
                    !showVideo && selectedImageIndex === idx ? 'border-[#580c22] ring-2 ring-[#580c22]/20' : 'border-neutral-200 opacity-60 hover:opacity-100'
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
            <span>{product.category === 'women' ? "Women's Collection" : "Girls' Collection"} • {product.fabric}</span>
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

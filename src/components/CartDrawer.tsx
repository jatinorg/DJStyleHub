import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, Check, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 1499;
  const shippingCharge = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const discountAmount = Math.round((subtotal * couponDiscountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + shippingCharge);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'DJFIRST10') {
      setAppliedCoupon('DJFIRST10 (10% OFF)');
      setCouponDiscountPercent(10);
    } else if (code === 'FESTIVE15') {
      setAppliedCoupon('FESTIVE15 (15% OFF)');
      setCouponDiscountPercent(15);
    }
  };

  const generateWhatsAppOrderUrl = () => {
    if (items.length === 0) return '';
    
    let itemSummary = items.map((item, idx) => 
      `${idx + 1}. *${item.product.name}* (${item.product.sku})
   - Fabric: ${item.product.fabric} (${item.product.category === 'women' ? "Women" : "Kids"})
   - Qty: ${item.quantity} x ₹${item.product.price.toLocaleString('en-IN')} = ₹${(item.quantity * item.product.price).toLocaleString('en-IN')}`
    ).join('\n\n');

    let text = `🛍️ *ORDER REQUEST - DJ STYLE HUB*
-----------------------------------------
${itemSummary}

-----------------------------------------
*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}
${appliedCoupon ? `*Coupon Discount (${appliedCoupon}):* -₹${discountAmount.toLocaleString('en-IN')}\n` : ''}*Shipping:* ${shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}
*Total Amount:* ₹${total.toLocaleString('en-IN')}

${customerName ? `*Name:* ${customerName}\n*Phone:* ${customerPhone}\n*Address:* ${customerAddress}\n` : ''}Please send payment details (UPI/Bank) and delivery confirmation!`;

    return `https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  const handleOnlineOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlacedSuccess(true);
    setTimeout(() => {
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      {/* Drawer */}
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <h3 className="font-serif font-bold text-base text-neutral-900">
              Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Status */}
        <div className="bg-neutral-50 px-4 py-2 text-xs border-b border-neutral-100 flex justify-between items-center text-neutral-600">
          {subtotal >= freeShippingThreshold ? (
            <span className="text-emerald-700 font-semibold">✓ You have unlocked FREE Pan-India Shipping!</span>
          ) : (
            <span>Add ₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')} more for <strong>FREE Shipping</strong></span>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-neutral-400 space-y-2">
              <ShoppingBag className="w-10 h-10 stroke-1" />
              <p className="font-serif text-sm font-semibold text-neutral-700">Your bag is empty</p>
              <p className="text-xs text-neutral-500">Discover pure cotton &amp; festive unstitched dress materials.</p>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.product.id}
                className="flex gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-20 rounded-lg object-cover bg-neutral-200"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-neutral-900 line-clamp-1">{item.product.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-neutral-400 hover:text-red-500 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-neutral-500">{item.product.fabric} • {item.product.category === 'women' ? 'Women' : 'Kids'}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-neutral-300 rounded bg-white text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-neutral-100"
                      >
                        -
                      </button>
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-neutral-100"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-xs text-neutral-900">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Actions */}
        {items.length > 0 && (
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 space-y-3">
            {/* Coupon */}
            <div>
              {appliedCoupon ? (
                <div className="flex justify-between items-center text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
                  <span>{appliedCoupon}</span>
                  <button onClick={() => { setAppliedCoupon(null); setCouponDiscountPercent(0); }} className="text-red-600 font-semibold">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. DJFIRST10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs uppercase"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCharge === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingCharge}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-1 border-t border-neutral-200">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Instant Payout / Order via WhatsApp - Primary Button */}
            <div className="space-y-2 pt-1">
              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Instant Order &amp; Pay via WhatsApp</span>
              </a>

              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-2 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 rounded-xl text-xs font-semibold transition"
              >
                Or Enter Delivery Address Online
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Address Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl relative border border-neutral-200">
            <button
              onClick={() => { setIsCheckoutModalOpen(false); setOrderPlacedSuccess(false); }}
              className="absolute top-3 right-3 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>

            {orderPlacedSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-neutral-900">Order Received!</h4>
                <p className="text-xs text-neutral-600">
                  Thank you! Our team will contact you on WhatsApp to confirm delivery tracking.
                </p>
                <button
                  onClick={() => { setIsCheckoutModalOpen(false); setOrderPlacedSuccess(false); onClose(); }}
                  className="px-5 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleOnlineOrderSubmit} className="space-y-3 text-xs">
                <h4 className="font-serif font-bold text-base text-neutral-900">Delivery Details</h4>
                <div>
                  <label className="block text-neutral-600 mb-0.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border border-neutral-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-0.5">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border border-neutral-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-0.5">Delivery Address &amp; Pincode</label>
                  <textarea
                    rows={2}
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full border border-neutral-300 rounded-lg p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800"
                >
                  Confirm Order (₹{total.toLocaleString('en-IN')})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

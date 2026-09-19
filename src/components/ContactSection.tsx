import React from 'react';
import { Phone, MessageCircle, Clock, Truck, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact-section" className="py-14 bg-white border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Left: Contact Info - No physical shop address */}
          <div className="space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8d1a37] font-semibold">
                Customer Care &amp; Orders
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-1">
                Direct WhatsApp Support
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                We are always happy to share real-time fabric pictures, coordinate matching sets, and take custom orders online.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900">WhatsApp Orders &amp; Inquiries</h4>
                  <p className="text-neutral-600 font-medium mt-0.5">{STORE_INFO.displayPhone}</p>
                  <span className="text-[11px] text-emerald-700 font-semibold">Instant reply during business hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                <Truck className="w-4 h-4 text-[#580c22] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900">Online Pan-India Dispatch</h4>
                  <p className="text-neutral-600 mt-0.5">Express doorstep delivery across India with live courier tracking.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                <Clock className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900">Support Hours</h4>
                  <p className="text-neutral-600 mt-0.5">{STORE_INFO.supportHours}</p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub,%20I'd%20like%20to%20inquire%20about%20your%20dress%20materials`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#580c22] hover:bg-[#450719] text-white rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat with us on WhatsApp</span>
            </a>
          </div>

          {/* Right: Quick FAQs */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-neutral-900">
              Common Questions
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <h5 className="font-bold text-neutral-900">Do you offer Cash on Delivery?</h5>
                <p className="text-neutral-600 leading-relaxed">
                  Yes, Cash on Delivery is available across India along with convenient UPI / Online payment options upon dispatch.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <h5 className="font-bold text-neutral-900">How do I order directly via WhatsApp?</h5>
                <p className="text-neutral-600 leading-relaxed">
                  Simply click "Order on WhatsApp" on any product or from your shopping bag. A pre-filled message with product names, SKU, and prices will open for instant confirmation.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <h5 className="font-bold text-neutral-900">What is the delivery timeframe?</h5>
                <p className="text-neutral-600 leading-relaxed">
                  Orders are dispatched within 24–48 hours with live tracking links sent to your WhatsApp and SMS.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact-section" className="py-14 bg-white border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Left: Contact Info */}
          <div className="space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                Direct Assistance
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-1">
                Studio &amp; Inquiries
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                We are always happy to share extra fabric pictures, coordinate colors, and take custom orders.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900">WhatsApp Support (Instant Reply)</h4>
                  <p className="text-neutral-600">{STORE_INFO.displayPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <MapPin className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900">Studio Location</h4>
                  <p className="text-neutral-600">{STORE_INFO.address}, {STORE_INFO.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <Clock className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900">Timings</h4>
                  <p className="text-neutral-600">{STORE_INFO.supportHours}</p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub,%20I'd%20like%20to%20inquire%20about%20your%20dress%20materials`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
            >
              <MessageCircle className="w-4 h-4" />
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
                <h5 className="font-bold text-neutral-900">Are all dress materials unstitched?</h5>
                <p className="text-neutral-600 leading-relaxed">
                  Yes, we exclusively provide unstitched materials so you can custom-stitch the exact fit, neckline, and sleeves you prefer.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <h5 className="font-bold text-neutral-900">How does WhatsApp ordering work?</h5>
                <p className="text-neutral-600 leading-relaxed">
                  Clicking "Order on WhatsApp" prepares a pre-filled message with your selected dress materials. You can ask for more photos, confirm the order, and pay conveniently via UPI or COD.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <h5 className="font-bold text-neutral-900">What is the dispatch timeframe?</h5>
                <p className="text-neutral-600 leading-relaxed">
                  Orders are dispatched within 24–48 hours with live courier tracking shared to your WhatsApp.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

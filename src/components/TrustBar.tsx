import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="py-8 bg-white border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature 1 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-neutral-100 text-[#580c22] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Free Shipping</h4>
              <p className="text-[11px] text-neutral-500">On orders above ₹999</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-neutral-100 text-[#580c22] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Secure Payments</h4>
              <p className="text-[11px] text-neutral-500">100% safe &amp; trusted</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-neutral-100 text-[#580c22] flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Easy Returns</h4>
              <p className="text-[11px] text-neutral-500">Hassle-free returns</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-neutral-100 text-[#580c22] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Customer Support</h4>
              <p className="text-[11px] text-neutral-500">We're here to help</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

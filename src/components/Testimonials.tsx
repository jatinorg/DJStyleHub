import React from 'react';
import { Star, ShieldCheck, Quote, ThumbsUp } from 'lucide-react';
import { REVIEWS, STORE_INFO } from '../data/products';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Loved by 2,000+ Patrons</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Real feedback from women and parents across India who cherish our genuine textiles and friendly service.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-sand-50/70 border border-sand-200/80 rounded-2xl p-6 relative flex flex-col justify-between hover:shadow-md transition"
            >
              <Quote className="w-8 h-8 text-sand-300 absolute top-4 right-4" />
              
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-sand-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{review.userName}</h4>
                  <span className="text-[10px] text-neutral-400">{review.date}</span>
                </div>
                {review.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Order
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Custom Orders Strip */}
        <div className="mt-12 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Looking for Bulk, Matching Family Sets or Custom Bundles?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              We provide coordinated mother-daughter dress material sets, sibling combinations, and festive gifts on WhatsApp.
            </p>
          </div>
          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hi%20DJ%20Style%20Hub,%20I'm%20looking%20for%20matching%20mother-daughter%20or%20family%20sets`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition transform active:scale-95"
          >
            Ask on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};

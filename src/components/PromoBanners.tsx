import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Promo Card 1: Elegant Sarees (Pink) */}
          <div className="bg-[#fcecee] rounded-2xl p-6 relative overflow-hidden flex justify-between items-center group shadow-xs hover:shadow-md transition">
            <div className="space-y-3 z-10 max-w-[60%]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 leading-tight">
                  Elegant <br />
                  Sarees
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  For Every Occasion
                </p>
              </div>
              <Link
                to="/category/women"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#580c22] hover:underline underline-offset-4 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="w-32 sm:w-36 h-36 sm:h-40 shrink-0 relative overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
                alt="Elegant Indian Silk Saree"
                width={200}
                height={200}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Promo Card 2: Premium Fabrics (Sand/Cream) */}
          <div className="bg-[#f6eee4] rounded-2xl p-6 relative overflow-hidden flex justify-between items-center group shadow-xs hover:shadow-md transition">
            <div className="space-y-3 z-10 max-w-[60%]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 leading-tight">
                  Premium <br />
                  Fabrics
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Quality that Inspires
                </p>
              </div>
              <Link
                to="/fabric-guide"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#580c22] hover:underline underline-offset-4 group"
              >
                <span>Explore Fabrics</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="w-32 sm:w-36 h-36 sm:h-40 shrink-0 relative overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=400&q=80"
                alt="Stack of Premium Indian Fabrics"
                width={200}
                height={200}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Promo Card 3: Stylish Men's Wear (Beige) */}
          <div className="bg-[#ece7e1] rounded-2xl p-6 relative overflow-hidden flex justify-between items-center group shadow-xs hover:shadow-md transition">
            <div className="space-y-3 z-10 max-w-[60%]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 leading-tight">
                  Stylish <br />
                  Men's Wear
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Tradition with a Modern Twist
                </p>
              </div>
              <Link
                to="/category/men"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#580c22] hover:underline underline-offset-4 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="w-32 sm:w-36 h-36 sm:h-40 shrink-0 relative overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=400&q=80"
                alt="Stylish Indian Men's Ethnic Kurta"
                width={200}
                height={200}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

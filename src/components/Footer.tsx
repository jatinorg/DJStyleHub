import React from 'react';
import { Sparkles, MessageCircle, Heart, Shield, Truck, RefreshCw, Scissors } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onNavigateToFabricGuide: () => void;
  onNavigateToContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateToFabricGuide,
  onNavigateToContact,
}) => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                DJ <span className="text-brand-500 italic">Style</span> Hub
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
                Exclusive Dress Materials for Women &amp; Kids
              </span>
            </div>
            
            <p className="text-neutral-400 leading-relaxed max-w-sm">
              Your trusted studio for premium unstitched dress materials. We curate handpicked pure mulmul cottons, Chanderi silks, and gentle kid-friendly weaves for bespoke tailoring.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hello%20DJ%20Style%20Hub`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {STORE_INFO.displayPhone}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Women's Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Women's Materials
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('women')} className="hover:text-white transition">
                  Pure Mulmul Cotton Suits
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('women')} className="hover:text-white transition">
                  Royal Chanderi Silk Sets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('women')} className="hover:text-white transition">
                  Chikankari Georgette Fabric
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('women')} className="hover:text-white transition">
                  Banarasi Brocade Unstitched
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('women')} className="hover:text-white transition">
                  Handloom Linen Materials
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kids' Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Kids' Materials
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('kids')} className="hover:text-white transition">
                  Boys Festive Kurta Fabric Sets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('kids')} className="hover:text-white transition">
                  Girls Brocade Lehenga Materials
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('kids')} className="hover:text-white transition">
                  Organic Breathable Cotton Sets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('kids')} className="hover:text-white transition">
                  Festive Raw Silk Kurta Fabrics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('kids')} className="hover:text-white transition">
                  Bandhani Party Wear Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Help */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Guides &amp; Studio
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={onNavigateToFabricGuide} className="hover:text-white transition">
                  Cut &amp; Yardage Standards
                </button>
              </li>
              <li>
                <button onClick={onNavigateToFabricGuide} className="hover:text-white transition">
                  Fabric Wash &amp; Care Advice
                </button>
              </li>
              <li>
                <button onClick={onNavigateToContact} className="hover:text-white transition">
                  Store Location &amp; Visit
                </button>
              </li>
              <li>
                <button onClick={onNavigateToContact} className="hover:text-white transition">
                  Custom WhatsApp Inquiries
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Pan-India Express Dispatch</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} DJ Style Hub. All rights reserved. Crafted with care for Women &amp; Kids.</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>100% Genuine Fabrics</span>
            <span>•</span>
            <span>Verified Yardage</span>
            <span>•</span>
            <span>WhatsApp Direct Support</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

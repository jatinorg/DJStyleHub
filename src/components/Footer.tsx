import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-white">
                DJ STYLE HUB
              </Link>
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
                Exclusive Dress Materials for Women &amp; Kids
              </span>
            </div>
            
            <p className="text-neutral-400 leading-relaxed max-w-sm">
              Your trusted online studio for premium unstitched dress materials across India. We curate handpicked pure mulmul cottons, Chanderi silks, and gentle kid-friendly weaves for bespoke tailoring.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}?text=Hello%20DJ%20Style%20Hub`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition"
                title="Contact DJStyleHub via WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {STORE_INFO.displayPhone}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Women's Collections */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Women's Materials
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/category/women" className="hover:text-white transition">
                  Pure Mulmul Cotton Suits
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-white transition">
                  Royal Chanderi Silk Sets
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-white transition">
                  Chikankari Georgette Fabric
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-white transition">
                  Banarasi Brocade Unstitched
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-white transition">
                  Handloom Linen Materials
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kids' Collections */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Kids' Materials
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/category/kids" className="hover:text-white transition">
                  Boys Festive Kurta Fabric Sets
                </Link>
              </li>
              <li>
                <Link to="/category/kids" className="hover:text-white transition">
                  Girls Brocade Lehenga Materials
                </Link>
              </li>
              <li>
                <Link to="/category/kids" className="hover:text-white transition">
                  Organic Breathable Cotton Sets
                </Link>
              </li>
              <li>
                <Link to="/category/kids" className="hover:text-white transition">
                  Festive Raw Silk Kurta Fabrics
                </Link>
              </li>
              <li>
                <Link to="/category/kids" className="hover:text-white transition">
                  Bandhani Party Wear Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Guides */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Guides &amp; Studio
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/fabric-guide" className="hover:text-white transition">
                  Cut &amp; Yardage Standards
                </Link>
              </li>
              <li>
                <Link to="/fabric-guide" className="hover:text-white transition">
                  Fabric Wash &amp; Care Advice
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About DJStyleHub
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Store Location &amp; Contact
                </Link>
              </li>
              <li>
                <span className="text-neutral-500">Pan-India Express Dispatch</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} DJStyleHub (https://djstylehub.com). All rights reserved. Crafted for Women &amp; Kids.</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <Link to="/fabric-guide" className="hover:underline">100% Genuine Fabrics</Link>
            <span>•</span>
            <Link to="/fabric-guide" className="hover:underline">Verified Yardage</Link>
            <span>•</span>
            <a href={`https://wa.me/${STORE_INFO.whatsappNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              WhatsApp Support
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { Scissors, Sparkles, Droplets } from 'lucide-react';

export const FabricGuide: React.FC = () => {
  return (
    <section id="fabric-guide" className="py-14 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Simple Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            Tailoring Reference
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            Yardage &amp; Fabric Guide
          </h3>
          <p className="text-xs text-neutral-600">
            Clear measurements and care guidelines to help you and your tailor.
          </p>
        </div>

        {/* 3 Clean Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          {/* Card 1: Yardage */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <Scissors className="w-4 h-4 text-neutral-700" />
              <h4>Standard Yardage Cuts</h4>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Every dress material in our studio is verified for generous cuts:
            </p>
            <ul className="space-y-1.5 text-neutral-700 font-medium">
              <li className="flex justify-between border-b border-neutral-100 pb-1">
                <span>Top / Kurta:</span>
                <span className="font-bold text-neutral-900">2.50 Meters</span>
              </li>
              <li className="flex justify-between border-b border-neutral-100 pb-1">
                <span>Bottom / Salwar:</span>
                <span className="font-bold text-neutral-900">2.00 - 2.25 Meters</span>
              </li>
              <li className="flex justify-between">
                <span>Dupatta / Stole:</span>
                <span className="font-bold text-neutral-900">2.25 - 2.40 Meters</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Kids Comfort */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <Sparkles className="w-4 h-4 text-neutral-700" />
              <h4>Kids' Comfort Standards</h4>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Children's dress materials are crafted specifically to keep young skin happy:
            </p>
            <ul className="space-y-1.5 text-neutral-700">
              <li>• Includes soft cotton skin barrier linings</li>
              <li>• Gentle AZO-free hypoallergenic dyes</li>
              <li>• Flexible yardage for ages 2 to 12 years</li>
              <li>• Lightweight fabrics with easy movement</li>
            </ul>
          </div>

          {/* Card 3: Care Tips */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <Droplets className="w-4 h-4 text-neutral-700" />
              <h4>Simple Wash &amp; Care</h4>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Keep your unstitched materials fresh and radiant:
            </p>
            <ul className="space-y-1.5 text-neutral-700">
              <li>• <strong>Pure Cotton:</strong> Cold hand wash, dry in shade</li>
              <li>• <strong>Chanderi &amp; Silk:</strong> Gentle dry clean recommended</li>
              <li>• <strong>Embroidered:</strong> Reverse iron on low heat</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

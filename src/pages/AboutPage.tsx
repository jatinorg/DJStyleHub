import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scissors, HeartHandshake, Truck, MessageCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { STORE_INFO } from '../data/products';

export const AboutPage: React.FC = () => {
  const pageTitle = 'About DJStyleHub | Online Fashion Store';
  const pageDescription = 'Discover DJStyleHub - our heritage, commitment to authentic unstitched textiles for women and kids, and verified yardage standards.';
  const canonicalUrl = 'https://djstylehub.com/about';

  const breadcrumbs = [
    { name: 'About Us', url: '/about' }
  ];

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'Organization',
      name: 'DJStyleHub',
      url: 'https://djstylehub.com/',
      description: 'Online studio specializing in unstitched dress materials for women and kids.'
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        jsonLd={aboutSchema}
      />

      <Breadcrumbs items={breadcrumbs} />

      <article className="space-y-8 py-6">
        <header className="space-y-3 text-center sm:text-left border-b border-neutral-200 pb-6">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            Our Story &amp; Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            About DJStyleHub
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
            Bringing authentic unstitched textiles, generous verified cuts, and modern tailoring freedom to women and kids across India.
          </p>
        </header>

        <section className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="font-serif text-xl font-bold text-neutral-900">Our Mission</h2>
          <p>
            At <strong>DJStyleHub</strong>, we believe true style lies in individual choice and tailored comfort. While mass-produced ready-made apparel often forces compromises in fit, neckline, and length, our handpicked unstitched dress materials allow you and your master tailor to create bespoke masterpieces crafted to your exact preferences.
          </p>
          <p>
            We focus exclusively on two deeply cherished categories: <strong>Women's Dress Materials</strong> (ranging from airy Jaipuri pure mulmul cottons and handloom linen to regal Chanderi silks and Chikankari embroideries) and <strong>Kids' Ethnic Fabrics</strong> (designed with itch-free skin barrier linings and certified gentle dyes).
          </p>
        </section>

        {/* 4 Pillars */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-5 bg-white rounded-xl border border-neutral-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <Scissors className="w-4 h-4 text-neutral-700" />
              <h3>Verified Yardage Cuts</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every single dress material set is personally measured to ensure guaranteed 2.50m top cuts and generous bottom fabrics, accommodating up to 48" chest sizes and full sleeves.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-neutral-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <h3>100% Genuine Weaves</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We source directly from artisan clusters in Jaipur, Chanderi, Lucknow, and Gujarat. Zero polyester compromises on pure cotton labels and zero color bleeding on our organic dyes.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-neutral-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <HeartHandshake className="w-4 h-4 text-neutral-700" />
              <h3>Child-Safe Fabrics</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Kids need garments that move with them. Our kids materials include butter-crepe linings to prevent collar itching, paired with lightweight volume so children stay joyous.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-neutral-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <h3>Personal WhatsApp Shopping</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Experience boutique service from home. Message our team directly for real-time video swatches, shade comparisons, and instant order tracking.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 bg-neutral-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div>
            <h3 className="font-serif text-lg font-bold">Ready to explore our textiles?</h3>
            <p className="text-xs text-neutral-300 mt-0.5">Explore our unstitched dress materials for women and children.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link
              to="/category/women"
              className="px-4 py-2 bg-white text-neutral-900 rounded-lg text-xs font-semibold hover:bg-neutral-100 transition"
            >
              Women's Collection
            </Link>
            <Link
              to="/category/kids"
              className="px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg text-xs font-semibold hover:bg-neutral-700 transition"
            >
              Kids' Collection
            </Link>
          </div>
        </section>

      </article>
    </div>
  );
};

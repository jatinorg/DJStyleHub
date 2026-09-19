import React from 'react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ContactSection } from '../components/ContactSection';
import { STORE_INFO } from '../data/products';

export const ContactPage: React.FC = () => {
  const pageTitle = 'Contact DJStyleHub | Customer Support';
  const pageDescription = 'Contact DJStyleHub customer support. Reach out via WhatsApp, phone, or visit our studio in Bangalore for unstitched dress materials.';
  const canonicalUrl = 'https://djstylehub.com/contact';

  const breadcrumbs = [
    { name: 'Contact Us', url: '/contact' }
  ];

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'DJStyleHub',
      telephone: '+91-98765-43210',
      email: STORE_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: STORE_INFO.address,
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560001',
        addressCountry: 'IN'
      },
      openingHours: 'Mo-Sa 09:30-20:30'
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        jsonLd={contactSchema}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="py-4 border-b border-neutral-200">
        <h1 className="font-serif text-3xl font-bold text-neutral-900">
          Contact Customer Support
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1">
          Have a question about fabric meterage, unstitched suit lengths, or placing an order? We are here to help.
        </p>
      </header>

      <ContactSection />
    </div>
  );
};

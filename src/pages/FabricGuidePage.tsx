import React from 'react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FabricGuide } from '../components/FabricGuide';

export const FabricGuidePage: React.FC = () => {
  const pageTitle = 'Yardage & Fabric Care Guide | DJStyleHub';
  const pageDescription = 'Learn about unstitched dress material cuts, tailoring meterage for women and kids, and fabric care tips at DJStyleHub.';
  const canonicalUrl = 'https://djstylehub.com/fabric-guide';

  const breadcrumbs = [
    { name: 'Yardage & Fabric Guide', url: '/fabric-guide' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="py-4 border-b border-neutral-200">
        <h1 className="font-serif text-3xl font-bold text-neutral-900">
          Unstitched Yardage &amp; Fabric Guide
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1">
          Complete specifications on unstitched cuts, tailoring guidance for women and kids, and fabric care recommendations.
        </p>
      </header>

      <FabricGuide />
    </div>
  );
};

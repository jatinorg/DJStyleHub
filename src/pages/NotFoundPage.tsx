import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Home, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
      <SEO
        title="Page Not Found | DJStyleHub"
        description="The page you requested could not be found on DJStyleHub. Browse our exclusive unstitched dress materials for women and kids."
        robots="noindex, nofollow"
        canonicalUrl="https://djstylehub.com/404"
      />

      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
        <Scissors className="w-8 h-8 text-neutral-400" />
      </div>

      <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Error 404</span>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
        Page Not Found
      </h1>

      <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
        The link you followed may be broken or the dress material collection has been updated. Explore our popular sections below:
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Go to Homepage</span>
        </Link>
        <Link
          to="/category/women"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-lg hover:bg-neutral-200 transition"
        >
          <span>Women's Collection</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/category/kids"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-lg hover:bg-neutral-200 transition"
        >
          <span>Kids' Collection</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

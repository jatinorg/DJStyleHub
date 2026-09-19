import React from 'react';
import { Link } from 'react-router-dom';
import { Gift } from 'lucide-react';

interface CircularCategory {
  title: string;
  link: string;
  image?: string;
  isOffer?: boolean;
}

const CATEGORIES: CircularCategory[] = [
  {
    title: 'Sarees',
    link: '/category/women',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Kurtis & Suits',
    link: '/category/women',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80'
  },
  {
    title: "Men's Wear",
    link: '/category/men',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Fabrics',
    link: '/fabric-guide',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Kids Wear',
    link: '/category/kids',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Accessories',
    link: '/category/women',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Home & Living',
    link: '/fabric-guide',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Offers',
    link: '/category/women',
    isOffer: true
  }
];

export const CircularCategories: React.FC = () => {
  return (
    <section className="py-8 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="flex flex-col items-center gap-2 shrink-0 group min-w-[70px] sm:min-w-[90px]"
              title={`Explore ${cat.title}`}
            >
              {/* Circular Avatar Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-neutral-200 group-hover:border-[#580c22] transition-all duration-300 p-0.5 shadow-xs">
                {cat.isOffer ? (
                  <div className="w-full h-full rounded-full bg-[#580c22] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Gift className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                ) : (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Title */}
              <span className="text-xs sm:text-[13px] font-medium text-neutral-800 text-center group-hover:text-[#580c22] transition-colors">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs text-neutral-500 overflow-x-auto">
      <ol className="flex items-center gap-1.5 whitespace-nowrap">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-neutral-900 transition"
            title="Return to DJStyleHub Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url || index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
              {isLast ? (
                <span className="font-semibold text-neutral-900 truncate max-w-[200px] sm:max-w-md" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={item.url} className="hover:text-neutral-900 transition">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

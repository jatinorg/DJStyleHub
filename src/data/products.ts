import { Product, Review } from '../types';

export const STORE_INFO = {
  name: 'DJ Style Hub',
  legalName: 'DJStyleHub',
  domain: 'https://djstylehub.com',
  tagline: 'Wear Your Story',
  whatsappNumber: '+916300818215',
  displayPhone: '+91 63008 18215',
  instagramUrl: 'https://www.instagram.com/djstyle_hub?stkn=OWowdmw0b3lpOTN5',
  youtubeUrl: 'https://youtube.com/@djstylehub?si=a-WIVGqxXkG1ZvFg',
  email: 'orders@djstylehub.com',
  supportHours: 'Mon - Sat: 9:30 AM - 8:30 PM (IST)'
};

export const PRODUCTS: Product[] = [];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Ananya Sharma',
    rating: 5,
    date: '3 days ago',
    comment: 'The Jaipuri cotton fabric quality is outstanding! The top cut was exactly 2.50m as promised, which allowed my boutique tailor to stitch a beautiful flared Anarkali.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    userName: 'Pooja Iyer',
    rating: 5,
    date: '1 week ago',
    comment: 'Ordered the kids brocade lehenga fabric for my 6-year-old daughter for a family wedding. The cotton lining provided inside prevented any itching. She was dancing happily all evening!',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    userName: 'Meera Deshmukh',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Ordered via WhatsApp and the team responded in 5 minutes with extra close-up photos of the zari border. Received delivery in 3 days. DJ Style Hub is now my go-to store.',
    verifiedPurchase: true
  }
];

export function getProductBySlugOrId(identifier: string): Product | undefined {
  const cleanId = identifier.toLowerCase().trim();
  return PRODUCTS.find(p => p.slug.toLowerCase() === cleanId || p.id.toLowerCase() === cleanId);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category || p.subcategory.toLowerCase().includes(category.toLowerCase()));
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const current = PRODUCTS.find(p => p.id === productId);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS
    .filter(p => p.id !== productId && p.category === current.category)
    .slice(0, limit);
}

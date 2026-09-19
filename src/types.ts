export type CategoryType = 'all' | 'women' | 'kids' | 'men' | 'fabrics' | 'accessories' | 'sarees';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'women' | 'kids' | 'men' | 'fabrics' | 'accessories' | 'sarees';
  subcategory: string;
  fabric: string;
  occasion: 'Daily Wear' | 'Festive' | 'Party Wear' | 'Wedding Occasion';
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  topCut: string;
  bottomCut: string;
  dupattaCut: string;
  description: string;
  features: string[];
  images: string[];
  badge?: string;
  inStock: boolean;
  sku: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

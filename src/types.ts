export type CategoryType = 'all' | 'women' | 'kids' | 'men' | 'fabrics' | 'accessories' | 'sarees' | 'home-living' | 'nightwear' | 'kurti-sets';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'women' | 'kids' | 'men' | 'fabrics' | 'accessories' | 'sarees' | 'home-living' | 'nightwear' | 'kurti-sets';
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
  specificationsTitle?: string;
  specifications?: { id: string; label: string; value: string }[];
  description: string;
  features: string[];
  images: string[];
  badge?: string;
  inStock: boolean;
  sku: string;
  color: string;
  ageGroup?: string;
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

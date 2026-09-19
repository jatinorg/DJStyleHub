import { Product, Review } from '../types';

export const STORE_INFO = {
  name: 'DJ Style Hub',
  legalName: 'DJStyleHub',
  domain: 'https://djstylehub.com',
  tagline: 'Wear Your Story',
  whatsappNumber: '+919876543210',
  displayPhone: '+91 98765 43210',
  email: 'orders@djstylehub.com',
  supportHours: 'Mon - Sat: 9:30 AM - 8:30 PM (IST)'
};

export const PRODUCTS: Product[] = [
  // --- BEST SELLERS / FEATURED (From Reference Design) ---
  {
    id: 'bs-01',
    slug: 'kanchipuram-silk-saree',
    name: 'Kanchipuram Silk Saree',
    category: 'women',
    subcategory: 'Sarees',
    fabric: 'Kanchipuram Silk',
    occasion: 'Wedding Occasion',
    price: 2999,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 48,
    topCut: '0.80 Meters (Contrast Blouse Piece with Zari Border)',
    bottomCut: '5.50 Meters (Pure Woven Kanchipuram Silk)',
    dupattaCut: 'Full Zari Pallu with Temple Motifs',
    description: 'Timeless Kanchipuram silk saree in deep crimson wine with rich gold zari weaving, temple border, and grand bridal pallu. Ideal for weddings and traditional celebrations.',
    features: [
      'Authentic Kanchipuram woven zari border',
      'Rich grand pallu with traditional peacock motifs',
      'Includes unstitched matching blouse piece',
      'Lustrous pure silk feel'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Best Seller',
    inStock: true,
    sku: 'DJ-BS-SAREE-01',
    color: 'Crimson Wine & Antique Gold'
  },
  {
    id: 'bs-02',
    slug: 'printed-cotton-kurti',
    name: 'Printed Cotton Kurti',
    category: 'women',
    subcategory: 'Kurtis & Suits',
    fabric: 'Pure Cotton',
    occasion: 'Daily Wear',
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 62,
    topCut: '2.50 Meters (60s Cambric Breathable Cotton)',
    bottomCut: '2.00 Meters (Matching Solid Cambric)',
    dupattaCut: '2.25 Meters (Soft Mulmul Dupatta)',
    description: 'Breezy and comfortable everyday printed cotton kurti set with floral booti work. Soft on the skin and effortless to wear from morning to evening.',
    features: [
      '100% Breathable Cambric Cotton',
      'Colorfast screen printed motifs',
      'Lightweight easy-care fabric',
      'Pre-shrunk fine yarn quality'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Popular',
    inStock: true,
    sku: 'DJ-BS-KURTI-02',
    color: 'Teal Blue & Indigo'
  },
  {
    id: 'bs-03',
    slug: 'mens-cotton-kurta',
    name: "Men's Cotton Kurta",
    category: 'men',
    subcategory: "Men's Wear",
    fabric: 'Pure Cotton',
    occasion: 'Festive',
    price: 1199,
    originalPrice: 1799,
    rating: 4.9,
    reviewCount: 39,
    topCut: '2.50 Meters (Premium Slub Cotton with Mandarin Collar Fabric)',
    bottomCut: '2.00 Meters (Comfort Pyjama Fabric)',
    dupattaCut: 'Not Applicable',
    description: "Tailored unstitched fabric set for men's festive and daily kurtas. Breathable textured slub cotton in rich navy blue, perfect for family ceremonies and festivals.",
    features: [
      'Rich textured 100% slub cotton',
      'Includes collar and cuff contrast trims',
      'Wrinkle-resistant structured finish',
      'Generous cut for up to XXL sizes'
    ],
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Festive Pick',
    inStock: true,
    sku: 'DJ-BS-MEN-03',
    color: 'Navy Midnight Blue'
  },
  {
    id: 'bs-04',
    slug: 'banarasi-fabric-1-mtr',
    name: 'Banarasi Fabric (1 mtr)',
    category: 'fabrics',
    subcategory: 'Fabrics',
    fabric: 'Banarasi Brocade',
    occasion: 'Wedding Occasion',
    price: 399,
    originalPrice: 599,
    rating: 4.9,
    reviewCount: 84,
    topCut: '1.00 Meter (Per Meter Running Brocade Fabric, 44" Width)',
    bottomCut: 'Sold by meter for custom blouses, lehengas & jackets',
    dupattaCut: 'Running meter fabric',
    description: 'Rich running Banarasi brocade fabric with all-over golden zari floral jaal. Ideal for designer blouses, crop tops, kids lehenga borders, and jackets.',
    features: [
      'Authentic Banarasi golden floral jaal',
      '44 inches broad width running cut',
      'Heirloom quality metallic threads',
      'Order multiple meters continuously'
    ],
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Brocade Weave',
    inStock: true,
    sku: 'DJ-BS-FAB-04',
    color: 'Royal Magenta & Gold'
  },
  {
    id: 'bs-05',
    slug: 'girls-festive-dress',
    name: 'Girls Festive Dress',
    category: 'kids',
    subcategory: 'Kids Wear',
    fabric: 'Cotton Silk Blend',
    occasion: 'Party Wear',
    price: 799,
    originalPrice: 1199,
    rating: 5.0,
    reviewCount: 45,
    topCut: '1.50 Meters (Soft Net and Shimmer Bodice Material)',
    bottomCut: '1.50 Meters (Butter-Crepe Cotton Barrier Lining)',
    dupattaCut: '1.00 Meter (Feather-light Soft Stole)',
    description: 'Charming festive frock and anarkali material for young girls. Soft-finish twirling net with pre-included butter-crepe cotton lining to keep little ones comfy without itching.',
    features: [
      'Includes soft cotton-crepe inner barrier lining',
      'Lightweight multi-layer twirl flare',
      'Hypoallergenic baby-friendly dyes',
      'Suitable for ages 2 to 10 years'
    ],
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Kids Special',
    inStock: true,
    sku: 'DJ-BS-GIRL-05',
    color: 'Pastel Candy Pink'
  },
  {
    id: 'bs-06',
    slug: 'traditional-jhumkas',
    name: 'Traditional Jhumkas',
    category: 'accessories',
    subcategory: 'Accessories',
    fabric: 'Gold Plated Brass',
    occasion: 'Festive',
    price: 499,
    originalPrice: 799,
    rating: 4.8,
    reviewCount: 31,
    topCut: 'Handcrafted Antique Gold Plating with Pearl Drops',
    bottomCut: 'Lightweight Ear Stud with Secure Stopper',
    dupattaCut: 'Includes Velvet Jewelry Pouch',
    description: 'Classic handcrafted antique gold finished jhumkas adorned with delicate pearl clusters and filigree carving. Complements sarees, kurtis, and festive wear.',
    features: [
      'Antique matte gold plating',
      'Feather-light weight for all-day comfort',
      'Hypoallergenic nickel-free posts',
      'Hand-strung faux pearl droplets'
    ],
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733975-dd8c8bc34685?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Handcrafted',
    inStock: true,
    sku: 'DJ-BS-JHUM-06',
    color: 'Antique Gold & Pearl White'
  },

  // --- WOMEN'S DRESS MATERIALS (Preserved) ---
  {
    id: 'w-01',
    slug: 'jaipuri-handblock-pure-mulmul-cotton-suit-material',
    name: 'Jaipuri Handblock Pure Mulmul Cotton Suit Material',
    category: 'women',
    subcategory: 'Kurtis & Suits',
    fabric: 'Pure Cotton',
    occasion: 'Daily Wear',
    price: 1199,
    originalPrice: 1799,
    rating: 4.9,
    reviewCount: 42,
    topCut: '2.50 Meters (100% Breathable Mulmul Cotton)',
    bottomCut: '2.00 Meters (Solid Premium Cambric Cotton)',
    dupattaCut: '2.25 Meters (Lightweight Handblock Mulmul)',
    description: 'Authentic Sanganeri block-printed pure mulmul cotton unstitched suit set. Ultra-soft on the skin, natural organic vegetable dyes, perfect for hot days, office wear, and casual gatherings.',
    features: [
      '100% Pure Breathable Mulmul Cotton',
      'Original Bagru/Sanganer handblock print',
      'Skin-friendly AZO-free organic dyes',
      'Zero color bleeding tested'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Bestseller',
    inStock: true,
    sku: 'DJ-W-MUL-01',
    color: 'Peach & Mint Green'
  },
  {
    id: 'w-02',
    slug: 'royal-chanderi-silk-zari-woven-unstitched-suit-set',
    name: 'Royal Chanderi Silk Zari Woven Unstitched Suit Set',
    category: 'women',
    subcategory: 'Kurtis & Suits',
    fabric: 'Chanderi Silk',
    occasion: 'Festive',
    price: 2199,
    originalPrice: 3299,
    rating: 4.8,
    reviewCount: 29,
    topCut: '2.50 Meters (Chanderi Silk with Fine Zari Buta)',
    bottomCut: '2.00 Meters (Heavy Shantoon Bottom & Inner)',
    dupattaCut: '2.30 Meters (Woven Chanderi with Tassels)',
    description: 'Exquisite Chanderi silk fabric with fine gold zari weaving across the neckline and bodice. Comes with a matching handloom woven dupatta that lends a royal touch for festive celebrations.',
    features: [
      'Lustrous lightweight Chanderi weave',
      'Subtle metallic zari detailing',
      'High-grade Shantoon for lining & pants/salwar',
      'Elegant hand-finished tassel border'
    ],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Trending',
    inStock: true,
    sku: 'DJ-W-CHAN-02',
    color: 'Wine Burgundy & Antique Gold'
  },
  {
    id: 'w-03',
    slug: 'lucknowi-chikankari-georgette-fabric',
    name: 'Lucknowi Chikankari Georgette Fabric with Pearl Detailing',
    category: 'women',
    subcategory: 'Kurtis & Suits',
    fabric: 'Georgette',
    occasion: 'Party Wear',
    price: 2650,
    originalPrice: 3899,
    rating: 5.0,
    reviewCount: 38,
    topCut: '2.50 Meters (Viscose Georgette with all-over Chikankari)',
    bottomCut: '2.25 Meters (Pure Shantoon Bottom & Inner)',
    dupattaCut: '2.30 Meters (Georgette with Mukaish work)',
    description: 'Graceful Lucknowi Chikankari embroidery handcrafted on premium viscose georgette fabric. Adorned with delicate pearls and silver Mukaish work for a dreamy party look.',
    features: [
      'Intricate Bakhiya & Phanda threadwork',
      'Includes premium Shantoon inner fabric',
      'Drapes gracefully without stiffness',
      'Subtle pearl embellishments'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733975-dd8c8bc34685?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Exclusive',
    inStock: true,
    sku: 'DJ-W-CHIK-03',
    color: 'Soft Lavender Lilac'
  },
  {
    id: 'w-04',
    slug: 'banarasi-brocade-silk-unstitched-suit',
    name: 'Banarasi Brocade Silk Unstitched Wedding Suit',
    category: 'women',
    subcategory: 'Kurtis & Suits',
    fabric: 'Banarasi Silk',
    occasion: 'Wedding Occasion',
    price: 3199,
    originalPrice: 4799,
    rating: 4.9,
    reviewCount: 19,
    topCut: '2.50 Meters (Pure Katan Silk Blend with Kadwa Zari)',
    bottomCut: '2.25 Meters (Silk Blend Trouser Fabric)',
    dupattaCut: '2.40 Meters (Full Meenakari Banarasi Dupatta)',
    description: 'Rich Banarasi brocade fabric adorned with intricate Meenakari floral jaal. Ideal for wedding functions and sangeet ceremonies.',
    features: [
      'Authentic Banarasi kadwa zari weave',
      'Rich grand dupatta that stands out',
      'Premium heirloom grade durability',
      'Includes matching bottom fabric'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Bridal Pick',
    inStock: true,
    sku: 'DJ-W-BAN-04',
    color: 'Emerald Green & Gold'
  },

  // --- KIDS' DRESS MATERIALS (Preserved) ---
  {
    id: 'k-01',
    slug: 'kids-festive-jacquard-kurta-pyjama-fabric',
    name: 'Kids Festive Jacquard Kurta-Pyjama Unstitched Fabric Set',
    category: 'kids',
    subcategory: 'Kids Wear',
    fabric: 'Silk Blend',
    occasion: 'Festive',
    price: 849,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 26,
    topCut: '1.50 Meters (Soft Jacquard Silk with Subtle Zari Motif)',
    bottomCut: '1.25 Meters (Comfort Cotton Blend Dhoti/Pyjama Fabric)',
    dupattaCut: '0.90 Meters (Optional Mini Festive Stole)',
    description: 'Designed specifically for children: itch-free soft jacquard silk blend with cotton backing. Suitable for boys festive kurtas and ceremonies.',
    features: [
      'Child-safe itch-free woven back lining',
      'Ample yardage suitable for ages 3 to 12 years',
      'Durable fabric that withstands energetic movements',
      'Rich festive gleam with total comfort'
    ],
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Kids Bestseller',
    inStock: true,
    sku: 'DJ-K-BOY-01',
    color: 'Royal Mustard & Maroon'
  },
  {
    id: 'k-02',
    slug: 'little-princess-soft-brocade-lehenga-choli',
    name: 'Little Princess Soft Brocade Lehenga-Choli Material Set',
    category: 'kids',
    subcategory: 'Kids Wear',
    fabric: 'Chanderi Silk',
    occasion: 'Wedding Occasion',
    price: 1250,
    originalPrice: 1899,
    rating: 5.0,
    reviewCount: 34,
    topCut: '1.00 Meter (Embroidered Choli Blouse Fabric)',
    bottomCut: '2.00 Meters (Brocade Skirt/Lehenga Ghagra Fabric)',
    dupattaCut: '1.50 Meters (Soft Net with Pearl Beaded Lace)',
    description: 'Custom-tailor a fairy-tale lehenga for your little girl. Ultra-soft lightweight Chanderi and Banarasi brocade with butter-soft inner lining included to protect sensitive young skin.',
    features: [
      'Includes 2.0m butter-crepe skin barrier lining',
      'Lightweight flare fabric (won’t weigh the child down)',
      'Pre-stitched border lace on dupatta for easy finishing',
      'Vibrant celebratory candy hues'
    ],
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Top Rated',
    inStock: true,
    sku: 'DJ-K-GIRL-02',
    color: 'Candy Rose Pink & Gold'
  },
  {
    id: 'k-03',
    slug: 'kids-organic-mul-cotton-frock-kurti-material',
    name: 'Kids Organic Mul Cotton Frock & Kurti Unstitched Material',
    category: 'kids',
    subcategory: 'Kids Wear',
    fabric: 'Pure Cotton',
    occasion: 'Daily Wear',
    price: 649,
    originalPrice: 999,
    rating: 4.8,
    reviewCount: 40,
    topCut: '1.75 Meters (Organic Mulmul Cotton with Floral Print)',
    bottomCut: '1.25 Meters (Matching Soft Solid Cotton for Salwar/Pants)',
    dupattaCut: '1.10 Meters (Mini Feather-light Dupatta)',
    description: '100% certified organic mulmul cotton material designed specifically for kids sensitive skin. Super breathable, heat-repellent, and tailored for cute daily frocks.',
    features: [
      'Gentlest 100% organic cotton on tender skin',
      'Hypoallergenic vegetable colors',
      'Easy home machine wash & quick dry',
      'Generous length for ages 2 through 10'
    ],
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80'
    ],
    badge: '100% Cotton',
    inStock: true,
    sku: 'DJ-K-COT-03',
    color: 'Sunny Buttercup Yellow & Lime'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Ananya Sharma',
    rating: 5,
    date: '3 days ago',
    comment: 'The mulmul cotton suit material was so soft and the meterage was exact 2.5m as promised. My tailor stitched it easily and it looks boutique bought. Truly impressed!',
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

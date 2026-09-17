import { Product, Review } from '../types';

export const PRODUCTS: Product[] = [
  // --- WOMEN'S DRESS MATERIALS ---
  {
    id: 'w-01',
    name: 'Jaipuri Handblock Pure Mulmul Cotton Suit Material',
    category: 'women',
    subcategory: 'Pure Cotton Suits',
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
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Bestseller',
    inStock: true,
    sku: 'DJ-W-MUL-01',
    color: 'Peach & Mint Green'
  },
  {
    id: 'w-02',
    name: 'Royal Chanderi Silk Zari Woven Unstitched Suit Set',
    category: 'women',
    subcategory: 'Chanderi Silk',
    fabric: 'Chanderi Silk',
    occasion: 'Festive',
    price: 2199,
    originalPrice: 3299,
    rating: 4.8,
    reviewCount: 29,
    topCut: '2.50 Meters (Chanderi Silk with Fine Zari Buta)',
    bottomCut: '2.00 Meters (Heavy Shantoon Bottom & Inner)',
    dupattaCut: '2.30 Meters (Woven Chanderi with Tassels)',
    description: 'Exquisite Chanderi silk fabric with fine gold zari weaving across the neckline and bodice. Comes with a matching handloom woven dupatta that lends a royal touch for festive pujas, family celebrations, and parties.',
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
    name: 'Lucknowi Chikankari Georgette Fabric with Pearl Detailing',
    category: 'women',
    subcategory: 'Georgette Embroidered',
    fabric: 'Georgette',
    occasion: 'Party Wear',
    price: 2650,
    originalPrice: 3899,
    rating: 5.0,
    reviewCount: 38,
    topCut: '2.50 Meters (Viscose Georgette with all-over Chikankari)',
    bottomCut: '2.25 Meters (Pure Shantoon Bottom & Inner)',
    dupattaCut: '2.30 Meters (Georgette with Mukaish work)',
    description: 'Graceful Lucknowi Chikankari embroidery handcrafted on premium viscose georgette fabric. Adorned with delicate pearls and silver Mukaish work for a dreamy party and cocktail look.',
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
    name: 'Banarasi Brocade Silk Unstitched Wedding Suit',
    category: 'women',
    subcategory: 'Banarasi Silk',
    fabric: 'Banarasi Silk',
    occasion: 'Wedding Occasion',
    price: 3199,
    originalPrice: 4799,
    rating: 4.9,
    reviewCount: 19,
    topCut: '2.50 Meters (Pure Katan Silk Blend with Kadwa Zari)',
    bottomCut: '2.25 Meters (Silk Blend Trouser Fabric)',
    dupattaCut: '2.40 Meters (Full Meenakari Banarasi Dupatta)',
    description: 'Rich Banarasi brocade fabric adorned with intricate Meenakari floral jaal. Ideal for wedding functions, sangeet, and reception ceremonies where you want regal heritage appeal.',
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
  {
    id: 'w-05',
    name: 'Pure Handloom Linen Cotton Floral Material Set',
    category: 'women',
    subcategory: 'Pure Cotton Suits',
    fabric: 'Linen Cotton',
    occasion: 'Daily Wear',
    price: 1399,
    originalPrice: 1999,
    rating: 4.7,
    reviewCount: 31,
    topCut: '2.50 Meters (Organic Linen Cotton with Floral Weave)',
    bottomCut: '2.00 Meters (Comfort Cotton Slub)',
    dupattaCut: '2.25 Meters (Linen Zari Border Dupatta)',
    description: 'Crisp, structured yet airy handloom linen cotton fabric with subtle botanical floral prints. Perfect for stylish workwear, meetings, and daytime get-togethers.',
    features: [
      'Natural breathing linen cotton blend',
      'Subtle metallic selvedge border on dupatta',
      'Minimal shrinkage pre-washed yarn',
      'Sophisticated contemporary earth tone'
    ],
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Popular',
    inStock: true,
    sku: 'DJ-W-LIN-05',
    color: 'Dusty Rose & Khaki'
  },
  {
    id: 'w-06',
    name: 'Kashmiri Tilla Embroidered Organza Suit Material',
    category: 'women',
    subcategory: 'Organza',
    fabric: 'Organza',
    occasion: 'Party Wear',
    price: 2899,
    originalPrice: 4199,
    rating: 4.9,
    reviewCount: 22,
    topCut: '2.50 Meters (Crisp Premium Sheer Organza with Tilla)',
    bottomCut: '2.25 Meters (Raw Silk Blend Trouser Fabric)',
    dupattaCut: '2.30 Meters (Organza with Scalloped Cutwork Border)',
    description: 'Airy, sheer organza embellished with shimmering Kashmiri Tilla cord embroidery and cutwork scalloped borders. Modern, lightweight, and head-turning for evening events.',
    features: [
      'Laser-cut scalloped embroidery edging',
      'Tarnish-resistant metallic tilla thread',
      'Includes inner lining and bottom fabric',
      'Exquisite statement designer piece'
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733975-dd8c8bc34685?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'New',
    inStock: true,
    sku: 'DJ-W-ORG-06',
    color: 'Powder Sky Blue'
  },
  {
    id: 'w-07',
    name: 'Authentic Kutch Bandhani Modal Silk Suit Set',
    category: 'women',
    subcategory: 'Silk Blend',
    fabric: 'Silk Blend',
    occasion: 'Festive',
    price: 1850,
    originalPrice: 2699,
    rating: 4.8,
    reviewCount: 35,
    topCut: '2.50 Meters (Soft Modal Silk Tie-Dye Bandhani)',
    bottomCut: '2.00 Meters (Solid Modal Satin)',
    dupattaCut: '2.30 Meters (Heavy Bandhani with Golden Gota)',
    description: 'Traditional Gujarati tie-and-dye Bandhani created on silky modal fabric that drapes like a waterfall. Accented with fine gold gota patti work along the dupatta.',
    features: [
      'Authentic hand-tied Bandhani dots',
      'Ultra-soft fluid modal silk feel',
      'Golden Gota Patti border embellishment',
      'Vibrant festive celebratory colors'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Festive Favorite',
    inStock: true,
    sku: 'DJ-W-BAN-07',
    color: 'Crimson Red & Mustard'
  },
  {
    id: 'w-08',
    name: 'Everyday Indigo Dabu Print 60s Cambric Suit Material',
    category: 'women',
    subcategory: 'Pure Cotton Suits',
    fabric: 'Pure Cotton',
    occasion: 'Daily Wear',
    price: 899,
    originalPrice: 1399,
    rating: 4.7,
    reviewCount: 54,
    topCut: '2.50 Meters (Fine 60x60 Cambric Cotton)',
    bottomCut: '2.00 Meters (Matching Dabu Cambric)',
    dupattaCut: '2.25 Meters (Pure Cotton Malmal Dupatta)',
    description: 'Deep Indigo Dabu mud-resist printed unstitched suit. Breathable, durable, and gets softer with every wash. An indispensable everyday staple for all-day ease.',
    features: [
      '100% fine yarn 60s Cambric Cotton',
      'Natural mud-resist Dabu craft',
      'Feather-light soft dupatta',
      'Great for regular office and college wear'
    ],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Best Value',
    inStock: true,
    sku: 'DJ-W-IND-08',
    color: 'Indigo Navy & Ivory'
  },

  // --- KIDS' DRESS MATERIALS ---
  {
    id: 'k-01',
    name: 'Kids Festive Jacquard Kurta-Pyjama Unstitched Fabric Set',
    category: 'kids',
    subcategory: 'Boys Festive Fabric',
    fabric: 'Silk Blend',
    occasion: 'Festive',
    price: 849,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 26,
    topCut: '1.50 Meters (Soft Jacquard Silk with Subtle Zari Motif)',
    bottomCut: '1.25 Meters (Comfort Cotton Blend Dhoti/Pyjama Fabric)',
    dupattaCut: '0.90 Meters (Optional Mini Festive Stole)',
    description: 'Designed specifically for children: itch-free soft jacquard silk blend with cotton backing. Stitch comfortable kurtas, sherwanis, or bundi jackets for boys for weddings, festivals, and school events.',
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
    name: 'Little Princess Soft Brocade Lehenga-Choli Material Set',
    category: 'kids',
    subcategory: 'Girls Ethnic Materials',
    fabric: 'Chanderi Silk',
    occasion: 'Wedding Occasion',
    price: 1250,
    originalPrice: 1899,
    rating: 5.0,
    reviewCount: 34,
    topCut: '1.00 Meter (Embroidered Choli Blouse Fabric)',
    bottomCut: '2.00 Meters (Brocade Skirt/Lehenga Ghagra Fabric)',
    dupattaCut: '1.50 Meters (Soft Net with Pearl Beaded Lace)',
    description: 'Custom-tailor a fairy-tale lehenga for your little girl. Crafted with ultra-soft lightweight Chanderi and Banarasi art brocade with butter-soft inner lining included to protect sensitive young skin.',
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
    name: 'Kids Organic Mul Cotton Frock & Kurti Unstitched Material',
    category: 'kids',
    subcategory: 'Girls Casual Materials',
    fabric: 'Pure Cotton',
    occasion: 'Daily Wear',
    price: 649,
    originalPrice: 999,
    rating: 4.8,
    reviewCount: 40,
    topCut: '1.75 Meters (Organic Mulmul Cotton with Floral Print)',
    bottomCut: '1.25 Meters (Matching Soft Solid Cotton for Salwar/Pants)',
    dupattaCut: '1.10 Meters (Mini Feather-light Dupatta)',
    description: '100% certified organic mulmul cotton material designed specifically for kids sensitive skin. Super breathable, heat-repellent, and tailored for cute daily frocks, kurtis, or sharara sets.',
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
  },
  {
    id: 'k-04',
    name: 'Boys Raw Silk Blend Festive Kurta & Bundi Jacket Fabric',
    category: 'kids',
    subcategory: 'Boys Festive Fabric',
    fabric: 'Silk Blend',
    occasion: 'Festive',
    price: 999,
    originalPrice: 1499,
    rating: 4.7,
    reviewCount: 18,
    topCut: '1.50 Meters (Crisp Raw Silk Blend for Kurta)',
    bottomCut: '1.25 Meters (Comfort Churidar Fabric)',
    dupattaCut: '0.80 Meters (Contrast Brocade Swatch for Waistcoat)',
    description: 'A complete designer fabric pack for boys festive wear. Includes fabric for the main kurta, pyjama pants, plus an additional jacquard swatch to tailor a matching Nehru/bundi jacket.',
    features: [
      'Includes jacket fabric for trendy 3-piece look',
      'Wrinkle-resistant luxury finish',
      'Comfortable all-day wear for pujas and events',
      'Tailor-friendly marked fabric edges'
    ],
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Popular',
    inStock: true,
    sku: 'DJ-K-BOY-04',
    color: 'Pistachio Mint & Metallic Silver'
  },
  {
    id: 'k-05',
    name: 'Kids Floral Organza Fairy Anarkali Dress Material',
    category: 'kids',
    subcategory: 'Girls Ethnic Materials',
    fabric: 'Organza',
    occasion: 'Party Wear',
    price: 1399,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 21,
    topCut: '2.00 Meters (Digitally Printed Sheer Flora Organza)',
    bottomCut: '1.50 Meters (Cotton Crepe Lining & Legging Fabric)',
    dupattaCut: '1.30 Meters (Organza with Scalloped Edge)',
    description: 'Give your girl a whimsical fairy princess look. Soft-finish digital floral organza with complete soft cotton-crepe lining to eliminate any prickliness while delivering dramatic twirling volume.',
    features: [
      'Ultra-softened organza specially processed for kids',
      'High twirl-factor fabric volume',
      'Comes with full cotton inner lining for zero irritation',
      'Pastel birthday and party favorite'
    ],
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733975-dd8c8bc34685?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'New Arrival',
    inStock: true,
    sku: 'DJ-K-ORG-05',
    color: 'Blush Peach & Lilac'
  },
  {
    id: 'k-06',
    name: 'Traditional Kutch Bandhani Cotton Material for Kids',
    category: 'kids',
    subcategory: 'Girls Ethnic Materials',
    fabric: 'Pure Cotton',
    occasion: 'Festive',
    price: 799,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 28,
    topCut: '1.60 Meters (Pure Cotton Hand-tied Bandhani)',
    bottomCut: '1.25 Meters (Comfort Cotton Bottom)',
    dupattaCut: '1.20 Meters (Matching Bandhani with Gota Edge)',
    description: 'Bright, joyous traditional Bandhani tie-dye in pure soft cotton. Ideal for Navratri Garba nights, Diwali, Pongal, and school cultural fest costumes for kids.',
    features: [
      'Vibrant festive colors that brighten kids photos',
      'Pure soft cotton easy to stitch into Sharara or Anarkali',
      'Pre-softened fabric for delicate skin',
      'Lightweight and easy for children to carry'
    ],
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    badge: 'Festive Special',
    inStock: true,
    sku: 'DJ-K-BAN-06',
    color: 'Peacock Royal Blue & Orange'
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
    comment: 'Ordered via WhatsApp and the team responded in 5 minutes with extra close-up photos of the Chanderi zari border. Received delivery in 3 days. DJ Style Hub is now my go-to for dress materials.',
    verifiedPurchase: true
  }
];

export const STORE_INFO = {
  name: 'DJ Style Hub',
  tagline: 'Exclusive Dress Materials for Women & Kids',
  whatsappNumber: '+919876543210',
  displayPhone: '+91 98765 43210',
  email: 'orders@djstylehub.com',
  address: 'Shop #14, Fashion Square, Near Central Market, Commercial Street',
  city: 'Bangalore, Karnataka - 560001',
  supportHours: 'Mon - Sat: 9:30 AM - 8:30 PM (IST)'
};

export interface ProductColor {
  name: string;
  nameAr: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  descriptionAr: string;
  details: string[];
  detailsAr: string[];
  sizes: string[];
  colors: ProductColor[];
  category: 'T-Shirts' | 'Shirts' | 'Pants' | 'Overshirts' | 'Hoodies';
  categoryAr: string;
  dressStyle: 'casual' | 'formal' | 'party' | 'gym';
  stock: number;
  isNewArrival?: boolean;
  isTopSelling?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'One Life Graphic T-Shirt',
    nameAr: 'تي شيرت وان لايف أوفر سايز',
    slug: 'one-life-graphic-tshirt',
    price: 650,
    originalPrice: 850,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 142,
    images: [
      '/src/assets/images/product_graphic_tshirt_1791026509051.jpg',
      '/src/assets/images/hero_fashion_models_1791026488998.jpg',
    ],
    description: 'This graphic t-shirt is crafted from 100% heavyweight 280 GSM Egyptian cotton. Designed with an oversized drop-shoulder cut, ribbed crew neckline, and durable silk-screen typography print.',
    descriptionAr: 'تي شيرت مطبوع مصنوع من قطن مصري فاخر 100% بوزن 280 جرام. قصة أوفر سايز عصرية بأكتاف ساقطة، وياقة مضلعة متينة، مع طباعة سيلك سكرين عالية الثبات لا تتأثر بالغسيل.',
    details: [
      '100% Premium Egyptian Combed Cotton',
      'Heavyweight 280 GSM luxury jersey',
      'Relaxed drop-shoulder oversized silhouette',
      'Pre-shrunk fabric to prevent post-wash shrinking',
      'Designed and ethically made in Cairo, Egypt',
    ],
    detailsAr: [
      'قطن مصري ممشط 100% فائق النعومة',
      'وزن قماش ثقيل فاخر 280 جرام',
      'قصة أوفر سايز مريحة بأكتاف منسدلة',
      'معالج ضد الانكماش بعد الغسيل',
      'صُمم وصُنع بحرفية وفخر في القاهرة، مصر',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Washed Black', nameAr: 'أسود مغسول', value: '#1E1E1E' },
      { name: 'Chalk White', nameAr: 'أبيض طباشيري', value: '#F5F5F0' },
      { name: 'Olive Green', nameAr: 'زيتي عسكري', value: '#4A5340' },
    ],
    category: 'T-Shirts',
    categoryAr: 'تي شيرتات',
    dressStyle: 'casual',
    stock: 28,
    isNewArrival: true,
    isTopSelling: true,
  },
  {
    id: 'prod-2',
    name: 'Polo with Tipping Details',
    nameAr: 'بولو كلاسيك بياقة محددة',
    slug: 'polo-with-tipping-details',
    price: 890,
    originalPrice: 1100,
    discountPercent: 19,
    rating: 4.6,
    reviewCount: 89,
    images: [
      '/src/assets/images/product_polo_shirt_1791026524042.jpg',
      '/src/assets/images/product_graphic_tshirt_1791026509051.jpg',
    ],
    description: 'Elevated polo shirt knit from breathable Egyptian cotton pique. Features subtle contrast micro-tipping along the ribbed collar and sleeves, finished with genuine horn buttons.',
    descriptionAr: 'قميص بولو أنيق منسوج من بيكيه القطن المصري الفاخر القابل للتنفس. يتميز بتفاصيل خطوط رفيعة متباينة على الياقة وأطراف الأكمام مع أزرار طبيعية راقية.',
    details: [
      '100% Breathable Egyptian Cotton Pique',
      'Two-button placket with horn buttons',
      'Subtle contrast rib knit collar trim',
      'Tailored modern fit',
      'Machine washable at 30°C',
    ],
    detailsAr: [
      '100% بيكيه قطن مصري يسمح بمرور الهواء',
      'فتحة أمامية بزرين طبيعيين',
      'تطريز ميكرو خفيف على حواف الياقة المضلعة',
      'قصة معتدلة أنيقة ومريحة',
      'قابل للغسيل في الغسالة على حرارة 30 درجة',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sand Taupe', nameAr: 'رملي بيج', value: '#C2B69D' },
      { name: 'Midnight Navy', nameAr: 'كحلي داكن', value: '#1A2436' },
      { name: 'Charcoal', nameAr: 'فحمي', value: '#333333' },
    ],
    category: 'Shirts',
    categoryAr: 'قمصان وبولو',
    dressStyle: 'casual',
    stock: 19,
    isNewArrival: true,
    isTopSelling: false,
  },
  {
    id: 'prod-3',
    name: 'Relaxed Fit Vintage Denim Jeans',
    nameAr: 'بنطلون جينز مريح واسع',
    slug: 'relaxed-fit-vintage-denim-jeans',
    price: 1250,
    originalPrice: 1550,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 215,
    images: [
      '/src/assets/images/product_denim_jeans_1791026535622.jpg',
      '/src/assets/images/hero_fashion_models_1791026488998.jpg',
    ],
    description: 'Constructed from durable 13.5oz non-stretch denim, our relaxed fit jean offers the ideal balance of classic workwear drape and all-day comfort. Features custom matte silver hardware.',
    descriptionAr: 'مصنوع من دينم متين بوزن 13.5 أونصة غير مطاط، يمنحك التوازن المثالي بين مظهر الجينز الكلاسيكي الراقي والراحة طوال اليوم. مزود بأزرار ومسامير فضية غير لامعة.',
    details: [
      '13.5 oz heavy-grade premium cotton denim',
      'Straight leg relaxed drape from thigh to hem',
      'YKK zip fly with reinforced custom rivet button',
      'Stone-washed finish for soft lived-in feel',
    ],
    detailsAr: [
      'قماش دينم قطني ثقيل فاخر 13.5 أونصة',
      'قصة مستقيمة مريحة من الفخذ حتى الكاحل',
      'سحاب YKK ياباني متين وزر مخصص مدعم',
      'غسيل حجري مميز يمنح ملمساً ناعماً من أول ارتداء',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Vintage Indigo', nameAr: 'أزرق فينتاج', value: '#2F4858' },
      { name: 'Washed Black', nameAr: 'أسود معتق', value: '#222222' },
      { name: 'Raw Blue', nameAr: 'أزرق داكن خام', value: '#152238' },
    ],
    category: 'Pants',
    categoryAr: 'بناطيل وجينز',
    dressStyle: 'casual',
    stock: 35,
    isNewArrival: false,
    isTopSelling: true,
  },
  {
    id: 'prod-4',
    name: 'Minimalist Linen Utility Overshirt',
    nameAr: 'قميص جوخ / كتان خفيف أوفر شيرت',
    slug: 'minimalist-linen-utility-overshirt',
    price: 1450,
    originalPrice: 1800,
    discountPercent: 19,
    rating: 4.7,
    reviewCount: 94,
    images: [
      '/src/assets/images/product_linen_overshirt_1791026546218.jpg',
      '/src/assets/images/hero_fashion_models_1791026488998.jpg',
    ],
    description: 'An essential layering piece cut from a premium linen-cotton blend. Designed with clean minimal lines, twin chest patch pockets, and reinforced flat-felled seams.',
    descriptionAr: 'قطعة أساسية متعددة الاستخدامات منسوجة من مزيج الكتان والقطن المصري عالي الجودة. تصميم عصري بخطوط نظيفة وجيبين على الصدر وتشطيبات خياطة مزدوجة.',
    details: [
      '55% Egyptian Linen, 45% Combed Cotton',
      'Dual structured chest flap pockets',
      'Clean point collar with straight boxy hem',
      'Perfect for layering over plain tees',
    ],
    detailsAr: [
      '55% كتان مصري طبيعي، 45% قطن ممشط',
      'جيبان واسعان على الصدر بتصميم هندسي نظيف',
      'ياقة كلاسيكية مع قصة مستقيمة مريحة',
      'مثالي للارتداء كطبقة خارجية فوق التي شيرتات',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pure Black', nameAr: 'أسود كربوني', value: '#141414' },
      { name: 'Natural Sand', nameAr: 'كتان طبيعي', value: '#D8D0C5' },
      { name: 'Forest Olive', nameAr: 'زيتي غامق', value: '#2E3A2F' },
    ],
    category: 'Overshirts',
    categoryAr: 'جواكت وأوفر شيرت',
    dressStyle: 'formal',
    stock: 15,
    isNewArrival: true,
    isTopSelling: true,
  },
  {
    id: 'prod-5',
    name: 'Sleeve Striped Minimal Tee',
    nameAr: 'تي شيرت بخطوط عصرية على الكم',
    slug: 'sleeve-striped-minimal-tee',
    price: 580,
    originalPrice: 720,
    discountPercent: 20,
    rating: 4.5,
    reviewCount: 67,
    images: [
      '/src/assets/images/product_graphic_tshirt_1791026509051.jpg',
      '/src/assets/images/product_linen_overshirt_1791026546218.jpg',
    ],
    description: 'Understated monochrome short-sleeve tee featuring contrasting sleeve stripes. Cut in our signature relaxed boxy fit from silky soft combed cotton.',
    descriptionAr: 'تي شيرت قصير الأكمام بتصميم مينيمال أنيق مع خطوط رفيعة على الأكمام. مصنوع من قطن ممشط حريري الملمس بقصة بوكسي عصرية مريحة.',
    details: [
      '100% Egyptian Combed Cotton (240 GSM)',
      'Engineered stripe knit on sleeve hem',
      'Seamless side construction',
      'Reinforced neckband',
    ],
    detailsAr: [
      '100% قطن مصري ممشط (240 جرام)',
      'خطوط منسوجة بدقة على حافة الأكمام',
      'حياكة جانبية مريحة لا تسبب الاحتكاك',
      'ياقة مدعمة تدوم طويلاً',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Optical White', nameAr: 'أبيض ناصع', value: '#FFFFFF' },
      { name: 'Jet Black', nameAr: 'أسود حالك', value: '#0D0D0D' },
    ],
    category: 'T-Shirts',
    categoryAr: 'تي شيرتات',
    dressStyle: 'casual',
    stock: 42,
    isNewArrival: false,
    isTopSelling: true,
  },
  {
    id: 'prod-6',
    name: 'Pleated Smart Casual Trousers',
    nameAr: 'بنطلون قماش بكسرات سمارت كاجوال',
    slug: 'pleated-smart-casual-trousers',
    price: 1100,
    originalPrice: 1350,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 104,
    images: [
      '/src/assets/images/product_denim_jeans_1791026535622.jpg',
      '/src/assets/images/product_polo_shirt_1791026524042.jpg',
    ],
    description: 'Tailored trousers engineered with front single pleats, elasticated hidden waistband inserts for flexible comfort, and a clean tapered ankle hem.',
    descriptionAr: 'بنطلون أنيق بقصة كلاسيكية مع كسرة أمامية واحدة ومطاط مخفي على جانبي الخصر لمنحك أعلى درجات الراحة والمرونة، مع نهاية ساق مدببة وعصرية.',
    details: [
      'Poly-Viscose premium twill with natural stretch',
      'Discrete elastic sides in waistband',
      'Deep slanted side pockets and rear welt pockets',
      'Crease-resistant finish for easy care',
    ],
    detailsAr: [
      'نسيج تويل فاخر من البولي فيسكوز بمرونة طبيعية',
      'مطاط جانبي مخفي في حزام الخصر',
      'جيوب جانبية عميقة وجيوب خلفية أنيقة',
      'مقاوم للتجعد وسهل الكي والغسيل',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal Grey', nameAr: 'رمادي فحمي', value: '#373A3C' },
      { name: 'Espresso Brown', nameAr: 'بني إسبريسو', value: '#2C1D18' },
      { name: 'Soft Cream', nameAr: 'كريمي هادئ', value: '#EAE6DF' },
    ],
    category: 'Pants',
    categoryAr: 'بناطيل وجينز',
    dressStyle: 'formal',
    stock: 22,
    isNewArrival: false,
    isTopSelling: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

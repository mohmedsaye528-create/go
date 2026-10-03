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
  sizes: string[];
  colors: ProductColor[];
  category: string;
  isNewArrival?: boolean;
  isTopSelling?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Heavyweight Oversized T-Shirt",
    nameAr: "تي شيرت أوفر سايز كلاسيك",
    slug: "classic-heavyweight-oversized-t-shirt",
    price: 650,
    originalPrice: 850,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Premium cotton oversized t-shirt with a structured fit.",
    descriptionAr: "تي شيرت قطن فاخر بقصة أوفر سايز مريحة ومناسبة للاستخدام اليومي.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", nameAr: "أسود", value: "#000000" },
      { name: "White", nameAr: "أبيض", value: "#FFFFFF" }
    ],
    category: "casual",
    isNewArrival: true,
    isTopSelling: true
  },
  {
    id: "2",
    name: "Minimalist Polo Shirt",
    nameAr: "قميص بولو مينيمال",
    slug: "minimalist-polo-shirt",
    price: 890,
    originalPrice: 1100,
    discountPercent: 19,
    rating: 4.6,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1625910513413-2131920808a3?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Classic polo shirt made from soft breathable fabric.",
    descriptionAr: "قميص بولو أنيق بتصميم عصري وخامة قطنية ناعمة.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Navy", nameAr: "كحلي", value: "#0A192F" },
      { name: "White", nameAr: "أبيض", value: "#FFFFFF" }
    ],
    category: "formal",
    isNewArrival: true
  },
  {
    id: "3",
    name: "Essential Cotton Hoodie",
    nameAr: "هودي قطن أساسي",
    slug: "essential-cotton-hoodie",
    price: 1250,
    originalPrice: 1500,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 210,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Cozy heavy cotton hoodie for minimal winter styles.",
    descriptionAr: "هودي قطني ثقيل بتصميم أنيق يمنحك الدفء والراحة.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", nameAr: "أسود", value: "#000000" },
      { name: "Grey", nameAr: "رمادي", value: "#808080" }
    ],
    category: "casual",
    isTopSelling: true
  }
];

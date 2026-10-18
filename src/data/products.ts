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
  categoryAr: string;
  details: string[];
  detailsAr: string[];
  isNewArrival?: boolean;
  isTopSelling?: boolean;
}

const SHOE_SIZES = ["40", "41", "42", "43", "44", "45", "46"];
const img = (id: string) => `https://images.unsplash.com/${id}?w=900&auto=format&fit=crop&q=80`;

export const products: Product[] = [
  {
    id: "1",
    name: "Velocity Pro Running Shoes",
    nameAr: "حذاء جري فيلوسيتي برو",
    slug: "velocity-pro-running-shoes",
    price: 2850, originalPrice: 3600, discountPercent: 21,
    rating: 4.8, reviewCount: 214,
    images: [img("photo-1542291026-7eec264c27ff"), img("photo-1595950653106-6c9ebd614d3a")],
    description: "Featherlight racing shoe with responsive foam cushioning built for daily miles and race day.",
    descriptionAr: "حذاء جري خفيف جداً بنعل إسفنجي سريع الاستجابة، مصمم للجري اليومي وأيام السباقات.",
    sizes: SHOE_SIZES,
    colors: [{ name: "Ember Red", nameAr: "أحمر ناري", value: "#DC2626" }, { name: "Black", nameAr: "أسود", value: "#111111" }],
    category: "running", categoryAr: "جري",
    details: ["Responsive nitrogen-infused foam midsole", "Breathable engineered mesh upper", "Weight: 240g (EU 42) · Drop: 8mm"],
    detailsAr: ["نعل أوسط إسفنجي سريع الاستجابة", "وجه علوي شبكي يسمح بالتهوية", "الوزن: 240 جرام (مقاس 42) · الفرق: 8مم"],
    isNewArrival: true, isTopSelling: true
  },
  {
    id: "2",
    name: "Court Dominator Basketball Shoes",
    nameAr: "حذاء كرة سلة كورت دومينيتور",
    slug: "court-dominator-basketball-shoes",
    price: 3400, originalPrice: 4200, discountPercent: 19,
    rating: 4.7, reviewCount: 156,
    images: [img("photo-1608231387042-66d1773070a5"), img("photo-1603808033192-082d6919d3e1")],
    description: "High-top court shoe with locked-in support, grippy traction and impact protection for hard landings.",
    descriptionAr: "حذاء ملاعب برقبة عالية ودعم كامل للكاحل وثبات ممتاز على الأرض لحماية من الهبوط القوي.",
    sizes: SHOE_SIZES,
    colors: [{ name: "White/Blue", nameAr: "أبيض × أزرق", value: "#2563EB" }, { name: "Black", nameAr: "أسود", value: "#111111" }],
    category: "basketball", categoryAr: "كرة سلة",
    details: ["High-abrasion herringbone traction outsole", "Padded ankle collar with midfoot strap", "Dual-density cushioning for landings"],
    detailsAr: ["نعل خارجي بنقشة تمنح ثباتاً عالياً", "ياقة كاحل مبطنة مع حزام تثبيت", "توسيد مزدوج الكثافة لامتصاص الهبوط"],
    isNewArrival: true, isTopSelling: true
  },
  {
    id: "3",
    name: "Everyday Classic White Sneakers",
    nameAr: "سنيكرز أبيض كلاسيك يومي",
    slug: "everyday-classic-white-sneakers",
    price: 1950, originalPrice: 2400, discountPercent: 19,
    rating: 4.9, reviewCount: 342,
    images: [img("photo-1600185365483-26d7a4cc7519"), img("photo-1552346154-21d32810aba3")],
    description: "The clean white sneaker that goes with everything — soft leather, cushioned insole, all-day comfort.",
    descriptionAr: "السنيكرز الأبيض النظيف اللي يليق على كل حاجة — جلد ناعم ونعل داخلي مريح لطول اليوم.",
    sizes: SHOE_SIZES,
    colors: [{ name: "White", nameAr: "أبيض", value: "#FFFFFF" }, { name: "Beige", nameAr: "بيج", value: "#D6C7AE" }],
    category: "lifestyle", categoryAr: "لايف ستايل",
    details: ["Full-grain soft leather upper", "Memory-foam cushioned insole", "Stain-resistant easy-clean finish"],
    detailsAr: ["وجه علوي من الجلد الطبيعي الناعم", "نعل داخلي إسفنجي مريح", "طبقة مقاومة للبقع سهلة التنظيف"],
    isNewArrival: true, isTopSelling: true
  },
  {
    id: "4",
    name: "FlexForge Training Shoes",
    nameAr: "حذاء تمرين فليكس فورج",
    slug: "flexforge-training-shoes",
    price: 2300, originalPrice: 2750, discountPercent: 16,
    rating: 4.6, reviewCount: 128,
    images: [img("photo-1606107557195-0e29a4b5b4aa"), img("photo-1539185441755-769473a23570")],
    description: "Stable, flexible trainer for lifting, HIIT and cross-training — flat heel for power, flex grooves for agility.",
    descriptionAr: "حذاء تمرين ثابت ومرن للحديد والتمارين عالية الكثافة — كعب مسطح للقوة ومرونة للحركة السريعة.",
    sizes: SHOE_SIZES,
    colors: [{ name: "Royal Blue", nameAr: "أزرق ملكي", value: "#1D4ED8" }, { name: "Grey", nameAr: "رمادي", value: "#6B7280" }],
    category: "training", categoryAr: "تمرين",
    details: ["Flat 4mm-drop heel for lifting stability", "Wide toe box for natural splay", "Reinforced sidewalls for lateral moves"],
    detailsAr: ["كعب مسطح 4مم لثبات الرفع", "مقدمة واسعة لراحة الأصابع", "جوانب مقواة للحركات الجانبية"],
    isNewArrival: true
  },
  {
    id: "5",
    name: "Retro Street High-Tops",
    nameAr: "هاي توب ريترو ستريت",
    slug: "retro-street-high-tops",
    price: 2150, originalPrice: 2600, discountPercent: 17,
    rating: 4.7, reviewCount: 198,
    images: [img("photo-1560769629-975ec94e6a86"), img("photo-1595341888016-a392ef81b7de")],
    description: "Retro high-top silhouette in bold colourways — street style icon with padded collar comfort.",
    descriptionAr: "هاي توب بستايل ريترو وألوان جريئة — أيقونة الشارع مع ياقة مبطنة مريحة.",
    sizes: SHOE_SIZES,
    colors: [{ name: "Solar Yellow", nameAr: "أصفر شمسي", value: "#EAB308" }, { name: "White", nameAr: "أبيض", value: "#FFFFFF" }],
    category: "lifestyle", categoryAr: "لايف ستايل",
    details: ["Canvas and suede mixed upper", "Padded high collar", "Classic vulcanised rubber sole"],
    detailsAr: ["خامة مخلوطة قماش وشمواه", "ياقة عالية مبطنة", "نعل مطاطي كلاسيكي"],
    isTopSelling: true
  },
  {
    id: "6",
    name: "Trail Beast Off-Road Runners",
    nameAr: "حذاء تريل بيست للطرق الوعرة",
    slug: "trail-beast-off-road-runners",
    price: 3100, originalPrice: 3900, discountPercent: 21,
    rating: 4.8, reviewCount: 97,
    images: [img("photo-1605348532760-6753d2c43329"), img("photo-1543508282-6319a3e2621f")],
    description: "Aggressive-lug trail runner with water-resistant upper and rock plate for desert and mountain trails.",
    descriptionAr: "حذاء جري للطرق الوعرة بنعل قوي وخامة مقاومة للمياه وحماية من الصخور للدروب الصحراوية والجبلية.",
    sizes: SHOE_SIZES,
    colors: [{ name: "Sand", nameAr: "رملي", value: "#C2A878" }, { name: "Black", nameAr: "أسود", value: "#111111" }],
    category: "running", categoryAr: "جري",
    details: ["5mm multidirectional trail lugs", "Water-resistant ripstop upper", "Forefoot rock plate protection"],
    detailsAr: ["نتوءات 5مم للثبات على كل الاتجاهات", "وجه مقاوم للمياه", "طبقة حماية من الصخور"],
  },
  {
    id: "7",
    name: "AirFlex Knit Lifestyle Shoes",
    nameAr: "حذاء إير فليكس نيت لايف ستايل",
    slug: "airflex-knit-lifestyle-shoes",
    price: 1750, originalPrice: 2100, discountPercent: 17,
    rating: 4.5, reviewCount: 264,
    images: [img("photo-1491553895911-0055eca6402d"), img("photo-1512374382149-233c42b6a83b")],
    description: "Sock-like knit sneaker that slips on in seconds — the ultimate commute and travel companion.",
    descriptionAr: "سنيكرز قماش مرن يتلبس في ثواني — رفيقك المثالي للمشاوير والسفر.",
    sizes: SHOE_SIZES,
    colors: [{ name: "Black", nameAr: "أسود", value: "#111111" }, { name: "Red", nameAr: "أحمر", value: "#DC2626" }],
    category: "lifestyle", categoryAr: "لايف ستايل",
    details: ["One-piece breathable knit upper", "Slip-on design with pull tab", "Ultra-light 210g build"],
    detailsAr: ["وجه قماشي قطعة واحدة يتنفس", "تصميم سهل اللبس", "خفيف جداً 210 جرام"],
    isTopSelling: true
  },
  {
    id: "8",
    name: "Marathon Elite Carbon Racers",
    nameAr: "حذاء ماراثون إيليت كاربون",
    slug: "marathon-elite-carbon-racers",
    price: 5200, originalPrice: 6200, discountPercent: 16,
    rating: 4.9, reviewCount: 76,
    images: [img("photo-1549298916-b41d501d3772"), img("photo-1579338559194-a162d19bf842")],
    description: "Carbon-plated race-day weapon with maximum energy return — built for personal bests.",
    descriptionAr: "سلاح يوم السباق بصفيحة كاربون وأقصى إرجاع للطاقة — اتعمل عشان تكسر رقمك الشخصي.",
    sizes: SHOE_SIZES,
    colors: [{ name: "White/Orange", nameAr: "أبيض × برتقالي", value: "#EA580C" }, { name: "Black", nameAr: "أسود", value: "#111111" }],
    category: "running", categoryAr: "جري",
    details: ["Full-length carbon fibre plate", "Race foam with 85% energy return", "Weight: 195g (EU 42) · Drop: 8mm"],
    detailsAr: ["صفيحة كاربون بطول الحذاء", "إسفنج سباقات يرجع 85% من الطاقة", "الوزن: 195 جرام (مقاس 42) · الفرق: 8مم"],
    isNewArrival: true
  }
];

export const PRODUCTS: Product[] = products;

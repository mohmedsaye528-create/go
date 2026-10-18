import React from 'react';
import { Star, CheckCircle, Truck, ShieldCheck, RotateCcw, Banknote, X } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { DressStyleBrowse } from '../components/DressStyleBrowse';

interface HomeProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectCategoryFilter: (category: string | null) => void;
  onShopNow: () => void;
  isArabic: boolean;
  categoryFilter?: string | null;
  onClearCategoryFilter?: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onSelectProduct,
  onQuickAdd,
  onSelectCategoryFilter,
  onShopNow,
  isArabic,
  categoryFilter,
  onClearCategoryFilter,
}) => {
  if (categoryFilter) {
    const filtered = PRODUCTS.filter((p) => p.category === categoryFilter);
    const catName = filtered[0] ? (isArabic ? filtered[0].categoryAr : filtered[0].category) : categoryFilter;
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-950 capitalize">{catName}</h1>
          <button type="button" onClick={onClearCategoryFilter} className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 hover:text-orange-800 cursor-pointer">
            <X className="w-4 h-4" />{isArabic ? 'عرض الكل' : 'View All'}
          </button>
        </div>
        <p className="text-sm text-zinc-500 mb-4">{filtered.length} {isArabic ? 'منتج' : 'products'}</p>
        <ProductGrid title={String(catName)} titleAr={String(catName)} products={filtered} onSelectProduct={onSelectProduct} onQuickAdd={onQuickAdd} isArabic={isArabic} showDivider={false} />
      </div>
    );
  }
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);
  const topSelling = PRODUCTS.filter((p) => p.isTopSelling);

  const testimonials = [
    {
      name: isArabic ? 'سارة المنشاوي' : 'Sarah M.',
      city: isArabic ? 'التجمع الخامس، القاهرة' : 'New Cairo',
      quote: isArabic
        ? '"أفضل حذاء جري جربته! النعل مريح جداً والمقاس طلع مظبوط بالمللي بفضل جدول المقاسات."'
        : '"Blown away by the cushioning. Ran a half marathon in them straight out of the box — zero blisters, pure comfort."',
    },
    {
      name: isArabic ? 'أحمد الشاذلي' : 'Alex K.',
      city: isArabic ? 'سموحة، الإسكندرية' : 'Alexandria',
      quote: isArabic
        ? '"المقاس مظبوط جداً والأوردر وصلني في 48 ساعة مع شركة بوسطة. تجربة التسوق والدفع عند الاستلام سلسة جداً."'
        : '"Finding original sneakers in Egypt was always hard until KHATWA. Authentic, fairly priced, and they fit perfectly."',
    },
    {
      name: isArabic ? 'عمر فاروق' : 'James L.',
      city: isArabic ? 'الشيخ زايد، الجيزة' : 'Sheikh Zayed',
      quote: isArabic
        ? '"خدمة العملاء ممتازة واستبدلت المقاس مجاناً من غير أي وجع دماغ، هكرر الشراء بدون تردد."'
        : '"As a basketball player I need grip and ankle support — these delivered both. Best court shoes I have owned."',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Hero Section */}
      <Hero onShopNow={onShopNow} isArabic={isArabic} />

      {/* 2. New Arrivals Grid */}
      <div id="new-arrivals">
        <ProductGrid
          title="New Arrivals"
          titleAr="وصل حديثاً"
          products={newArrivals.length > 0 ? newArrivals : PRODUCTS.slice(0, 4)}
          onSelectProduct={onSelectProduct}
          onQuickAdd={onQuickAdd}
          isArabic={isArabic}
          showDivider={true}
        />
      </div>

      {/* 3. Top Selling Grid */}
      <div id="top-selling">
        <ProductGrid
          title="Top Selling"
          titleAr="الأكثر مبيعاً"
          products={topSelling.length > 0 ? topSelling : PRODUCTS.slice(2, 6)}
          onSelectProduct={onSelectProduct}
          onQuickAdd={onQuickAdd}
          isArabic={isArabic}
          showDivider={false}
        />
      </div>

      {/* Features strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
          {[
            { icon: Truck, ar: 'شحن سريع 24-72 ساعة', en: 'Fast 24-72h Shipping' },
            { icon: ShieldCheck, ar: 'أصلي 100% بضمان', en: '100% Authentic' },
            { icon: RotateCcw, ar: 'استبدال مقاس مجاني', en: 'Free Size Exchange' },
            { icon: Banknote, ar: 'الدفع عند الاستلام', en: 'Cash on Delivery' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-4">
              <f.icon className="w-6 h-6 text-orange-600 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-zinc-800">{isArabic ? f.ar : f.en}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Browse By Activity */}
      <DressStyleBrowse
        onSelectCategory={(style) => onSelectCategoryFilter(style)}
        isArabic={isArabic}
      />

      {/* 5. Customer Testimonials Section from Figma */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-950">
              {isArabic ? 'آراء وتجارب عملائنا' : 'Our Happy Customers'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white text-start space-y-3.5 shadow-xs"
              >
                {/* 5 Stars */}
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Customer name with verified badge */}
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-zinc-950">{item.name}</h3>
                  <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                  <span className="text-xs text-zinc-400">· {item.city}</span>
                </div>

                {/* Review text */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {item.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

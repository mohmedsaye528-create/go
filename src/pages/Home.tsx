import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
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
}

export const Home: React.FC<HomeProps> = ({
  onSelectProduct,
  onQuickAdd,
  onSelectCategoryFilter,
  onShopNow,
  isArabic,
}) => {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);
  const topSelling = PRODUCTS.filter((p) => p.isTopSelling);

  const testimonials = [
    {
      name: isArabic ? 'سارة المنشاوي' : 'Sarah M.',
      city: isArabic ? 'التجمع الخامس، القاهرة' : 'New Cairo',
      quote: isArabic
        ? '"أفضل تيشيرتات قطن اشتريتها في مصر! القماش تقيل ومش بيكش بعد الغسيل والتفاصيل ممتازة."'
        : '"I\'m blown away by the quality and craftsmanship. The oversized silhouette looks incredible and fits exactly like luxury European streetwear brands."',
    },
    {
      name: isArabic ? 'أحمد الشاذلي' : 'Alex K.',
      city: isArabic ? 'سموحة، الإسكندرية' : 'Alexandria',
      quote: isArabic
        ? '"القصة مظبوطة جداً والأوردر وصلني في 48 ساعة مع شركة بوسطة. تجربة التسوق والدفع عند الاستلام سلسة جداً."'
        : '"Finding apparel that fits my style was always hard until I ordered from SHOP.CO. The Egyptian cotton is super soft and breathable."',
    },
    {
      name: isArabic ? 'عمر فاروق' : 'James L.',
      city: isArabic ? 'الشيخ زايد، الجيزة' : 'Sheikh Zayed',
      quote: isArabic
        ? '"خدمة العملاء ممتازة والبناطيل خامتها مريحة وفخمة جداً، هكرر الشراء بدون تردد."'
        : '"As someone who values minimalist fashion, this brand hits all the right notes. Clean lines, no garish logos, high-tier fabric."',
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

      {/* 4. Browse By Dress Style */}
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

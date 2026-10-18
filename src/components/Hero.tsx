import React from 'react';
import { Zap, ArrowRight, ArrowLeft, Truck, ShieldCheck, RotateCcw } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  isArabic: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, isArabic }) => {
  return (
    <div className="bg-[#FFF7ED] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text & CTA Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10 py-4 sm:py-8 text-start">
            <span className="inline-flex items-center gap-1.5 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              <Zap className="w-3.5 h-3.5" />
              {isArabic ? 'تشكيلة 2026 وصلت' : 'The 2026 Collection Is Here'}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 uppercase leading-[1.08] text-balance">
              {isArabic ? (
                <>خطوتك الجاية <span className="text-orange-600 inline-block">تبدأ من هنا</span></>
              ) : (
                <>Your Next Step <span className="text-orange-600 inline-block">Starts Here</span></>
              )}
            </h1>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl">
              {isArabic
                ? 'أحذية جري ولايف ستايل وملاعب أصلية 100%، بنعل مريح مصمم للمشي والجري طول اليوم — وتوصيل سريع لكل محافظات مصر والدفع عند الاستلام.'
                : '100% authentic running, lifestyle and court shoes with all-day comfort cushioning — fast delivery across Egypt with cash on delivery.'}
            </p>

            <div>
              <button
                type="button"
                onClick={onShopNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-orange-600/25 transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <span>{isArabic ? 'تسوق الأحذية الآن' : 'Shop Shoes Now'}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-zinc-700">
              <span className="inline-flex items-center gap-1.5"><Truck className="w-4 h-4 text-orange-600" />{isArabic ? 'شحن لكل المحافظات' : 'Nationwide Shipping'}</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-orange-600" />{isArabic ? 'أصلي 100%' : '100% Authentic'}</span>
              <span className="inline-flex items-center gap-1.5"><RotateCcw className="w-4 h-4 text-orange-600" />{isArabic ? 'استبدال المقاس مجاناً' : 'Free Size Exchange'}</span>
            </div>

            {/* Metrics */}
            <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-between sm:justify-start gap-6 sm:gap-10 border-t border-orange-200/70">
              <div className="text-start">
                <p className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tabular-nums">120+</p>
                <p className="text-xs text-zinc-500 font-medium">{isArabic ? 'موديل سنيكرز' : 'Sneaker Models'}</p>
              </div>
              <div className="h-10 w-px bg-orange-200 hidden sm:block" />
              <div className="text-start">
                <p className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tabular-nums">40–46</p>
                <p className="text-xs text-zinc-500 font-medium">{isArabic ? 'مقاسات أوروبية' : 'EU Sizes'}</p>
              </div>
              <div className="h-10 w-px bg-orange-200 hidden sm:block" />
              <div className="text-start">
                <p className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tabular-nums">30,000+</p>
                <p className="text-xs text-zinc-500 font-medium">{isArabic ? 'عميل راضٍ بمصر' : 'Happy Customers'}</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="lg:col-span-5 relative flex items-end justify-center">
            <div className="absolute top-6 end-6 sm:top-10 sm:end-10 z-10 bg-zinc-950 text-white text-xs font-black px-3 py-2 rounded-xl rotate-6 shadow-lg pointer-events-none">
              -21% {isArabic ? 'اليوم' : 'TODAY'}
            </div>
            <div className="relative w-full max-w-md lg:max-w-none pt-4">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80"
                alt={isArabic ? 'حذاء جري رياضي' : 'Sports running shoe'}
                className="w-full h-auto object-cover rounded-t-3xl drop-shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Strip */}
      <div className="bg-zinc-950 text-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-6 sm:gap-10">
            <span className="font-sans text-xl sm:text-3xl font-black italic tracking-tighter text-zinc-200">NIKE</span>
            <span className="font-sans text-xl sm:text-3xl font-black tracking-widest text-zinc-200">adidas</span>
            <span className="font-sans text-xl sm:text-3xl font-black tracking-tighter text-zinc-200">PUMA</span>
            <span className="font-sans text-lg sm:text-2xl font-bold tracking-wide text-zinc-200">New Balance</span>
            <span className="font-sans text-xl sm:text-3xl font-black tracking-widest text-zinc-200">ASICS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkle, ArrowRight, ArrowLeft } from 'lucide-react';
import heroModelsImg from '../assets/images/hero_fashion_models_1791026488998.jpg';

interface HeroProps {
  onShopNow: () => void;
  isArabic: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, isArabic }) => {
  return (
    <div className="bg-[#F2F0F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text & CTA Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10 py-4 sm:py-8 text-start">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 uppercase leading-[1.08] text-balance">
              {isArabic ? (
                <>
                  ملابس تعكس <span className="inline-block">أسلوبك وتميزك</span>
                </>
              ) : (
                <>
                  Find clothes that <span className="inline-block">matches your style</span>
                </>
              )}
            </h1>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl">
              {isArabic
                ? 'استكشف تشكيلتنا المتنوعة المصنوعة بعناية فائقة من أجود أنواع القطن المصري لتبرز أناقتك وتمنحك أقصى درجات الراحة والجودة.'
                : 'Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.'}
            </p>

            <div>
              <button
                type="button"
                onClick={onShopNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm sm:text-base rounded-full shadow-lg shadow-zinc-950/15 transition-all duration-200 active:scale-98"
              >
                <span>{isArabic ? 'تسوق الآن' : 'Shop Now'}</span>
                {isArabic ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Metrics */}
            <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-between sm:justify-start gap-6 sm:gap-10 border-t border-zinc-200/80">
              <div className="text-start">
                <p className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tabular-nums">200+</p>
                <p className="text-xs text-zinc-500 font-medium">
                  {isArabic ? 'ماركة مختارة' : 'International Brands'}
                </p>
              </div>

              <div className="h-10 w-px bg-zinc-200 hidden sm:block" />

              <div className="text-start">
                <p className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tabular-nums">2,000+</p>
                <p className="text-xs text-zinc-500 font-medium">
                  {isArabic ? 'منتج عالي الجودة' : 'High-Quality Products'}
                </p>
              </div>

              <div className="h-10 w-px bg-zinc-200 hidden sm:block" />

              <div className="text-start">
                <p className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tabular-nums">30,000+</p>
                <p className="text-xs text-zinc-500 font-medium">
                  {isArabic ? 'عميل راضٍ بمصر' : 'Happy Customers'}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="lg:col-span-5 relative flex items-end justify-center">
            {/* Decorative Vector Stars from Figma */}
            <div className="absolute top-6 end-6 sm:top-12 sm:end-12 text-zinc-950 animate-pulse duration-1000 z-10 pointer-events-none">
              <Sparkle className="w-10 h-10 sm:w-14 sm:h-14 fill-zinc-950" />
            </div>
            <div className="absolute top-1/2 start-0 text-zinc-950 z-10 pointer-events-none hidden sm:block">
              <Sparkle className="w-6 h-6 sm:w-8 sm:h-8 fill-zinc-950" />
            </div>

            <div className="relative w-full max-w-md lg:max-w-none pt-4">
              <img
                src={heroModelsImg}
                alt="Contemporary Egyptian Fashion Collection"
                className="w-full h-auto object-cover object-bottom rounded-t-2xl sm:rounded-none drop-shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Strip Banner (Versace, Zara, Gucci, Prada, Calvin Klein) */}
      <div className="bg-zinc-950 text-white py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-6 sm:gap-10">
            <span className="font-serif text-xl sm:text-3xl font-bold tracking-widest text-zinc-200 hover:text-white transition-colors cursor-default">
              VERSACE
            </span>
            <span className="font-serif text-2xl sm:text-4xl font-black tracking-tighter text-zinc-200 hover:text-white transition-colors cursor-default">
              ZARA
            </span>
            <span className="font-serif text-xl sm:text-3xl font-semibold tracking-widest text-zinc-200 hover:text-white transition-colors cursor-default">
              GUCCI
            </span>
            <span className="font-sans text-xl sm:text-3xl font-black tracking-widest text-zinc-200 hover:text-white transition-colors cursor-default">
              PRADA
            </span>
            <span className="font-sans text-lg sm:text-2xl font-light tracking-wide text-zinc-200 hover:text-white transition-colors cursor-default">
              Calvin Klein
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

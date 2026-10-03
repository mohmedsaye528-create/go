import React, { useState } from 'react';
import { Mail, Check, Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  isArabic: boolean;
  onNavigateHome: () => void;
  onSelectCategoryFilter?: (cat: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({
  isArabic,
  onNavigateHome,
  onSelectCategoryFilter,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#F0F0F0] text-zinc-700 relative pt-24 sm:pt-28 pb-12 mt-24">
      {/* 1. Newsletter Card overlapping footer top (Figma design) */}
      <div className="absolute -top-20 sm:-top-24 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-start max-w-lg leading-tight">
            {isArabic
              ? 'ابقَ على اطلاع بأحدث التشكيلات والعروض الحصرية'
              : 'Stay up to date about our latest offers'}
          </h2>

          <div className="w-full lg:max-w-md space-y-3">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <span className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-zinc-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      isArabic ? 'أدخل بريدك الإلكتروني...' : 'Enter your email address'
                    }
                    className="w-full bg-white text-zinc-900 text-sm rounded-full ps-11 pe-4 py-3 sm:py-3.5 outline-hidden focus:ring-2 focus:ring-zinc-400 placeholder:text-zinc-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm rounded-full py-3 sm:py-3.5 transition-colors cursor-pointer"
                >
                  {isArabic ? 'اشترك في النشرة البريدية' : 'Subscribe to Newsletter'}
                </button>
              </form>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm font-semibold">
                <Check className="w-5 h-5" />
                <span>
                  {isArabic
                    ? 'شكراً لاشتراكك! كود خصمك الترويجي: SHOP20'
                    : 'Thank you! Use promo code SHOP20 for 20% off.'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-zinc-200">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4 text-start">
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950"
            >
              SHOP.CO
            </button>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed">
              {isArabic
                ? 'علامة أزياء مصرية تقدم تصاميم كاجوال عصرية بأعلى معايير جودة القطن المصري الصافي، لإطلالة يومية مريحة وأنيقة تدوم طويلاً.'
                : 'Premium Egyptian apparel crafted from 100% fine combed cotton. Minimal streetwear and everyday elevated essentials built to last.'}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white border border-zinc-200 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white flex items-center justify-center text-zinc-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white border border-zinc-200 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white flex items-center justify-center text-zinc-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-white border border-zinc-200 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white flex items-center justify-center text-zinc-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Company */}
          <div className="space-y-3 text-start">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950">
              {isArabic ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-500">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {isArabic ? 'عن البراند' : 'About'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategoryFilter?.('New Arrivals')}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {isArabic ? 'التشكيلات' : 'Collections'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {isArabic ? 'المصنع بالقاهرة' : 'Cairo Factory'}
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Help */}
          <div className="space-y-3 text-start">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950">
              {isArabic ? 'المساعدة' : 'Help'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-500">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {isArabic ? 'خدمة العملاء' : 'Customer Support'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {isArabic ? 'شحن بوسطة والمحافظات' : 'Courier & Delivery'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {isArabic ? 'سياسة الاستبدال' : 'Exchange & Returns'}
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 3: FAQ */}
          <div className="space-y-3 text-start">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-950">
              {isArabic ? 'الأسئلة الشائعة' : 'FAQ'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-500">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {isArabic ? 'طرق الدفع والتقسيط' : 'Payment Methods'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {isArabic ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {isArabic ? 'تتبع الشحنة' : 'Track Order'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2000-2026 SHOP.CO. {isArabic ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}.</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-white rounded border border-zinc-200 text-[10px] font-bold text-zinc-700">
              VISA
            </span>
            <span className="px-2 py-1 bg-white rounded border border-zinc-200 text-[10px] font-bold text-zinc-700">
              MASTERCARD
            </span>
            <span className="px-2 py-1 bg-white rounded border border-zinc-200 text-[10px] font-bold text-red-600">
              VODAFONE CASH
            </span>
            <span className="px-2 py-1 bg-white rounded border border-zinc-200 text-[10px] font-bold text-purple-700">
              INSTAPAY
            </span>
            <span className="px-2 py-1 bg-white rounded border border-zinc-200 text-[10px] font-bold text-zinc-800">
              MEEZA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

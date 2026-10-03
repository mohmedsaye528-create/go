import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  Globe,
  Tag,
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateHome: () => void;
  onSelectCategoryFilter?: (category: string | null) => void;
  isArabic: boolean;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateHome,
  onSelectCategoryFilter,
  isArabic,
  onToggleLanguage,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleNavCategory = (category: string | null) => {
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(category);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* 1. Top Announcement Banner (Figma: Sign up and get 20% off to your first order. Sign Up Now) */}
      {showBanner && (
        <div className="bg-zinc-950 text-white text-xs sm:text-sm py-2 px-4 relative transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-center text-center pr-6 pl-6">
            <p className="flex items-center gap-1.5 flex-wrap justify-center">
              <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {isArabic
                  ? 'سجل الآن واحصل على خصم 20% على طلبك الأول في جميع المحافظات.'
                  : 'Sign up and get 20% off your first order with fast Egyptian shipping.'}
              </span>
              <button
                type="button"
                onClick={() => handleNavCategory(null)}
                className="font-bold underline underline-offset-2 hover:text-zinc-300 ml-1 transition-colors cursor-pointer"
              >
                {isArabic ? 'تسوق الآن' : 'Shop Now'}
              </button>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            aria-label={isArabic ? 'إغلاق الإعلان' : 'Close banner'}
            className="absolute top-1/2 -translate-y-1/2 end-3 text-zinc-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Main Navigation Bar (Figma: SHOP.CO, Search, Links, Icons) */}
      <div className="border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Left Zone: Mobile Hamburger + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={isArabic ? 'القائمة الرئيسية' : 'Open menu'}
              className="lg:hidden p-1.5 -ms-1.5 text-zinc-800 hover:text-black focus-visible:outline-hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo (SHOP.CO) */}
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-2xl sm:text-3xl font-black tracking-tighter text-zinc-950 uppercase select-none hover:opacity-90 transition-opacity"
            >
              SHOP.CO
            </button>
          </div>

          {/* Center Zone: Desktop Navigation Links (Figma: Shop ▾, On Sale, New Arrivals, Brands) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-700">
            <button
              type="button"
              onClick={() => handleNavCategory(null)}
              className="flex items-center gap-1 hover:text-black transition-colors"
            >
              <span>{isArabic ? 'المتجر' : 'Shop'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>
            <button
              type="button"
              onClick={() => handleNavCategory('On Sale')}
              className="hover:text-black transition-colors"
            >
              {isArabic ? 'العروض والتخفيضات' : 'On Sale'}
            </button>
            <button
              type="button"
              onClick={() => handleNavCategory('New Arrivals')}
              className="hover:text-black transition-colors"
            >
              {isArabic ? 'وصل حديثاً' : 'New Arrivals'}
            </button>
            <button
              type="button"
              onClick={() => handleNavCategory('Brands')}
              className="hover:text-black transition-colors"
            >
              {isArabic ? 'التصنيفات' : 'Brands'}
            </button>
          </nav>

          {/* Search Input Bar (Figma: Light gray pill search) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-zinc-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isArabic ? 'ابحث عن التي شيرتات، البناطيل، المقاسات...' : 'Search for products, fits, cotton tees...'
                }
                className="w-full bg-[#F0F0F0] text-zinc-900 text-sm rounded-full ps-10 pe-4 py-2.5 outline-hidden focus:bg-[#EAEAEA] focus:ring-1 focus:ring-zinc-400 transition-all placeholder:text-zinc-400"
              />
            </div>
          </div>

          {/* Right Zone: Search toggle (mobile), Language switcher, Cart icon, Profile */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Mobile search toggle button */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label={isArabic ? 'بحث' : 'Search'}
              className="md:hidden p-2 text-zinc-700 hover:text-black"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher Button (Arabic / English) */}
            <button
              type="button"
              onClick={onToggleLanguage}
              title={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-full border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50 transition-all text-zinc-800"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isArabic ? 'EN' : 'عربي'}</span>
            </button>

            {/* Cart Icon with Live Badge Count */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={isArabic ? 'سلة المشتريات' : 'Shopping Cart'}
              className="relative p-2 text-zinc-900 hover:text-black hover:scale-105 active:scale-95 transition-transform"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 end-1 w-4.5 h-4.5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile icon */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={isArabic ? 'حسابي' : 'Account'}
              className="p-2 text-zinc-700 hover:text-black hidden sm:block"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search input expander */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative w-full">
              <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-zinc-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isArabic ? 'ابحث عن منتجات...' : 'Search for products...'}
                className="w-full bg-[#F0F0F0] text-sm rounded-full ps-9 pe-4 py-2 outline-hidden"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`w-4/5 max-w-sm bg-white h-full p-6 shadow-2xl flex flex-col justify-between animate-in duration-200 ${
              isArabic ? 'slide-in-from-right' : 'slide-in-from-left'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                <span className="text-2xl font-black tracking-tight text-zinc-950 uppercase">
                  SHOP.CO
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-4">
                <button
                  type="button"
                  onClick={() => handleNavCategory(null)}
                  className="w-full text-start text-base font-semibold text-zinc-900 py-2 hover:text-black transition-colors"
                >
                  {isArabic ? 'جميع المنتجات (المتجر)' : 'All Products (Shop)'}
                </button>
                <button
                  type="button"
                  onClick={() => handleNavCategory('On Sale')}
                  className="w-full text-start text-base font-semibold text-zinc-900 py-2 hover:text-black transition-colors flex items-center justify-between"
                >
                  <span>{isArabic ? 'العروض والتخفيضات' : 'On Sale'}</span>
                  <span className="text-[11px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">
                    -25%
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavCategory('New Arrivals')}
                  className="w-full text-start text-base font-semibold text-zinc-900 py-2 hover:text-black transition-colors"
                >
                  {isArabic ? 'وصل حديثاً' : 'New Arrivals'}
                </button>
                <button
                  type="button"
                  onClick={() => handleNavCategory('Pants')}
                  className="w-full text-start text-base font-semibold text-zinc-900 py-2 hover:text-black transition-colors"
                >
                  {isArabic ? 'بناطيل وجينز' : 'Pants & Denim'}
                </button>
                <button
                  type="button"
                  onClick={() => handleNavCategory('T-Shirts')}
                  className="w-full text-start text-base font-semibold text-zinc-900 py-2 hover:text-black transition-colors"
                >
                  {isArabic ? 'تي شيرتات أوفر سايز' : 'Oversized Tees'}
                </button>
              </div>
            </div>

            {/* Language and info footer */}
            <div className="pt-6 border-t border-zinc-100 space-y-4">
              <button
                type="button"
                onClick={() => {
                  onToggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-zinc-100 text-zinc-900 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>{isArabic ? 'Switch to English' : 'التحويل إلى العربية'}</span>
              </button>
              <p className="text-xs text-zinc-400 text-center">
                {isArabic ? 'صنع بكل فخر في مصر 🇪🇬' : 'Proudly Crafted in Egypt 🇪🇬'}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Ruler,
  Check,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { Product, ProductColor } from '../data/products';
import { SizeSelector } from '../components/SizeSelector';
import { ColorSwatches } from '../components/ColorSwatches';
import { SizeGuideModal } from '../components/SizeGuideModal';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  onNavigateHome: () => void;
  isArabic: boolean;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onAddToCart,
  onNavigateHome,
  isArabic,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'faq'>('details');

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-start">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 mb-6 sm:mb-10 font-medium">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-zinc-950 transition-colors cursor-pointer"
        >
          {isArabic ? 'الرئيسية' : 'Home'}
        </button>
        {isArabic ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-zinc-950 transition-colors cursor-pointer"
        >
          {isArabic ? 'المتجر' : 'Shop'}
        </button>
        {isArabic ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <span className="text-zinc-400">{isArabic ? product.categoryAr : product.category}</span>
        {isArabic ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        <span className="text-zinc-900 font-semibold truncate max-w-xs">
          {isArabic ? product.nameAr : product.name}
        </span>
      </nav>

      {/* 2. Main Product Grid (Gallery left, Contiguous Purchase Module right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Gallery (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails list */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
            {product.images.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`w-18 h-20 sm:w-24 sm:h-28 rounded-xl sm:rounded-2xl bg-[#F0EEED] p-1.5 overflow-hidden transition-all duration-150 shrink-0 ${
                  selectedImageIndex === index
                    ? 'ring-2 ring-zinc-950 scale-102'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Showcase Image */}
          <div className="flex-1 bg-[#F0EEED] rounded-2xl sm:rounded-3xl p-2 sm:p-4 flex items-center justify-center overflow-hidden aspect-4/5 sm:aspect-auto sm:min-h-[480px]">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={isArabic ? product.nameAr : product.name}
              className="w-full h-full object-cover rounded-xl sm:rounded-2xl max-h-[520px] transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Purchase Module (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Title & Reviews */}
          <div className="space-y-2 border-b border-zinc-100 pb-5">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 leading-tight">
              {isArabic ? product.nameAr : product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-amber-100 text-amber-200'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-zinc-900 tabular-nums">
                {product.rating.toFixed(1)}/5
              </span>
              <span className="text-zinc-400">({product.reviewCount} {isArabic ? 'تقييم' : 'reviews'})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tabular-nums">
                {product.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
              </span>
              {product.originalPrice && (
                <span className="text-lg font-bold text-zinc-400 line-through tabular-nums">
                  {product.originalPrice.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                </span>
              )}
              {product.discountPercent && (
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                  -{product.discountPercent}%
                </span>
              )}
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed pt-2">
              {isArabic ? product.descriptionAr : product.description}
            </p>
          </div>

          {/* Color Selector */}
          <div className="space-y-3 border-b border-zinc-100 pb-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                {isArabic ? 'اختر اللون' : 'Select Colors'}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                {isArabic ? selectedColor.nameAr : selectedColor.name}
              </span>
            </div>
            <ColorSwatches
              colors={product.colors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              isArabic={isArabic}
            />
          </div>

          {/* Size Selector + Size Guide */}
          <div className="space-y-3 border-b border-zinc-100 pb-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                {isArabic ? 'اختر المقاس' : 'Choose Size'}
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1 text-xs font-bold text-zinc-900 hover:underline cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>{isArabic ? 'دليل المقاسات' : 'Size Guide'}</span>
              </button>
            </div>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              isArabic={isArabic}
            />
          </div>

          {/* Quantity Stepper + Add To Cart CTA */}
          <div className="flex items-center gap-3.5 pt-2">
            {/* Quantity */}
            <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-3 gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="text-zinc-600 hover:text-black font-bold p-1"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold tabular-nums min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="text-zinc-600 hover:text-black font-bold p-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-98 ${
                isAddedFeedback
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-zinc-950 hover:bg-black text-white shadow-zinc-950/15'
              }`}
            >
              {isAddedFeedback ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>{isArabic ? 'تمت الإضافة للحقيبة بنجاح!' : 'Added to Cart!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>{isArabic ? 'إضافة إلى حقيبة التسوق' : 'Add to Cart'}</span>
                </>
              )}
            </button>
          </div>

          {/* Value Props & Guarantees */}
          <div className="pt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-zinc-600 border-t border-zinc-100">
            <div className="p-2 space-y-1">
              <Truck className="w-4 h-4 mx-auto text-zinc-900" />
              <p className="font-semibold text-zinc-900">{isArabic ? 'شحن سريع' : 'Fast Shipping'}</p>
              <p className="text-[10px] text-zinc-400">{isArabic ? 'خلال 48 ساعة' : '1-3 days'}</p>
            </div>
            <div className="p-2 space-y-1 border-x border-zinc-100">
              <ShieldCheck className="w-4 h-4 mx-auto text-zinc-900" />
              <p className="font-semibold text-zinc-900">{isArabic ? 'قطن مصري 100%' : '100% Cotton'}</p>
              <p className="text-[10px] text-zinc-400">{isArabic ? 'جودة فاخرة' : 'Combed jersey'}</p>
            </div>
            <div className="p-2 space-y-1">
              <RotateCcw className="w-4 h-4 mx-auto text-zinc-900" />
              <p className="font-semibold text-zinc-900">{isArabic ? 'استبدال مجاني' : 'Easy Returns'}</p>
              <p className="text-[10px] text-zinc-400">{isArabic ? 'خلال 14 يوم' : '14 days'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Product Tabs Section (Details, Reviews, FAQs) */}
      <div className="mt-14 sm:mt-20">
        <div className="flex border-b border-zinc-200 justify-around text-center">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-4 text-sm sm:text-base font-bold transition-colors relative ${
              activeTab === 'details'
                ? 'text-zinc-950 border-b-2 border-zinc-950'
                : 'text-zinc-400 hover:text-zinc-700'
            }`}
          >
            {isArabic ? 'تفاصيل ومواصفات المنتج' : 'Product Details'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-sm sm:text-base font-bold transition-colors relative ${
              activeTab === 'reviews'
                ? 'text-zinc-950 border-b-2 border-zinc-950'
                : 'text-zinc-400 hover:text-zinc-700'
            }`}
          >
            {isArabic ? `التقييمات (${product.reviewCount})` : `Rating & Reviews (${product.reviewCount})`}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`pb-4 text-sm sm:text-base font-bold transition-colors relative ${
              activeTab === 'faq'
                ? 'text-zinc-950 border-b-2 border-zinc-950'
                : 'text-zinc-400 hover:text-zinc-700'
            }`}
          >
            {isArabic ? 'الأسئلة الشائعة' : 'FAQs'}
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'details' && (
            <div className="max-w-3xl space-y-4">
              <h3 className="font-bold text-zinc-900 text-base">
                {isArabic ? 'مواصفات الخامات والصناعة:' : 'Fabric & Craftsmanship Specifications:'}
              </h3>
              <ul className="space-y-2.5">
                {(isArabic ? product.detailsAr : product.details).map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-sm text-zinc-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  author: isArabic ? 'كريم حسام (القاهرة)' : 'Karim H. (Cairo)',
                  rating: 5,
                  date: 'August 14, 2026',
                  text: isArabic
                    ? 'الخامة بجد تحفة وتنافس براندات زارا وأحسن، قطن تقيل وقصة الأوفر سايز مظبوطة بالمللي.'
                    : 'The fabric quality is beyond expectations! Heavy cotton, true oversized drape, and survived 5 washes without shrinking.',
                },
                {
                  author: isArabic ? 'يوسف الشناوي (الإسكندرية)' : 'Youssef S. (Alexandria)',
                  rating: 5,
                  date: 'August 19, 2026',
                  text: isArabic
                    ? 'التوصيل مع بوسطة كان سريع جداً واستلمت في خلال يومين، الألوان زي الصور بالضبط.'
                    : 'Fast shipping with Bosta courier, delivered in 2 days. The color and stitch details match the photos completely.',
                },
              ].map((rev, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-zinc-200/80 bg-white space-y-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-bold text-zinc-900 text-sm">{rev.author}</p>
                  <p className="text-xs text-zinc-600 leading-relaxed">"{rev.text}"</p>
                  <p className="text-[11px] text-zinc-400 pt-1">{rev.date}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="max-w-2xl space-y-4">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                <p className="font-bold text-sm text-zinc-900 mb-1">
                  {isArabic ? 'كيف أتأكد من اختيار المقاس الصحيح؟' : 'How do I choose the correct size?'}
                </p>
                <p className="text-xs text-zinc-600">
                  {isArabic
                    ? 'يمكنك الاطلاع على جدول المقاسات بالضغط على "دليل المقاسات" أعلاه للتعرف على محيط الصدر وطول التي شيرت.'
                    : 'Click on the "Size Guide" button above to view precise measurements in centimeters.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                <p className="font-bold text-sm text-zinc-900 mb-1">
                  {isArabic ? 'هل يمكنني معاينة الأوردر قبل الدفع؟' : 'Can I inspect the package before paying?'}
                </p>
                <p className="text-xs text-zinc-600">
                  {isArabic
                    ? 'نعم بكل تأكيد، خدمة الدفع عند الاستلام تتيح لك فتح ومعاينة الشحنة أمام مندوب الشحن للتأكد من المقاس والجودة.'
                    : 'Yes, with Cash on Delivery you may inspect the items in front of the courier to verify size and condition.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        isArabic={isArabic}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
  isArabic: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAdd,
  isArabic,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer flex flex-col text-start transition-transform duration-200 hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="relative aspect-square sm:aspect-4/3 w-full bg-[#F0EEED] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center p-3 sm:p-5">
        {!imageError ? (
          <img
            src={product.images[0]}
            alt={isArabic ? product.nameAr : product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-200 text-zinc-500 p-4 text-center">
            <ShoppingBag className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-xs font-medium">{isArabic ? product.nameAr : product.name}</span>
          </div>
        )}

        {/* Quick action overlay on desktop */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hidden sm:flex items-center gap-2">
          {onQuickAdd && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product);
              }}
              className="flex-1 bg-zinc-900/95 hover:bg-black text-white text-xs font-semibold py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-md backdrop-blur-xs transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isArabic ? 'إضافة سريعة' : 'Quick Add'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            aria-label={isArabic ? 'عرض التفاصيل' : 'View details'}
            className="w-9 h-9 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 flex items-center justify-center shadow-md transition-colors shrink-0"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock / Discount Tag */}
        {product.discountPercent && (
          <div className="absolute top-3 start-3 bg-red-500/10 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-red-200/50">
            -{product.discountPercent}%
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-3 sm:mt-4 space-y-1">
        <h3 className="font-bold text-sm sm:text-base text-zinc-900 line-clamp-1 group-hover:text-zinc-600 transition-colors">
          {isArabic ? product.nameAr : product.name}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-amber-100 text-amber-200'
                }`}
              />
            ))}
          </div>
          <span className="font-medium text-zinc-800 tabular-nums">
            {product.rating.toFixed(1)}/5
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="font-extrabold text-base sm:text-lg text-zinc-900 tabular-nums">
            {product.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm font-semibold text-zinc-400 line-through tabular-nums">
              {product.originalPrice.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
            </span>
          )}
          {product.discountPercent && (
            <span className="text-[11px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
              -{product.discountPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

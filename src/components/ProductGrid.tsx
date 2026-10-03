import React, { useState } from 'react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  title: string;
  titleAr: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
  isArabic: boolean;
  showDivider?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  titleAr,
  products,
  onSelectProduct,
  onQuickAdd,
  isArabic,
  showDivider = true,
}) => {
  const [expanded, setExpanded] = useState(false);
  const visibleProducts = expanded ? products : products.slice(0, 4);

  return (
    <section className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-900 mb-8 sm:mb-12">
          {isArabic ? titleAr : title}
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
              isArabic={isArabic}
            />
          ))}
        </div>

        {/* View All Button */}
        {products.length > 4 && (
          <div className="mt-8 sm:mt-12">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center justify-center px-10 sm:px-14 py-3 sm:py-3.5 border border-zinc-200 hover:border-zinc-900 text-zinc-900 text-sm font-semibold rounded-full bg-white hover:bg-zinc-50 transition-all duration-150"
            >
              {expanded
                ? isArabic ? 'عرض أقل' : 'View Less'
                : isArabic ? 'عرض الكل' : 'View All'}
            </button>
          </div>
        )}

        {/* Subtle Section Divider */}
        {showDivider && (
          <div className="mt-14 sm:mt-20 border-b border-zinc-100" />
        )}
      </div>
    </section>
  );
};

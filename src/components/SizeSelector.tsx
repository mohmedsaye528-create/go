import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  isArabic: boolean;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
  isArabic,
}) => {
  return (
    <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={isArabic ? 'اختر المقاس' : 'Choose Size'}>
      {sizes.map((size) => {
        const isSelected = selectedSize === size;
        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectSize(size)}
            className={`min-w-12 h-11 px-4 text-sm font-semibold rounded-full transition-all duration-150 flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-900 ${
              isSelected
                ? 'bg-zinc-900 text-white shadow-xs scale-102'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-900'
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
};

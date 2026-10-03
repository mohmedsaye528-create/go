import React from 'react';
import { Check } from 'lucide-react';
import { ProductColor } from '../data/products';

interface ColorSwatchesProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
  isArabic: boolean;
}

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({
  colors,
  selectedColor,
  onSelectColor,
  isArabic,
}) => {
  return (
    <div className="flex items-center gap-3" role="radiogroup" aria-label={isArabic ? 'اختر اللون' : 'Select Colors'}>
      {colors.map((color) => {
        const isSelected = selectedColor.name === color.name;
        const isLight = color.value.toLowerCase() === '#ffffff' || color.value.toLowerCase() === '#f5f5f0';

        return (
          <button
            key={color.name}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={isArabic ? color.nameAr : color.name}
            title={isArabic ? color.nameAr : color.name}
            onClick={() => onSelectColor(color)}
            className={`group relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-900 ${
              isSelected ? 'ring-2 ring-zinc-900 ring-offset-2 scale-105' : 'hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
          >
            {isLight && (
              <span className="absolute inset-0 rounded-full border border-zinc-200 pointer-events-none" />
            )}
            {isSelected && (
              <Check
                className={`w-4 h-4 transition-transform ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}
                strokeWidth={3}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

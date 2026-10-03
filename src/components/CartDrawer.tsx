import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem } from '../hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  isArabic: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  isArabic,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl ms-auto animate-in duration-200 ${
          isArabic ? 'slide-in-from-left me-auto ms-0' : 'slide-in-from-right ms-auto me-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-zinc-900" />
            <h2 id="cart-drawer-title" className="text-lg sm:text-xl font-bold uppercase tracking-tight text-zinc-950">
              {isArabic ? 'حقيبة التسوق' : 'Your Cart'}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 tabular-nums">
              {items.length} {isArabic ? 'قطع' : 'items'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isArabic ? 'إغلاق' : 'Close'}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-zinc-900 text-base">
                  {isArabic ? 'حقيبتك فارغة حالياً' : 'Your cart is empty'}
                </p>
                <p className="text-xs text-zinc-500 max-w-xs">
                  {isArabic
                    ? 'تصفح أحدث تشكيلة من الملابس القطنية الفاخرة واختر ما يناسبك.'
                    : 'Explore our latest collection of premium minimal apparel and add items.'}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-full transition-colors"
              >
                {isArabic ? 'ابدأ التسوق' : 'Start Shopping'}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 pb-4 border-b border-zinc-100 group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#F0EEED] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                  <img
                    src={item.image}
                    alt={isArabic ? item.nameAr : item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-start space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-zinc-900 truncate">
                      {isArabic ? item.nameAr : item.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={isArabic ? 'حذف العنصر' : 'Remove item'}
                      className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Size & Color Metadata */}
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>
                      {isArabic ? 'المقاس:' : 'Size:'} <strong className="text-zinc-800">{item.size}</strong>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      {isArabic ? 'اللون:' : 'Color:'}
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full border border-zinc-300"
                        style={{ backgroundColor: item.color.value }}
                      />
                      <strong className="text-zinc-800">{isArabic ? item.color.nameAr : item.color.name}</strong>
                    </span>
                  </div>

                  {/* Price and Quantity stepper */}
                  <div className="flex items-center justify-between pt-1.5">
                    <span className="font-extrabold text-sm sm:text-base text-zinc-950 tabular-nums">
                      {item.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center bg-[#F0F0F0] rounded-full px-2 py-1 gap-2.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-zinc-700 hover:text-black"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold tabular-nums min-w-[14px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-zinc-700 hover:text-black"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout CTA */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-zinc-100 bg-white space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600 font-medium">
                {isArabic ? 'المجموع الفرعي:' : 'Subtotal:'}
              </span>
              <span className="text-lg font-extrabold text-zinc-950 tabular-nums">
                {subtotal.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 text-start">
              {isArabic
                ? 'تكلفة الشحن تُحسب في صفحة الدفع حسب المحافظة (تبدأ من 40 ج.م).'
                : 'Shipping calculated at checkout based on governorate (starts from 40 EGP).'}
            </p>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 sm:py-4 bg-zinc-950 hover:bg-black text-white font-semibold text-sm sm:text-base rounded-full flex items-center justify-center gap-2 shadow-lg shadow-zinc-950/15 transition-all duration-150 active:scale-98"
            >
              <span>{isArabic ? 'المتابعة لإتمام الطلب' : 'Go to Checkout'}</span>
              {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

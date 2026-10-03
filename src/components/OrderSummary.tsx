import React, { useState } from 'react';
import { Tag, Check } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shippingCost: number;
  discountRate?: number; // e.g. 0.2 for 20%
  isArabic: boolean;
  onApplyPromoCode?: (code: string) => boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingCost,
  discountRate = 0,
  isArabic,
  onApplyPromoCode,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [activeDiscountRate, setActiveDiscountRate] = useState(discountRate);

  const discountAmount = Math.round(subtotal * activeDiscountRate);
  const total = subtotal - discountAmount + shippingCost;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const code = promoInput.trim().toUpperCase();
    if (code === 'SHOP20' || code === 'FIRST20' || code === 'EGYPT') {
      setActiveDiscountRate(0.2);
      setAppliedPromo(code);
      setPromoError(null);
      if (onApplyPromoCode) onApplyPromoCode(code);
    } else {
      setPromoError(isArabic ? 'كود الخصم غير صالح أو منتهي الصلاحية' : 'Invalid or expired promo code');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 space-y-5">
      <h3 className="text-lg font-bold text-zinc-950 uppercase tracking-tight text-start">
        {isArabic ? 'ملخص الطلب' : 'Order Summary'}
      </h3>

      {/* Numerical breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-zinc-600">
          <span>{isArabic ? 'المجموع الفرعي' : 'Subtotal'}</span>
          <span className="font-semibold text-zinc-900 tabular-nums">
            {subtotal.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
          </span>
        </div>

        {activeDiscountRate > 0 && (
          <div className="flex justify-between text-red-600">
            <span>
              {isArabic ? 'الخصم الترويجي' : 'Discount'} ({Math.round(activeDiscountRate * 100)}%)
            </span>
            <span className="font-bold tabular-nums">
              -{discountAmount.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
            </span>
          </div>
        )}

        <div className="flex justify-between text-zinc-600">
          <span>{isArabic ? 'تكلفة الشحن والتوصيل' : 'Delivery Fee'}</span>
          <span className="font-semibold text-zinc-900 tabular-nums">
            {shippingCost > 0 ? (
              `${shippingCost.toLocaleString()} ${isArabic ? 'ج.م' : 'EGP'}`
            ) : (
              <span className="text-emerald-600 font-medium">
                {isArabic ? 'اختر المحافظة' : 'Select Governorate'}
              </span>
            )}
          </span>
        </div>

        <div className="pt-3 border-t border-zinc-100 flex justify-between items-baseline">
          <span className="font-bold text-base text-zinc-950">{isArabic ? 'الإجمالي الكلي' : 'Total'}</span>
          <span className="font-extrabold text-xl sm:text-2xl text-zinc-950 tabular-nums">
            {total.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
          </span>
        </div>
      </div>

      {/* Promo Code Input */}
      <form onSubmit={handleApply} className="space-y-2 pt-1">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-zinc-400 pointer-events-none">
              <Tag className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoError(null);
              }}
              placeholder={isArabic ? 'أدخل كود الخصم (جرب SHOP20)' : 'Add promo code (try SHOP20)'}
              className="w-full bg-[#F0F0F0] text-sm rounded-full ps-9 pe-3 py-2.5 outline-hidden focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-400"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-zinc-950 hover:bg-black text-white text-xs font-semibold rounded-full transition-colors shrink-0"
          >
            {isArabic ? 'تطبيق' : 'Apply'}
          </button>
        </div>

        {appliedPromo && (
          <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium text-start">
            <Check className="w-3.5 h-3.5" />
            <span>
              {isArabic ? `تم تفعيل الكود (${appliedPromo}) بخصم 20%` : `Applied code (${appliedPromo}) with 20% discount`}
            </span>
          </p>
        )}

        {promoError && (
          <p className="text-xs text-red-500 font-medium text-start">
            {promoError}
          </p>
        )}
      </form>
    </div>
  );
};

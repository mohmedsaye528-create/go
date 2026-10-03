import React from 'react';
import { Checkout } from '../components/Checkout';
import { CartItem } from '../hooks/useCart';

interface CheckoutPageProps {
  items: CartItem[];
  subtotal: number;
  onClearCart: () => void;
  onContinueShopping: () => void;
  isArabic: boolean;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  subtotal,
  onClearCart,
  onContinueShopping,
  isArabic,
}) => {
  return (
    <div className="min-h-[70vh] bg-zinc-50/50 py-4 sm:py-8">
      <Checkout
        items={items}
        subtotal={subtotal}
        onClearCart={onClearCart}
        onContinueShopping={onContinueShopping}
        isArabic={isArabic}
      />
    </div>
  );
};

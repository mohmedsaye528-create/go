import { tracking, PixelProductPayload, PixelOrderPayload } from '../lib/tracking';

export function useFacebookPixel() {
  const trackViewContent = (product: PixelProductPayload) => {
    tracking.trackViewContent(product);
  };

  const trackAddToCart = (product: PixelProductPayload, variant?: { size?: string; color?: string }) => {
    tracking.trackAddToCart(product, variant);
  };

  const trackInitiateCheckout = (cart: { subtotal: number; itemCount: number }) => {
    tracking.trackInitiateCheckout(cart);
  };

  const trackPurchase = (order: PixelOrderPayload) => {
    tracking.trackPurchase(order);
  };

  return {
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
  };
}

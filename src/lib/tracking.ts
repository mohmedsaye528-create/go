/**
 * Facebook Pixel / Meta Pixel tracking abstraction
 * Safe client-side wrapper that avoids runtime errors when pixel is not configured.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export interface PixelProductPayload {
  id: string;
  name: string;
  price: number;
  category?: string;
  size?: string;
  color?: string;
}

export interface PixelOrderPayload {
  orderId: string;
  total: number;
  currency: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export const tracking = {
  trackViewContent: (product: PixelProductPayload) => {
    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'ViewContent', {
          content_name: product.name,
          content_ids: [product.id],
          content_type: 'product',
          value: product.price,
          currency: 'EGP',
        });
      } else {
        // Safe placeholder log in development
        console.debug('[Pixel:ViewContent]', product);
      }
    } catch {
      // Ignore tracking errors in client
    }
  },

  trackAddToCart: (product: PixelProductPayload, variant?: { size?: string; color?: string }) => {
    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'AddToCart', {
          content_name: product.name,
          content_ids: [product.id],
          content_type: 'product',
          value: product.price,
          currency: 'EGP',
          variant_size: variant?.size,
          variant_color: variant?.color,
        });
      } else {
        console.debug('[Pixel:AddToCart]', product, variant);
      }
    } catch {
      // Ignore tracking errors
    }
  },

  trackInitiateCheckout: (cart: { subtotal: number; itemCount: number }) => {
    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          value: cart.subtotal,
          currency: 'EGP',
          num_items: cart.itemCount,
        });
      } else {
        console.debug('[Pixel:InitiateCheckout]', cart);
      }
    } catch {
      // Ignore tracking errors
    }
  },

  trackPurchase: (order: PixelOrderPayload) => {
    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Purchase', {
          value: order.total,
          currency: order.currency || 'EGP',
          content_type: 'product',
          order_id: order.orderId,
          contents: order.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            item_price: item.price,
          })),
        });
      } else {
        console.debug('[Pixel:Purchase]', order);
      }
    } catch {
      // Ignore tracking errors
    }
  },
};

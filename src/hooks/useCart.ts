import { useState, useEffect } from 'react';
import { Product, ProductColor } from '../data/products';
import { tracking } from '../lib/tracking';

export interface CartItem {
  id: string; // unique combo key: `${productId}-${size}-${color.name}`
  productId: string;
  name: string;
  nameAr: string;
  price: number;
  size: string;
  color: ProductColor;
  quantity: number;
  image: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shop_co_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shop_co_cart_items', JSON.stringify(items));
    } catch {
      // Storage unavailable
    }
  }, [items]);

  const addToCart = (
    product: Product,
    size: string,
    color: ProductColor,
    quantity: number = 1
  ) => {
    const variantId = `${product.id}-${size}-${color.name}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === variantId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: variantId,
          productId: product.id,
          name: product.name,
          nameAr: product.nameAr,
          price: product.price,
          size,
          color,
          quantity,
          image: product.images[0],
        };
        return [...prevItems, newItem];
      }
    });

    tracking.trackAddToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
      },
      { size, color: color.name }
    );

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    itemCount,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}

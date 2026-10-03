/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product, ProductColor } from './data/products';
import { useCart } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';

export default function App() {
  // Navigation / View State
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'checkout'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);

  // Language & RTL State (default Arabic for Egyptian brand, easily switchable to English)
  const [isArabic, setIsArabic] = useState<boolean>(() => {
    try {
      const savedLang = localStorage.getItem('shop_co_lang');
      return savedLang ? savedLang === 'ar' : true;
    } catch {
      return true;
    }
  });

  // Sync RTL and lang attributes on <html> element
  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    try {
      localStorage.setItem('shop_co_lang', isArabic ? 'ar' : 'en');
    } catch {
      // ignore
    }
  }, [isArabic]);

  // Cart Hook
  const {
    items,
    itemCount,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  // Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[1] || product.sizes[0];
    const defaultColor: ProductColor = product.colors[0];
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
  };

  const handleShopNow = () => {
    const el = document.getElementById('new-arrivals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('home');
    }
  };

  const handleSelectCategoryFilter = (category: string | null) => {
    setCurrentView('home');
    setTimeout(() => {
      if (category === 'On Sale' || category === 'New Arrivals') {
        const targetId = category === 'On Sale' ? 'top-selling' : 'new-arrivals';
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        const el = document.getElementById('new-arrivals');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleProceedToCheckout = () => {
    setCurrentView('checkout');
  };

  const handleToggleLanguage = () => {
    setIsArabic((prev) => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white text-zinc-950 font-sans ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* 1. Header & Navigation */}
      <Navbar
        cartCount={itemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateHome={handleNavigateHome}
        onSelectCategoryFilter={handleSelectCategoryFilter}
        isArabic={isArabic}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* 2. Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        subtotal={subtotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        isArabic={isArabic}
      />

      {/* 3. Main Views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <Home
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
            onSelectCategoryFilter={handleSelectCategoryFilter}
            onShopNow={handleShopNow}
            isArabic={isArabic}
          />
        )}

        {currentView === 'product' && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            onAddToCart={addToCart}
            onNavigateHome={handleNavigateHome}
            isArabic={isArabic}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            items={items}
            subtotal={subtotal}
            onClearCart={clearCart}
            onContinueShopping={handleNavigateHome}
            isArabic={isArabic}
          />
        )}
      </main>

      {/* 4. Footer with Newsletter Subscription */}
      <Footer
        isArabic={isArabic}
        onNavigateHome={handleNavigateHome}
        onSelectCategoryFilter={handleSelectCategoryFilter}
      />
    </div>
  );
}

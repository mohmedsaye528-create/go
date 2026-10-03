/**
 * Supabase-Ready Architecture for E-commerce Store
 * 
 * Recommended Tables:
 * - products (id, name, slug, price, original_price, category, stock, created_at)
 * - product_variants (id, product_id, size, color_name, color_hex, stock)
 * - orders (id, customer_name, phone, governorate, address, notes, subtotal, shipping_cost, total, payment_method, payment_status, receipt_image_url, created_at)
 * - order_items (id, order_id, product_id, product_name, size, color, quantity, unit_price, total_price)
 * - customers (id, name, phone, governorate, address, created_at)
 */

export interface DbOrder {
  id: string;
  customer_name: string;
  phone: string;
  governorate: string;
  address: string;
  notes?: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_method: 'cod' | 'transfer';
  payment_status: 'pending' | 'verified' | 'paid';
  receipt_image_url?: string;
  created_at: string;
  items: DbOrderItem[];
}

export interface DbOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  size: string;
  color: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image?: string;
}

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Clean data layer abstraction.
 * If Supabase credentials are configured, can send to Supabase REST endpoint.
 * Otherwise, persists to localStorage to provide a zero-error client prototype.
 */
export const db = {
  async insertOrder(orderPayload: Omit<DbOrder, 'id' | 'created_at'>): Promise<DbOrder> {
    const timestamp = new Date().toISOString();
    const orderNumber = `EG-${Date.now().toString().slice(-6)}`;
    const newOrder: DbOrder = {
      ...orderPayload,
      id: orderNumber,
      created_at: timestamp,
    };

    if (isSupabaseConfigured) {
      try {
        // Example direct Supabase REST insert without extra heavy SDK
        const response = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: 'return=representation',
          },
          body: JSON.stringify({
            id: newOrder.id,
            customer_name: newOrder.customer_name,
            phone: newOrder.phone,
            governorate: newOrder.governorate,
            address: newOrder.address,
            subtotal: newOrder.subtotal,
            shipping_cost: newOrder.shipping_cost,
            total: newOrder.total,
            payment_method: newOrder.payment_method,
            payment_status: newOrder.payment_status,
            receipt_image_url: newOrder.receipt_image_url,
            created_at: newOrder.created_at,
          }),
        });

        if (response.ok) {
          // Also insert order items
          await fetch(`${SUPABASE_URL}/rest/v1/order_items`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify(newOrder.items.map(item => ({ ...item, order_id: newOrder.id }))),
          });
        }
      } catch (err) {
        console.warn('Supabase call failed, falling back to local storage', err);
      }
    }

    // Always keep in local storage for local prototype demonstration & order lookup
    try {
      const existing = JSON.parse(localStorage.getItem('shop_co_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('shop_co_orders', JSON.stringify(existing));
    } catch {
      // Local storage disabled or full
    }

    return newOrder;
  },

  async getRecentOrders(): Promise<DbOrder[]> {
    try {
      const local = localStorage.getItem('shop_co_orders');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  },
};

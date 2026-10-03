import { useState } from 'react';
import { DbOrder } from '../lib/supabase';

export interface BostaShipmentResponse {
  success: boolean;
  trackingNumber: string;
  state: 'DELIVERY_REQUEST_CREATED' | 'PICKED_UP' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  awbUrl?: string;
  message?: string;
}

export interface BostaTrackingStatus {
  trackingNumber: string;
  status: string;
  statusAr: string;
  updatedAt: string;
  timeline: Array<{
    date: string;
    title: string;
    description: string;
  }>;
}

/**
 * useBosta Hook
 * Provides clean shipping integration abstraction for Egyptian courier Bosta.
 * Prepared for real API credentials (BOSTA_API_KEY) in the future without UI rewrites.
 */
export function useBosta() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createShipment = async (order: DbOrder): Promise<BostaShipmentResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate courier API dispatch latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      const trackingNumber = `BST-${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const response: BostaShipmentResponse = {
        success: true,
        trackingNumber,
        state: 'DELIVERY_REQUEST_CREATED',
        awbUrl: `https://app.bosta.co/api/v1/shipments/airwaybill/${trackingNumber}`,
        message: `تم إنشاء الشحنة بنجاح في بوسطة للعميل: ${order.customer_name}`,
      };

      return response;
    } catch (err: any) {
      const msg = err?.message || 'Failed to create Bosta shipment';
      setError(msg);
      return {
        success: false,
        trackingNumber: '',
        state: 'DELIVERY_REQUEST_CREATED',
        message: msg,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getShipmentStatus = async (trackingNumber: string): Promise<BostaTrackingStatus> => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        trackingNumber,
        status: 'In Transit with Courier',
        statusAr: 'جاري التوصيل مع مندوب الشحن',
        updatedAt: new Date().toLocaleTimeString('ar-EG'),
        timeline: [
          {
            date: 'اليوم، 10:00 ص',
            title: 'تم استلام الشحنة من المخزن',
            description: 'القاهرة - مخزن التجهيز الرئيسي',
          },
          {
            date: 'اليوم، 11:30 ص',
            title: 'خرج للتسليم',
            description: 'الشحنة مع مندوب التوصيل',
          },
        ],
      };
    } finally {
      setIsLoading(false);
    }
  };

  const cancelShipment = async (trackingNumber: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return {
        success: true,
        message: `تم إلغاء شحنة بوسطة رقم ${trackingNumber} بنجاح`,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createShipment,
    getShipmentStatus,
    cancelShipment,
  };
}

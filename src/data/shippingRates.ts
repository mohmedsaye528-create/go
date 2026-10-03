export interface ShippingRegion {
  id: 'cairo_giza' | 'delta_alex' | 'upper_egypt';
  nameEn: string;
  nameAr: string;
  rate: number;
  estimatedDaysEn: string;
  estimatedDaysAr: string;
}

export const SHIPPING_RATES: Record<string, ShippingRegion> = {
  cairo_giza: {
    id: 'cairo_giza',
    nameEn: 'Cairo & Giza',
    nameAr: 'القاهرة والجيزة',
    rate: 40,
    estimatedDaysEn: '1-2 business days',
    estimatedDaysAr: 'خلال 1-2 أيام عمل',
  },
  delta_alex: {
    id: 'delta_alex',
    nameEn: 'Alexandria & Delta',
    nameAr: 'الإسكندرية ومحافظات الدلتا',
    rate: 55,
    estimatedDaysEn: '2-3 business days',
    estimatedDaysAr: 'خلال 2-3 أيام عمل',
  },
  upper_egypt: {
    id: 'upper_egypt',
    nameEn: 'Upper Egypt & Canal',
    nameAr: 'محافظات الصعيد والقناة',
    rate: 75,
    estimatedDaysEn: '3-5 business days',
    estimatedDaysAr: 'خلال 3-5 أيام عمل',
  },
};

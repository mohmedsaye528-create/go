import { SHIPPING_RATES } from './shippingRates';

export interface Governorate {
  id: string;
  nameEn: string;
  nameAr: string;
  region: 'cairo_giza' | 'delta_alex' | 'upper_egypt';
  shippingRate: number;
}

export const GOVERNORATES: Governorate[] = [
  // Cairo & Giza (40 EGP)
  { id: 'cairo', nameEn: 'Cairo', nameAr: 'القاهرة', region: 'cairo_giza', shippingRate: 40 },
  { id: 'giza', nameEn: 'Giza', nameAr: 'الجيزة', region: 'cairo_giza', shippingRate: 40 },

  // Alexandria & Delta (55 EGP)
  { id: 'alexandria', nameEn: 'Alexandria', nameAr: 'الإسكندرية', region: 'delta_alex', shippingRate: 55 },
  { id: 'qalyubia', nameEn: 'Qalyubia', nameAr: 'القليوبية', region: 'delta_alex', shippingRate: 55 },
  { id: 'sharqia', nameEn: 'Sharqia', nameAr: 'الشرقية', region: 'delta_alex', shippingRate: 55 },
  { id: 'dakahlia', nameEn: 'Dakahlia', nameAr: 'الدقهلية (المنصورة)', region: 'delta_alex', shippingRate: 55 },
  { id: 'beheira', nameEn: 'Beheira', nameAr: 'البحيرة', region: 'delta_alex', shippingRate: 55 },
  { id: 'gharbia', nameEn: 'Gharbia', nameAr: 'الغربية (طنطا)', region: 'delta_alex', shippingRate: 55 },
  { id: 'menofia', nameEn: 'Menofia', nameAr: 'المنوفية', region: 'delta_alex', shippingRate: 55 },
  { id: 'damietta', nameEn: 'Damietta', nameAr: 'دمياط', region: 'delta_alex', shippingRate: 55 },
  { id: 'kafr_el_sheikh', nameEn: 'Kafr El Sheikh', nameAr: 'كفر الشيخ', region: 'delta_alex', shippingRate: 55 },
  { id: 'port_said', nameEn: 'Port Said', nameAr: 'بورسعيد', region: 'delta_alex', shippingRate: 55 },
  { id: 'ismailia', nameEn: 'Ismailia', nameAr: 'الإسماعيلية', region: 'delta_alex', shippingRate: 55 },
  { id: 'suez', nameEn: 'Suez', nameAr: 'السويس', region: 'delta_alex', shippingRate: 55 },

  // Upper Egypt & Canal (75 EGP)
  { id: 'faiyum', nameEn: 'Faiyum', nameAr: 'الفيوم', region: 'upper_egypt', shippingRate: 75 },
  { id: 'beni_suef', nameEn: 'Beni Suef', nameAr: 'بني سويف', region: 'upper_egypt', shippingRate: 75 },
  { id: 'minya', nameEn: 'Minya', nameAr: 'المنيا', region: 'upper_egypt', shippingRate: 75 },
  { id: 'asyut', nameEn: 'Asyut', nameAr: 'أسيوط', region: 'upper_egypt', shippingRate: 75 },
  { id: 'sohag', nameEn: 'Sohag', nameAr: 'سوهاج', region: 'upper_egypt', shippingRate: 75 },
  { id: 'qena', nameEn: 'Qena', nameAr: 'قنا', region: 'upper_egypt', shippingRate: 75 },
  { id: 'luxor', nameEn: 'Luxor', nameAr: 'الأقصر', region: 'upper_egypt', shippingRate: 75 },
  { id: 'aswan', nameEn: 'Aswan', nameAr: 'أسوان', region: 'upper_egypt', shippingRate: 75 },
  { id: 'red_sea', nameEn: 'Red Sea (Hurghada)', nameAr: 'البحر الأحمر (الغردقة)', region: 'upper_egypt', shippingRate: 75 },
  { id: 'matrouh', nameEn: 'Marsa Matrouh', nameAr: 'مرسى مطروح', region: 'upper_egypt', shippingRate: 75 },
  { id: 'south_sinai', nameEn: 'South Sinai (Sharm El Sheikh)', nameAr: 'جنوب سيناء (شرم الشيخ)', region: 'upper_egypt', shippingRate: 75 },
];

export function getGovernorateById(id: string): Governorate | undefined {
  return GOVERNORATES.find((g) => g.id === id);
}

export function getShippingRateForGovernorate(governorateId: string): number {
  const gov = getGovernorateById(governorateId);
  return gov ? gov.shippingRate : SHIPPING_RATES.cairo_giza.rate;
}

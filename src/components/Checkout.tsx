import React, { useState, useRef } from 'react';
import {
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  Upload,
  X,
  FileImage,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { GOVERNORATES, getShippingRateForGovernorate } from '../data/governorates';
import { CartItem } from '../hooks/useCart';
import { db, DbOrder } from '../lib/supabase';
import { tracking } from '../lib/tracking';
import { useBosta } from '../hooks/useBosta';

interface CheckoutProps {
  items: CartItem[];
  subtotal: number;
  onClearCart: () => void;
  onContinueShopping: () => void;
  isArabic: boolean;
}

export const Checkout: React.FC<CheckoutProps> = ({
  items,
  subtotal,
  onClearCart,
  onContinueShopping,
  isArabic,
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('cairo');
  const [streetAddress, setStreetAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'transfer'>('cod');

  // Receipt image state for Vodafone Cash / InstaPay
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [receiptPreviewUrl, setReceiptPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<DbOrder | null>(null);
  const [bostaTrackingNumber, setBostaTrackingNumber] = useState<string | null>(null);

  const { createShipment } = useBosta();

  // Dynamic shipping calculation
  const shippingCost = items.length > 0 ? getShippingRateForGovernorate(selectedGovernorate) : 0;
  const total = subtotal + shippingCost;

  // Egyptian phone number validator: 11 digits starting with 010, 011, 012, or 015
  const validateEgyptianPhone = (num: string): boolean => {
    const cleaned = num.trim().replace(/[\s-]/g, '');
    const regex = /^01[0125][0-9]{8}$/;
    return regex.test(cleaned);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          receipt: isArabic ? 'يرجى رفع صورة بصيغة JPG أو PNG أو WEBP' : 'Please upload a JPG, PNG or WEBP image',
        }));
        return;
      }

      setReceiptImage(file);
      const url = URL.createObjectURL(file);
      setReceiptPreviewUrl(url);

      setErrors((prev) => {
        const next = { ...prev };
        delete next.receipt;
        return next;
      });
    }
  };

  const removeReceipt = () => {
    setReceiptImage(null);
    if (receiptPreviewUrl) {
      URL.revokeObjectURL(receiptPreviewUrl);
      setReceiptPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = isArabic ? 'الاسم بالكامل مطلوب' : 'Full name is required';
    }

    if (!phone.trim()) {
      newErrors.phone = isArabic ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (!validateEgyptianPhone(phone)) {
      newErrors.phone = isArabic
        ? 'رقم الهاتف يجب أن يتكون من 11 رقم ويبدأ بـ 010 أو 011 أو 012 أو 015'
        : 'Must be an 11-digit Egyptian mobile number starting with 010, 011, 012, or 015';
    }

    if (!streetAddress.trim()) {
      newErrors.streetAddress = isArabic
        ? 'عنوان التوصيل بالتفصيل مطلوب (الشارع / العمارة / الشقة)'
        : 'Detailed delivery address is required';
    }

    if (paymentMethod === 'transfer' && !receiptImage) {
      newErrors.receipt = isArabic
        ? 'يرجى إرفاق إيصال أو لقطة شاشة التحويل لتأكيد الطلب'
        : 'Please attach payment transfer screenshot to verify your order';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Prepare Order Object
      const orderPayload: Omit<DbOrder, 'id' | 'created_at'> = {
        customer_name: fullName.trim(),
        phone: phone.trim(),
        governorate: selectedGovernorate,
        address: streetAddress.trim(),
        notes: notes.trim() || undefined,
        subtotal,
        shipping_cost: shippingCost,
        total,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'verified',
        receipt_image_url: receiptPreviewUrl || undefined,
        items: items.map((item) => ({
          id: `${item.id}-${Date.now()}`,
          order_id: '',
          product_id: item.productId,
          product_name: item.name,
          size: item.size,
          color: item.color.name,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
          image: item.image,
        })),
      };

      // 2. Insert into Supabase / local mock database
      const createdOrder = await db.insertOrder(orderPayload);

      // 3. Track Purchase via Facebook Pixel
      tracking.trackPurchase({
        orderId: createdOrder.id,
        total: createdOrder.total,
        currency: 'EGP',
        items: items.map((it) => ({
          id: it.productId,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
        })),
      });

      // 4. Dispatch Bosta Shipment Creation
      const bostaRes = await createShipment(createdOrder);
      if (bostaRes.success) {
        setBostaTrackingNumber(bostaRes.trackingNumber);
      }

      setSubmittedOrder(createdOrder);
      onClearCart();
    } catch (err) {
      console.error('Order submission error:', err);
      setErrors({
        submit: isArabic ? 'حدث خطأ أثناء حفظ الطلب، يرجى المحاولة مرة أخرى' : 'Failed to submit order, please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE VIEW
  if (submittedOrder) {
    const govObj = GOVERNORATES.find((g) => g.id === submittedOrder.governorate);
    const whatsappMsg = encodeURIComponent(
      `مرحباً SHOP.CO، أود متابعة طلبي رقم #${submittedOrder.id} بقيمة ${submittedOrder.total} ج.م.`
    );

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-start">
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Success Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight">
                  {isArabic ? 'تم استلام طلبك بنجاح!' : 'Order Placed Successfully!'}
                </h2>
                <p className="text-sm text-zinc-500">
                  {isArabic
                    ? 'شكراً لثقتك بنا. جاري الآن تجهيز شحنتك للتوصيل السريع.'
                    : 'Thank you for your order. We are preparing your shipment.'}
                </p>
              </div>
            </div>
            <div className="bg-zinc-100 px-4 py-2 rounded-xl text-end">
              <p className="text-[11px] text-zinc-500 font-medium">{isArabic ? 'رقم الطلب' : 'Order ID'}</p>
              <p className="text-base font-extrabold text-zinc-950 tabular-nums">#{submittedOrder.id}</p>
            </div>
          </div>

          {/* Delivery & Bosta Courier Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                <Truck className="w-4 h-4 text-zinc-700" />
                <span>{isArabic ? 'بيانات الشحن والتوصيل' : 'Shipping Details'}</span>
              </div>
              <p className="text-xs text-zinc-600">
                <strong>{submittedOrder.customer_name}</strong> ({submittedOrder.phone})
              </p>
              <p className="text-xs text-zinc-600">
                {isArabic ? govObj?.nameAr : govObj?.nameEn} — {submittedOrder.address}
              </p>
              {bostaTrackingNumber && (
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200">
                    {isArabic ? 'رقم بوليصة بوسطة:' : 'Bosta Waybill:'} <span className="font-mono">{bostaTrackingNumber}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                <CreditCard className="w-4 h-4 text-zinc-700" />
                <span>{isArabic ? 'طريقة الدفع' : 'Payment Method'}</span>
              </div>
              <p className="text-xs text-zinc-700 font-medium">
                {submittedOrder.payment_method === 'cod'
                  ? isArabic ? 'الدفع نقداً عند الاستلام (COD)' : 'Cash on Delivery (COD)'
                  : isArabic ? 'محفظة إلكترونية / إنستاباي (تم إرفاق الإيصال)' : 'E-Wallet / InstaPay (Receipt attached)'}
              </p>
              <p className="text-xs text-zinc-500">
                {isArabic ? 'الإجمالي المطلوب سداده:' : 'Total Amount Due:'}{' '}
                <strong className="text-zinc-950 tabular-nums">
                  {submittedOrder.total.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                </strong>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <a
              href={`https://wa.me/201000000000?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isArabic ? 'تأكيد عبر واتساب مع خدمة العملاء' : 'Confirm via WhatsApp'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <button
              type="button"
              onClick={onContinueShopping}
              className="w-full sm:w-auto py-3.5 px-8 bg-zinc-950 hover:bg-black text-white font-semibold text-sm rounded-full transition-colors"
            >
              {isArabic ? 'مواصلة التسوق' : 'Continue Shopping'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART CHECKOUT GUARD
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900">
          {isArabic ? 'حقيبة التسوق فارغة' : 'Your Shopping Bag is Empty'}
        </h2>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto">
          {isArabic
            ? 'يرجى إضافة منتجات إلى السلة أولاً لتتمكن من إتمام الطلب.'
            : 'Please add items to your cart before proceeding to checkout.'}
        </p>
        <button
          type="button"
          onClick={onContinueShopping}
          className="px-8 py-3 bg-zinc-950 text-white font-semibold text-sm rounded-full hover:bg-black transition-colors"
        >
          {isArabic ? 'تصفح المتجر' : 'Browse Catalog'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-start">
      {/* Breadcrumb & Title */}
      <div className="mb-6 sm:mb-8">
        <button
          type="button"
          onClick={onContinueShopping}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 mb-2 transition-colors cursor-pointer"
        >
          {isArabic ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{isArabic ? 'العودة للمتجر' : 'Back to Shop'}</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
          {isArabic ? 'إتمام الطلب السريع' : 'Fast Checkout'}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          {isArabic
            ? 'أدخل بياناتك للتوصيل السريع إلى باب منزلك في جميع محافظات مصر.'
            : 'Enter your details for fast courier delivery across Egypt.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Checkout Form (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-8">
            {/* Section 1: Customer Details */}
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-950 border-b border-zinc-100 pb-3 flex items-center justify-between">
                <span>{isArabic ? '1. بيانات المستلم والتوصيل' : '1. Delivery Details'}</span>
                <span className="text-xs font-normal text-zinc-400">
                  {isArabic ? 'جميع الحقول مطلوبة' : 'Required fields'}
                </span>
              </h2>

              {/* Full Name */}
              <div id="field-fullName" className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wide">
                  {isArabic ? 'الاسم بالكامل' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  placeholder={isArabic ? 'مثال: أحمد محمد محمود' : 'e.g. Ahmed Mohamed'}
                  className={`w-full bg-[#F0F0F0] text-sm text-zinc-900 rounded-xl px-4 py-3 outline-hidden focus:bg-[#EAEAEA] focus:ring-2 transition-all ${
                    errors.fullName ? 'ring-2 ring-red-500' : 'focus:ring-zinc-950'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Egyptian Phone Number with validation */}
              <div id="field-phone" className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wide">
                  {isArabic ? 'رقم الهاتف (موبايل مصري 11 رقم)' : 'Egyptian Mobile Number'} *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    dir="ltr"
                    maxLength={11}
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="010XXXXXXXX"
                    className={`w-full bg-[#F0F0F0] text-sm text-zinc-900 rounded-xl px-4 py-3 outline-hidden focus:bg-[#EAEAEA] focus:ring-2 font-mono tabular-nums transition-all ${
                      errors.phone ? 'ring-2 ring-red-500' : 'focus:ring-zinc-950'
                    }`}
                  />
                  <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 select-none">
                    +20 (مصر)
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  {isArabic
                    ? 'يبدأ بـ 010 أو 011 أو 012 أو 015 لمتابعة الشحنة مع المندوب.'
                    : '11 digits starting with 010, 011, 012, or 015.'}
                </p>
                {errors.phone && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Governorate Selection (with dynamic shipping rate) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wide">
                  {isArabic ? 'المحافظة' : 'Governorate'} *
                </label>
                <select
                  value={selectedGovernorate}
                  onChange={(e) => setSelectedGovernorate(e.target.value)}
                  className="w-full bg-[#F0F0F0] text-sm text-zinc-900 rounded-xl px-4 py-3 outline-hidden focus:bg-[#EAEAEA] focus:ring-2 focus:ring-zinc-950 transition-all font-medium"
                >
                  <optgroup label={isArabic ? 'القاهرة والجيزة (40 ج.م)' : 'Cairo & Giza (40 EGP)'}>
                    {GOVERNORATES.filter((g) => g.region === 'cairo_giza').map((g) => (
                      <option key={g.id} value={g.id}>
                        {isArabic ? `${g.nameAr} — ${g.shippingRate} ج.م` : `${g.nameEn} — ${g.shippingRate} EGP`}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={isArabic ? 'الإسكندرية ومحافظات الدلتا (55 ج.م)' : 'Delta & Alexandria (55 EGP)'}>
                    {GOVERNORATES.filter((g) => g.region === 'delta_alex').map((g) => (
                      <option key={g.id} value={g.id}>
                        {isArabic ? `${g.nameAr} — ${g.shippingRate} ج.م` : `${g.nameEn} — ${g.shippingRate} EGP`}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={isArabic ? 'الصعيد والمحافظات الحدودية (75 ج.م)' : 'Upper Egypt & Frontiers (75 EGP)'}>
                    {GOVERNORATES.filter((g) => g.region === 'upper_egypt').map((g) => (
                      <option key={g.id} value={g.id}>
                        {isArabic ? `${g.nameAr} — ${g.shippingRate} ج.م` : `${g.nameEn} — ${g.shippingRate} EGP`}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Full Street Address */}
              <div id="field-streetAddress" className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wide">
                  {isArabic ? 'عنوان التوصيل بالتفصيل' : 'Full Street Address'} *
                </label>
                <textarea
                  rows={2}
                  value={streetAddress}
                  onChange={(e) => {
                    setStreetAddress(e.target.value);
                    if (errors.streetAddress) setErrors((prev) => ({ ...prev, streetAddress: '' }));
                  }}
                  placeholder={
                    isArabic
                      ? 'اسم الشارع، رقم العمارة، الدور، رقم الشقة، علامة مميزة'
                      : 'Street name, building number, floor, apt, nearby landmark'
                  }
                  className={`w-full bg-[#F0F0F0] text-sm text-zinc-900 rounded-xl px-4 py-3 outline-hidden focus:bg-[#EAEAEA] focus:ring-2 transition-all ${
                    errors.streetAddress ? 'ring-2 ring-red-500' : 'focus:ring-zinc-950'
                  }`}
                />
                {errors.streetAddress && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.streetAddress}</span>
                  </p>
                )}
              </div>

              {/* Notes (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-600">
                  {isArabic ? 'ملاحظات إضافية للمندوب (اختياري)' : 'Order Notes (Optional)'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isArabic ? 'مثال: التسليم بعد الساعة 5 مساءً' : 'e.g. Please deliver after 5 PM'}
                  className="w-full bg-[#F0F0F0] text-sm text-zinc-900 rounded-xl px-4 py-2.5 outline-hidden focus:bg-[#EAEAEA] focus:ring-1 focus:ring-zinc-400"
                />
              </div>
            </div>

            {/* Section 2: Payment Method */}
            <div className="space-y-4 pt-4 border-t border-zinc-100">
              <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                {isArabic ? '2. طريقة الدفع' : '2. Payment Method'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. COD (Default) */}
                <label
                  className={`relative flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-150 ${
                    paymentMethod === 'cod'
                      ? 'border-zinc-950 bg-zinc-50/80 shadow-xs'
                      : 'border-zinc-200 hover:border-zinc-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-zinc-950"
                  />
                  <div>
                    <p className="text-sm font-bold text-zinc-950">
                      {isArabic ? 'الدفع عند الاستلام' : 'Cash on Delivery (COD)'}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {isArabic ? 'ادفع نقداً لمندوب الشحن عند معاينة واستلام الأوردر.' : 'Pay in cash directly upon package delivery.'}
                    </p>
                  </div>
                </label>

                {/* 2. Vodafone Cash / InstaPay */}
                <label
                  className={`relative flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-150 ${
                    paymentMethod === 'transfer'
                      ? 'border-zinc-950 bg-zinc-50/80 shadow-xs'
                      : 'border-zinc-200 hover:border-zinc-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                    className="mt-1 accent-zinc-950"
                  />
                  <div>
                    <p className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                      <span>{isArabic ? 'فودافون كاش / إنستاباي' : 'Vodafone Cash / InstaPay'}</span>
                      <span className="text-[10px] font-extrabold bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                        تحويل فوري
                      </span>
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {isArabic ? 'تحويل للمحفظة مع إرفاق لقطة شاشة الإيصال.' : 'E-wallet transfer with receipt upload.'}
                    </p>
                  </div>
                </label>
              </div>

              {/* Conditional Vodafone Cash / InstaPay Panel */}
              {paymentMethod === 'transfer' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3.5">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                      {isArabic ? '📌 بيانات تحويل المتجر (قابلة للتهيئة):' : '📌 Merchant Transfer Details:'}
                    </p>
                    <div className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-amber-200 text-sm font-mono font-bold text-zinc-900">
                      <span>01000000000</span>
                      <span className="text-xs font-sans text-zinc-500 font-normal">
                        ({isArabic ? 'محفظة كاش / InstaPay IPA' : 'Cash Wallet / InstaPay'})
                      </span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {isArabic
                        ? `يرجى تحويل المبلغ الإجمالي (${total.toLocaleString()} ج.م) ثم رفع صورة الإيصال لتأكيد الأوردر فورا.`
                        : `Please transfer total of (${total.toLocaleString()} EGP) and attach screenshot below.`}
                    </p>
                  </div>

                  {/* Receipt Upload Field */}
                  <div id="field-receipt" className="space-y-2">
                    <label className="block text-xs font-bold text-zinc-900">
                      {isArabic ? 'صورة إيصال التحويل (JPG, PNG, WEBP)' : 'Transfer Receipt Screenshot'} *
                    </label>

                    {receiptPreviewUrl ? (
                      <div className="relative inline-block border-2 border-zinc-900 rounded-xl overflow-hidden p-1 bg-white">
                        <img
                          src={receiptPreviewUrl}
                          alt="Receipt Preview"
                          className="h-32 w-auto object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeReceipt}
                          aria-label={isArabic ? 'حذف الإيصال' : 'Remove receipt'}
                          className="absolute top-2 end-2 p-1 bg-zinc-950/80 hover:bg-black text-white rounded-full shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-zinc-300 hover:border-zinc-950 bg-white rounded-2xl p-6 text-center cursor-pointer transition-colors"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/jpg"
                          onChange={handleReceiptChange}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700">
                            <Upload className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-zinc-800">
                            {isArabic ? 'انقر لرفع صورة الإيصال' : 'Click to upload receipt photo'}
                          </span>
                          <span className="text-[11px] text-zinc-400">
                            JPG, PNG, WEBP (Max 5MB)
                          </span>
                        </div>
                      </div>
                    )}

                    {errors.receipt && (
                      <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.receipt}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Error banner if general submit error occurs */}
            {errors.submit && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-medium flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-zinc-950 hover:bg-black disabled:bg-zinc-600 text-white font-bold text-base rounded-full shadow-lg shadow-zinc-950/20 transition-all duration-150 active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isArabic ? 'جاري تأكيد وتسجيل الطلب...' : 'Processing Order...'}</span>
                  </span>
                ) : (
                  <>
                    <span>
                      {isArabic ? `تأكيد الطلب (${total.toLocaleString()} ج.م)` : `Complete Order (${total.toLocaleString()} EGP)`}
                    </span>
                    {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Order Items Review & Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-bold text-zinc-950 text-base uppercase tracking-tight">
                {isArabic ? 'عناصر الطلب' : 'Cart Items'} ({items.length})
              </h3>
              <button
                type="button"
                onClick={onContinueShopping}
                className="text-xs font-semibold text-zinc-600 hover:text-black"
              >
                {isArabic ? 'تعديل السلة' : 'Edit Cart'}
              </button>
            </div>

            {/* Items list */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#F0EEED] p-1 shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={isArabic ? item.nameAr : item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-zinc-900 truncate">
                      {isArabic ? item.nameAr : item.name}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {isArabic ? 'المقاس:' : 'Size:'} {item.size} · {isArabic ? 'الكمية:' : 'Qty:'} {item.quantity}
                    </p>
                  </div>
                  <div className="text-end font-bold text-xs text-zinc-950 tabular-nums">
                    {(item.price * item.quantity).toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-zinc-100 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>{isArabic ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                <span className="font-semibold text-zinc-900 tabular-nums">
                  {subtotal.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>{isArabic ? 'تكلفة الشحن والتوصيل:' : 'Courier Delivery:'}</span>
                <span className="font-semibold text-zinc-900 tabular-nums">
                  {shippingCost.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                </span>
              </div>
              <div className="pt-3 border-t border-zinc-100 flex justify-between items-baseline">
                <span className="font-extrabold text-sm sm:text-base text-zinc-950">
                  {isArabic ? 'المبلغ الإجمالي:' : 'Final Total:'}
                </span>
                <span className="font-black text-xl text-zinc-950 tabular-nums">
                  {total.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                </span>
              </div>
            </div>
          </div>

          {/* Egyptian Trust & Guarantee Badges */}
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-2 text-xs text-zinc-600">
            <p className="font-bold text-zinc-900">
              {isArabic ? '🛡️ ضمان وضوابط المتجر:' : '🛡️ Store Guarantees:'}
            </p>
            <ul className="space-y-1 list-disc list-inside text-[11px] text-zinc-600">
              <li>{isArabic ? 'معاينة المنتج مع مندوب الشحن قبل الاستلام' : 'Inspect package before receiving with courier'}</li>
              <li>{isArabic ? 'استبدال واسترجاع مجاني خلال 14 يوم' : 'Free 14-day exchange and return policy'}</li>
              <li>{isArabic ? 'قطن مصري 100% عالي الجودة ومضمون' : '100% authentic Egyptian combed cotton'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

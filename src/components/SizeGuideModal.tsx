import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic: boolean;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  isArabic,
}) => {
  if (!isOpen) return null;

  const measurements = [
    { size: 'S', chest: '102 cm (40")', length: '71 cm (28")', shoulder: '46 cm (18")' },
    { size: 'M', chest: '108 cm (42.5")', length: '73 cm (28.7")', shoulder: '48 cm (19")' },
    { size: 'L', chest: '114 cm (45")', length: '75 cm (29.5")', shoulder: '50 cm (19.7")' },
    { size: 'XL', chest: '120 cm (47")', length: '77 cm (30.3")', shoulder: '52 cm (20.5")' },
    { size: 'XXL', chest: '126 cm (49.5")', length: '79 cm (31")', shoulder: '54 cm (21.2")' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 id="size-guide-title" className="text-lg font-bold text-zinc-900">
                {isArabic ? 'دليل المقاسات' : 'Size Guide'}
              </h3>
              <p className="text-xs text-zinc-500">
                {isArabic ? 'القياسات بالسنتميتر لقصات الأوفر سايز والمقاس المريح' : 'All measurements in CM for relaxed & oversized fit'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={isArabic ? 'إغلاق' : 'Close'}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm text-center border-collapse">
            <thead>
              <tr className="bg-zinc-100/70 text-zinc-700 text-xs uppercase tracking-wider font-semibold">
                <th className="py-3 px-3 rounded-l-lg">{isArabic ? 'المقاس' : 'Size'}</th>
                <th className="py-3 px-3">{isArabic ? 'الصدر' : 'Chest'}</th>
                <th className="py-3 px-3">{isArabic ? 'الطول' : 'Length'}</th>
                <th className="py-3 px-3 rounded-r-lg">{isArabic ? 'الكتف' : 'Shoulder'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-zinc-900">{row.size}</td>
                  <td className="py-3.5 px-3 tabular-nums">{row.chest}</td>
                  <td className="py-3.5 px-3 tabular-nums">{row.length}</td>
                  <td className="py-3.5 px-3 tabular-nums">{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tip box */}
        <div className="mt-5 p-3.5 bg-zinc-50 rounded-xl text-xs text-zinc-600 leading-relaxed border border-zinc-100">
          <p className="font-semibold text-zinc-900 mb-1">
            {isArabic ? '💡 نصيحة لاختيار المقاس:' : '💡 Sizing Tip:'}
          </p>
          <p>
            {isArabic
              ? 'إذا كنت تفضل مظهر أوفر سايز واسع ومريح، اختر مقاسك المعتاد. إذا كنت تفضل قصة معتدلة مستقيمة، ننصح باختيار مقاس أصغر بدرجة واحدة.'
              : 'Our garments feature a modern relaxed cut. For an authentic oversized drape, choose your true size. For a regular fit, take one size down.'}
          </p>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-full transition-colors"
          >
            {isArabic ? 'فهمت، شكراً' : 'Got it, thanks'}
          </button>
        </div>
      </div>
    </div>
  );
};

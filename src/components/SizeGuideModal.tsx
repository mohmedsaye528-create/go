import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic: boolean;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, isArabic }) => {
  if (!isOpen) return null;

  const measurements = [
    { eu: '40', uk: '6', us: '7', foot: '25.0' },
    { eu: '41', uk: '7', us: '8', foot: '25.7' },
    { eu: '42', uk: '7.5', us: '8.5', foot: '26.0' },
    { eu: '43', uk: '8.5', us: '9.5', foot: '26.7' },
    { eu: '44', uk: '9.5', us: '10.5', foot: '27.4' },
    { eu: '45', uk: '10.5', us: '11.5', foot: '28.0' },
    { eu: '46', uk: '11', us: '12', foot: '28.5' },
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
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 id="size-guide-title" className="text-lg font-bold text-zinc-900">
                {isArabic ? 'دليل مقاسات الأحذية' : 'Shoe Size Guide'}
              </h3>
              <p className="text-xs text-zinc-500">
                {isArabic ? 'حوّل مقاسك بين الأوروبي والإنجليزي والأمريكي' : 'Convert between EU, UK and US shoe sizes'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={isArabic ? 'إغلاق' : 'Close'}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm text-center border-collapse">
            <thead>
              <tr className="bg-orange-50 text-zinc-700 text-xs uppercase tracking-wider font-semibold">
                <th className="py-3 px-3 rounded-s-lg">{isArabic ? 'أوروبي EU' : 'EU'}</th>
                <th className="py-3 px-3">{isArabic ? 'إنجليزي UK' : 'UK'}</th>
                <th className="py-3 px-3">{isArabic ? 'أمريكي US' : 'US'}</th>
                <th className="py-3 px-3 rounded-e-lg">{isArabic ? 'طول القدم (سم)' : 'Foot (cm)'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              {measurements.map((row) => (
                <tr key={row.eu} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-3 px-3 font-bold text-zinc-900">{row.eu}</td>
                  <td className="py-3 px-3 tabular-nums">{row.uk}</td>
                  <td className="py-3 px-3 tabular-nums">{row.us}</td>
                  <td className="py-3 px-3 tabular-nums">{row.foot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 p-3.5 bg-orange-50 rounded-xl text-xs text-zinc-600 leading-relaxed border border-orange-100">
          <p className="font-semibold text-zinc-900 mb-1">{isArabic ? 'نصيحة لاختيار المقاس:' : 'Sizing Tip:'}</p>
          <p>
            {isArabic
              ? 'قيس طول قدمك بالليل (القدم بتكون أكبر حاجة بسيطة) وضيف 0.5 سم. بين مقاسين؟ اختر الأكبر خصوصاً لأحذية الجري — ولو المقاس مظبطش، الاستبدال مجاني.'
              : 'Measure your foot in the evening and add 0.5 cm. Between sizes? Go bigger, especially for running shoes — and size exchange is always free.'}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-full transition-colors cursor-pointer"
          >
            {isArabic ? 'فهمت، شكراً' : 'Got it, thanks'}
          </button>
        </div>
      </div>
    </div>
  );
};

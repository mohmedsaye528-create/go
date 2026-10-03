import React from 'react';
import tshirtImg from '../assets/images/product_graphic_tshirt_1791026509051.jpg';
import overshirtImg from '../assets/images/product_linen_overshirt_1791026546218.jpg';
import poloImg from '../assets/images/product_polo_shirt_1791026524042.jpg';
import jeansImg from '../assets/images/product_denim_jeans_1791026535622.jpg';

interface DressStyleBrowseProps {
  onSelectCategory: (style: 'casual' | 'formal' | 'party' | 'gym') => void;
  isArabic: boolean;
}

export const DressStyleBrowse: React.FC<DressStyleBrowseProps> = ({
  onSelectCategory,
  isArabic,
}) => {
  const styles = [
    {
      id: 'casual' as const,
      name: 'Casual',
      nameAr: 'كاجوال عصري',
      image: tshirtImg,
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
    {
      id: 'formal' as const,
      name: 'Formal',
      nameAr: 'فورمال كلاسيك',
      image: overshirtImg,
      colSpan: 'sm:col-span-2 lg:col-span-2',
    },
    {
      id: 'party' as const,
      name: 'Party',
      nameAr: 'سهرات ومناسبات',
      image: poloImg,
      colSpan: 'sm:col-span-2 lg:col-span-2',
    },
    {
      id: 'gym' as const,
      name: 'Gym',
      nameAr: 'رياضي مريح',
      image: jeansImg,
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
  ];

  return (
    <section className="py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F0F0F0] rounded-3xl p-6 sm:p-12 lg:p-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-center text-zinc-950 mb-8 sm:mb-12">
            {isArabic ? 'تسوق حسب الإطلالة' : 'Browse by dress style'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {styles.map((style) => (
              <div
                key={style.id}
                onClick={() => onSelectCategory(style.id)}
                className={`group relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-white cursor-pointer transition-all duration-300 hover:shadow-lg ${style.colSpan}`}
              >
                {/* Background image preview */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={style.image}
                    alt={isArabic ? style.nameAr : style.name}
                    className="w-full h-full object-cover object-center opacity-85 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Title */}
                <div className="absolute top-5 start-6 z-10">
                  <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                    {isArabic ? style.nameAr : style.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

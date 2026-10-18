import React from 'react';

interface CategoryBrowseProps {
  onSelectCategory: (category: string) => void;
  isArabic: boolean;
}

export const DressStyleBrowse: React.FC<CategoryBrowseProps> = ({ onSelectCategory, isArabic }) => {
  const categories = [
    {
      id: 'running',
      name: 'Running',
      nameAr: 'أحذية جري',
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80',
      colSpan: 'sm:col-span-2 lg:col-span-2',
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      nameAr: 'لايف ستايل',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
    {
      id: 'basketball',
      name: 'Basketball',
      nameAr: 'كرة سلة',
      image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=80',
      colSpan: 'sm:col-span-1 lg:col-span-1',
    },
    {
      id: 'training',
      name: 'Training',
      nameAr: 'تمرين وجيم',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      colSpan: 'sm:col-span-2 lg:col-span-2',
    },
  ];

  return (
    <section className="py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF7ED] rounded-3xl p-6 sm:p-12 lg:p-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-center text-zinc-950 mb-8 sm:mb-12">
            {isArabic ? 'تسوق حسب النشاط' : 'Shop By Activity'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectCategory(cat.id)}
                aria-label={isArabic ? cat.nameAr : cat.name}
                className={`group relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-white cursor-pointer transition-all duration-300 hover:shadow-lg ${cat.colSpan}`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={isArabic ? cat.nameAr : cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-5 start-6 z-10">
                  <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                    {isArabic ? cat.nameAr : cat.name}
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

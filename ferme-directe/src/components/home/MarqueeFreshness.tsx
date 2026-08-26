'use client';

import { Star } from 'lucide-react';

export default function MarqueeFreshness() {
  const words = [
    "ROȘII ZEMOASE",
    "GUST DE ODINIOARĂ",
    "CULES MANUAL",
    "FĂRĂ PESTICIDE",
    "DIRECT DIN PĂMÂNT",
    "LIVRARE RAPIDĂ",
    "PRODUCĂTOR LOCAL"
  ];

  // We repeat the array 3 times to ensure a smooth infinite scroll
  const marqueeItems = [...words, ...words, ...words];

  return (
    <div className="relative w-full overflow-hidden bg-[#d9381e] border-b-2 border-zinc-900 py-4 flex items-center">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {marqueeItems.map((word, index) => (
          <div key={index} className="flex items-center mx-4">
            <span className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
              {word}
            </span>
            <Star className="w-6 h-6 ml-8 text-[#f3ca20] fill-[#f3ca20]" />
          </div>
        ))}
      </div>
      
      {/* Decorative inner shadow to give depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_4px_10px_rgba(24,24,27,0.15)]"></div>
    </div>
  );
}

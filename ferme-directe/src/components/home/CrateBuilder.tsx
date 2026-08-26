'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, Minus, PackageCheck } from 'lucide-react';

const BUILDER_ITEMS = [
  { id: 't-inima', name: 'Tomate Inimă de Bou', img: '/ferma_product_tomatoes_1787111483329.jpg', weight: 1 },
  { id: 't-cherry', name: 'Cherry Mix (Casă)', img: '/ferma_cherry_mix_1787374521390.jpg', weight: 0.5 },
  { id: 'c-cornichon', name: 'Castraveți', img: '/ferma_cucumbers_1787374584907.jpg', weight: 1 },
  { id: 'zacusca', name: 'Zacuscă Tradițională', img: '/ferma_zacusca_1787374607112.jpg', weight: 0.5 },
];

const MAX_WEIGHT = 5; // 5kg max box

export default function CrateBuilder() {
  const [crate, setCrate] = useState<{ [key: string]: number }>({});

  const currentWeight = BUILDER_ITEMS.reduce((total, item) => {
    return total + (crate[item.id] || 0) * item.weight;
  }, 0);

  const addItem = (id: string, weight: number) => {
    if (currentWeight + weight <= MAX_WEIGHT) {
      setCrate(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
  };

  const removeItem = (id: string) => {
    if (crate[id] > 0) {
      setCrate(prev => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  const progressPct = Math.min((currentWeight / MAX_WEIGHT) * 100, 100);
  const isFull = currentWeight === MAX_WEIGHT;

  return (
    <section className="py-24 md:py-32 bg-[#4b6631] border-b-2 border-zinc-900">
      <div className="container-site">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl uppercase text-[#f4efdf] mb-6">
            Compune-ți <br/><span className="text-[#f3ca20]">Cageta</span>.
          </h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto font-medium">
            Cutia perfectă are 5kg. Alege produsele tale preferate și noi o umplem cu grijă. 
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Builder Items */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BUILDER_ITEMS.map(item => (
              <div key={item.id} className="bg-[#f4efdf] border-2 border-zinc-900 rounded-2xl p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                <div className="relative w-20 h-20 rounded-xl border border-zinc-900 overflow-hidden flex-shrink-0">
                  <Image src={item.img} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-zinc-900 leading-tight mb-1">{item.name}</h4>
                  <p className="text-sm text-zinc-600 font-mono">{item.weight}kg</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={() => addItem(item.id, item.weight)}
                    disabled={currentWeight + item.weight > MAX_WEIGHT}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-900 text-[#f4efdf] rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#d9381e] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="font-display font-bold text-zinc-900 text-lg">
                    {crate[item.id] || 0}
                  </span>
                  <button 
                    onClick={() => removeItem(item.id)}
                    disabled={!crate[item.id]}
                    className="w-8 h-8 flex items-center justify-center border-2 border-zinc-900 text-zinc-900 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Crate Visualizer */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-[#f4efdf] border-2 border-zinc-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]">
              
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-display text-3xl uppercase text-zinc-900">Cageta Ta</h3>
                <span className="font-mono text-xl font-bold text-zinc-900">{currentWeight} / {MAX_WEIGHT} kg</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-8 bg-zinc-200 border-2 border-zinc-900 rounded-full overflow-hidden p-1 mb-8 relative">
                <motion.div 
                  className={`h-full rounded-full border-r-2 border-zinc-900 ${isFull ? 'bg-[#d9381e]' : 'bg-[#f3ca20]'}`}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ type: "spring", bounce: 0.4 }}
                />
                {isFull && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="absolute inset-0 flex items-center justify-center font-bold text-xs uppercase tracking-widest text-[#f4efdf] mix-blend-difference"
                  >
                    Cagetă Plină!
                  </motion.div>
                )}
              </div>

              {/* Visual Box items */}
              <div className="w-full h-48 bg-[#d2c9b1] border-2 border-zinc-900 rounded-xl relative overflow-hidden shadow-[inset_4px_4px_0px_0px_rgba(24,24,27,0.1)] mb-8 p-4 flex flex-wrap content-end gap-2">
                <AnimatePresence>
                  {Object.entries(crate).map(([id, count]) => {
                    if (count === 0) return null;
                    const item = BUILDER_ITEMS.find(i => i.id === id);
                    return Array.from({ length: count }).map((_, idx) => (
                      <motion.div
                        key={`${id}-${idx}`}
                        initial={{ opacity: 0, y: -50, scale: 0.5, rotate: Math.random() * 40 - 20 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", bounce: 0.6 }}
                        className="w-12 h-12 rounded-full border-2 border-zinc-900 overflow-hidden relative shadow-[2px_2px_0px_0px_rgba(24,24,27,0.5)]"
                      >
                        <Image src={item!.img} alt="item" fill className="object-cover" />
                      </motion.div>
                    ));
                  })}
                </AnimatePresence>
                {currentWeight === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-bold uppercase tracking-widest text-sm opacity-50">
                    Cageta este goală
                  </div>
                )}
              </div>

              <button className="btn w-full bg-[#d9381e] text-[#f4efdf] py-4 text-lg">
                <PackageCheck className="w-5 h-5 mr-2" />
                Finalizează Cageta (Demo)
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

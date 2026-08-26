'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const TOMATO_TYPES = [
  {
    id: 'inima',
    name: 'Inimă de Bou',
    desc: 'Gigantă, cărnoasă, perfectă pentru salate.',
    img: '/ferma_product_tomatoes_1787111483329.jpg',
    stats: { jumatate: 90, dulceata: 85, aciditate: 30, fermitate: 40 }
  },
  {
    id: 'kumato',
    name: 'Kumato Neagră',
    desc: 'Dulce, intensă, ușor crocantă.',
    img: '/ferma_kumato_1787374536791.jpg',
    stats: { jumatate: 70, dulceata: 95, aciditate: 20, fermitate: 80 }
  },
  {
    id: 'cherry',
    name: 'Cherry Mix',
    desc: 'Bomboanele naturii. Explozie de gust.',
    img: '/ferma_cherry_mix_1787374521390.jpg',
    stats: { jumatate: 80, dulceata: 100, aciditate: 50, fermitate: 85 }
  }
];

export default function SensoryRadar() {
  const [activeId, setActiveId] = useState(TOMATO_TYPES[0].id);
  const activeTomato = TOMATO_TYPES.find(t => t.id === activeId) || TOMATO_TYPES[0];

  const statConfig = [
    { key: 'jumatate', label: 'JUTOZITATE', color: 'bg-[#d9381e]' },
    { key: 'dulceata', label: 'DULCEAȚĂ', color: 'bg-[#f3ca20]' },
    { key: 'aciditate', label: 'ACIDITATE', color: 'bg-[#4b6631]' },
    { key: 'fermitate', label: 'FERMITATE', color: 'bg-[#18181b]' }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#f4efdf] border-b-2 border-zinc-900 overflow-hidden">
      <div className="container-site">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl uppercase text-zinc-900 mb-6">
            Găsește-ți <br/><span className="text-[#d9381e]">Perechea</span>.
          </h2>
          <p className="text-xl text-zinc-800 max-w-2xl mx-auto font-medium">
            Nu toate roșiile sunt create la fel. Descoperă profilul aromatic pentru a alege soiul perfect pentru rețeta ta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Selector & Display (Left) */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
              {TOMATO_TYPES.map(tomato => (
                <button
                  key={tomato.id}
                  onClick={() => setActiveId(tomato.id)}
                  className={`relative flex-shrink-0 w-32 h-32 rounded-2xl border-[3px] border-zinc-900 overflow-hidden snap-center transition-all duration-200 ${activeId === tomato.id ? 'shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] translate-y-[-4px]' : 'opacity-70 hover:opacity-100 hover:translate-y-[-2px]'}`}
                >
                  <Image src={tomato.img} alt={tomato.name} fill className="object-cover" />
                  {activeId === tomato.id && (
                    <div className="absolute inset-0 bg-zinc-900/10 border-4 border-[#d9381e] pointer-events-none"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-white p-8 border-2 border-zinc-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] rounded-2xl relative">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#f3ca20] border-2 border-zinc-900 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
                <span className="text-xl">🌶️</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTomato.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-display text-4xl text-zinc-900 uppercase mb-2">{activeTomato.name}</h3>
                  <p className="text-lg text-zinc-700 font-medium">{activeTomato.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Radar / Bars (Right) */}
          <div className="lg:col-span-6">
            <div className="flex flex-col gap-8 bg-zinc-100 p-8 md:p-12 border-2 border-zinc-900 rounded-3xl shadow-[inset_4px_4px_0px_0px_rgba(24,24,27,0.05)]">
              {statConfig.map((stat, i) => (
                <div key={stat.key} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-zinc-900 uppercase tracking-widest text-sm">{stat.label}</span>
                    <span className="font-display font-bold text-xl text-zinc-900">{activeTomato.stats[stat.key as keyof typeof activeTomato.stats]}%</span>
                  </div>
                  <div className="w-full h-6 bg-white border-2 border-zinc-900 rounded-full overflow-hidden p-[2px]">
                    <motion.div
                      className={`h-full rounded-full border-r-2 border-zinc-900 ${stat.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeTomato.stats[stat.key as keyof typeof activeTomato.stats]}%` }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

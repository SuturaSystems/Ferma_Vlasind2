'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const STEPS = [
  {
    title: 'Înrădăcinat în Tradiție.',
    text: 'Totul începe cu un sol bogat, neîntinat de chimicale. Lăsăm natura să-și facă treaba.',
    img: '/ferma_farm_aerial_1787111458478.jpg'
  },
  {
    title: 'Cules la Momentul Perfect.',
    text: 'Nu culegem niciodată roșiile verzi. Așteptăm ca soarele să le coacă pe vrej, pentru acel gust autentic.',
    img: '/ferma_kumato_1787374536791.jpg'
  },
  {
    title: 'Direct în Cămara Ta.',
    text: 'De pe câmp, în cutie, direct la ușa ta în mai puțin de 24 de ore. Fără depozite frigorifice.',
    img: '/ferma_box_basket_1787374646557.jpg'
  }
];

export default function StorytellingScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="poveste" className="relative bg-[#18181b] border-b-2 border-zinc-900">
      
      {/* Sticky Header */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-0">
        <h2 className="font-display text-[15vw] leading-none text-zinc-800 uppercase text-center opacity-30 mix-blend-overlay">
          Procesul
        </h2>
      </div>

      {/* Cards Stack */}
      <div className="relative z-10 container-site py-24 md:py-40 flex flex-col gap-32 md:gap-48">
        {STEPS.map((step, i) => {
          return (
            <div key={i} className="min-h-[60vh] flex items-center">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center w-full ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Text Side */}
                <motion.div 
                  className={`flex flex-col gap-6 ${i % 2 === 1 ? 'md:order-2' : ''}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                >
                  <div className="w-16 h-16 rounded-full border-2 border-[#f4efdf] flex items-center justify-center text-[#f4efdf] font-display text-2xl font-bold bg-[#18181b] shadow-[4px_4px_0px_0px_#f3ca20]">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-5xl md:text-6xl uppercase text-[#f4efdf]">
                    {step.title}
                  </h3>
                  <p className="text-xl text-zinc-400 max-w-md font-medium">
                    {step.text}
                  </p>
                </motion.div>

                {/* Image Side */}
                <motion.div 
                  className={`relative w-full aspect-[4/5] md:aspect-square max-w-md mx-auto ${i % 2 === 1 ? 'md:order-1' : ''}`}
                  initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? 5 : -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                >
                  <div className="w-full h-full rounded-2xl border-2 border-[#f4efdf] overflow-hidden shadow-[8px_8px_0px_0px_#d9381e]">
                    <Image src={step.img} alt={step.title} fill className="object-cover" />
                  </div>
                </motion.div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

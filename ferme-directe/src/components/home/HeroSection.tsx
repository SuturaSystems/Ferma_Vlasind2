'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative flex items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b-2 border-zinc-900 bg-[#f4efdf]">
      {/* Decorative background grid pattern (neo-retro touch) */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#18181b 2px, transparent 2px)', backgroundSize: '32px 32px' }}
      ></div>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border-[1.5px] border-zinc-900 bg-[#f3ca20] shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
                <Star className="w-4 h-4 text-zinc-900 fill-zinc-900" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">Noua recoltă a sosit</span>
              </div>
            </motion.div>

            <motion.h1 
              className="font-display text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] text-zinc-900 mb-6 uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              Tomate <br/>
              <span className="text-[#d9381e]">cu gust</span> <br/>
              adevărat.
            </motion.h1>

            <motion.p 
              className="text-xl text-zinc-800 max-w-[28ch] mb-10 font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              Fără pesticide. Fără compromisuri. Cultivate în pământ românesc, culese azi dimineață.
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <Link href="#produse" className="btn btn-primary bg-[#d9381e] text-white">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Umple Cageta
              </Link>
              <Link href="#poveste" className="btn btn-secondary bg-transparent text-zinc-900">
                Povestea Noastră
              </Link>
            </motion.div>
          </div>

          {/* Image Content (Asymmetric right side) */}
          <div className="lg:col-span-6 relative mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative w-full aspect-[4/5] md:aspect-square max-w-lg mx-auto"
            >
              {/* Spinning Badge */}
              <div className="absolute -top-8 -right-8 z-20 w-36 h-36 animate-[spin_10s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <circle cx="50" cy="50" r="48" fill="#f3ca20" stroke="#18181b" strokeWidth="3" />
                  <text className="font-display font-bold uppercase text-[11.5px] tracking-widest" fill="#18181b">
                    <textPath href="#circlePath" startOffset="0%">
                      • PROASPĂT CULES • PROASPĂT CULES • PROASPĂT CULES
                    </textPath>
                  </text>
                  {/* Center Icon */}
                  <text x="50" y="56" fontSize="32" textAnchor="middle" fill="#18181b">🍅</text>
                </svg>
              </div>

              {/* Main Image Container */}
              <div className="w-full h-full rounded-2xl border-[3px] border-zinc-900 overflow-hidden shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] relative bg-[#4b6631]">
                <Image
                  src="/ferma_hero_tomatoes_1787111449445.jpg"
                  alt="Tomate proaspete de fermă"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out mix-blend-overlay opacity-90"
                  priority
                />
              </div>

              {/* Decorative mini polaroid / sticker */}
              <div className="absolute -bottom-8 -left-8 z-20 w-44 h-52 bg-[#f4efdf] p-2 border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] rotate-[-6deg] hidden md:block">
                <div className="relative w-full h-[140px] bg-zinc-200 border-2 border-zinc-900 mb-2 overflow-hidden">
                   <Image src="/ferma_farm_aerial_1787111458478.jpg" alt="Ferma noastră" fill className="object-cover grayscale contrast-125" />
                </div>
                <p className="font-display text-sm font-bold text-center text-zinc-900 uppercase">Solul Nostru</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

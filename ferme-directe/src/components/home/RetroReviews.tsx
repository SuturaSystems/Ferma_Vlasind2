'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Maria D.',
    role: 'Client Fidel',
    text: 'Același gust din copilărie. Când tai roșia Inimă de Bou, miroase a vară.',
    rating: 5,
    rotation: -2
  },
  {
    id: 2,
    name: 'Chef Andrei M.',
    role: 'Bistro Local',
    text: 'Livrarea este mereu promptă, iar calitatea este constantă. Folosesc roșiile cherry pentru toate salatele noastre.',
    rating: 5,
    rotation: 3
  },
  {
    id: 3,
    name: 'Elena C.',
    role: 'Mamă',
    text: 'În sfârșit am găsit legume pe care copiii mei le mănâncă cu plăcere. Fără chimicale, doar gust pur.',
    rating: 5,
    rotation: -1
  }
];

export default function RetroReviews() {
  return (
    <section className="py-24 md:py-32 bg-[#f3ca20] border-b-2 border-zinc-900 overflow-hidden relative">
      {/* Decorative texture */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#18181b 2px, transparent 2px)', backgroundSize: '24px 24px' }}
      ></div>

      <div className="container-site relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-7xl uppercase text-zinc-900 mb-6">
            Ce spun <br/><span className="text-[#d9381e]">Vecinii</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto px-4 md:px-0">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: review.rotation }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15, type: "spring", bounce: 0.4 }}
              className="bg-[#f4efdf] border-2 border-zinc-900 p-8 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between"
              style={{
                /* Subtle paper texture effect */
                backgroundImage: 'linear-gradient(to bottom, transparent 95%, rgba(24,24,27,0.05) 95%)',
                backgroundSize: '100% 24px'
              }}
            >
              <div>
                <Quote className="w-8 h-8 text-[#d9381e] mb-6 opacity-80" />
                <p className="font-serif text-xl md:text-2xl text-zinc-900 leading-snug mb-8 font-medium italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t-2 border-zinc-900 pt-4 mt-auto">
                <div>
                  <h4 className="font-bold text-zinc-900 text-lg">{review.name}</h4>
                  <p className="text-sm font-mono text-zinc-600 uppercase">{review.role}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <span key={idx} className="text-xl">⭐</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

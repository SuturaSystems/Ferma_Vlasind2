'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Tomate Inimă de Bou',
    price: '15,00 RON/kg',
    img: '/ferma_product_tomatoes_1787111483329.jpg',
    tag: 'BESTSELLER',
    color: 'bg-[#d9381e]'
  },
  {
    id: 2,
    name: 'Castraveți Cornichon',
    price: '8,00 RON/kg',
    img: '/ferma_cucumbers_1787374584907.jpg',
    tag: 'CROCANȚI',
    color: 'bg-[#4b6631]'
  },
  {
    id: 3,
    name: 'Zacuscă Tradițională',
    price: '25,00 RON/borcan',
    img: '/ferma_zacusca_1787374607112.jpg',
    tag: 'ARTIZANAL',
    color: 'bg-[#f3ca20]'
  },
  {
    id: 4,
    name: 'Ouă de Curte',
    price: '1,50 RON/buc',
    img: '/ferma_eggs_1787112893059.jpg',
    tag: 'PROASPĂT',
    color: 'bg-[#f4efdf]'
  }
];

export default function TactileProductGrid() {
  return (
    <section id="produse" className="py-24 md:py-32 bg-[#d9381e] border-b-2 border-zinc-900">
      <div className="container-site">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-[#f4efdf] mb-4">
              Din Pământ,<br/>pe Masă.
            </h2>
            <p className="text-xl text-[#f4efdf] max-w-xl font-medium">
              Legume și produse artizanale cultivate cu respect. Alege ce e mai bun pentru familia ta.
            </p>
          </div>
          <Link href="/shop" className="btn btn-secondary bg-[#f3ca20] text-zinc-900 px-8 py-4">
            Vezi Tot Catalogul <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-craft flex flex-col h-full bg-[#f4efdf] group"
            >
              <div className="relative aspect-square border-b-2 border-zinc-900 overflow-hidden bg-zinc-200">
                <Image 
                  src={product.img} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4">
                  <span className={`badge ${product.color === 'bg-[#d9381e]' ? 'badge-terracotta' : product.color === 'bg-[#4b6631]' ? 'badge-laurel' : product.color === 'bg-[#f3ca20]' ? 'badge-saffron' : 'badge-neutral'}`}>
                    {product.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-zinc-900 mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-zinc-700 font-mono">
                    {product.price}
                  </p>
                </div>
                
                <button className="btn w-full bg-zinc-900 text-[#f4efdf] hover:bg-zinc-800 flex items-center justify-center gap-2 group-hover:bg-[#d9381e] group-hover:border-[#d9381e] transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Adaugă</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

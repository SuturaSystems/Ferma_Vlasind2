'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import type { Category } from '@/types';
import { PRODUCTS, getProductsByCategory } from '@/data/products';
import { useStore } from '@/store';
import ProductCard from '@/components/product/ProductCard';
import type { Metadata } from 'next';

const CATEGORIES_RO: { id: string; label: string; emoji: string }[] = [
  { id: 'all', label: 'Toate produsele', emoji: '🌱' },
  { id: 'tomate', label: 'Tomate', emoji: '🍅' },
  { id: 'legume', label: 'Legume', emoji: '🥬' },
  { id: 'oeufs', label: 'Ouă', emoji: '🥚' },
  { id: 'miel', label: 'Miere', emoji: '🍯' },
  { id: 'conserves', label: 'Conserve', emoji: '🫙' },
  { id: 'herbes', label: 'Ierburi', emoji: '🌿' },
];

const CATEGORIES_EN: { id: string; label: string; emoji: string }[] = [
  { id: 'all', label: 'All products', emoji: '🌱' },
  { id: 'tomate', label: 'Tomatoes', emoji: '🍅' },
  { id: 'legume', label: 'Vegetables', emoji: '🥬' },
  { id: 'oeufs', label: 'Eggs', emoji: '🥚' },
  { id: 'miel', label: 'Honey', emoji: '🍯' },
  { id: 'conserves', label: 'Preserves', emoji: '🫙' },
  { id: 'herbes', label: 'Herbs', emoji: '🌿' },
];

export default function BoutiquePage() {
  const { language } = useStore();
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [search, setSearch] = React.useState('');
  const categories = language === 'ro' ? CATEGORIES_RO : CATEGORIES_EN;

  const filteredProducts = React.useMemo(() => {
    let products = getProductsByCategory(activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.ro.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.description.ro.toLowerCase().includes(q)
      );
    }
    return products;
  }, [activeCategory, search]);

  return (
    <>
      {/* Page Hero */}
      <section style={{
        paddingTop: '8rem', paddingBottom: '3rem',
        background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-offwhite) 100%)',
      }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--color-brown)',
              marginBottom: '0.75rem',
            }}>
              {language === 'ro' ? 'Magazinul Fermei' : 'Farm Shop'}
            </h1>
            <p style={{
              fontSize: '1.0625rem',
              color: 'var(--color-text-muted)',
              maxWidth: '50ch',
            }}>
              {language === 'ro'
                ? 'Produse proaspete, culese în dimineața livrării. Totul direct de la ferma noastră din Oltenia.'
                : 'Fresh products, harvested the morning of delivery. Everything directly from our farm in Oltenia.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Search */}
      <div style={{
        position: 'sticky', top: 72, zIndex: 50,
        background: 'rgba(249,244,234,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-light)',
        padding: '1rem 0',
      }}>
        <div className="container-site">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flex: 1, overflowX: 'auto', paddingBottom: '4px' }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  id={`filter-${cat.id}`}
                  className="btn btn-sm"
                  style={{
                    whiteSpace: 'nowrap',
                    background: activeCategory === cat.id ? 'var(--color-terracotta)' : 'var(--color-surface)',
                    color: activeCategory === cat.id ? 'white' : 'var(--color-brown)',
                    border: activeCategory === cat.id ? 'none' : '1.5px solid var(--color-light)',
                    transition: 'all 200ms ease',
                  }}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', minWidth: '200px' }}>
              <Search size={16} style={{
                position: 'absolute', left: '0.75rem', top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)', pointerEvents: 'none',
              }} />
              <input
                type="search"
                id="product-search"
                className="input"
                placeholder={language === 'ro' ? 'Caută...' : 'Search...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '2.25rem', paddingRight: search ? '2.25rem' : '1rem', height: '38px' }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{
                  position: 'absolute', right: '0.75rem', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                }}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section style={{ padding: '2.5rem 0 5rem' }}>
        <div className="container-site">
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌾</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>
                {language === 'ro' ? 'Niciun produs găsit' : 'No products found'}
              </p>
              <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
                {language === 'ro' ? 'Resetează filtrele' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                {filteredProducts.length} {language === 'ro' ? 'produse' : 'products'}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}>
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} lang={language} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

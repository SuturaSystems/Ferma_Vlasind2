'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, getProductsByCategory } from '@/data/products';
import { useStore } from '@/store';
import ProductCard from '@/components/product/ProductCard';

const CATEGORIES = {
  ro: [
    { id: 'all', label: 'Toate Produsele' },
    { id: 'tomate', label: 'Tomate de Patrimoniu' },
    { id: 'legume', label: 'Legume & Verdețuri' },
    { id: 'oeufs', label: 'Ouă de Pășune' },
    { id: 'miel', label: 'Miere Crudă' },
    { id: 'conserves', label: 'Conserve Artizanale' },
  ],
  en: [
    { id: 'all', label: 'All Harvest' },
    { id: 'tomate', label: 'Heritage Tomatoes' },
    { id: 'legume', label: 'Greens & Vegetables' },
    { id: 'oeufs', label: 'Pasture Eggs' },
    { id: 'miel', label: 'Raw Honey' },
    { id: 'conserves', label: 'Artisan Preserves' },
  ],
};

export default function BoutiquePage() {
  const { language } = useStore();
  const l = language;
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [search, setSearch] = React.useState('');
  const categories = l === 'ro' ? CATEGORIES.ro : CATEGORIES.en;

  const filteredProducts = React.useMemo(() => {
    let products = getProductsByCategory(activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.ro.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.description.ro.toLowerCase().includes(q) ||
          p.description.en.toLowerCase().includes(q)
      );
    }
    return products;
  }, [activeCategory, search]);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* ── Page Header Banner ── */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 4.5rem) 0 2.5rem',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container-site">
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-laurel)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            {l === 'ro' ? 'Recoltă de Sezon' : 'Seasonal Harvest'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 600,
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            {l === 'ro' ? 'Magazinul Fermei' : 'The Farm Shop'}
          </h1>
          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--color-ink-muted)',
              maxWidth: '56ch',
              lineHeight: 1.6,
            }}
          >
            {l === 'ro'
              ? 'Fiecare produs este cules manual în zorii zilei și ambalat în ambalaje biodegradabile. Comandă astăzi pentru livrare mâine.'
              : 'Every item is hand-picked at dawn and packaged in biodegradable materials. Order today for delivery tomorrow.'}
          </p>
        </div>
      </section>

      {/* ── Filter & Search Control Bar ── */}
      <div
        style={{
          position: 'sticky',
          top: 70,
          zIndex: 40,
          backgroundColor: 'rgba(251, 249, 245, 0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
          padding: '1rem 0',
        }}
      >
        <div className="container-site">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Category Filter Pills */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '2px',
                flex: 1,
              }}
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    id={`filter-${cat.id}`}
                    className={`btn btn-sm ${isActive ? 'btn-dark' : 'btn-secondary'}`}
                    style={{
                      padding: '0.45rem 1rem',
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search
                size={15}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-ink-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="search"
                id="product-search"
                className="input"
                placeholder={l === 'ro' ? 'Caută un produs...' : 'Search a product...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  paddingLeft: '2.4rem',
                  paddingRight: search ? '2rem' : '1rem',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-ink-muted)',
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Catalog Grid ── */}
      <div className="container-site" style={{ paddingTop: '2.5rem' }}>
        {/* Results Counter */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.75rem',
            fontSize: '0.875rem',
            color: 'var(--color-ink-muted)',
          }}
        >
          <span>
            {filteredProducts.length} {l === 'ro' ? 'produse disponibile' : 'items available'}
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-terracotta)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {l === 'ro' ? 'Arată toate' : 'Show all'}
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '6rem 1rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                color: 'var(--color-ink)',
                marginBottom: '0.5rem',
              }}
            >
              {l === 'ro' ? 'Niciun produs găsit' : 'No products found'}
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-muted)', marginBottom: '1.5rem' }}>
              {l === 'ro'
                ? 'Încearcă să schimbi termenul de căutare sau categoria selectată.'
                : 'Try adjusting your search query or changing the category filter.'}
            </p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="btn btn-primary"
            >
              {l === 'ro' ? 'Resetează Filtrele' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} lang={l} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

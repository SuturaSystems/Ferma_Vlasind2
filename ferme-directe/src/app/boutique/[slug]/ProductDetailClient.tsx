'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBasket, Minus, Plus, Leaf, MapPin, Clock, ChevronLeft, Star } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/types';
import { useStore, formatPrice } from '@/store';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { addToCart, language } = useStore();
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  const l = language;
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && p.available
  ).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const t = {
    back: l === 'ro' ? '← Înapoi la magazin' : '← Back to shop',
    origin: l === 'ro' ? 'Origine' : 'Origin',
    harvest: l === 'ro' ? 'Recoltă' : 'Harvest',
    story: l === 'ro' ? 'Povestea Produsului' : 'Product Story',
    badges: l === 'ro' ? 'Certificări' : 'Certifications',
    related: l === 'ro' ? 'Produse Similare' : 'Similar Products',
    add: l === 'ro' ? `Adaugă ${qty > 1 ? `(×${qty})` : ''} în coș` : `Add ${qty > 1 ? `(×${qty})` : ''} to basket`,
    added: l === 'ro' ? '✓ Adăugat în coș!' : '✓ Added to basket!',
    total: l === 'ro' ? 'Total' : 'Total',
    inStock: l === 'ro' ? 'în stoc' : 'in stock',
    lowStock: l === 'ro' ? 'Stoc limitat!' : 'Limited stock!',
  };

  const categoryEmoji: Record<string, string> = {
    tomate: '🍅', legume: '🥬', herbes: '🌿',
    conserves: '🫙', oeufs: '🥚', miel: '🍯', panier: '🧺',
  };

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="container-site" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <Link href="/boutique" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
          fontSize: '0.875rem', color: 'var(--color-text-muted)',
          textDecoration: 'none',
          transition: 'color 150ms',
        }}>
          <ChevronLeft size={16} />
          {t.back}
        </Link>
      </div>

      {/* Product Detail */}
      <div className="container-site">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'start',
          paddingBottom: '4rem',
        }}>
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main image */}
            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              aspectRatio: '1',
              background: 'linear-gradient(135deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10rem',
              boxShadow: 'var(--shadow-lg)',
              marginBottom: '1rem',
            }}>
              {categoryEmoji[product.category] ?? '🌱'}
            </div>

            {/* Badges */}
            {product.badges.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.badges.map((badge) => (
                  <span key={badge} className="badge badge-sage" style={{ fontSize: '0.8125rem' }}>
                    <Leaf size={11} /> {badge}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category + Stock */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{
                fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-sage)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                {product.category}
              </span>
              <span className={`badge ${product.stock <= 5 ? 'badge-urgency' : 'badge-sage'}`}>
                {product.stock <= 5 ? `⚠ ${t.lowStock}` : `${product.stock} ${t.inStock}`}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--color-brown)',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
            }}>
              {product.name[l]}
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '1.0625rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              marginBottom: '1.75rem',
            }}>
              {product.description[l]}
            </p>

            {/* Meta info */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {product.origin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  <MapPin size={14} color="var(--color-sage)" />
                  <span><strong>{t.origin}:</strong> {product.origin}</span>
                </div>
              )}
              {product.harvestDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  <Clock size={14} color="var(--color-sage)" />
                  <span><strong>{t.harvest}:</strong> {product.harvestDate}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div style={{
              background: 'var(--color-cream)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--color-terracotta)',
                }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>/ {product.unit}</span>
              </div>

              {/* Quantity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                  background: 'var(--color-surface)',
                  border: '1.5px solid var(--color-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.25rem',
                }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="btn btn-ghost" style={{ padding: '0.375rem' }}>
                    <Minus size={16} />
                  </button>
                  <span style={{ minWidth: '2rem', textAlign: 'center', fontWeight: 700, fontSize: '1.0625rem' }}>
                    {qty}
                  </span>
                  <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="btn btn-ghost" style={{ padding: '0.375rem' }}>
                    <Plus size={16} />
                  </button>
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  {t.total}: <strong style={{ color: 'var(--color-terracotta)' }}>{formatPrice(product.price * qty)}</strong>
                </span>
              </div>

              <motion.button
                id="product-add-to-cart"
                onClick={handleAdd}
                disabled={product.stock === 0 || added}
                className="btn btn-primary btn-lg"
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%', justifyContent: 'center', background: added ? 'var(--color-sage)' : undefined }}
              >
                {added ? (
                  <>{t.added}</>
                ) : (
                  <><ShoppingBasket size={20} /> {t.add}</>
                )}
              </motion.button>
            </div>

            {/* Story */}
            {product.story[l] && (
              <div style={{
                borderLeft: '3px solid var(--color-terracotta)',
                paddingLeft: '1.25rem',
              }}>
                <p style={{
                  fontSize: '0.8125rem', fontWeight: 600,
                  color: 'var(--color-terracotta)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                }}>
                  {t.story}
                </p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
                  {product.story[l]}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ background: 'var(--color-cream)', padding: '3rem 0' }}>
          <div className="container-site">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem', fontWeight: 700,
              color: 'var(--color-brown)',
              marginBottom: '2rem',
            }}>
              {t.related}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.25rem',
            }}>
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} lang={l} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(249,244,234,0.97)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--color-light)',
        padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '1rem',
        zIndex: 80,
      }}
        className="show-on-mobile"
      >
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>
            {formatPrice(product.price)}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>/ {product.unit}</div>
        </div>
        <button
          onClick={handleAdd}
          className="btn btn-primary"
          style={{ flex: 1, maxWidth: '200px', justifyContent: 'center' }}
        >
          <ShoppingBasket size={16} />
          {added ? '✓' : (l === 'ro' ? 'Adaugă în coș' : 'Add to basket')}
        </button>
      </div>

      <style>{`
        .show-on-mobile { display: none; }
        @media (max-width: 768px) { .show-on-mobile { display: flex; } }
      `}</style>
    </div>
  );
}

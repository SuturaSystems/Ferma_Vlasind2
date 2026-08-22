'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  Sun,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import type { Product } from '@/types';
import { useStore, formatPrice } from '@/store';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { addToCart, language } = useStore();
  const l = language;
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  const mainImage = product.images?.[0] || '/images/hero-tomatoes.jpg';

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && p.available
  ).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const t = {
    back: l === 'ro' ? 'Înapoi la Magazin' : 'Back to Shop',
    origin: l === 'ro' ? 'Origine & Terroir' : 'Origin & Terroir',
    harvest: l === 'ro' ? 'Calendar Recoltă' : 'Harvest Schedule',
    culinaryStory: l === 'ro' ? 'Profil Aromatic & Tradiție' : 'Aroma Profile & Heritage',
    badges: l === 'ro' ? 'Garanții de Calitate' : 'Quality Guarantees',
    related: l === 'ro' ? 'Alte Produse din Aceeași Recoltă' : 'More from This Harvest',
    add: l === 'ro' ? `Adaugă în Coș (${qty > 1 ? `${qty} × ` : ''}${formatPrice(product.price * qty)})` : `Add to Cart (${qty > 1 ? `${qty} × ` : ''}${formatPrice(product.price * qty)})`,
    added: l === 'ro' ? '✓ Adăugat în Coș' : '✓ Added to Cart',
    stockIn: l === 'ro' ? 'În stoc proaspăt' : 'In fresh stock',
    stockLow: l === 'ro' ? 'Stoc limitat de sezon' : 'Limited seasonal batch',
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* ── Breadcrumb Bar ── */}
      <div style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', padding: '1rem 0' }}>
        <div className="container-site">
          <Link
            href="/boutique"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-ink-muted)',
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-terracotta)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--color-ink-muted)')}
          >
            <ArrowLeft size={14} />
            <span>{t.back}</span>
          </Link>
        </div>
      </div>

      {/* ── Main Product Stage ── */}
      <div className="container-site" style={{ paddingTop: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 6vw, 4.5rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: High-Res Editorial Photography */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#F3EFE6',
              }}
            >
              <Image
                src={mainImage}
                alt={product.name[l]}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />

              {/* Badges Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  zIndex: 2,
                }}
              >
                {product.featured && (
                  <span className="badge badge-terracotta" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.92)' }}>
                    {l === 'ro' ? 'Favoritul Fermierului' : 'Farmer’s Selection'}
                  </span>
                )}
                {product.badges.map((b) => (
                  <span
                    key={b}
                    className="badge badge-laurel"
                    style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.92)' }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Culinary Details, Story & Purchase Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category & Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-laurel)',
                }}
              >
                {product.origin || 'Oltenia, România'}
              </span>

              <span
                className={`badge ${product.stock <= 5 ? 'badge-saffron' : 'badge-laurel'}`}
              >
                {product.stock <= 5 ? t.stockLow : t.stockIn}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                color: 'var(--color-ink)',
                marginBottom: '1rem',
              }}
            >
              {product.name[l]}
            </h1>

            {/* Short Culinary Description */}
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
              }}
            >
              {product.description[l]}
            </p>

            {/* ── Order Box ── */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '1.5rem',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Unit Price */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  marginBottom: '1.25rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                  }}
                >
                  {formatPrice(product.price)}
                </span>
                <span style={{ fontSize: '0.9375rem', color: 'var(--color-ink-faint)' }}>
                  / {product.unit}
                </span>
              </div>

              {/* Quantity Stepper & Add Action */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {/* Quantity Controls */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid var(--color-border-strong)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.2rem',
                    backgroundColor: 'var(--color-bg-subtle)',
                  }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="btn btn-ghost"
                    style={{ width: 34, height: 34, padding: 0, borderRadius: '50%' }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span
                    style={{
                      width: '2.5rem',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="btn btn-ghost"
                    style={{ width: 34, height: 34, padding: 0, borderRadius: '50%' }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Primary Add Button */}
                <button
                  id="product-add-to-cart"
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className="btn btn-primary btn-lg"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: added ? '#2C4A34' : undefined,
                    borderColor: added ? '#2C4A34' : undefined,
                  }}
                >
                  {added ? (
                    <>
                      <Check size={16} />
                      <span>{t.added}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>{t.add}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ── Culinary Terroir Essay ── */}
            {product.story[l] && (
              <div
                style={{
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '2rem',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-terracotta)',
                    display: 'block',
                    marginBottom: '0.45rem',
                  }}
                >
                  {t.culinaryStory}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    color: 'var(--color-ink)',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                  }}
                >
                  „{product.story[l]}”
                </p>
              </div>
            )}

            {/* ── Delivery & Freshness Guarantees ── */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                fontSize: '0.8125rem',
                color: 'var(--color-ink-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="var(--color-laurel)" />
                <span>{l === 'ro' ? 'Recoltare în ziua livrării' : 'Harvested on delivery day'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={16} color="var(--color-laurel)" />
                <span>{l === 'ro' ? 'Livrare refrigerată în 24h' : 'Chilled delivery in 24h'}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Related Harvest Section ── */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '3.5rem', borderTop: '1px solid var(--color-border)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
                marginBottom: '2rem',
              }}
            >
              {t.related}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} lang={l} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

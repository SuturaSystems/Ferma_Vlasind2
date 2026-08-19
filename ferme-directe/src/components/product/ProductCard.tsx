'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBasket, AlertCircle, Star, Leaf } from 'lucide-react';
import type { Product } from '@/types';
import { useStore, formatPrice } from '@/store';

interface ProductCardProps {
  product: Product;
  lang?: 'ro' | 'en';
  index?: number;
}

const URGENCY_THRESHOLD = 5; // Afficher urgence si <= 5 unités

export default function ProductCard({ product, lang = 'ro', index = 0 }: ProductCardProps) {
  const { addToCart, language } = useStore();
  const l = lang || language;
  const [adding, setAdding] = React.useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    await new Promise(r => setTimeout(r, 600));
    setAdding(false);
  };

  const isLowStock = product.stock <= URGENCY_THRESHOLD && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  // Emoji mapping par catégorie
  const categoryEmoji: Record<string, string> = {
    tomate: '🍅',
    legume: '🥬',
    herbes: '🌿',
    conserves: '🫙',
    oeufs: '🥚',
    miel: '🍯',
    panier: '🧺',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={`/boutique/${product.slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <article
          className="card"
          style={{
            opacity: isOutOfStock ? 0.65 : 1,
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          {/* Image Zone */}
          <div style={{
            position: 'relative',
            height: '220px',
            background: 'var(--color-cream)',
            overflow: 'hidden',
          }}>
            {/* Placeholder */}
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '5rem',
              background: 'linear-gradient(135deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)',
            }}>
              {categoryEmoji[product.category] ?? '🌱'}
            </div>

            {/* Badges overlay */}
            <div style={{
              position: 'absolute', top: '0.75rem', left: '0.75rem',
              display: 'flex', flexDirection: 'column', gap: '0.375rem',
            }}>
              {product.featured && (
                <span className="badge badge-wheat" style={{ backdropFilter: 'blur(8px)' }}>
                  <Star size={10} fill="currentColor" /> {l === 'ro' ? 'Favorit' : 'Featured'}
                </span>
              )}
              {isLowStock && (
                <span className="badge badge-urgency">
                  <AlertCircle size={10} />
                  {l === 'ro' ? `Doar ${product.stock} kg rămase!` : `Only ${product.stock} left!`}
                </span>
              )}
            </div>

            {/* Organic badge */}
            {product.badges.some(b => b.toLowerCase().includes('pesticide') || b.toLowerCase().includes('natural')) && (
              <div style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                width: 36, height: 36,
                background: 'var(--color-sage)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Leaf size={16} color="white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
            {/* Category */}
            <p style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--color-sage)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.375rem',
            }}>
              {product.origin ?? 'Ferma Noastră, România'}
            </p>

            {/* Name */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--color-brown)',
              marginBottom: '0.375rem',
              lineHeight: '1.3',
            }}>
              {product.name[l]}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              lineHeight: '1.5',
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {product.description[l]}
            </p>

            {/* Harvest date */}
            {product.harvestDate && (
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--color-sage)',
                marginBottom: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}>
                🌱 {l === 'ro' ? 'Recoltă:' : 'Harvest:'} {product.harvestDate}
              </p>
            )}

            {/* Price & CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  color: 'var(--color-terracotta)',
                }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginLeft: '0.25rem' }}>
                  / {product.unit}
                </span>
              </div>

              <motion.button
                id={`add-to-cart-${product.id}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock || adding}
                className="btn btn-primary btn-sm"
                whileTap={{ scale: 0.95 }}
                animate={adding ? { scale: [1, 1.1, 1] } : {}}
                style={{
                  minWidth: '40px',
                  background: adding ? 'var(--color-sage)' : undefined,
                }}
              >
                {isOutOfStock
                  ? (l === 'ro' ? 'Epuizat' : 'Sold out')
                  : adding
                    ? '✓'
                    : (l === 'ro' ? 'Adaugă' : 'Add')}
              </motion.button>
            </div>
          </div>
        </article>
      </a>
    </motion.div>
  );
}

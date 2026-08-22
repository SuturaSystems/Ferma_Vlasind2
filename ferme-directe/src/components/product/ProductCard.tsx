'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Check, MapPin, Clock } from 'lucide-react';
import type { Product } from '@/types';
import { useStore, formatPrice } from '@/store';

interface ProductCardProps {
  product: Product;
  lang?: 'ro' | 'en';
  index?: number;
}

export default function ProductCard({ product, lang = 'ro', index = 0 }: ProductCardProps) {
  const { addToCart, language } = useStore();
  const l = lang || language;
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isLowStock = product.stock <= 5 && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  // Fallback image handling
  const mainImage = product.images?.[0] || '/images/hero-tomatoes.jpg';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="card-craft"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Link
        href={`/boutique/${product.slug}`}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Product Image Stage */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '1 / 1',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#F3EFE6',
          }}
        >
          <Image
            src={mainImage}
            alt={product.name[l]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="group-hover:scale-105"
          />

          {/* Badges Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              zIndex: 2,
            }}
          >
            {product.featured && (
              <span className="badge badge-terracotta">
                {l === 'ro' ? 'Sezon de Vârf' : 'Peak Season'}
              </span>
            )}
            {isLowStock && (
              <span className="badge badge-saffron">
                {l === 'ro' ? `Doar ${product.stock} rămase` : `Only ${product.stock} left`}
              </span>
            )}
            {isOutOfStock && (
              <span className="badge badge-neutral">
                {l === 'ro' ? 'Stoc Epuizat' : 'Sold Out'}
              </span>
            )}
          </div>
        </div>

        {/* Product Meta & Culinary Description */}
        <div
          style={{
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* Origin & Category Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.35rem',
                fontSize: '0.75rem',
                color: 'var(--color-ink-muted)',
                fontWeight: 500,
              }}
            >
              <span>{product.origin || 'Oltenia, România'}</span>
              {product.harvestDate && (
                <span style={{ color: 'var(--color-laurel)', fontWeight: 600 }}>
                  {product.harvestDate}
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-ink)',
                lineHeight: 1.25,
                marginBottom: '0.45rem',
              }}
            >
              {product.name[l]}
            </h3>

            {/* Culinary Note */}
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.5,
                marginBottom: '1rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.description[l]}
            </p>
          </div>

          {/* Pricing & Add to Cart Action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-ink)',
                }}
              >
                {formatPrice(product.price)}
              </span>
              <span
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-ink-faint)',
                  marginLeft: '0.25rem',
                }}
              >
                / {product.unit}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`btn btn-sm ${added ? 'btn-dark' : 'btn-secondary'}`}
              style={{
                gap: '0.35rem',
                padding: '0.45rem 0.9rem',
                minWidth: '92px',
              }}
              aria-label={`Add ${product.name[l]} to cart`}
            >
              {added ? (
                <>
                  <Check size={14} color="#52B788" />
                  <span>{l === 'ro' ? 'Adăugat' : 'Added'}</span>
                </>
              ) : isOutOfStock ? (
                <span>{l === 'ro' ? 'Epuizat' : 'Out'}</span>
              ) : (
                <>
                  <Plus size={14} />
                  <span>{l === 'ro' ? 'Adaugă' : 'Add'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

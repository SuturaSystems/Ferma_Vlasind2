'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Sun,
  Award,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { getFeaturedProducts, BOX_SUBSCRIPTIONS } from '@/data/products';
import { useStore, formatPrice } from '@/store';
import ProductCard from '@/components/product/ProductCard';

export default function HomePage() {
  const { language } = useStore();
  const l = language;
  const featured = getFeaturedProducts();

  const t = {
    heroEyebrow: l === 'ro' ? 'Direct din Oltenia • Livrare în 24 de Ore' : 'Direct from Oltenia • Delivered within 24h',
    heroTitle1: l === 'ro' ? 'Pământ Curat.' : 'Pure Soil.',
    heroTitle2: l === 'ro' ? 'Gust Adevărat.' : 'True Flavor.',
    heroSubtitle: l === 'ro'
      ? 'Tomate de patrimoniu, legume cultivate pe sol viu, miere nefiltrată și ouă de țară. Culese manual în zorii zilei și aduse direct la ușa ta.'
      : 'Heritage tomatoes, living-soil vegetables, unfiltered honey and pasture-raised eggs. Hand-harvested at dawn and delivered straight to your door.',
    heroCtaPrimary: l === 'ro' ? 'Explorează Recolta Zilei' : 'Explore Today’s Harvest',
    heroCtaSecondary: l === 'ro' ? 'Coșuri Săptămânale' : 'Weekly Baskets',
    
    // Ticker
    tickerItems: l === 'ro' ? [
      '🍅 Tomate Inimă de Bou culese azi dimineață',
      '🥬 Salată verde crocantă fără nitrați',
      '🍯 Miere crudă de flori sălbatice',
      '🥚 Ouă proaspete de la găini pe pășune liberă',
      '🌿 Livrare refrigerată în Cluj și împrejurimi',
    ] : [
      '🍅 Beef Heart tomatoes harvested this morning',
      '🥬 Nitrate-free crisp garden lettuce',
      '🍯 Raw polyfloral wild honey',
      '🥚 Pasture-raised fresh country eggs',
      '🌿 Temperature-controlled delivery in Cluj & surroundings',
    ],

    // Featured section
    featuredTitle: l === 'ro' ? 'Selecția Sezonului' : 'Seasonal Curation',
    featuredSubtitle: l === 'ro' 
      ? 'Cultivate fără pesticide de sinteză, culese la maturitate deplină pentru un profil aromatic excepțional.'
      : 'Grown without synthetic pesticides, picked at peak ripeness for extraordinary flavor.',
    viewAll: l === 'ro' ? 'Vezi toate cele 8 produse din fermă' : 'View all 8 farm products',

    // Values section
    valuesTitle: l === 'ro' ? 'Standardul Nostru de la Rădăcină la Masă' : 'Our Standard from Root to Table',
    valuesIntro: l === 'ro' 
      ? 'Nu facem compromisuri. Fiecare plantă crește în ritmul ei natural, în sol hrănit exclusiv organic.'
      : 'No compromises. Every plant grows at its natural pace in exclusively organically-fed living soil.',

    // Basket section
    basketBadge: l === 'ro' ? 'Abonament Săptămânal' : 'Weekly Subscription',
    basketTitle: l === 'ro' ? 'Coșul Familiei — Recoltat Miercuri' : 'The Family Basket — Harvested Wednesday',
    basketSubtitle: l === 'ro'
      ? 'Primește săptămânal cele mai proaspete legume, verdețuri, ouă și miere de la ferma noastră. Fără angajament pe termen lung, anulezi sau pui pe pauză cu un singur click.'
      : 'Receive the freshest vegetables, greens, eggs and honey from our farm every week. No long-term lock-in, pause or cancel with a single click.',
    basketPrice: '150 RON',
    basketFrequency: l === 'ro' ? '/ săptămână (livrare inclusă)' : '/ week (delivery included)',
    basketCta: l === 'ro' ? 'Descoperă Formulele de Abonament' : 'Discover Subscription Plans',
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO SECTION — Editorial Asymmetrical Layout
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: 'clamp(2.5rem, 6vw, 5.5rem) 0 4rem', position: 'relative' }}>
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Narrative Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Refined Eyebrow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-laurel)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-laurel)' }} />
                <span>{t.heroEyebrow}</span>
              </div>

              {/* Display Headline */}
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
                  fontWeight: 600,
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-ink)',
                  marginBottom: '1.5rem',
                }}
              >
                <span>{t.heroTitle1}</span>
                <br />
                <span style={{ fontStyle: 'italic', color: 'var(--color-terracotta)' }}>{t.heroTitle2}</span>
              </h1>

              {/* Subtitle / Lead Paragraph */}
              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  color: 'var(--color-ink-muted)',
                  lineHeight: 1.65,
                  maxWidth: '52ch',
                  marginBottom: '2.5rem',
                }}
              >
                {t.heroSubtitle}
              </p>

              {/* CTA Group */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link href="/boutique" className="btn btn-primary btn-lg" id="hero-shop-cta">
                  <span>{t.heroCtaPrimary}</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/paniers" className="btn btn-secondary btn-lg" id="hero-boxes-cta">
                  <span>{t.heroCtaSecondary}</span>
                </Link>
              </div>

              {/* Trust Indicators Strip */}
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'center',
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1 }}>
                    30+
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                    {l === 'ro' ? 'Ani de Tradiție' : 'Years of Heritage'}
                  </p>
                </div>
                <div style={{ width: 1, height: 32, backgroundColor: 'var(--color-border)' }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1 }}>
                    100%
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                    {l === 'ro' ? 'Fără Pesticide' : 'Pesticide Free'}
                  </p>
                </div>
                <div style={{ width: 1, height: 32, backgroundColor: 'var(--color-border)' }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1 }}>
                    24h
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', marginTop: '4px' }}>
                    {l === 'ro' ? 'Recoltă → Masă' : 'Harvest to Table'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Composition Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  aspectRatio: '4 / 5',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid rgba(28, 25, 23, 0.08)',
                }}
              >
                <Image
                  src="/images/hero-tomatoes.jpg"
                  alt="Recoltă de tomate de fermă"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />

                {/* Subtle vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(28, 25, 23, 0.6) 0%, rgba(28, 25, 23, 0.05) 50%, transparent 100%)',
                  }}
                />

                {/* Floating Artisan Provenance Label */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(28, 25, 23, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                      {l === 'ro' ? 'Semințe de Patrimoniu' : 'Heritage Heirloom Variety'}
                    </span>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-ink)' }}>
                      Inimă de Bou & Kumato
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      backgroundColor: 'var(--color-laurel-soft)',
                      color: 'var(--color-laurel)',
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    {l === 'ro' ? 'Sol Viu' : 'Living Soil'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LIVE HARVEST MARQUEE TICKER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          backgroundColor: '#F3EFE6',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          padding: '0.75rem 0',
          overflow: 'hidden',
        }}
      >
        <div className="animate-marquee">
          {[...t.tickerItems, ...t.tickerItems, ...t.tickerItems].map((item, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--color-ink)',
                marginRight: '3rem',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
              <span style={{ color: 'var(--color-ink-faint)', marginLeft: '1rem' }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SEASONAL PRODUCT CURATION (The Shop Showcase)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: 'clamp(3.5rem, 8vw, 6rem) 0' }}>
        <div className="container-site">
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-terracotta)',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                {l === 'ro' ? 'Disponibilitate Imediată' : 'Current Fresh Picks'}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {t.featuredTitle}
              </h2>
            </div>

            <Link href="/boutique" className="btn btn-secondary" id="browse-all-shop">
              <span>{t.viewAll}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Product Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} lang={l} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          WEEKLY SUBSCRIPTION BASKET SPOTLIGHT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        style={{
          backgroundColor: '#1C1917',
          color: '#FBF9F5',
          padding: 'clamp(4rem, 8vw, 7rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Basket Photo Stage */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <Image
                src="/images/boxes/box-familie.jpg"
                alt="Coșul săptămânal de fermă"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </motion.div>

            {/* Basket Subscription Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-saffron)',
                  marginBottom: '1rem',
                }}
              >
                {t.basketBadge}
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  marginBottom: '1.25rem',
                  color: '#FFFFFF',
                }}
              >
                {t.basketTitle}
              </h2>

              <p
                style={{
                  fontSize: '1.0625rem',
                  color: 'rgba(251, 249, 245, 0.75)',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
                }}
              >
                {t.basketSubtitle}
              </p>

              {/* Basket Content Checklist */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.875rem',
                  marginBottom: '2.5rem',
                }}
              >
                {[
                  l === 'ro' ? '2 kg Tomate Inimă de Bou' : '2 kg Beef Heart Tomatoes',
                  l === 'ro' ? '1 kg Cherry Mix Multicolor' : '1 kg Multicolored Cherry Mix',
                  l === 'ro' ? '2 buc Salată Verde Proaspătă' : '2 heads Fresh Garden Lettuce',
                  l === 'ro' ? '1 kg Castraveți de Grădină' : '1 kg Garden Field Cucumbers',
                  l === 'ro' ? '12 Ouă de Țară libere' : '12 Free-Range Country Eggs',
                  l === 'ro' ? 'Ierburi aromatice de sezon' : 'Seasonal Fresh Herbs',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem' }}>
                    <CheckCircle2 size={16} color="#52B788" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  {t.basketPrice}
                </span>
                <span style={{ fontSize: '0.9375rem', color: 'rgba(251, 249, 245, 0.6)' }}>
                  {t.basketFrequency}
                </span>
              </div>

              <Link href="/paniers" className="btn btn-primary btn-lg" id="join-basket-club">
                <span>{t.basketCta}</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          OUR FARM TERROIR & VALUES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6.5rem) 0', backgroundColor: 'var(--color-bg)' }}>
        <div className="container-site">
          <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
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
              {l === 'ro' ? 'Manifestul Fermei' : 'Farm Manifesto'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: 'var(--color-ink)',
                marginBottom: '1rem',
              }}
            >
              {t.valuesTitle}
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
              {t.valuesIntro}
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                icon: <Sun size={24} color="var(--color-terracotta)" />,
                title: l === 'ro' ? 'Soare & Sol Viu' : 'Sun & Living Soil',
                desc: l === 'ro'
                  ? 'Fără culturi hidroponice pe vată minerală. Plantele noastre își extrag mineralele din pământul bogat și nealterat al Olteniei.'
                  : 'No hydroponics on rockwool. Our plants draw deep complex minerals directly from untouched fertile soil.',
              },
              {
                icon: <ShieldCheck size={24} color="var(--color-laurel)" />,
                title: l === 'ro' ? 'Zero Chimicale de Sinteză' : 'Zero Synthetic Chemicals',
                desc: l === 'ro'
                  ? 'Protejăm culturile cu extracte de plante, macerate naturale și polenizare naturală cu bondari crescuți în fermă.'
                  : 'We protect crops using botanical extracts, natural companion planting, and pollination with resident bumblebees.',
              },
              {
                icon: <Truck size={24} color="var(--color-saffron)" />,
                title: l === 'ro' ? 'Cules Dimineața, la Ușă Seara' : 'Morning Harvest, Evening Delivery',
                desc: l === 'ro'
                  ? 'Nu stocăm în depozite frigorifice industriale. Culegem doar ce a fost comandat, asigurând prospețime maximă.'
                  : 'We never store produce in industrial cold-rooms. We harvest only what was ordered, preserving natural vitamins and crispness.',
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  {pillar.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.375rem',
                    fontWeight: 600,
                    color: 'var(--color-ink)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERITAGE ESSAY BANNER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5rem, 10vw, 8rem) 0',
          backgroundImage: 'url(/images/farm-aerial.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(28, 25, 23, 0.72)',
          }}
        />

        <div className="container-narrow" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--color-saffron)',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            {l === 'ro' ? 'Origine & Pasiune' : 'Heritage & Passion'}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              maxWidth: '22ch',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {l === 'ro'
              ? '„Hrana curată este cel mai de preț dar al pământului.”'
              : '“Clean food is the most precious gift of the living land.”'}
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '56ch',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            {l === 'ro'
              ? 'Ferma noastră din Oltenia cultivă cu mândrie soiuri autohtone și legume pline de viață, aducând la masa ta gustul nealterat al naturii.'
              : 'Our farm in Oltenia proudly cultivates indigenous heirloom seeds and nutrient-dense crops, bringing untouched natural flavor to your dining table.'}
          </p>
          <Link href="/notre-ferme" className="btn btn-primary btn-lg" id="read-story-cta">
            <span>{l === 'ro' ? 'Citește Povestea Fermei' : 'Read Our Full Story'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

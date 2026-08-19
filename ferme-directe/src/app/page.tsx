'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Truck, Leaf, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getFeaturedProducts, formatPrice as fp } from '@/data/products';
import { useStore, formatPrice } from '@/store';
import ProductCard from '@/components/product/ProductCard';
import Image from 'next/image';

const HERO_IMG = '/images/hero-tomatoes.jpg';
const FARM_IMG = '/images/farm-aerial.jpg';

export default function HomePage() {
  const { language } = useStore();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const featured = getFeaturedProducts();

  const t = {
    heroTag: language === 'ro' ? '🌱 Direct de la Fermă' : '🌱 Straight from the Farm',
    heroTitle: language === 'ro' ? 'Gustul Adevărat\nal Pământului\nRomânesc' : 'The True Taste\nof Romanian\nSoil',
    heroSub: language === 'ro'
      ? 'Tomate de excepție, legume proaspete și produse artizanale — culese în dimineața livrării, aduse direct la ușa ta.'
      : 'Exceptional tomatoes, fresh vegetables and artisan products — harvested the morning of delivery, brought straight to your door.',
    heroCta: language === 'ro' ? 'Cumpără Acum' : 'Shop Now',
    heroSecondary: language === 'ro' ? 'Descoperă Ferma' : 'Discover the Farm',
    featuredTitle: language === 'ro' ? 'Arrivages de la săptămână' : 'This Week\'s Picks',
    featuredSub: language === 'ro' ? 'Culese astăzi dimineața, disponibile azi' : 'Harvested this morning, available today',
    trust1: language === 'ro' ? 'Fără Pesticide' : 'Pesticide-Free',
    trust2: language === 'ro' ? 'Livrare Locală' : 'Local Delivery',
    trust3: language === 'ro' ? 'Calitate Garantată' : 'Quality Guaranteed',
    storyTitle: language === 'ro' ? '30 de ani de\npasiune pentru\npământ' : '30 years of\npassion for\nthe land',
    storySub: language === 'ro'
      ? 'Ferma noastră din Oltenia cultivă legume de excepție folosind metode tradiționale, transmise din generație în generație. Fiecare roșie, fiecare frunză de salată poartă cu ea istoria unui pământ fertil și a oamenilor care îl iubesc.'
      : 'Our farm in Oltenia grows exceptional vegetables using traditional methods, passed down through generations. Every tomato, every lettuce leaf carries the story of fertile land and the people who love it.',
    storyLink: language === 'ro' ? 'Vizitează Ferma Noastră' : 'Visit Our Farm',
    viewAll: language === 'ro' ? 'Vezi toate produsele' : 'View all products',
  };

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO SECTION — Parallax immersif
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '600px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Background parallax */}
        <motion.div
          style={{
            position: 'absolute', inset: '-10%',
            y: heroY,
            backgroundImage: 'url(/images/hero-tomatoes.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#8A6A4A', // fallback warm brown
          }}
        >
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(42,34,24,0.85) 0%, rgba(42,34,24,0.3) 50%, transparent 100%)',
          }} />
        </motion.div>

        {/* Hero content */}
        <div className="container-site" style={{ position: 'relative', zIndex: 2, paddingBottom: '5rem', width: '100%' }}>
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '1.25rem' }}
          >
            <span className="badge badge-sage" style={{
              fontSize: '0.8125rem',
              background: 'rgba(107,124,90,0.25)',
              color: 'rgba(200,220,180,0.9)',
              border: '1px solid rgba(107,124,90,0.4)',
              backdropFilter: 'blur(8px)',
            }}>
              {t.heroTag}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 700,
              color: 'var(--color-white)',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              maxWidth: '14ch',
              whiteSpace: 'pre-line',
            }}
          >
            {t.heroTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.175rem)',
              color: 'rgba(245,237,214,0.85)',
              lineHeight: 1.6,
              maxWidth: '42ch',
              marginBottom: '2.25rem',
              fontWeight: 400,
            }}
          >
            {t.heroSub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Link href="/boutique" className="btn btn-primary btn-lg" id="hero-shop-cta">
              {t.heroCta} <ArrowRight size={18} />
            </Link>
            <Link href="/notre-ferme" className="btn" style={{
              color: 'rgba(245,237,214,0.9)',
              border: '1.5px solid rgba(245,237,214,0.3)',
              padding: '0.9rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.05)',
            }}>
              {t.heroSecondary}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(245,237,214,0.5)',
            zIndex: 2,
          }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TRUST BAR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ background: 'var(--color-terracotta)', padding: '1.25rem 0' }}>
        <div className="container-site">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 8vw, 6rem)', flexWrap: 'wrap' }}>
            {[
              { icon: <Leaf size={18} />, label: t.trust1 },
              { icon: <Truck size={18} />, label: t.trust2 },
              { icon: <Award size={18} />, label: t.trust3 },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                color: 'rgba(245,237,214,0.95)',
                fontWeight: 500, fontSize: '0.9375rem',
              }}>
                {icon}
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FEATURED PRODUCTS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 0', background: 'var(--color-offwhite)' }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <p style={{
              fontSize: '0.8125rem', fontWeight: 600,
              color: 'var(--color-terracotta)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              marginBottom: '0.75rem',
            }}>
              {t.featuredSub}
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700, color: 'var(--color-brown)',
            }}>
              {t.featuredTitle}
            </h2>
          </motion.div>

          {/* Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}>
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} lang={language} index={i} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/boutique" className="btn btn-secondary btn-lg" id="view-all-products">
              {t.viewAll} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          STORY / FARM SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ background: 'var(--color-cream)', padding: 'clamp(3rem, 8vw, 6rem) 0', overflow: 'hidden' }}>
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{
                fontSize: '0.8125rem', fontWeight: 600,
                color: 'var(--color-sage)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}>
                {language === 'ro' ? 'Povestea Noastră' : 'Our Story'}
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: 'var(--color-brown)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                whiteSpace: 'pre-line',
              }}>
                {t.storyTitle}
              </h2>
              <p style={{
                fontSize: '1.0625rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.75,
                marginBottom: '2rem',
              }}>
                {t.storySub}
              </p>
              <Link href="/notre-ferme" className="btn btn-primary" id="farm-story-cta">
                {t.storyLink} <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Farm Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                boxShadow: 'var(--shadow-xl)',
                background: '#8A9B78',
                backgroundImage: 'url(/images/farm-aerial.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '300px',
              }}
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SUBSCRIPTION BOX CTA
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{
        background: 'var(--color-brown)',
        padding: 'clamp(3rem, 8vw, 5rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', right: '-5rem', top: '-5rem',
          width: '20rem', height: '20rem',
          borderRadius: '50%',
          background: 'rgba(196,98,45,0.15)',
          pointerEvents: 'none',
        }} />

        <div className="container-site" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="badge badge-terracotta" style={{
              background: 'rgba(196,98,45,0.2)',
              color: 'var(--color-wheat)',
              border: '1px solid rgba(212,168,83,0.3)',
              marginBottom: '1.25rem',
            }}>
              {language === 'ro' ? '🧺 Abonamente Săptămânale' : '🧺 Weekly Subscriptions'}
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--color-cream)',
              marginBottom: '1rem',
            }}>
              {language === 'ro'
                ? 'Primește Proaspăt în\nFiecare Săptămână'
                : 'Get Fresh Delivered\nEvery Week'}
            </h2>
            <p style={{
              color: 'rgba(245,237,214,0.7)',
              fontSize: '1.0625rem',
              maxWidth: '48ch',
              margin: '0 auto 2rem',
              lineHeight: 1.65,
            }}>
              {language === 'ro'
                ? 'Abonează-te la coșul săptămânal și primești cele mai bune produse ale fermei direct la ușa ta. Fără surprize, fără effort.'
                : 'Subscribe to the weekly basket and receive the farm\'s best products straight to your door. No surprises, no effort.'}
            </p>
            <Link href="/paniers" className="btn btn-primary btn-lg" id="subscription-cta">
              {language === 'ro' ? 'Descoperă Coșurile' : 'Discover Baskets'} <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

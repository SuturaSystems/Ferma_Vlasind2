'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Sun, Droplets, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useStore } from '@/store';

export default function NotreFermePage() {
  const { language } = useStore();
  const l = language;

  const t = {
    heroTag: l === 'ro' ? 'Tradiție & Agroecologie' : 'Heritage & Agroecology',
    heroTitle: l === 'ro' ? 'Trei Generații de Pasiune\npentru Pământul Românesc' : 'Three Generations of Passion\nfor Romanian Living Soil',
    heroLead: l === 'ro'
      ? 'Ferma noastră se întinde pe 15 hectare de sol fertil în inima Olteniei. Aici, natura își urmează ritmul nestingherit, iar hrana își recapătă gustul pur de odinioară.'
      : 'Our farm spans 15 hectares of nutrient-dense living soil in the heart of Oltenia. Here, nature follows its own rhythm, restoring true, unadulterated flavor.',

    // Section 1: The Soil
    soilTitle: l === 'ro' ? 'Solul: Cel Mai Prețios Aliat' : 'The Soil: Our Most Precious Ally',
    soilText1: l === 'ro'
      ? 'Spre deosebire de agricultura intensivă care tratează pământul ca pe un simplu suport inert, noi cultivăm viața din sol. Folosim compost organic maturat, rotație strictă a culturilor și culturi de acoperire pentru a menține un microbiom subteran bogat.'
      : 'Unlike industrial farming that treats earth as inert substrate, we nurture living soil. We use mature organic compost, strict crop rotation and green covers to foster a rich microbial ecosystem.',
    soilText2: l === 'ro'
      ? 'Rezultatul se simte în fiecare mușcătură: tomate cu aromă intensă, frunze crocante pline de fitonutrienți și legume care se păstrează proaspete natural.'
      : 'The result is unmistakable in every bite: deeply aromatic tomatoes, mineral-packed crisp greens and naturally resilient produce.',

    // Section 2: Heritage Seeds
    seedsTitle: l === 'ro' ? 'Semințe de Patrimoniu (Heirloom)' : 'Heritage Heirloom Seeds',
    seedsText: l === 'ro'
      ? 'Păstrăm și reproducem cu sfințenie semințe tradiționale românești de peste 30 de ani. Soiurile noastre de tomate Inimă de Bou și ardei autohtoni nu au fost modificate genetic și nu sunt hibrizi industriali sterili.'
      : 'We preserve and reproduce indigenous Romanian heirloom varieties cultivated for over three decades. Our Beef Heart tomatoes and local sweet peppers are non-GMO, open-pollinated heritage strains.',

    // CTA
    ctaTitle: l === 'ro' ? 'Gustă Diferența Recoltei de Azi' : 'Taste Today’s Fresh Harvest',
    ctaSubtitle: l === 'ro'
      ? 'Livrăm direct la ușa ta în Cluj și împrejurimi în ambalaje ecologice reciclabile.'
      : 'Delivered directly to your door in Cluj and surrounding areas in eco-friendly packaging.',
    ctaBtn: l === 'ro' ? 'Explorează Magazinul' : 'Explore the Shop',
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* ── Editorial Hero ── */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5rem, 8vw, 8rem) 0 4rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container-site">
          <div style={{ maxWidth: '800px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-laurel)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              {t.heroTag}
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
                fontWeight: 600,
                color: 'var(--color-ink)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                whiteSpace: 'pre-line',
              }}
            >
              {t.heroTitle}
            </h1>

            <p
              style={{
                fontSize: '1.175rem',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              {t.heroLead}
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-ink-muted)', fontSize: '0.9375rem' }}>
              <MapPin size={16} color="var(--color-terracotta)" />
              <span>Oltenia, România • Ferma Familiei</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Aerial Landscape Visual Stage ── */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container-site">
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              aspectRatio: '21 / 9',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Image
              src="/images/farm-aerial.jpg"
              alt="Vedere panoramică a fermei"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ── Story Chapters (2-Column Asymmetric) ── */}
      <section style={{ padding: '2rem 0 5rem' }}>
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'start',
            }}
          >
            {/* Chapter 1: Soil */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2.5rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-laurel-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Droplets size={22} color="var(--color-laurel)" />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  marginBottom: '1rem',
                }}
              >
                {t.soilTitle}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-ink-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
                {t.soilText1}
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                {t.soilText2}
              </p>
            </div>

            {/* Chapter 2: Heirloom Seeds */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2.5rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-terracotta-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Sun size={22} color="var(--color-terracotta)" />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  marginBottom: '1rem',
                }}
              >
                {t.seedsTitle}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                {t.seedsText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Farm CTA Banner ── */}
      <section style={{ backgroundColor: '#1C1917', color: '#FFFFFF', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container-narrow">
          <Heart size={32} color="var(--color-terracotta)" style={{ marginBottom: '1rem' }} />
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            {t.ctaTitle}
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', maxWidth: '48ch', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
            {t.ctaSubtitle}
          </p>
          <Link href="/boutique" className="btn btn-primary btn-lg" id="explore-shop-from-story">
            <span>{t.ctaBtn}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

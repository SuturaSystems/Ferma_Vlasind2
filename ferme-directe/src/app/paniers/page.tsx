'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Loader2, Sparkles, Shield, RotateCcw, Truck } from 'lucide-react';
import { BOX_SUBSCRIPTIONS } from '@/data/products';
import { useStore, formatPrice } from '@/store';
import type { BoxSubscription } from '@/types';

export default function PaniersPage() {
  const { language } = useStore();
  const l = language;

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* ── Page Header ── */}
      <section
        style={{
          padding: 'clamp(3.5rem, 6vw, 5rem) 0 3rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          textAlign: 'center',
        }}
      >
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-terracotta)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              {l === 'ro' ? 'Abonamente de Recoltă Proaspătă' : 'Fresh Harvest Subscriptions'}
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                fontWeight: 600,
                color: 'var(--color-ink)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}
            >
              {l === 'ro'
                ? 'Coșul Săptămânal al Fermei,\nDirect la Ușa Ta'
                : 'The Weekly Farm Basket,\nDelivered to Your Door'}
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--color-ink-muted)',
                maxWidth: '56ch',
                margin: '0 auto',
                lineHeight: 1.65,
              }}
            >
              {l === 'ro'
                ? 'Alege formula potrivită familiei tale și primești în fiecare miercuri legume, fructe de sezon, ouă și miere culese în zori. Fără contracte rigide — anulezi oricând.'
                : 'Choose the plan tailored to your household and receive dawn-picked seasonal vegetables, greens, pasture eggs and raw honey every Wednesday. Cancel anytime.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3 Subscription Tiers ── */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4.5rem) 0' }}>
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              alignItems: 'stretch',
            }}
          >
            {BOX_SUBSCRIPTIONS.map((box, i) => (
              <BoxCard key={box.id} box={box} lang={l} index={i} />
            ))}
          </div>

          {/* ── Value Guarantees Strip ── */}
          <div
            style={{
              marginTop: '4rem',
              padding: '2.5rem 2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                icon: <Truck size={20} color="var(--color-terracotta)" />,
                title: l === 'ro' ? 'Livrare Inclusă' : 'Free Delivery Included',
                desc: l === 'ro' ? 'Direct la domiciliu în intervalul ales' : 'Direct to your door in chosen time slot',
              },
              {
                icon: <RotateCcw size={20} color="var(--color-laurel)" />,
                title: l === 'ro' ? 'Pauză sau Anulare Oricând' : 'Pause or Cancel Anytime',
                desc: l === 'ro' ? 'Fără penalizări, gestionezi din cont' : 'No penalties, manage directly online',
              },
              {
                icon: <Sparkles size={20} color="var(--color-saffron)" />,
                title: l === 'ro' ? 'Garanție de Prospețime' : '100% Freshness Guarantee',
                desc: l === 'ro' ? 'Dacă un produs nu este perfect, îl înlocuim' : 'If any item isn’t perfect, we replace it',
              },
            ].map((g) => (
              <div key={g.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {g.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '0.25rem' }}>
                    {g.title}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BoxCard({
  box,
  lang,
  index,
}: {
  box: BoxSubscription;
  lang: 'ro' | 'en';
  index: number;
}) {
  const l = lang;
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            {
              product: {
                id: box.id,
                name: box.name,
                description: box.description,
                price: box.price,
                unit: 'cutie',
                slug: box.id,
                origin: 'Ferma Noastră, România',
                images: [box.image],
                stock: 99,
                category: 'panier',
                season: [],
                badges: [],
                featured: false,
                available: true,
                story: { ro: '', en: '' },
                harvestDate: undefined,
              },
              quantity: 1,
            },
          ],
          deliveryFee: 0,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error ?? 'Erreur inconnue');
      }
    } catch (err) {
      console.error('[Ferma/Subscribe]', err);
      alert(
        l === 'ro'
          ? 'Eroare la inițializarea plății. Vă rugăm încercați din nou.'
          : 'Payment initialization error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div
        className="card-craft"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'relative',
          backgroundColor: '#FFFFFF',
          border: box.popular ? '2px solid var(--color-terracotta)' : '1px solid var(--color-border)',
        }}
      >
        {/* Popular Tag */}
        {box.popular && (
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--color-terracotta)',
              color: '#FFFFFF',
              padding: '0.3rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              zIndex: 3,
              boxShadow: '0 2px 8px rgba(148, 46, 31, 0.3)',
            }}
          >
            {l === 'ro' ? 'Cel mai apreciat' : 'Most popular'}
          </div>
        )}

        {/* Real Artisan Basket Photo */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16 / 10',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#F3EFE6',
          }}
        >
          <Image
            src={box.image || '/images/boxes/box-familie.jpg'}
            alt={box.name[l]}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Card Header & Price */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--color-ink)',
              marginBottom: '0.35rem',
            }}
          >
            {box.name[l]}
          </h3>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            {box.description[l]}
          </p>

          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-ink)',
              }}
            >
              {(box.price / 100).toFixed(0)} RON
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-ink-faint)', marginLeft: '0.35rem' }}>
              / {l === 'ro' ? 'săptămână' : 'week'}
            </span>
          </div>
        </div>

        {/* Content Checklist */}
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-laurel)',
                display: 'block',
                marginBottom: '0.85rem',
              }}
            >
              {l === 'ro' ? 'Conținutul Coșului' : 'Basket Contents'}
            </span>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {box.items.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <Check size={14} color="var(--color-laurel)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--color-ink-muted)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            id={`subscribe-${box.id}`}
            className={`btn ${box.popular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                <span>{l === 'ro' ? 'Se inițializează...' : 'Initializing...'}</span>
              </>
            ) : (
              <>
                <span>{l === 'ro' ? 'Abonează-te Acum' : 'Subscribe Now'}</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { BOX_SUBSCRIPTIONS } from '@/data/products';
import { useStore, formatPrice } from '@/store';
import type { BoxSubscription } from '@/types';

export default function PaniersPage() {
  const { language } = useStore();
  const l = language;

  return (
    <>
      {/* Hero */}
      <section style={{
        paddingTop: '8rem', paddingBottom: '3rem',
        background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-offwhite) 100%)',
        textAlign: 'center',
      }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              display: 'inline-block',
              fontSize: '0.75rem', fontWeight: 600,
              color: 'var(--color-terracotta)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}>
              🧺 {l === 'ro' ? 'Abonamente Săptămânale' : 'Weekly Subscriptions'}
            </span>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--color-brown)',
              marginBottom: '1rem',
            }}>
              {l === 'ro' ? 'Coșul Fermei,\nSăptămânal la Tine' : 'The Farm Basket,\nWeekly at Your Door'}
            </h1>
            <p style={{
              fontSize: '1.0625rem',
              color: 'var(--color-text-muted)',
              maxWidth: '52ch', margin: '0 auto',
              lineHeight: 1.65,
            }}>
              {l === 'ro'
                ? 'Alege coșul potrivit și primești produse proaspete de la ferma noastră în fiecare săptămână. Anulare oricând.'
                : 'Choose the right basket and receive fresh products from our farm every week. Cancel anytime.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Boxes Grid */}
      <section style={{ padding: '3rem 0 6rem', background: 'var(--color-offwhite)' }}>
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}>
            {BOX_SUBSCRIPTIONS.map((box, i) => (
              <BoxCard key={box.id} box={box} lang={l} index={i} />
            ))}
          </div>

          {/* Info strip */}
          <div style={{
            marginTop: '3rem', padding: '2rem',
            background: 'var(--color-cream)',
            borderRadius: 'var(--radius-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { emoji: '📅', title: l === 'ro' ? 'Livrare săptămânală' : 'Weekly delivery', desc: l === 'ro' ? 'Miercuri sau Joi, după alegere' : 'Wednesday or Thursday, by choice' },
              { emoji: '❌', title: l === 'ro' ? 'Anulare oricând' : 'Cancel anytime', desc: l === 'ro' ? 'Fără angajamente pe termen lung' : 'No long-term commitments' },
              { emoji: '🔄', title: l === 'ro' ? 'Modificare ușoară' : 'Easy changes', desc: l === 'ro' ? 'Pauzează sau schimbă coșul' : 'Pause or switch basket' },
              { emoji: '📞', title: l === 'ro' ? 'Suport dedicat' : 'Dedicated support', desc: l === 'ro' ? 'Suntem mereu disponibili' : 'We\'re always available' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{emoji}</div>
                <p style={{ fontWeight: 600, color: 'var(--color-brown)', marginBottom: '0.25rem', fontSize: '0.9375rem' }}>{title}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BoxCard({ box, lang, index }: { box: BoxSubscription; lang: 'ro' | 'en'; index: number }) {
  const l = lang;
  const emoji = ['🧺', '🧺🧺', '🥇'][index] ?? '🧺';
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async () => {
    if (!box.stripePriceId) {
      alert(
        l === 'ro'
          ? 'Abonamentele sunt în curs de configurare. Contactați-ne la contact@ferma.ro'
          : 'Subscriptions are being configured. Contact us at contact@ferma.ro'
      );
      return;
    }

    setLoading(true);
    try {
      // Utiliser le price ID Stripe pour créer une session de paiement one-time
      // (les abonnements récurrents nécessitent mode: 'subscription' dans checkout)
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            product: {
              id: box.id,
              name: box.name,
              description: box.description,
              price: box.price,
              unit: 'cutie',
              slug: box.id,
              origin: 'Ferma Noastră, România',
              images: [],
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
          }],
          deliveryFee: 0, // Livraison incluse dans le prix du coș
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
          ? 'Eroare la inițializarea plății. Încercați din nou sau contactați-ne.'
          : 'Payment initialization error. Please try again or contact us.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="card"
        style={{
          position: 'relative',
          border: box.popular ? '2px solid var(--color-terracotta)' : '1px solid var(--color-light)',
          boxShadow: box.popular ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
          transform: box.popular ? 'scale(1.02)' : undefined,
        }}
      >
        {/* Popular badge */}
        {box.popular && (
          <div style={{
            position: 'absolute', top: -14, left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-terracotta)',
            color: 'white',
            padding: '0.25rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}>
            ⭐ {l === 'ro' ? 'Cel mai popular' : 'Most popular'}
          </div>
        )}

        {/* Header */}
        <div style={{
          padding: '2rem 1.75rem 1.5rem',
          borderBottom: '1px solid var(--color-light)',
          background: box.popular ? 'rgba(196,98,45,0.04)' : undefined,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.875rem' }}>{emoji}</div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: 'var(--color-brown)',
            marginBottom: '0.5rem',
          }}>
            {box.name[l]}
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            {box.description[l]}
          </p>
          <div style={{ marginTop: '1.25rem' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.25rem',
              fontWeight: 700,
              color: 'var(--color-terracotta)',
            }}>
              {(box.price / 100).toFixed(0)} RON
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginLeft: '0.375rem' }}>
              / {l === 'ro' ? 'săptămână' : 'week'}
            </span>
          </div>
        </div>

        {/* Items */}
        <div style={{ padding: '1.5rem 1.75rem' }}>
          <p style={{
            fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--color-sage)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: '0.875rem',
          }}>
            {l === 'ro' ? 'Conținut tipic' : 'Typical contents'}
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem' }}>
            {box.items.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9375rem' }}>
                <Check size={15} style={{ flexShrink: 0, marginTop: '0.125rem' }} color="var(--color-sage)" />
                <span style={{ color: 'var(--color-text-muted)' }}>{item}</span>
              </li>
            ))}
          </ul>

          <button
            id={`subscribe-${box.id}`}
            className={`btn ${box.popular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
            style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.8 : 1 }}
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? (
              <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> {l === 'ro' ? 'Se încarcă...' : 'Loading...'}</>
            ) : (
              <>{l === 'ro' ? 'Abonează-te Acum' : 'Subscribe Now'} <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShoppingBag, Truck, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store';

export default function OrderConfirmedPage() {
  const { clearCart, language } = useStore();
  const l = language;

  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        {/* Success Icon Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 220, delay: 0.1 }}
          style={{
            width: 72,
            height: 72,
            backgroundColor: 'var(--color-laurel-soft)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.75rem',
            color: 'var(--color-laurel)',
          }}
        >
          <CheckCircle2 size={36} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 600,
            color: 'var(--color-ink)',
            marginBottom: '1rem',
          }}
        >
          {l === 'ro' ? 'Comandă Confirmată cu Succes' : 'Order Confirmed Successfully'}
        </motion.h1>

        {/* Lead message */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: '1.125rem',
            color: 'var(--color-ink-muted)',
            lineHeight: 1.65,
            maxWidth: '52ch',
            margin: '0 auto 2.5rem',
          }}
        >
          {l === 'ro'
            ? 'Îți mulțumim pentru că susții agricultura regenerativă și fermierii locali. Produsele tale vor fi culese proaspete în dimineața livrării.'
            : 'Thank you for supporting regenerative agriculture and local farmers. Your produce will be harvested fresh on the morning of delivery.'}
        </motion.p>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: '2rem',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            textAlign: 'left',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-laurel)', marginBottom: '1.25rem' }}>
            {l === 'ro' ? 'Ce urmează?' : 'What happens next?'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9375rem', color: 'var(--color-ink-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <Mail size={18} color="var(--color-terracotta)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                {l === 'ro'
                  ? 'Ai primit o confirmare pe email cu sumarul comenzii și chitanța Stripe.'
                  : 'You have received an email confirmation with your order summary and Stripe receipt.'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <Calendar size={18} color="var(--color-laurel)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                {l === 'ro'
                  ? 'Pregătim pachetul în zorii zilei pentru a păstra nutrienții și prospețimea intacte.'
                  : 'We prepare your harvest box at dawn to preserve nutrients and crisp freshness.'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <Truck size={18} color="var(--color-saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                {l === 'ro'
                  ? 'Curierul local dedicat te va contacta prin SMS / telefon înainte de livrare.'
                  : 'Our dedicated local driver will contact you via SMS / phone prior to delivery.'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/boutique" className="btn btn-primary btn-lg">
            <ShoppingBag size={16} />
            <span>{l === 'ro' ? 'Înapoi la Magazin' : 'Back to Shop'}</span>
          </Link>
          <Link href="/" className="btn btn-secondary btn-lg">
            <span>{l === 'ro' ? 'Pagina Principală' : 'Return Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store';

export default function OrderConfirmedPage() {
  const { clearCart, language } = useStore();
  const l = language;

  React.useEffect(() => {
    // Clear cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div style={{
      paddingTop: '7rem', paddingBottom: '5rem',
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      background: 'var(--color-offwhite)',
    }}>
      <div className="container-site" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
          style={{
            width: 80, height: 80,
            background: 'rgba(74,124,89,0.15)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <CheckCircle size={40} color="var(--color-success)" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--color-brown)',
            marginBottom: '1rem',
          }}
        >
          {l === 'ro' ? 'Comandă Confirmată! 🌿' : 'Order Confirmed! 🌿'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{
            fontSize: '1.0625rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          {l === 'ro'
            ? 'Îți mulțumim! Comanda ta a fost primită și confirmată. Vom pregăti produsele cu grijă și le vom livra proaspete la adresa ta.'
            : 'Thank you! Your order has been received and confirmed. We will carefully prepare the products and deliver them fresh to your address.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            background: 'var(--color-cream)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <p style={{ fontWeight: 600, color: 'var(--color-brown)', marginBottom: '0.5rem' }}>
            📧 {l === 'ro' ? 'Verificați emailul' : 'Check your email'}
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>
            {l === 'ro'
              ? 'Am trimis o confirmare cu detaliile comenzii pe adresa ta de email.'
              : 'We sent a confirmation with your order details to your email address.'}
          </p>
        </motion.div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/boutique" className="btn btn-primary">
            <ShoppingBasket size={16} />
            {l === 'ro' ? 'Continuă cumpărăturile' : 'Continue shopping'}
          </Link>
          <Link href="/" className="btn btn-secondary">
            {l === 'ro' ? 'Înapoi acasă' : 'Back home'}
          </Link>
        </div>
      </div>
    </div>
  );
}

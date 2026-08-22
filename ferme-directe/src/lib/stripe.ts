// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// lib/stripe.ts — Ferma
// Patterns: stripe-node skill (lazy instantiation)
// Version: stripe@22.5.0 — API 2026-07-29.dahlia
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import Stripe from 'stripe';

// ── Lazy instantiation (pattern recommandé par stripe-node skill) ──
// Évite les erreurs de clé manquante au moment du build
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        '[Ferma/Stripe] STRIPE_SECRET_KEY est manquant.\n' +
        'Copiez .env.example → .env.local et renseignez vos clés Stripe.\n' +
        'Obtenez vos clés sur: https://dashboard.stripe.com/apikeys'
      );
    }
    _stripe = new Stripe(key, {
      apiVersion: '2026-07-29.dahlia',
      typescript: true,
      appInfo: {
        name: 'Ferma E-commerce',
        version: '1.0.0',
      },
    });
  }
  return _stripe;
}

// ── Clé publique (safe côté client) ──
export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

// ── Secret webhook (pour vérification de signature) ──
export const STRIPE_WEBHOOK_SECRET =
  process.env.STRIPE_WEBHOOK_SECRET ?? '';

// ── Configuration e-commerce Ferma ──
export const STRIPE_CONFIG = {
  currency: 'ron' as const,
  locale: 'ro' as const,
  allowedCountries: ['RO'] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
  successUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/panier`,
} as const;

// ── Helper: vérifier si Stripe est configuré ──
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}


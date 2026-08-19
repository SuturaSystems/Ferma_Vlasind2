// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// lib/stripe.ts
// Stripe client (server-side uniquement)
// Prêt pour configuration — ajoutez vos clés dans .env.local
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import Stripe from 'stripe';

// Vérification de la clé en production uniquement
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeSecretKey) {
    throw new Error(
      'STRIPE_SECRET_KEY manquant dans les variables d\'environnement.\n' +
      'Créez un fichier .env.local avec:\n' +
      'STRIPE_SECRET_KEY=sk_test_...\n' +
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...\n' +
      'STRIPE_WEBHOOK_SECRET=whsec_...'
    );
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(stripeSecretKey, {
      apiVersion: '2026-07-29.dahlia',
      typescript: true,
    });
  }
  return stripeInstance;
}

// Clé publique (safe pour le client)
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

// Webhook secret
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? '';

// Configuration e-commerce
export const STRIPE_CONFIG = {
  currency: 'ron',
  locale: 'ro' as const,
  allowedCountries: ['RO'],
  successUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/panier`,
};

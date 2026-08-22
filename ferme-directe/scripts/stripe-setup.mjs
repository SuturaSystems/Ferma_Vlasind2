#!/usr/bin/env node
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// scripts/stripe-setup.mjs
// Initialise les produits et prix dans Stripe Dashboard
// Usage: node scripts/stripe-setup.mjs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import Stripe from 'stripe';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ENV_PATH = join(process.cwd(), '.env.local');

// ── Lecture des variables d'environnement ──
function loadEnv() {
  if (!existsSync(ENV_PATH)) {
    console.error('\n❌ .env.local introuvable.');
    console.error('   → Copiez .env.example → .env.local et renseignez vos clés Stripe.\n');
    process.exit(1);
  }
  const content = readFileSync(ENV_PATH, 'utf-8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    env[key.trim()] = rest.join('=').trim();
  }
  return env;
}

const env = loadEnv();
const STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY.includes('REMPLACEZ')) {
  console.error('\n❌ STRIPE_SECRET_KEY non configurée dans .env.local');
  console.error('   → Obtenez votre clé sur: https://dashboard.stripe.com/apikeys\n');
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2026-07-29.dahlia',
  appInfo: { name: 'Ferma Setup Script', version: '1.0.0' },
});

// ── Définition des box abonnements ──
const SUBSCRIPTION_BOXES = [
  {
    name: 'Coș Mic — Ferma',
    description: 'Coș săptămânal mic: tomate, salată, castraveți, ierburi aromatice. Perfect pentru 1-2 persoane.',
    price: 8500, // 85 RON en centimes
    priceMonthly: 34000, // si on veut offrir abonnement mensuel
    features: ['~4-5 produse', '1-2 persoane', 'Livrare miercuri'],
  },
  {
    name: 'Coș Familie — Ferma',
    description: 'Coș săptămânal familial: tomate, legume diverse, ouă, ierburi. Ideal pentru 3-4 persoane.',
    price: 15000, // 150 RON
    priceMonthly: 60000,
    features: ['~7-8 produse', '3-4 persoane', 'Livrare miercuri sau joi'],
  },
  {
    name: 'Coș Premium — Ferma',
    description: 'Coșul complet al fermei: cele mai bune produse ale sezonului, inclusiv ouă, miere și conserve artizanale.',
    price: 25000, // 250 RON
    priceMonthly: 100000,
    features: ['~10-12 produse', '4+ persoane', 'Prioritate livrare'],
  },
];

async function main() {
  console.log('\n🌿 Ferma — Configuration Stripe\n');
  console.log('─'.repeat(50));

  // ── Test de connexion ──
  try {
    const account = await stripe.accounts.retrieve();
    const mode = STRIPE_SECRET_KEY.startsWith('sk_test_') ? '🟡 TEST' : '🟢 PRODUCTION';
    console.log(`✅ Connecté à Stripe ${mode}`);
    console.log(`   Compte: ${account.email ?? account.id}`);
    console.log(`   Pays: ${account.country}`);
    console.log('─'.repeat(50));
  } catch (err) {
    console.error('❌ Connexion Stripe échouée:', err.message);
    process.exit(1);
  }

  // ── Création des produits box abonnements ──
  console.log('\n📦 Création des produits Stripe...\n');

  const createdPrices = [];

  for (const box of SUBSCRIPTION_BOXES) {
    try {
      // Créer le produit
      const product = await stripe.products.create({
        name: box.name,
        description: box.description,
        metadata: {
          source: 'ferma-directe',
          type: 'box-subscription',
        },
      });
      console.log(`   ✓ Produit créé: ${product.name} (${product.id})`);

      // Créer le prix hebdomadaire (one-time pour l'instant)
      const weeklyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: box.price,
        currency: 'ron',
        // Pour activer les abonnements récurrents, décommentez:
        // recurring: { interval: 'week' },
        nickname: `${box.name} — Săptămânal`,
        metadata: {
          source: 'ferma-directe',
          type: 'weekly',
        },
      });
      console.log(`   ✓ Prix: ${box.price / 100} RON (${weeklyPrice.id})`);
      createdPrices.push({ name: box.name, priceId: weeklyPrice.id, amount: box.price });

    } catch (err) {
      console.error(`   ❌ Erreur pour ${box.name}:`, err.message);
    }
  }

  // ── Affichage des price IDs ──
  console.log('\n' + '─'.repeat(50));
  console.log('📋 Price IDs à ajouter dans src/data/products.ts :\n');
  for (const p of createdPrices) {
    console.log(`   ${p.name}:`);
    console.log(`   → stripePriceId: '${p.priceId}',\n`);
  }

  // ── Créer un produit de test paiement unique ──
  console.log('─'.repeat(50));
  console.log('\n💳 Test paiement unique...');
  try {
    const testProduct = await stripe.products.create({
      name: 'Test — Tomate Inimă de Bou (1kg)',
      description: 'Produit de test pour paiement one-time',
      metadata: { source: 'ferma-directe', type: 'test' },
    });
    const testPrice = await stripe.prices.create({
      product: testProduct.id,
      unit_amount: 2000, // 20 RON
      currency: 'ron',
      nickname: 'Test Tomate 1kg',
    });
    console.log(`   ✓ Produit test créé (${testPrice.id})`);
  } catch (err) {
    console.error('   ❌ Erreur produit test:', err.message);
  }

  // ── Instructions finales ──
  console.log('\n' + '═'.repeat(50));
  console.log('✅ Setup Stripe terminé !');
  console.log('\nProchaines étapes:');
  console.log('  1. Dashboard Stripe → Produits: vérifiez les nouveaux produits');
  console.log('  2. Copiez les Price IDs dans src/data/products.ts');
  console.log('  3. Lancez les webhooks en local:');
  console.log('     stripe listen --forward-to localhost:3000/api/stripe/webhooks');
  console.log('  4. Copiez le webhook secret dans STRIPE_WEBHOOK_SECRET dans .env.local');
  console.log('\n🔗 Dashboard: https://dashboard.stripe.com/products');
  console.log('═'.repeat(50) + '\n');
}

main().catch((err) => {
  console.error('Erreur fatale:', err);
  process.exit(1);
});

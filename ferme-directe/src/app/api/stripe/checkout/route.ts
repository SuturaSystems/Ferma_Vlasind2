import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CartItem } from '@/types';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POST /api/stripe/checkout
// Sécurisé : validation stricte, pas de fuite de données internes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Limites de sécurité ──
const MAX_ITEMS = 20;           // Max 20 produits différents par commande
const MAX_QUANTITY_PER_ITEM = 50; // Max 50 unités par produit
const MAX_PRICE_CENTS = 99_999_00; // Max 99 999 RON par commande (prévention fraude)
const MIN_PRICE_CENTS = 100;    // Min 1 RON par produit

export async function POST(req: NextRequest) {
  const { isStripeConfigured, getStripe, STRIPE_CONFIG } = await import('@/lib/stripe');

  // ── 1. Vérification configuration Stripe ──
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Service de paiement temporairement indisponible.' },
      { status: 503 }
    );
  }

  // ── 2. Vérification Content-Type ──
  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Content-Type invalide' }, { status: 415 });
  }

  // ── 3. Parsing sécurisé du body ──
  let body: { items: CartItem[]; customerEmail?: string; deliveryFee: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }

  const { items, customerEmail, deliveryFee } = body;

  // ── 4. Validation stricte des données entrantes ──
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Le panier est vide' }, { status: 400 });
  }

  if (items.length > MAX_ITEMS) {
    return NextResponse.json({ error: 'Trop de produits dans le panier' }, { status: 400 });
  }

  // Valider chaque item individuellement
  for (const item of items) {
    if (!item.product?.id || typeof item.product.id !== 'string') {
      return NextResponse.json({ error: 'Produit invalide' }, { status: 400 });
    }
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > MAX_QUANTITY_PER_ITEM) {
      return NextResponse.json({ error: 'Quantité invalide' }, { status: 400 });
    }
    if (!item.product.price || typeof item.product.price !== 'number' || item.product.price < MIN_PRICE_CENTS) {
      return NextResponse.json({ error: 'Prix invalide' }, { status: 400 });
    }
  }

  // Valider les frais de livraison
  if (typeof deliveryFee !== 'number' || deliveryFee < 0 || deliveryFee > 10_000) {
    return NextResponse.json({ error: 'Frais de livraison invalides' }, { status: 400 });
  }

  // Valider l'email optionnel
  if (customerEmail !== undefined) {
    if (typeof customerEmail !== 'string' || customerEmail.length > 320) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }
    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({ error: 'Format email invalide' }, { status: 400 });
    }
  }

  // Calculer et vérifier le total maximal
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) + deliveryFee;
  if (total > MAX_PRICE_CENTS) {
    return NextResponse.json({ error: 'Montant total trop élevé' }, { status: 400 });
  }

  // ── 5. Construction des line items (données nettoyées) ──
  const lineItems: import('stripe').Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => ({
      price_data: {
        currency: STRIPE_CONFIG.currency,
        product_data: {
          // Tronquer les textes pour éviter les injections longues
          name: String(item.product.name.ro).substring(0, 120),
          description: `${String(item.product.description.ro).substring(0, 200)} | Origine: ${String(item.product.origin ?? 'Ferma Noastră').substring(0, 60)}`,
          images: [],
          metadata: {
            productId: String(item.product.id).substring(0, 50),
            slug: String(item.product.slug).substring(0, 80),
            unit: String(item.product.unit).substring(0, 20),
          },
        },
        unit_amount: Math.round(item.product.price), // Toujours entier
      },
      quantity: Math.min(Math.round(item.quantity), MAX_QUANTITY_PER_ITEM),
    })
  );

  // ── Frais de livraison ──
  if (deliveryFee > 0) {
    lineItems.push({
      price_data: {
        currency: STRIPE_CONFIG.currency,
        product_data: {
          name: 'Taxă de livrare',
          description: 'Livrare la domiciliu — zona locală',
          metadata: { type: 'delivery' },
        },
        unit_amount: Math.round(deliveryFee),
      },
      quantity: 1,
    });
  }

  // ── 6. Création session Stripe ──
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: STRIPE_CONFIG.successUrl,
      cancel_url: STRIPE_CONFIG.cancelUrl,
      customer_email: customerEmail,
      locale: 'ro',
      shipping_address_collection: {
        allowed_countries: STRIPE_CONFIG.allowedCountries,
      },
      phone_number_collection: { enabled: true },
      custom_text: {
        submit: {
          message:
            'Produsele vor fi livrate proaspete, culese în dimineața livrării.',
        },
      },
      metadata: {
        source: 'ferma-directe',
        itemCount: String(items.length),
        totalItems: String(items.reduce((s, i) => s + i.quantity, 0)),
      },
      payment_intent_data: {
        description: `Ferma — ${items.length} produs(e) de fermă`,
        metadata: { source: 'ferma-directe' },
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    const stripeError = err as { type?: string; message?: string };

    // Log l'erreur côté serveur sans exposer les détails au client
    console.error('[Ferma/Stripe Checkout Error]', {
      type: stripeError.type,
      // Ne pas logger le message complet qui peut contenir des données sensibles
    });

    // Erreurs Stripe typées — messages génériques côté client
    if (stripeError.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        { error: 'Service de paiement temporairement indisponible. Contactez-nous.' },
        { status: 503 }
      );
    }

    if (stripeError.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Données de commande invalides. Veuillez vider le panier et réessayer.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Eroare la inițializarea plății. Vă rugăm încercați din nou.' },
      { status: 500 }
    );
  }
}

// ── Rejeter les méthodes non-POST ──
export async function GET() {
  return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
}

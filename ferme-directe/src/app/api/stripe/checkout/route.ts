import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CartItem } from '@/types';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POST /api/stripe/checkout
// Crée une Stripe Checkout Session (paiement one-time)
// Patterns: stripe-node skill + saas-starter
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export async function POST(req: NextRequest) {
  const { isStripeConfigured, getStripe, STRIPE_CONFIG } = await import('@/lib/stripe');

  // ── Vérification configuration ──
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error: 'stripe_not_configured',
        message: "Stripe n'est pas encore configuré.",
        instructions: {
          step1: 'Copiez .env.example → .env.local',
          step2: 'Ajoutez STRIPE_SECRET_KEY=sk_test_...',
          step3: 'Ajoutez NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...',
          step4: 'Ajoutez STRIPE_WEBHOOK_SECRET=whsec_...',
          docs: 'https://dashboard.stripe.com/apikeys',
        },
      },
      { status: 503 }
    );
  }

  // ── Parsing du body ──
  let body: { items: CartItem[]; customerEmail?: string; deliveryFee: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }

  const { items, customerEmail, deliveryFee } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Le panier est vide' }, { status: 400 });
  }

  // ── Construction des line items ──
  const lineItems: import('stripe').Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => ({
      price_data: {
        currency: STRIPE_CONFIG.currency,
        product_data: {
          name: item.product.name.ro,
          description: `${item.product.description.ro.substring(0, 200)} | Origine: ${item.product.origin ?? 'Ferma Noastră'}`,
          images: [],
          metadata: {
            productId: item.product.id,
            slug: item.product.slug,
            unit: item.product.unit,
          },
        },
        unit_amount: item.product.price,
      },
      quantity: item.quantity,
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
        unit_amount: deliveryFee,
      },
      quantity: 1,
    });
  }

  // ── Création session Stripe ──
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
      // Codes promo (décommentez si vous créez des coupons dans Stripe Dashboard)
      // allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    const stripeError = err as { type?: string; message?: string };
    console.error('[Ferma/Stripe Checkout Error]', stripeError);

    // Erreurs Stripe typées (pattern stripe-node)
    if (stripeError.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        { error: 'Clé Stripe invalide. Vérifiez STRIPE_SECRET_KEY dans .env.local' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Eroare la inițializarea plății. Vă rugăm încercați din nou.' },
      { status: 500 }
    );
  }
}

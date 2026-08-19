import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CartItem } from '@/types';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POST /api/stripe/checkout
// Crée une session Stripe Checkout
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export async function POST(req: NextRequest) {
  // Vérification configuration Stripe
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      {
        error: 'Stripe non configuré',
        message: 'Ajoutez STRIPE_SECRET_KEY dans votre .env.local',
        setup: {
          required: [
            'STRIPE_SECRET_KEY=sk_test_...',
            'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...',
            'STRIPE_WEBHOOK_SECRET=whsec_...',
            'NEXT_PUBLIC_BASE_URL=http://localhost:3000',
          ],
        },
      },
      { status: 503 }
    );
  }

  try {
    const { getStripe, STRIPE_CONFIG } = await import('@/lib/stripe');
    const stripe = getStripe();
    const body = await req.json() as {
      items: CartItem[];
      customerEmail?: string;
      deliveryFee: number;
    };

    const { items, customerEmail, deliveryFee } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
    }

    // Construire les line items Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: STRIPE_CONFIG.currency,
        product_data: {
          name: item.product.name.ro,
          description: item.product.description.ro.substring(0, 500),
          metadata: {
            productId: item.product.id,
            unit: item.product.unit,
          },
        },
        unit_amount: item.product.price, // déjà en centimes
      },
      quantity: item.quantity,
    }));

    // Ajouter frais de livraison si nécessaire
    if (deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: STRIPE_CONFIG.currency,
          product_data: {
            name: 'Livrare',
            description: 'Taxă de livrare la domiciliu',
            metadata: { productId: 'delivery', unit: 'fixed' },
          },
          unit_amount: deliveryFee,
        },
        quantity: 1,
      });
    }

    // Créer la session checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: STRIPE_CONFIG.successUrl,
      cancel_url: STRIPE_CONFIG.cancelUrl,
      customer_email: customerEmail,
      locale: 'ro',
      shipping_address_collection: {
        allowed_countries: ['RO'],
      },
      phone_number_collection: { enabled: true },
      metadata: {
        source: 'ferma-directe',
        itemCount: items.length.toString(),
      },
      payment_intent_data: {
        description: `Comandă Ferma — ${items.length} produs(e)`,
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('[Stripe Checkout Error]', error);
    return NextResponse.json(
      { error: 'Eroare la inițializarea plății. Vă rugăm încercați din nou.' },
      { status: 500 }
    );
  }
}

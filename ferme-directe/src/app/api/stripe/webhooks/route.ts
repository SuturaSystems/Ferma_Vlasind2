import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POST /api/stripe/webhooks
// Gestion sécurisée des webhooks Stripe
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ message: 'Stripe non configuré' }, { status: 503 });
  }

  const { getStripe, STRIPE_WEBHOOK_SECRET } = await import('@/lib/stripe');
  const stripe = getStripe();
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[Webhook] Signature invalide:', err);
    return NextResponse.json({ error: 'Webhook signature invalide' }, { status: 400 });
  }

  console.log(`[Webhook] Événement reçu: ${event.type}`);

  // Gérer les événements Stripe
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log(`[Webhook] Paiement confirmé: ${session.id}`);
      // TODO: Mettre à jour le stock dans la DB
      // TODO: Envoyer email de confirmation (Resend)
      // TODO: Créer la commande dans la DB
      await handlePaymentSuccess(session);
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      console.log(`[Webhook] Session expirée: ${session.id}`);
      // TODO: Libérer le stock réservé
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.error(`[Webhook] Paiement échoué: ${paymentIntent.id}`);
      // TODO: Notifier le client
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object;
      console.log(`[Webhook] Abonnement ${event.type}: ${sub.id}`);
      // TODO: Gérer les box abonnements
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      console.log(`[Webhook] Abonnement annulé: ${sub.id}`);
      // TODO: Désactiver la box
      break;
    }

    default:
      console.log(`[Webhook] Événement non géré: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handlePaymentSuccess(session: { id?: string; customer_email?: string | null; amount_total?: number | null }) {
  // Placeholder — à connecter à votre base de données
  console.log('[Ferma] Commande créée:', {
    sessionId: session.id,
    customerEmail: session.customer_email,
    amountTotal: session.amount_total,
  });
  // Futur: await db.order.create({ ... })
  // Futur: await resend.emails.send({ ... })
}

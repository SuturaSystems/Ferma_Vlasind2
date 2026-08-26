import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POST /api/stripe/webhooks
// Sécurisé : vérification signature cryptographique obligatoire
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export async function POST(req: NextRequest) {
  // ── 1. Stripe configuré ? ──
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    // Réponse vague : ne pas révéler la configuration interne
    return NextResponse.json({ message: 'Service indisponible' }, { status: 503 });
  }

  const { getStripe, STRIPE_WEBHOOK_SECRET } = await import('@/lib/stripe');

  // ── 2. Lire le body RAW (obligatoire pour la vérification de signature) ──
  const body = await req.text();

  // ── 3. Vérifier la signature Stripe (anti-rejeu, anti-falsification) ──
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    // Quelqu'un appelle l'endpoint sans passer par Stripe
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const stripe = getStripe();
  let event: import('stripe').Stripe.Event;

  try {
    // La vérification de signature échoue si :
    // - Le body a été modifié en transit
    // - La signature est fausse/expirée (replay attack)
    // - Le whsec_ ne correspond pas
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    // Log minimal : pas d'exposition du body ou de la signature
    console.error('[Webhook] Échec vérification signature:', (err as Error).message?.substring(0, 100));
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
  }

  // ── 4. Traitement des événements Stripe ──
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        // Log minimal — pas d'email client dans les logs
        console.log(`[Webhook] Paiement confirmé session: ${session.id}`);
        await handlePaymentSuccess(session);
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object;
        console.log(`[Webhook] Session expirée: ${session.id}`);
        // TODO: Libérer le stock réservé (Phase 2)
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        // Ne pas logger les détails du client
        console.error(`[Webhook] Paiement échoué: ${paymentIntent.id}`);
        // TODO: Notifier le client (Phase 2 — Resend)
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object;
        console.log(`[Webhook] Abonnement ${event.type}: ${sub.id}`);
        // TODO: Gérer les box abonnements (Phase 2)
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        console.log(`[Webhook] Abonnement annulé: ${sub.id}`);
        // TODO: Désactiver la box (Phase 2)
        break;
      }

      default:
        // Événements non gérés : ignorer silencieusement
        break;
    }
  } catch (handlerError) {
    // Erreur dans le handler : on retourne quand même 200 à Stripe
    // (sinon Stripe va renvoyer l'événement en boucle)
    console.error('[Webhook] Erreur handler:', (handlerError as Error).message?.substring(0, 100));
  }

  // ── 5. Toujours répondre 200 à Stripe (évite les renvois automatiques) ──
  return NextResponse.json({ received: true }, { status: 200 });
}

// ── Handler paiement réussi ──
async function handlePaymentSuccess(
  session: import('stripe').Stripe.Checkout.Session
) {
  // Log minimal et sécurisé (pas de données client en clair)
  console.log('[Ferma] Commande créée:', {
    sessionId: session.id,
    // Ne jamais logger l'email complet du client
    customerEmailDomain: session.customer_email?.split('@')[1] ?? 'inconnu',
    amountTotal: session.amount_total,
    currency: session.currency,
  });

  // Phase 2 : connecter à la base de données
  // await db.orders.create({ stripeSessionId: session.id, ... });

  // Phase 2 : envoyer l'email de confirmation
  // await resend.emails.send({ to: session.customer_email, ... });
}

// ── Rejeter les méthodes non-POST ──
export async function GET() {
  return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
}

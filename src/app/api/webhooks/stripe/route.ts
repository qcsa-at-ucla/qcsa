import Stripe from "stripe";
import { NextResponse } from "next/server";
import { insertSponsor, getSponsorBySessionId } from "@/app/utils/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Handle checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Check if we already recorded this sponsor (idempotency)
      const existing = await getSponsorBySessionId(session.id);
      if (existing) {
        console.log(`Sponsor already recorded for session ${session.id}`);
        return NextResponse.json({ received: true });
      }

      // Extract metadata and customer details
      const tier = (session.metadata?.tier as "silver" | "gold") || "silver";
      const companyName = session.metadata?.company_name || null;
      const contactName = session.metadata?.contact_name || null;

      // Get customer email from session
      const customerEmail = session.customer_details?.email || session.customer_email || "unknown@email.com";

      // Insert sponsor record into Supabase
      await insertSponsor({
        stripe_session_id: session.id,
        stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
        stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
        company_name: companyName,
        contact_email: customerEmail,
        contact_name: contactName,
        tier: tier,
        amount_paid: session.amount_total || 0,
        currency: session.currency || "usd",
        payment_status: session.payment_status || "paid",
      });

      console.log(`Successfully recorded sponsor: ${customerEmail} (${tier})`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to record sponsor";
      console.error("Error recording sponsor:", message);
      // Return 500 so Stripe will retry the webhook
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  // Handle payment_intent.payment_failed for failed payments
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log(`Payment failed for intent ${paymentIntent.id}: ${paymentIntent.last_payment_error?.message}`);
    // You could log this to a separate table or send an alert
  }

  return NextResponse.json({ received: true });
}

// Stripe webhooks only use POST
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { insertSponsor, getSponsorBySessionId } from "@/app/utils/supabaseClient";
import { submitOrder, getShopId } from "@/app/utils/printifyService";
import { sendOrderConfirmation } from "@/app/utils/resendService";
import type { OrderConfirmationItem } from "@/app/utils/resendService";

// Force Node.js runtime and prevent any dynamic behavior
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    // ── Merch order fulfillment ───────────────────────────────────────────────
    if (session.metadata?.order_type === "merch") {
      try {
        const itemsJson = session.metadata?.items_json;
        if (!itemsJson) throw new Error("No items_json in merch session metadata");

        const printifyItems = JSON.parse(itemsJson) as {
          product_id: string;
          variant_id: number;
          quantity: number;
        }[];

        // Newer Stripe API versions surface shipping under collected_information.shipping_details;
        // older versions used the top-level shipping field. Support both.
        type ShippingShape = { name?: string; address?: Record<string, string | null> } | null;
        const raw = session as unknown as Record<string, unknown>;
        const collectedInfo = raw.collected_information as Record<string, unknown> | undefined;
        const shipping: ShippingShape =
          (collectedInfo?.shipping_details as ShippingShape) ??
          (raw.shipping as ShippingShape) ??
          null;

        // Final fallback: customer_details has address + name too
        const addr: Record<string, string | null> =
          shipping?.address ??
          (session.customer_details?.address as Record<string, string | null> | undefined) ??
          {};
        const name =
          shipping?.name ??
          session.customer_details?.name ??
          "Customer";
        const [firstName, ...rest] = name.split(" ");
        const lastName = rest.join(" ") || firstName;

        await getShopId(); // ensure shop is resolved

        const customerEmail = session.customer_details?.email ?? "";
        const shippingMethodName =
          session.metadata?.shipping_method_name ?? "Standard Shipping";

        await submitOrder({
          external_id: session.id,
          label: `QCSA-${session.id.slice(-8).toUpperCase()}`,
          line_items: printifyItems,
          shipping_method: 1, // standard
          send_shipping_notification: true,
          address_to: {
            first_name: firstName,
            last_name: lastName,
            email: customerEmail || "unknown@qcsa.org",
            phone: session.customer_details?.phone ?? "",
            country: (addr.country as string | null) ?? "US",
            region: (addr.state as string | null) ?? "",
            address1: (addr.line1 as string | null) ?? "",
            address2: (addr.line2 as string | null) ?? "",
            city: (addr.city as string | null) ?? "",
            zip: (addr.postal_code as string | null) ?? "",
          },
        });

        // ── Send order confirmation email ─────────────────────────────────────
        if (customerEmail) {
          try {
            // Parse full cart items from metadata (includes price, title, image)
            const cartItemsJson = session.metadata?.cart_items_json;
            let emailItems: OrderConfirmationItem[] = [];

            if (cartItemsJson) {
              const cartItems = JSON.parse(cartItemsJson) as {
                title: string;
                variant_title: string;
                quantity: number;
                price: number;
                image_src?: string;
              }[];
              emailItems = cartItems.map((c) => ({
                title: c.title,
                variant_title: c.variant_title,
                quantity: c.quantity,
                price: c.price,
                image_src: c.image_src,
              }));
            } else {
              // Fallback: use printify items without images/titles
              emailItems = printifyItems.map((i) => ({
                title: `Product ${i.product_id.slice(-6)}`,
                variant_title: `Variant ${i.variant_id}`,
                quantity: i.quantity,
                price: 0,
              }));
            }

            const subtotal = emailItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0
            );
            const shippingAmount = session.total_details?.amount_shipping ?? 0;
            const total = session.amount_total ?? subtotal + shippingAmount;

            await sendOrderConfirmation({
              to: customerEmail,
              customerName: name,
              orderId: session.id.slice(-12).toUpperCase(),
              items: emailItems,
              shippingAddress: {
                name,
                line1: (addr.line1 as string | null) ?? "",
                line2: addr.line2 as string | null,
                city: (addr.city as string | null) ?? "",
                state: (addr.state as string | null) ?? "",
                postal_code: (addr.postal_code as string | null) ?? "",
                country: (addr.country as string | null) ?? "US",
              },
              shippingMethod: shippingMethodName,
              subtotal,
              shipping: shippingAmount,
              total,
            });

            console.log(`Order confirmation email sent to ${customerEmail}`);
          } catch (emailErr) {
            // Non-fatal — log but don't fail the webhook
            console.error(
              "Failed to send order confirmation email:",
              emailErr instanceof Error ? emailErr.message : emailErr
            );
          }
        }

        console.log(`Printify merch order submitted for session ${session.id}`);
        return NextResponse.json({ received: true });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Printify order failed";
        console.error("Merch fulfillment error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
      }
    }

    // ── Sponsor payment ───────────────────────────────────────────────────────
    try {
      const existing = await getSponsorBySessionId(session.id);
      if (existing) {
        console.log(`Sponsor already recorded for session ${session.id}`);
        return NextResponse.json({ received: true });
      }

      const tier = (session.metadata?.tier as "silver" | "gold") || "silver";
      const companyName = session.metadata?.company_name || null;
      const contactName = session.metadata?.contact_name || null;
      const customerEmail = session.customer_details?.email || session.customer_email || "unknown@email.com";
      const amountInDollars = session.amount_total ? session.amount_total / 100 : 0;

      await insertSponsor({
        stripe_session_id: session.id,
        stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
        stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
        company_name: companyName,
        contact_email: customerEmail,
        contact_name: contactName,
        tier: tier,
        amount_paid: amountInDollars,
        currency: session.currency || "usd",
        payment_status: session.payment_status || "paid",
      });

      console.log(`Successfully recorded sponsor: ${customerEmail} (${tier})`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to record sponsor";
      console.error("Error recording sponsor:", message);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  // Handle payment_intent.payment_failed for failed payments
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log(`Payment failed for intent ${paymentIntent.id}: ${paymentIntent.last_payment_error?.message}`);
  }

  return NextResponse.json({ received: true });
}

// Stripe webhooks only use POST
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

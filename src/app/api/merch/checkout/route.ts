import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export interface CartItem {
  product_id: string;
  variant_id: number;
  quantity: number;
  price: number;     // retail price in cents
  title: string;
  variant_title: string;
  image_src: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { items: CartItem[] };
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Build Stripe line items from cart
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.price, // already in cents
        product_data: {
          name: item.title,
          description: item.variant_title,
          images: item.image_src ? [item.image_src] : [],
        },
      },
      quantity: item.quantity,
    }));

    // Serialize Printify order items into metadata (max 500 chars per value)
    const printifyItems = items.map((i) => ({
      product_id: i.product_id,
      variant_id: i.variant_id,
      quantity: i.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // Collect shipping address for Printify fulfillment
      shipping_address_collection: {
        allowed_countries: [
          "US", "CA", "GB", "AU", "DE", "FR", "NL", "SE", "NO", "DK",
          "FI", "IT", "ES", "PT", "BE", "AT", "CH", "PL", "CZ", "HU",
          "RO", "GR", "SK", "SI", "HR", "BG", "LT", "LV", "EE",
        ],
      },
      // Flat shipping options
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 650, currency: "usd" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 12 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1299, currency: "usd" },
            display_name: "Priority Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      success_url: `${siteUrl}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/merch`,
      phone_number_collection: { enabled: true },
      metadata: {
        order_type: "merch",
        // Printify fulfillment items — kept minimal to stay well within Stripe's 500-char metadata limit
        items_json: JSON.stringify(printifyItems),
        // Cart data for confirmation email — titles/variants only (no images)
        cart_items_json: JSON.stringify(
          items.map((i) => ({
            t: i.title,
            v: i.variant_title,
            q: i.quantity,
            p: i.price,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Merch checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

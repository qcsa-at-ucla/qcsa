import Stripe from "stripe";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function loadEnvExample() {
  const envPath = path.join(process.cwd(), ".env.example");
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvExample();

const secretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const stripe = secretKey ? new Stripe(secretKey, { apiVersion: "2024-06-20" }) : null;

type Tier = "silver" | "gold";

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }

    const body: unknown = await req.json();
    const tier = (body as { tier?: Tier }).tier;

    if (tier !== "silver" && tier !== "gold") {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const priceId =
      tier === "silver"
        ? process.env.STRIPE_SILVER_PRICE_ID
        : process.env.STRIPE_GOLD_PRICE_ID;

    if (!priceId) {
      return NextResponse.json({ error: "Missing price id" }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/sponsor/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/sponsor/cancel`,
      customer_creation: "always",
      billing_address_collection: "auto",
      metadata: { tier },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "info@qcsa.org";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;
const rateStore = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateStore.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) return true;
  entry.count += 1;
  return false;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes before trying again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, title, message } = body;
  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof title !== "string" || !title.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (name.length > 100 || email.length > 254 || title.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Missing RESEND_API_KEY");
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  // Resend can only send from a verified domain, so the submitter's address
  // is used as the display name's reply-to; the sender shows their name.
  const safeName = name.replace(/[<>"\r\n]/g, "").trim();
  const from = process.env.QECML_CONTACT_FROM_EMAIL || process.env.RESEND_FROM_EMAIL;
  if (!from) {
    console.error("Missing QECML_CONTACT_FROM_EMAIL / RESEND_FROM_EMAIL");
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  try {
    const { error } = await new Resend(key).emails.send({
      from,
      to: TO,
      replyTo: email,
      subject: title.replace(/[\r\n]+/g, " ").trim(),
      text: `From: ${safeName} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(safeName)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space: pre-wrap;">${escapeHtml(message)}</p>`,
    });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("QECML contact email error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

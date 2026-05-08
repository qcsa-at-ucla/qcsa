import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Rate limiting ────────────────────────────────────────────────────────────
// Simple sliding-window counter keyed by IP.
// Limits each IP to MAX_REQUESTS per WINDOW_MS.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;

interface RateEntry {
  count: number;
  windowStart: number;
}

const rateStore = new Map<string, RateEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateStore.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

function getClientIp(request: NextRequest): string {
  // Vercel sets x-forwarded-for; fall back to a generic key
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
// ─────────────────────────────────────────────────────────────────────────────

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

function fromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    "Quantum Computing Student Association <quantum.ucla@gmail.com>"
  );
}

function replyTo(): string {
  return process.env.RESEND_REPLY_TO_EMAIL || "quantum.ucla@gmail.com";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes before trying again." },
      { status: 429 }
    );
  }

  let name: string, email: string, message: string;

  try {
    ({ name, email, message } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (
    !name || typeof name !== "string" ||
    !email || typeof email !== "string" ||
    !message || typeof message !== "string"
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Sanitise lengths to prevent abuse
  if (name.length > 100 || email.length > 254 || message.length > 2000) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  try {
    const resend = getResend();

    // 1. Internal notification → QCSA inbox
    await resend.emails.send({
      from: fromAddress(),
      to: replyTo(),
      replyTo: email,
      subject: `QCSA Contact Form — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a2f5a;">
          <h2 style="margin: 0 0 16px; color: #234285;">New Contact Form Submission</h2>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 80px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e8eef8; margin: 16px 0;" />
          <p style="margin: 0 0 8px; font-weight: 600;">Message:</p>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
      `,
    });

    // 2. Confirmation receipt → the person who submitted the form
    await resend.emails.send({
      from: fromAddress(),
      to: email,
      replyTo: replyTo(),
      subject: `We received your message — QCSA`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a2f5a;">
          <h2 style="margin: 0 0 8px; color: #234285;">Thanks for reaching out, ${name}!</h2>
          <p style="margin: 0 0 16px; line-height: 1.6;">We received your message and will get back to you as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #e8eef8; margin: 16px 0;" />
          <p style="margin: 0 0 8px; font-weight: 600; font-size: 13px; color: #64748b;">Your message:</p>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 14px; color: #475569;">${message}</p>
          <hr style="border: none; border-top: 1px solid #e8eef8; margin: 24px 0;" />
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">Quantum Computing Student Association @ UCLA</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form email error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

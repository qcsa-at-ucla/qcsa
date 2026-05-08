/**
 * Resend email service — server-side only.
 * Used to send transactional emails (merch order confirmations, etc.)
 */

import { Resend } from "resend";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

function fromAddress(): string {
  return process.env.RESEND_FROM_EMAIL || "Quantum Computing Student Association <quantum.ucla@gmail.com>";
}

function replyTo(): string {
  return process.env.RESEND_REPLY_TO_EMAIL || "quantum.ucla@gmail.com";
}

// ─── Merch order confirmation ─────────────────────────────────────────────────

export interface OrderConfirmationItem {
  title: string;
  variant_title: string;
  quantity: number;
  price: number; // cents
  image_src?: string;
}

export interface OrderConfirmationPayload {
  to: string;
  customerName: string;
  orderId: string;
  items: OrderConfirmationItem[];
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  shippingMethod: string; // "Standard Shipping" | "Priority Shipping"
  subtotal: number;  // cents
  shipping: number;  // cents
  total: number;     // cents
}

function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function buildItemRows(items: OrderConfirmationItem[]): string {
  return items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #e8eef8; vertical-align: top;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            ${
              item.image_src
                ? `<td style="width: 64px; padding-right: 14px; vertical-align: top;">
                     <img src="${item.image_src}" alt="${item.title}" width="64" height="64"
                       style="border-radius: 8px; object-fit: cover; display: block;" />
                   </td>`
                : ""
            }
            <td style="vertical-align: top;">
              <p style="margin: 0 0 2px; font-size: 15px; font-weight: 600; color: #1a2f5a;">${item.title}</p>
              <p style="margin: 0 0 2px; font-size: 13px; color: #64748b;">${item.variant_title}</p>
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">Qty: ${item.quantity}</p>
            </td>
            <td style="vertical-align: top; text-align: right; white-space: nowrap;">
              <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1a2f5a;">
                ${formatMoney(item.price * item.quantity)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    )
    .join("");
}

function buildOrderConfirmationHtml(payload: OrderConfirmationPayload): string {
  const addr = payload.shippingAddress;
  const addrLines = [
    addr.name,
    addr.line1,
    addr.line2 || null,
    `${addr.city}, ${addr.state} ${addr.postal_code}`,
    addr.country,
  ]
    .filter(Boolean)
    .join("<br />");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmed – QCSA Merch</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

  <!-- Wrapper -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f4ff; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 32px rgba(35,66,133,0.10);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a2f5a 0%, #234285 60%, #3b5fc0 100%); padding: 40px 40px 36px; text-align: center;">
              <p style="margin: 0 0 4px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.65); letter-spacing: 2px; text-transform: uppercase;">
                Quantum Computing Student Association
              </p>
              <h1 style="margin: 0 0 8px; font-size: 30px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                Order Confirmed
              </h1>
              <p style="margin: 0; font-size: 15px; color: rgba(255,255,255,0.80);">
                Hey ${payload.customerName.split(" ")[0]}, your merch is on its way to being printed.
              </p>
            </td>
          </tr>

          <!-- Order ID badge -->
          <tr>
            <td style="padding: 24px 40px 0; text-align: center;">
              <span style="display: inline-block; background: #eef3ff; border: 1.5px solid #c7d5f5; color: #234285; font-size: 13px; font-weight: 700; padding: 6px 18px; border-radius: 99px; letter-spacing: 1px;">
                ORDER #${payload.orderId}
              </span>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 28px 40px 0;">
              <h2 style="margin: 0 0 16px; font-size: 17px; font-weight: 700; color: #1a2f5a;">Your Items</h2>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tbody>
                  ${buildItemRows(payload.items)}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 20px 40px 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f8faff; border-radius: 12px; padding: 20px;">
                <tr>
                  <td style="padding: 4px 0; font-size: 14px; color: #64748b;">Subtotal</td>
                  <td style="padding: 4px 0; font-size: 14px; color: #64748b; text-align: right;">${formatMoney(payload.subtotal)}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-size: 14px; color: #64748b;">${payload.shippingMethod}</td>
                  <td style="padding: 4px 0; font-size: 14px; color: #64748b; text-align: right;">${formatMoney(payload.shipping)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 0; font-size: 16px; font-weight: 700; color: #1a2f5a; border-top: 1.5px solid #e0e8f8;">Total</td>
                  <td style="padding: 12px 0 0; font-size: 16px; font-weight: 700; color: #234285; text-align: right; border-top: 1.5px solid #e0e8f8;">${formatMoney(payload.total)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping address -->
          <tr>
            <td style="padding: 24px 40px 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: 50%; vertical-align: top; padding-right: 12px;">
                    <h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #1a2f5a; text-transform: uppercase; letter-spacing: 0.5px;">Ship To</h3>
                    <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.7;">${addrLines}</p>
                  </td>
                  <td style="width: 50%; vertical-align: top; padding-left: 12px;">
                    <h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #1a2f5a; text-transform: uppercase; letter-spacing: 0.5px;">Shipping Method</h3>
                    <p style="margin: 0; font-size: 14px; color: #475569;">${payload.shippingMethod}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's next -->
          <tr>
            <td style="padding: 28px 40px 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #eef3ff; border-radius: 14px; padding: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 16px; font-size: 15px; font-weight: 700; color: #1a2f5a;">What happens next?</h3>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${[
                        ["1", "Your order has been sent to our print provider for fulfillment."],
                        ["2", "You'll receive a separate shipping confirmation email once your order is dispatched."],
                        ["3", "Use the tracking number in that email to follow your package."],
                      ]
                        .map(
                          ([n, text]) => `
                      <tr>
                        <td style="width: 36px; padding-bottom: 14px; vertical-align: top; padding-top: 1px;">
                          <table cellpadding="0" cellspacing="0" border="0" style="width: 28px; height: 28px;">
                            <tr><td style="width: 28px; height: 28px; background: #234285; border-radius: 50%; text-align: center; vertical-align: middle; font-size: 12px; font-weight: 700; color: #ffffff; line-height: 28px;">${n}</td></tr>
                          </table>
                        </td>
                        <td style="padding-bottom: 14px; padding-left: 12px; font-size: 14px; color: #475569; line-height: 1.6; vertical-align: middle;">${text}</td>
                      </tr>`
                        )
                        .join("")}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 28px 40px 0; text-align: center;">
              <a href="https://qcsa.org/merch"
                style="display: inline-block; background: #234285; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 36px; border-radius: 10px;">
                Continue Shopping
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 36px 40px; text-align: center; border-top: 1px solid #e8eef8; margin-top: 28px;">
              <p style="margin: 0 0 6px; font-size: 14px; font-weight: 600; color: #1a2f5a;">
                Quantum Computing Student Association @ UCLA
              </p>
              <p style="margin: 0 0 6px; font-size: 13px; color: #94a3b8;">
                Questions? Reply to this email or contact us at
                <a href="mailto:quantum.ucla@gmail.com" style="color: #234285; text-decoration: none;">quantum dot ucla at gmail dot com</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #cbd5e1;">
                You're receiving this because you placed an order at the QCSA Merch Store.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function sendOrderConfirmation(payload: OrderConfirmationPayload): Promise<void> {
  const resend = getResend();

  const { error } = await resend.emails.send({
    from: fromAddress(),
    replyTo: replyTo(),
    to: payload.to,
    subject: `Order Confirmed – QCSA Merch #${payload.orderId}`,
    html: buildOrderConfirmationHtml(payload),
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}

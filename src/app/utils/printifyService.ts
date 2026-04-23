/**
 * Printify API Service - server-side only utility
 * Printify does not support CORS, so all calls must be made server-side.
 */

const PRINTIFY_BASE = "https://api.printify.com/v1";

function getToken(): string {
  const token = process.env.PRINTIFY_API?.trim();
  if (!token) throw new Error("Missing PRINTIFY_API environment variable");
  return token;
}

function headers() {
  return {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
    "User-Agent": "QCSA-Merch-Store/1.0",
  };
}

// ─── Shops ────────────────────────────────────────────────────────────────────

export interface PrintifyShop {
  id: number;
  title: string;
  sales_channel: string;
}

let cachedShopId: number | null = null;

export async function getShops(): Promise<PrintifyShop[]> {
  const res = await fetch(`${PRINTIFY_BASE}/shops.json`, { headers: headers() });
  if (!res.ok) throw new Error(`Printify shops error: ${res.status}`);
  return res.json();
}

export async function getShopId(): Promise<number> {
  if (cachedShopId) return cachedShopId;

  // Allow override via env var
  const envShopId = process.env.PRINTIFY_SHOP_ID;
  if (envShopId) {
    cachedShopId = parseInt(envShopId, 10);
    return cachedShopId;
  }

  const shops = await getShops();
  if (!shops.length) throw new Error("No Printify shops found");
  cachedShopId = shops[0].id;
  return cachedShopId;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export interface PrintifyVariant {
  id: number;
  price: number;   // retail price in cents
  cost: number;    // fulfillment cost in cents
  title: string;
  sku: string;
  grams: number;
  is_enabled: boolean;
  is_default: boolean;
  is_available: boolean;
  options: number[];
}

export interface PrintifyOption {
  name: string;
  type: string;
  values: { id: number; title: string; colors?: string[] }[];
}

export interface PrintifyImage {
  src: string;
  variant_ids: number[];
  position: string;
  is_default: boolean;
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: PrintifyOption[];
  variants: PrintifyVariant[];
  images: PrintifyImage[];
  blueprint_id: number;
  print_provider_id: number;
  visible: boolean;
}

export interface PrintifyProductList {
  current_page: number;
  data: PrintifyProduct[];
  last_page: number;
  total: number;
  per_page: number;
}

export async function getProducts(page = 1, limit = 50): Promise<PrintifyProductList> {
  const shopId = await getShopId();
  const url = `${PRINTIFY_BASE}/shops/${shopId}/products.json?page=${page}&limit=${limit}`;
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: 300 }, // cache for 5 minutes
  });
  if (!res.ok) throw new Error(`Printify products error: ${res.status}`);
  return res.json();
}

export async function getProduct(productId: string): Promise<PrintifyProduct> {
  const shopId = await getShopId();
  const url = `${PRINTIFY_BASE}/shops/${shopId}/products/${productId}.json`;
  const res = await fetch(url, {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Printify product error: ${res.status}`);
  return res.json();
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export interface PrintifyOrderLineItem {
  product_id: string;
  variant_id: number;
  quantity: number;
}

export interface PrintifyAddressTo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
}

export interface PrintifyOrderPayload {
  external_id: string;
  label?: string;
  line_items: PrintifyOrderLineItem[];
  shipping_method: number; // 1 = standard
  send_shipping_notification: boolean;
  address_to: PrintifyAddressTo;
}

export async function submitOrder(payload: PrintifyOrderPayload): Promise<{ id: string }> {
  const shopId = await getShopId();
  const url = `${PRINTIFY_BASE}/shops/${shopId}/orders.json`;
  const res = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Printify order error ${res.status}: ${errText}`);
  }
  return res.json();
}

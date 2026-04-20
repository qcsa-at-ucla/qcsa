"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import MainWebsiteHeader from "@/app/Components/mainWebsiteHeader";
import MainWebsiteFooter from "@/app/Components/mainWebsiteFooter";
import type { PrintifyProduct } from "@/app/utils/printifyService";

// ─── Cart types ───────────────────────────────────────────────────────────────

export interface CartItem {
  product_id: string;
  variant_id: number;
  quantity: number;
  price: number;
  title: string;
  variant_title: string;
  image_src: string;
}

function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("qcsa_merch_cart") ?? "[]");
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem("qcsa_merch_cart", JSON.stringify(items));
}

// ─── Price helpers ────────────────────────────────────────────────────────────

function getMinPrice(product: PrintifyProduct): number {
  const enabled = product.variants.filter((v) => v.is_enabled && v.is_available);
  if (!enabled.length) return 0;
  return Math.min(...enabled.map((v) => v.price));
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function getDefaultImage(product: PrintifyProduct): string {
  const def = product.images.find((i) => i.is_default);
  return def?.src ?? product.images[0]?.src ?? "/images/placeholder-logo.jpg";
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: PrintifyProduct }) {
  const [hovered, setHovered] = useState(false);

  const images = product.images.filter((i) => i.position === "front");
  const mainImg = getDefaultImage(product);
  const hoverImg = images[1]?.src ?? images[0]?.src ?? mainImg;

  const minPrice = getMinPrice(product);
  const colorOption = product.options.find((o) => o.type === "color");
  const colorCount = colorOption?.values.length ?? 0;

  return (
    <Link href={`/merch/${product.id}`} className="group block">
      <div
        className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Product image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={hovered && hoverImg !== mainImg ? hoverImg : mainImg}
            alt={product.title}
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
          {/* Overlay badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-[#234285] text-white text-xs font-kantumruy font-bold px-3 py-1 rounded-full">
              QCSA
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="font-kantumruy font-bold text-[#234285] text-base leading-tight mb-1 line-clamp-2">
            {product.title}
          </h3>

          <div className="flex items-center justify-between mt-2">
            <span className="font-kantumruy font-bold text-[#234285] text-lg">
              {minPrice > 0 ? `From ${formatPrice(minPrice)}` : "—"}
            </span>
            {colorCount > 0 && (
              <span className="text-xs text-gray-500 font-kantumruy">
                {colorCount} color{colorCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-full text-center py-2 bg-[#234285] text-white rounded-lg text-sm font-kantumruy font-bold">
              View & Select →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────

function CartSidebar({
  open,
  onClose,
  cart,
  onRemove,
  onUpdateQty,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (variantId: number) => void;
  onUpdateQty: (variantId: number, qty: number) => void;
}) {
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/merch/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-kantumruy font-bold text-[#234285] text-2xl">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🛒</div>
              <p className="font-kantumruy text-gray-500 text-lg">Your cart is empty</p>
              <button onClick={onClose} className="mt-6 text-[#234285] font-kantumruy font-bold hover:underline">
                Continue Shopping →
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.variant_id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                  {item.image_src && (
                    <Image src={item.image_src} alt={item.title} fill className="object-cover" unoptimized />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-kantumruy font-bold text-[#234285] text-sm leading-tight truncate">
                    {item.title}
                  </p>
                  <p className="font-kantumruy text-gray-500 text-xs mt-0.5">{item.variant_title}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2 py-1">
                      <button
                        onClick={() => onUpdateQty(item.variant_id, item.quantity - 1)}
                        className="text-gray-500 hover:text-[#234285] w-5 h-5 flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="font-kantumruy text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.variant_id, item.quantity + 1)}
                        className="text-gray-500 hover:text-[#234285] w-5 h-5 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-kantumruy font-bold text-[#234285] text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.variant_id)}
                  className="text-gray-400 hover:text-red-500 transition-colors self-start mt-1"
                  aria-label="Remove item"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-kantumruy text-gray-600">Subtotal</span>
              <span className="font-kantumruy font-bold text-[#234285] text-xl">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-gray-400 font-kantumruy mb-4 text-center">
              Shipping calculated at checkout
            </p>
            {error && (
              <p className="text-red-500 text-sm font-kantumruy mb-3 text-center">{error}</p>
            )}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#234285] text-white font-kantumruy font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-lg"
            >
              {loading ? "Redirecting…" : "Checkout →"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MerchPage() {
  const [products, setProducts] = useState<PrintifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Load products
  useEffect(() => {
    fetch("/api/printify/products")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setProducts(data.data ?? []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    setCart(getCart());
  }, []);

  const removeFromCart = useCallback((variantId: number) => {
    setCart((prev) => {
      const next = prev.filter((i) => i.variant_id !== variantId);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQty = useCallback((variantId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart((prev) => {
      const next = prev.map((i) => (i.variant_id === variantId ? { ...i, quantity: qty } : i));
      saveCart(next);
      return next;
    });
  }, [removeFromCart]);

  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F3F8FF" }}>
      <MainWebsiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#234285" }}>
        <div className="absolute inset-0 opacity-10">
          {/* Quantum-inspired grid pattern */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #ADC8EF 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #ADC8EF 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 rounded-full px-4 py-2 text-sm font-kantumruy mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#ADC8EF] animate-pulse" />
            Official QCSA Merchandise
          </div>
          <h1 className="font-kantumruy font-bold text-white text-5xl md:text-6xl leading-tight mb-6">
            QCSA Merch
          </h1>
          <p className="font-kantumruy text-white/80 text-xl max-w-2xl mx-auto mb-8">
            Wear the quantum revolution. Every purchase supports the UCLA Quantum Computing Student Association.
          </p>
          <div className="flex justify-center gap-6 text-white/60 font-kantumruy text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Print on Demand
            </span>
            {/* <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ships Worldwide
            </span> */}
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure Checkout
            </span>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-8 right-8 z-30 bg-[#234285] text-white rounded-full p-4 shadow-xl hover:bg-blue-700 transition-all hover:scale-110 flex items-center gap-2"
        aria-label="Open cart"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartCount > 0 && (
          <span className="bg-white text-[#234285] font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
      />

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="font-kantumruy font-bold text-[#234285] text-2xl mb-2">Couldn&apos;t load products</h2>
            <p className="font-kantumruy text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#234285] text-white font-kantumruy font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="font-kantumruy font-bold text-[#234285] text-2xl mb-2">No products yet</h2>
            <p className="font-kantumruy text-gray-600">Check back soon — new merch is coming!</p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-kantumruy font-bold text-[#234285] text-3xl">
                All Products
                <span className="ml-3 text-lg font-normal text-gray-400">({products.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Why QCSA Merch section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-kantumruy font-bold text-[#234285] text-3xl mb-4">
            Why Shop with QCSA?
          </h2>
          <p className="font-kantumruy text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Your purchase directly supports our mission to advance quantum science education at UCLA.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Support Education", desc: "Proceeds fund workshops, hackathons, and quantum computing resources." },
            //   { title: "Ships Worldwide", desc: "Fulfilled through Printify's global print-on-demand network." },
              { title: "Secure Payment", desc: "Payments processed safely through Stripe with full buyer protection." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl" style={{ backgroundColor: "#F3F8FF" }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-kantumruy font-bold text-[#234285] text-xl mb-2">{item.title}</h3>
                <p className="font-kantumruy text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MainWebsiteFooter />
    </div>
  );
}

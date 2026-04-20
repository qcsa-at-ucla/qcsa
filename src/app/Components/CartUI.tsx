"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import type { CartItem } from "./CartContext";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// ─── Toast Stack ──────────────────────────────────────────────────────────────

function ToastStack() {
  const { toasts, dismissToast, setCartOpen } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-28 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="cart-toast-enter pointer-events-auto flex items-center gap-3 bg-white rounded-2xl shadow-2xl border border-gray-100 px-4 py-3 w-80 max-w-[calc(100vw-3rem)]"
        >
          {/* Thumbnail */}
          {toast.item.image_src ? (
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
              <Image
                src={toast.item.image_src}
                alt={toast.item.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-[#eef3ff] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#234285]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-kantumruy font-bold text-green-600 text-xs">Added to cart</span>
            </div>
            <p className="font-kantumruy font-bold text-[#234285] text-sm leading-snug truncate">
              {toast.item.title}
            </p>
            <p className="font-kantumruy text-gray-500 text-xs truncate">
              {toast.item.variant_title} · Qty {toast.item.quantity}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1.5 flex-shrink-0 items-end">
            <button
              onClick={() => {
                setCartOpen(true);
                dismissToast(toast.id);
              }}
              className="font-kantumruy font-bold text-white bg-[#234285] text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              View Cart
            </button>
            <button
              onClick={() => dismissToast(toast.id)}
              className="font-kantumruy text-gray-400 text-xs hover:text-gray-600 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────

function CartSidebar() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

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
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="font-kantumruy font-bold text-[#234285] text-2xl">Your Cart</h2>
            {cart.length > 0 && (
              <span className="bg-[#eef3ff] text-[#234285] font-kantumruy font-bold text-xs rounded-full px-2.5 py-0.5">
                {cart.reduce((n, i) => n + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-[#eef3ff] flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-[#234285] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="font-kantumruy font-bold text-gray-400 text-lg mb-1">Your cart is empty</p>
              <p className="font-kantumruy text-gray-400 text-sm mb-6">Add some QCSA merch!</p>
              <Link
                href="/merch"
                onClick={() => setCartOpen(false)}
                className="bg-[#234285] text-white font-kantumruy font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm"
              >
                Browse Merch →
              </Link>
            </div>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.variant_id} className="flex gap-4 p-3 bg-gray-50 rounded-2xl">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-100">
                  {item.image_src && (
                    <Image
                      src={item.image_src}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-kantumruy font-bold text-[#234285] text-sm leading-tight line-clamp-2">
                    {item.title}
                  </p>
                  <p className="font-kantumruy text-gray-500 text-xs mt-0.5">{item.variant_title}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 px-1.5 py-1">
                      <button
                        onClick={() => updateQty(item.variant_id, item.quantity - 1)}
                        className="text-gray-500 hover:text-[#234285] w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-blue-50"
                      >
                        −
                      </button>
                      <span className="font-kantumruy text-sm w-5 text-center font-bold text-[#234285]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.variant_id, item.quantity + 1)}
                        className="text-gray-500 hover:text-[#234285] w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-blue-50"
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
                  onClick={() => removeFromCart(item.variant_id)}
                  className="text-gray-300 hover:text-red-400 transition-colors self-start mt-1 p-1 rounded-lg hover:bg-red-50"
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
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-1">
              <span className="font-kantumruy text-gray-500 text-sm">Subtotal</span>
              <span className="font-kantumruy font-bold text-[#234285] text-xl">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-kantumruy mb-5 text-right">
              + shipping at checkout
            </p>
            {error && (
              <p className="text-red-500 text-sm font-kantumruy mb-3 text-center">{error}</p>
            )}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#234285] text-white font-kantumruy font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base shadow-lg shadow-blue-900/20"
            >
              {loading ? "Redirecting…" : "Checkout →"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Floating Cart Button ─────────────────────────────────────────────────────

function FloatingCartButton() {
  const { cartCount, setCartOpen } = useCart();

  return (
    <button
      onClick={() => setCartOpen(true)}
      className="fixed bottom-8 right-8 z-30 bg-[#234285] text-white rounded-[2rem] px-5 py-4 shadow-xl hover:bg-blue-700 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3 group"
      aria-label={`Open cart${cartCount > 0 ? ` — ${cartCount} item${cartCount !== 1 ? "s" : ""}` : ""}`}
    >
      <svg
        className="w-6 h-6 transition-transform duration-200 group-hover:-rotate-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {cartCount > 0 && (
        <span className="bg-white text-[#234285] font-kantumruy font-bold text-sm rounded-full w-7 h-7 flex items-center justify-center shadow-sm">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </button>
  );
}

// ─── CartUI export ────────────────────────────────────────────────────────────

export default function CartUI() {
  return (
    <>
      <FloatingCartButton />
      <CartSidebar />
      <ToastStack />
    </>
  );
}

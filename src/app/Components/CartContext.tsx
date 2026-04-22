"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product_id: string;
  variant_id: number;
  quantity: number;
  price: number;        // cents
  title: string;
  variant_title: string;
  image_src: string;
}

export interface CartToast {
  id: number;
  item: CartItem;
}

interface CartContextValue {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: number) => void;
  updateQty: (variantId: number, qty: number) => void;
  cartCount: number;
  toasts: CartToast[];
  dismissToast: (id: number) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

const STORAGE_KEY = "qcsa_merch_cart";

function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function persistCart(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ─── Provider ─────────────────────────────────────────────────────────────────

let toastCounter = 0;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<CartToast[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setCart(getStoredCart());
  }, []);

  // Stay in sync across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setCart(getStoredCart());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.variant_id === item.variant_id);
      const next =
        idx >= 0
          ? prev.map((i, j) =>
              j === idx ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          : [...prev, item];
      persistCart(next);
      return next;
    });

    // Fire toast
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, item }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3500
    );
  }, []);

  const removeFromCart = useCallback((variantId: number) => {
    setCart((prev) => {
      const next = prev.filter((i) => i.variant_id !== variantId);
      persistCart(next);
      return next;
    });
  }, []);

  const updateQty = useCallback(
    (variantId: number, qty: number) => {
      if (qty <= 0) {
        removeFromCart(variantId);
        return;
      }
      setCart((prev) => {
        const next = prev.map((i) =>
          i.variant_id === variantId ? { ...i, quantity: qty } : i
        );
        persistCart(next);
        return next;
      });
    },
    [removeFromCart]
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQty,
        cartCount,
        toasts,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

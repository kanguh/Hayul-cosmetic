"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/products";

type Line = { slug: string; qty: number };
type CartLine = Line & { product: Product };

type Cart = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, qty?: number) => void;
  update: (slug: string, qty: number) => void;
  /** 장바구니 아이콘이 통통 튀는 애니메이션용 */
  bump: number;
};

const CartContext = createContext<Cart | null>(null);
const KEY = "hayul-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);

  // 새로고침해도 장바구니 유지 (이 브라우저에만 저장)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Line[];
      setLines(saved.filter((l) => getProduct(l.slug)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      return found ? prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l)) : [...prev, { slug, qty }];
    });
    setBump((b) => b + 1);
  }, []);

  const update = useCallback((slug: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l))));
  }, []);

  const value = useMemo(() => {
    const full = lines.map((l) => ({ ...l, product: getProduct(l.slug)! }));
    return {
      lines: full,
      count: full.reduce((n, l) => n + l.qty, 0),
      total: full.reduce((n, l) => n + l.qty * l.product.price, 0),
      open,
      setOpen,
      add,
      update,
      bump,
    };
  }, [lines, open, add, update, bump]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

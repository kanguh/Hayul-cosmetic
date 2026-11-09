"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { won } from "@/lib/products";
import { useCart } from "./CartContext";
import ProductVisual from "./ProductVisual";

const FREE_SHIPPING = 50000;

export default function CartDrawer() {
  const { lines, total, open, setOpen, update } = useCart();
  const [notice, setNotice] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis, setOpen]);

  const left = Math.max(0, FREE_SHIPPING - total);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="장바구니"
            className="fixed top-0 right-0 bottom-0 z-[80] flex w-full max-w-md flex-col bg-cream"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <p className="font-display text-3xl">Your bag</p>
              <button type="button" onClick={() => setOpen(false)} className="text-sm underline-offset-4 hover:underline">
                닫기
              </button>
            </div>

            <div className="px-6 pt-5">
              <p className="text-xs text-ink-soft">
                {left > 0 ? `${won(left)} 더 담으면 무료 배송` : "무료 배송 조건을 채웠어요"}
              </p>
              <div className="mt-2 h-[3px] overflow-hidden bg-sand">
                <motion.div
                  className="h-full bg-clay"
                  animate={{ width: `${Math.min(100, (total / FREE_SHIPPING) * 100)}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
              {lines.length === 0 && (
                <p className="py-20 text-center font-display text-2xl text-ink-soft italic">비어 있어요</p>
              )}
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.div
                    key={l.slug}
                    layout
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-4 flex gap-4 overflow-hidden"
                  >
                    <ProductVisual product={l.product} uid="-bag" className="h-28 w-[90px] shrink-0" />
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <p className="font-display text-xl leading-tight">{l.product.name}</p>
                        <p className="text-xs text-ink-soft">{l.product.volume}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-ink/20">
                          <button type="button" aria-label="수량 줄이기" onClick={() => update(l.slug, l.qty - 1)} className="h-8 w-8">
                            −
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums">{l.qty}</span>
                          <button type="button" aria-label="수량 늘리기" onClick={() => update(l.slug, l.qty + 1)} className="h-8 w-8">
                            +
                          </button>
                        </div>
                        <p className="text-sm">{won(l.product.price * l.qty)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-ink/10 px-6 py-6">
              <div className="flex justify-between text-sm">
                <span>합계</span>
                <span className="font-medium">{won(total)}</span>
              </div>
              <button
                type="button"
                disabled={!lines.length}
                onClick={() => setNotice(true)}
                className="mt-4 w-full bg-ink py-4 text-xs tracking-[0.25em] text-cream uppercase transition-colors hover:bg-clay disabled:opacity-40"
              >
                Checkout
              </button>
              <AnimatePresence>
                {notice && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-center text-xs text-ink-soft"
                  >
                    포트폴리오용 샘플 사이트라 실제 결제는 진행되지 않아요.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

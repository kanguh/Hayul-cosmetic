"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../CartContext";

export default function AddToBag({ slug }: { slug: string }) {
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mt-8 flex gap-3">
      <div className="flex items-center border border-ink/25">
        <button type="button" aria-label="수량 줄이기" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-14 w-12 text-lg">
          −
        </button>
        <div className="relative h-6 w-8 overflow-hidden text-center tabular-nums">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={qty}
              className="absolute inset-0"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {qty}
            </motion.span>
          </AnimatePresence>
        </div>
        <button type="button" aria-label="수량 늘리기" onClick={() => setQty((q) => q + 1)} className="h-14 w-12 text-lg">
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="group relative flex-1 overflow-hidden bg-ink text-xs tracking-[0.25em] text-cream uppercase"
      >
        <span className="absolute inset-0 -translate-x-full bg-clay transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-0" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={added ? "added" : "add"}
            className="relative block"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {added ? "✓ Added to bag" : "Add to bag"}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {added && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="overflow-hidden border border-ink/25 px-4 text-xs whitespace-nowrap"
          >
            바로 보기
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

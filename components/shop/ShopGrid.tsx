"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { categories, products, type Category } from "@/lib/products";
import ProductCard from "../ProductCard";

const sorts = [
  { id: "featured", label: "추천순" },
  { id: "low", label: "낮은 가격순" },
  { id: "high", label: "높은 가격순" },
] as const;

export default function ShopGrid() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("featured");

  const list = useMemo(() => {
    const filtered = products.filter((p) => cat === "all" || p.category === cat);
    if (sort === "low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [cat, sort]);

  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-32 md:px-10">
      <div className="sticky top-16 z-20 -mx-5 flex flex-col gap-4 border-y border-ink/10 bg-cream/85 px-5 py-4 backdrop-blur md:top-20 md:-mx-10 md:flex-row md:items-center md:justify-between md:px-10">
        <LayoutGroup>
          <div className="-mx-1 flex gap-1 overflow-x-auto [scrollbar-width:none]" role="tablist" aria-label="카테고리">
            {categories.map((c) => {
              const active = c.id === cat;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c.id)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${active ? "text-cream" : "text-ink-soft hover:text-ink"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-ink-soft tabular-nums">
            <motion.span key={list.length} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="inline-block">
              {list.length}
            </motion.span>
            개 제품
          </span>
          <label className="flex items-center gap-2">
            <span className="sr-only">정렬</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="bg-transparent text-sm outline-none">
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <motion.div layout className="mt-12 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

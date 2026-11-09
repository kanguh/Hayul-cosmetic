"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ingredients } from "@/lib/ingredients";
import { products, won } from "@/lib/products";
import { Botanical } from "../home/IngredientSpotlight";
import ProductVisual from "../ProductVisual";
import TLink from "../motion/TLink";

/** 원료 카드를 누르면 같은 카드가 그대로 커지며 상세 창이 됨 (공유 레이아웃 애니메이션) */
export default function IngredientExplorer() {
  const [openId, setOpenId] = useState<string | null>(null);
  const lenis = useLenis();
  const open = ingredients.find((i) => i.id === openId);

  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (ingredients.some((i) => i.id === id)) setOpenId(id);
    };
    const onOpen = (e: Event) => setOpenId((e as CustomEvent<string>).detail);
    fromHash();
    window.addEventListener("open-ingredient", onOpen);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.removeEventListener("open-ingredient", onOpen);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ingredients.map((ing, i) => (
          <motion.li
            key={ing.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.08 }}
            className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
          >
            <motion.button
              type="button"
              layoutId={`ing-${ing.id}`}
              onClick={() => setOpenId(ing.id)}
              data-cursor="Open"
              style={{ backgroundColor: ing.color, borderRadius: 4 }}
              className="group relative flex h-full min-h-72 w-full flex-col justify-between overflow-hidden p-6 text-left"
            >
              <motion.div layoutId={`ing-art-${ing.id}`} className={`absolute -right-6 -bottom-6 ${i === 0 ? "w-3/4" : "w-2/3"} transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:-rotate-6 group-hover:scale-110`}>
                <Botanical ing={ing} className="w-full" />
              </motion.div>
              <p className="relative text-xs tracking-[0.25em] uppercase opacity-60">{ing.origin}</p>
              <div className="relative">
                <motion.p layoutId={`ing-name-${ing.id}`} className={`font-display leading-none ${i === 0 ? "text-6xl md:text-7xl" : "text-4xl"}`}>
                  {ing.name}
                </motion.p>
                <p className="mt-2 font-serif text-sm">{ing.nameKo}</p>
              </div>
            </motion.button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenId(null)}
            />
            <div className="pointer-events-none fixed inset-0 z-[61] flex items-center justify-center p-4 md:p-10">
              <motion.div
                layoutId={`ing-${open.id}`}
                role="dialog"
                aria-label={`${open.nameKo} 원료 이야기`}
                style={{ backgroundColor: open.color, borderRadius: 4 }}
                className="pointer-events-auto relative grid max-h-full w-full max-w-5xl overflow-y-auto md:grid-cols-[1fr_1.2fr]"
                data-lenis-prevent
              >
                <div className="relative flex items-center justify-center bg-cream/35 p-10">
                  <motion.div layoutId={`ing-art-${open.id}`} className="w-full max-w-xs">
                    <Botanical ing={open} className="w-full" />
                  </motion.div>
                </div>
                <div className="p-8 md:p-12">
                  <button
                    type="button"
                    onClick={() => setOpenId(null)}
                    className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-ink/25 text-lg hover:bg-ink hover:text-cream"
                    aria-label="닫기"
                  >
                    ×
                  </button>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs tracking-[0.25em] uppercase opacity-60"
                  >
                    {open.origin}
                  </motion.p>
                  <motion.p layoutId={`ing-name-${open.id}`} className="mt-3 font-display text-6xl leading-none md:text-7xl">
                    {open.name}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                  >
                    <p className="mt-2 font-serif text-lg">{open.nameKo}</p>
                    <p className="mt-6 inline-block rounded-full border border-ink/25 px-4 py-1.5 text-xs">{open.benefit}</p>
                    <p className="mt-6 leading-8 text-ink-soft">{open.story}</p>
                    <p className="mt-10 text-xs tracking-[0.25em] uppercase opacity-60">Found in</p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {products
                        .filter((p) => p.ingredients.includes(open.id))
                        .map((p) => (
                          <li key={p.slug}>
                            <TLink href={`/shop/${p.slug}`} className="flex items-center gap-3 bg-cream/50 p-2 pr-4 transition-colors hover:bg-cream">
                              <ProductVisual product={p} uid="-ing" className="h-16 w-[52px] shrink-0" />
                              <span>
                                <span className="block font-display text-lg leading-tight">{p.name}</span>
                                <span className="text-xs text-ink-soft">{won(p.price)}</span>
                              </span>
                            </TLink>
                          </li>
                        ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

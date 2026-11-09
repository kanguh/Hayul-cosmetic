"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ingredients, type Ingredient } from "@/lib/ingredients";
import TLink from "../motion/TLink";

const picks = ["birch", "mugwort", "camellia"].map((id) => ingredients.find((i) => i.id === id)!);

/** 원료 식물을 단순한 도형으로 그린 일러스트 */
export function Botanical({ ing, className }: { ing: Ingredient; className?: string }) {
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden>
      <g fill="none" stroke={ing.accent} strokeWidth="1.4" strokeLinecap="round">
        <path d="M150 290 C150 220 148 160 150 60" />
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 230 - i * 38;
          const s = 1 - i * 0.12;
          return (
            <g key={i}>
              <path d={`M150 ${y} C${150 - 70 * s} ${y - 10} ${150 - 90 * s} ${y - 50 * s} ${150 - 40 * s} ${y - 62 * s} C${150 - 20 * s} ${y - 40 * s} ${150 - 10 * s} ${y - 20} 150 ${y}`} fill={ing.accent} fillOpacity="0.18" />
              <path d={`M150 ${y - 18} C${150 + 70 * s} ${y - 28} ${150 + 90 * s} ${y - 68 * s} ${150 + 40 * s} ${y - 80 * s} C${150 + 20 * s} ${y - 58 * s} ${150 + 10 * s} ${y - 38} 150 ${y - 18}`} fill={ing.accent} fillOpacity="0.28" />
            </g>
          );
        })}
        <circle cx="150" cy="50" r="12" fill={ing.accent} fillOpacity="0.5" />
      </g>
    </svg>
  );
}

function Block({ ing, index, onActive }: { ing: Ingredient; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[80vh] flex-col justify-center py-16">
      <p className="font-display text-7xl text-clay/50 italic md:text-8xl">0{index + 1}</p>
      <h3 className="mt-4 font-display text-5xl md:text-6xl">{ing.name}</h3>
      <p className="mt-2 font-serif text-lg">
        {ing.nameKo} · <span className="text-ink-soft">{ing.origin}</span>
      </p>
      <p className="mt-6 max-w-md leading-8 text-ink-soft">{ing.story}</p>
      <p className="mt-6 inline-block self-start rounded-full border border-ink/20 px-4 py-1.5 text-xs">{ing.benefit}</p>
    </div>
  );
}

/** 왼쪽 그림은 고정되고, 오른쪽 글을 스크롤하면 그림과 배경색이 바뀜 */
export default function IngredientSpotlight() {
  const [active, setActive] = useState(0);
  const ing = picks[active];

  return (
    <motion.section animate={{ backgroundColor: ing.color }} transition={{ duration: 1 }} className="relative">
      <div className="mx-auto grid max-w-[1440px] px-5 md:grid-cols-2 md:px-10">
        <div className="sticky top-0 hidden h-screen items-center justify-center md:flex">
          <div className="relative aspect-square w-[80%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={ing.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.85, rotate: -12, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.08, rotate: 8, filter: "blur(10px)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute inset-[8%] rounded-full bg-cream/50" />
                <Botanical ing={ing} className="relative h-full w-full" />
              </motion.div>
            </AnimatePresence>
            <p className="absolute -bottom-4 left-0 text-xs tracking-[0.35em] text-ink-soft uppercase">(03) Ingredients</p>
          </div>
        </div>
        <div>
          {picks.map((p, i) => (
            <Block key={p.id} ing={p} index={i} onActive={setActive} />
          ))}
          <div className="pb-24">
            <TLink href="/ingredients" className="border-b border-ink pb-1 text-sm">
              원료 아카이브 전체 보기 →
            </TLink>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

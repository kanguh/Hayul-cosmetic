"use client";

import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "./motion/useSectionProgress";
import TLink from "./motion/TLink";
import Magnetic from "./motion/Magnetic";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref, 1, 1);
  const y = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-cream">
      <motion.div style={{ y }} className="mx-auto max-w-[1440px] px-5 pt-24 pb-8 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl leading-tight italic md:text-5xl">
              Slow skin,
              <br />
              in its own rhythm.
            </p>
            <Magnetic className="mt-8">
              <TLink
                href="/shop"
                className="grid h-28 w-28 place-items-center rounded-full border border-cream/40 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-cream hover:text-ink"
              >
                Shop
              </TLink>
            </Magnetic>
          </div>
          <div className="text-sm leading-8 text-cream/70">
            <p className="mb-2 text-xs tracking-[0.25em] text-cream/40 uppercase">Explore</p>
            <TLink href="/shop" className="block hover:text-cream">제품 전체</TLink>
            <TLink href="/story" className="block hover:text-cream">브랜드 이야기</TLink>
            <TLink href="/ingredients" className="block hover:text-cream">원료 아카이브</TLink>
          </div>
          <div className="text-sm leading-8 text-cream/70">
            <p className="mb-2 text-xs tracking-[0.25em] text-cream/40 uppercase">Contact</p>
            <p>hello@hayul.example</p>
            <p>서울시 ○○구 ○○로 00</p>
            <p>평일 10:00 – 18:00</p>
          </div>
        </div>

        <p className="mt-20 font-display text-[25vw] leading-[0.8] tracking-[0.08em] text-cream/95 select-none md:text-[19vw]">
          HAYUL
        </p>
        <div className="mt-6 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/45 md:flex-row md:justify-between">
          <p>© 2026 HAYUL. 포트폴리오용 가상 브랜드이며 실제 판매하지 않습니다.</p>
          <p>Design &amp; development — portfolio project</p>
        </div>
      </motion.div>
    </footer>
  );
}

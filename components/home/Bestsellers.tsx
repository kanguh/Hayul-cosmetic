"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "../motion/useSectionProgress";
import { products } from "@/lib/products";
import ProductCard from "../ProductCard";
import SplitText from "../motion/SplitText";
import TLink from "../motion/TLink";

/** 데스크톱: 세로 스크롤을 하면 상품 줄이 가로로 흘러감 (섹션 고정). 모바일: 손가락으로 넘기는 가로 스크롤 */
export default function Bestsellers() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const scrollYProgress = useSectionProgress(section, 0, 1);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const heading = (
    <div className="flex items-end justify-between gap-6 px-5 md:px-10">
      <div>
        <p className="text-xs tracking-[0.35em] text-clay uppercase">(02) Bestsellers</p>
        <h2 className="mt-4 font-display text-6xl leading-none md:text-8xl">
          <SplitText text="Most loved" />
        </h2>
      </div>
      <TLink href="/shop" className="shrink-0 border-b border-ink pb-1 text-sm">
        전체 보기
      </TLink>
    </div>
  );

  const cards = products.slice(0, 6).map((p, i) => (
    <div key={p.slug} className="w-[72vw] shrink-0 sm:w-[44vw] lg:w-[25vw]">
      <ProductCard product={p} index={i} />
    </div>
  ));

  return (
    <>
      {/* 데스크톱 */}
      <section ref={section} className="relative hidden bg-sand/60 lg:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-14 overflow-hidden">
          {heading}
          <motion.div ref={track} style={{ x }} className="flex w-max gap-8 px-10">
            {cards}
            <div className="flex w-[25vw] shrink-0 items-center justify-center">
              <TLink href="/shop" data-cursor="Shop" className="font-display text-5xl italic underline-offset-8 hover:underline">
                See all →
              </TLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 모바일 · 태블릿 */}
      <section className="bg-sand/60 py-24 lg:hidden">
        {heading}
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none]" data-lenis-prevent>
          {products.slice(0, 6).map((p, i) => (
            <div key={p.slug} className="w-[72vw] shrink-0 snap-start sm:w-[44vw]">
              <ProductCard product={p} index={i} morph={false} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

"use client";

import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "../motion/useSectionProgress";
import { products } from "@/lib/products";
import ProductVisual from "../ProductVisual";
import ScrollWords from "../motion/ScrollWords";
import Reveal, { CurtainReveal } from "../motion/Reveal";
import TLink from "../motion/TLink";

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref, 1, 0);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section ref={ref} className="mx-auto max-w-[1440px] px-5 py-32 md:px-10 md:py-48">
      <Reveal>
        <p className="text-xs tracking-[0.35em] text-clay uppercase">(01) Philosophy</p>
      </Reveal>
      <ScrollWords
        className="mt-10 max-w-6xl font-serif text-[7.2vw] leading-[1.45] font-light md:text-[3.4vw]"
        text="좋은 피부는 하루아침에 만들어지지 않습니다. 하율은 계절을 기다려 원료를 얻고, 피부가 스스로 회복하는 속도를 존중합니다."
      />

      <div className="mt-24 grid items-end gap-10 md:mt-36 md:grid-cols-12">
        <CurtainReveal className="aspect-[4/5] md:col-span-5" color="var(--color-cream)">
          <motion.div style={{ y: imgY }} className="h-[120%] w-full -translate-y-[8%] bg-gradient-to-b from-rose to-clay/70">
            <motion.div style={{ rotate }} className="flex h-full items-center justify-center">
              <ProductVisual product={products[4]} bg={false} uid="-philo" className="w-[70%]" />
            </motion.div>
          </motion.div>
        </CurtainReveal>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="font-display text-5xl leading-[1.05] italic md:text-7xl">
              Harvested
              <br />
              with patience.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md leading-8 text-ink-soft">
              이른 봄 몇 주만 얻을 수 있는 자작나무 수액, 겨울에 피는 제주 동백. 우리는 원료가 가장 좋은 때를 기다리고, 그
              시간만큼 피부에 오래 머무는 제품을 만듭니다.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <TLink href="/story" className="group mt-10 inline-flex items-center gap-4 text-sm tracking-wide">
              <span className="relative">
                브랜드 이야기 보기
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right bg-ink transition-transform duration-500 group-hover:scale-x-0" />
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-ink/30 transition-all duration-500 group-hover:translate-x-2 group-hover:bg-ink group-hover:text-cream">
                →
              </span>
            </TLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useSectionProgress } from "../motion/useSectionProgress";
import { products } from "@/lib/products";
import { useIntroDone } from "@/lib/intro";
import ProductVisual from "../ProductVisual";
import SplitText from "../motion/SplitText";
import Magnetic from "../motion/Magnetic";
import RotatingBadge from "../motion/RotatingBadge";
import TLink from "../motion/TLink";

const trio = [products[0], products[2], products[4]];

export default function Hero() {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref, 0, 0);

  // 마우스 위치에 따라 병들이 서로 다른 깊이로 움직이는 패럴랙스
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  const yBack = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const l1 = { x: useTransform(mx, (v) => v * 18), y: useTransform(my, (v) => v * 18) };
  const l2 = { x: useTransform(mx, (v) => v * -28), y: useTransform(my, (v) => v * -28) };
  const l3 = { x: useTransform(mx, (v) => v * 40), y: useTransform(my, (v) => v * 40) };

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* 배경의 부드러운 색 덩어리 */}
      <motion.div
        aria-hidden
        className="absolute -top-40 -right-40 h-[70vw] w-[70vw] rounded-full bg-rose/50 blur-[120px]"
        animate={{ scale: [1, 1.12, 1], x: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 -left-40 h-[50vw] w-[50vw] rounded-full bg-mist/80 blur-[120px]"
        animate={{ scale: [1.1, 1, 1.1], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-[1440px] px-5 md:px-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div style={{ y: titleY, opacity: fade }} className="relative z-10 pt-8 lg:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-xs tracking-[0.35em] text-ink-soft uppercase"
          >
            Botanical skincare — No. 01
          </motion.p>
          <h1 className="mt-6 font-display text-[17vw] leading-[0.88] font-light tracking-[-0.02em] sm:text-[13vw] lg:text-[8.4vw]">
            {ready && <SplitText text={"Skin, in its\nown rhythm."} inView={false} delay={0.15} />}
            {!ready && <span className="invisible">Skin, in its own rhythm.</span>}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            className="mt-8 flex max-w-md flex-col gap-8 sm:flex-row sm:items-end"
          >
            <p className="font-serif text-[15px] leading-8 text-ink-soft">
              서두르지 않는 피부를 위해.
              <br />
              한국의 땅에서 자란 식물로 피부 본연의 속도를 되찾습니다.
            </p>
            <Magnetic>
              <TLink
                href="/shop"
                className="group relative grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-full bg-ink text-xs tracking-[0.2em] text-cream uppercase"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-clay transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0" />
                <span className="relative">Shop now</span>
              </TLink>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* 떠 있는 제품 세 개 */}
        <div className="relative mt-10 h-[110vw] sm:h-[80vw] lg:mt-0 lg:h-[calc(100svh-7rem)]">
          {[
            { p: trio[1], cls: "left-[2%] top-[18%] w-[46%] lg:w-[44%]", y: yBack, l: l1, d: 0.3, r: -8 },
            { p: trio[2], cls: "right-[0%] top-[4%] w-[40%] lg:w-[38%]", y: yMid, l: l2, d: 0.45, r: 7 },
            { p: trio[0], cls: "left-[30%] top-[42%] w-[48%] lg:w-[46%]", y: yFront, l: l3, d: 0.6, r: -2 },
          ].map(({ p, cls, y, l, d, r }) => (
            <motion.div key={p.slug} style={{ y }} className={`absolute ${cls}`}>
              <motion.div style={l}>
                <motion.div
                  initial={{ opacity: 0, y: 120, rotate: r * 2, scale: 0.9 }}
                  animate={ready ? { opacity: 1, y: 0, rotate: r, scale: 1 } : {}}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: d }}
                >
                  <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6 + d * 4, repeat: Infinity, ease: "easeInOut" }}>
                    <TLink href={`/shop/${p.slug}`} data-cursor="보기" className="block overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(31,23,20,0.35)]">
                      <ProductVisual product={p} uid="-hero" className="block w-full" />
                    </TLink>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[6%] left-0 text-clay lg:bottom-[10%]"
          >
            <RotatingBadge text="Made slowly · Made in Korea · " />
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-ink-soft uppercase md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-ink/15">
          <motion.span
            className="absolute top-0 left-0 h-1/2 w-full bg-ink"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

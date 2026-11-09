"use client";

import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import SplitText from "../motion/SplitText";
import { useSectionProgress } from "../motion/useSectionProgress";

/** 스크롤하면 가운데 창이 화면 전체로 커지는 히어로 */
export default function StoryHero() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref, 0, 1);
  const clip = useTransform(scrollYProgress, [0, 0.7], ["inset(22% 30% 22% 30% round 999px 999px 0 0)", "inset(0% 0% 0% 0% round 0px 0px 0 0)"]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.3, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const quoteOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.55, 0.8], [40, 0]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ opacity: titleOpacity }} className="absolute inset-x-0 top-28 z-10 px-5 text-center md:top-32">
          <p className="text-xs tracking-[0.35em] text-clay uppercase">Our story</p>
          <h1 className="mt-4 font-display text-[14vw] leading-[0.9] font-light md:text-[8vw]">
            <SplitText text="Rooted in Korea" inView={false} delay={0.2} />
          </h1>
        </motion.div>

        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale }} className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,#e9c6b7,transparent_55%),radial-gradient(circle_at_75%_70%,#a9b596,transparent_50%),linear-gradient(160deg,#c98b5e,#6e7a5a)]">
            {/* 산 능선 실루엣 */}
            <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden>
              <path d="M0 560 C200 470 320 520 480 450 C640 380 760 480 920 420 C1080 360 1240 430 1440 380 V800 H0z" fill="#1f1714" opacity="0.18" />
              <path d="M0 640 C180 580 360 620 540 570 C720 520 900 610 1080 560 C1260 510 1360 560 1440 540 V800 H0z" fill="#1f1714" opacity="0.28" />
              <path d="M0 720 C240 680 420 710 660 670 C900 630 1140 700 1440 660 V800 H0z" fill="#1f1714" opacity="0.4" />
              <circle cx="1080" cy="230" r="70" fill="#f4eee6" opacity="0.5" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: quoteOpacity, y: quoteY }} className="absolute inset-x-0 bottom-16 z-10 px-5 text-center text-cream">
          <p className="mx-auto max-w-3xl font-display text-4xl leading-tight italic md:text-6xl">
            “We wait for the season, so your skin doesn’t have to rush.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}

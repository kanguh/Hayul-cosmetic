"use client";

import { useRef } from "react";
import { motion, useSpring } from "motion/react";
import { useSectionProgress } from "../motion/useSectionProgress";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import Counter from "../motion/Counter";

const steps = [
  { en: "Cleanse", ko: "씻어내기", body: "쌀뜨물처럼 순한 밀크 폼으로 하루의 먼지를 덜어냅니다." },
  { en: "Tone", ko: "다독이기", body: "쑥 토너로 예민해진 피부 결을 차분하게 정돈합니다." },
  { en: "Treat", ko: "채우기", body: "자작나무 수액 세럼으로 깊은 곳까지 수분을 채웁니다." },
  { en: "Protect", ko: "지키기", body: "배리어 크림으로 얇은 막을 씌워 밤사이 촉촉함을 지킵니다." },
];

export default function Ritual() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useSectionProgress(ref, 0.7, 0.6);
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section className="bg-ink py-32 text-cream md:py-44">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="text-xs tracking-[0.35em] text-rose uppercase">(04) Daily ritual</p>
        <h2 className="mt-4 font-display text-6xl leading-[0.95] md:text-[8vw]">
          <SplitText text={"Four steps,\nno rush."} />
        </h2>

        <div ref={ref} className="relative mt-20 md:mt-28">
          {/* 스크롤에 따라 그려지는 선 */}
          <svg className="absolute top-0 left-[11px] h-full w-2 md:hidden" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden>
            <motion.line x1="1" y1="0" x2="1" y2="100" stroke="#e9c6b7" strokeWidth="2" style={{ pathLength: draw }} />
          </svg>
          <svg className="absolute top-[11px] left-0 hidden h-2 w-full md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden>
            <line x1="0" y1="1" x2="100" y2="1" stroke="#f4eee6" strokeOpacity="0.15" strokeWidth="2" />
            <motion.line x1="0" y1="1" x2="100" y2="1" stroke="#e9c6b7" strokeWidth="2" style={{ pathLength: draw }} />
          </svg>

          <ol className="grid gap-14 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.en} delay={i * 0.12} className="relative pl-12 md:pt-14 md:pl-0">
                <span className="absolute top-0 left-0 grid h-6 w-6 place-items-center rounded-full border border-rose bg-ink text-[10px] text-rose">
                  {i + 1}
                </span>
                <p className="font-display text-4xl italic md:text-5xl">{s.en}</p>
                <p className="mt-1 font-serif text-sm text-rose">{s.ko}</p>
                <p className="mt-5 max-w-xs text-sm leading-7 text-cream/65">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-32 grid gap-12 border-t border-cream/15 pt-16 sm:grid-cols-3">
          {[
            { to: 97, suffix: "%", label: "자연 유래 성분 비율 (평균)" },
            { to: 7, suffix: "", label: "한국 각지에서 얻는 핵심 원료" },
            { to: 4.9, suffix: "", label: "고객 평균 만족도 (가상 데이터)", decimals: 1 },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-8xl leading-none font-light">
                <Counter to={s.to} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-4 text-sm text-cream/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

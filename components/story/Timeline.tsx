"use client";

import { useRef } from "react";
import { motion, useSpring } from "motion/react";
import { useSectionProgress } from "../motion/useSectionProgress";

const events = [
  { year: "2021", title: "부엌에서 시작한 실험", body: "예민한 피부를 가진 두 창업자가 강화 쑥으로 직접 토너를 만들어 쓰기 시작했습니다." },
  { year: "2022", title: "첫 번째 농가와의 약속", body: "인제의 자작나무 농가와 수액 계약을 맺고, 첫 제품 ‘듀 베일 세럼’을 선보였습니다." },
  { year: "2024", title: "리필 스테이션", body: "서울 쇼룸에 리필 스테이션을 열어 유리병을 다시 채워 쓰는 문화를 시작했습니다." },
  { year: "2026", title: "일곱 가지 원료", body: "제주 동백부터 보성 녹차까지, 일곱 지역의 원료로 여덟 가지 제품을 만듭니다." },
];

/** 스크롤 진행에 맞춰 세로선이 채워지고, 연도가 하나씩 등장 */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useSectionProgress(ref, 0.6, 0.6);
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section className="bg-sand/60 py-32 md:py-44">
      <div ref={ref} className="relative mx-auto max-w-5xl px-5 md:px-10">
        <div className="absolute top-0 bottom-0 left-5 w-px bg-ink/15 md:left-1/2" />
        <motion.div style={{ scaleY: fill }} className="absolute top-0 bottom-0 left-5 w-px origin-top bg-clay md:left-1/2" />

        {events.map((e, i) => (
          <motion.div
            key={e.year}
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative mb-24 pl-12 last:mb-0 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-16" : "md:pr-16 md:text-right"}`}
          >
            <span className={`absolute top-6 left-[14px] h-3 w-3 rounded-full bg-clay ring-8 ring-sand md:top-8 ${i % 2 ? "md:-left-1.5" : "md:-right-1.5 md:left-auto"}`} />
            <p className="font-display text-7xl font-light text-clay md:text-8xl">{e.year}</p>
            <h3 className="mt-2 font-serif text-xl">{e.title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink-soft">{e.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

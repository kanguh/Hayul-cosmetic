"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { markIntroDone } from "@/lib/intro";

/** 첫 방문 때만 보이는 인트로: 숫자가 100까지 올라간 뒤 막이 위로 걷힘 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [skipped, setSkipped] = useState(false);
  const num = useRef<HTMLSpanElement>(null);
  // 개발 모드에서 effect 가 두 번 실행돼도 첫 판단을 유지
  const seen = useRef<boolean | null>(null);

  useEffect(() => {
    if (seen.current === null) {
      seen.current = false;
      try {
        seen.current = sessionStorage.getItem("hayul-intro") === "1";
        sessionStorage.setItem("hayul-intro", "1");
      } catch {}
    }
    if (seen.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // 이미 본 경우 막이 걷히는 애니메이션 없이 바로 사라짐
      setSkipped(true);
      markIntroDone();
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => num.current && (num.current.textContent = String(Math.round(v)).padStart(3, "0")),
      onComplete: () =>
        setTimeout(() => {
          setShow(false);
          // 막이 걷히는 동안 히어로 애니메이션이 시작되도록 살짝 일찍 알림
          setTimeout(markIntroDone, 350);
        }, 250),
    });
    return () => controls.stop();
  }, []);

  if (skipped) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-ink p-6 text-cream md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="text-xs tracking-[0.3em] text-cream/50 uppercase">Botanical skincare · Seoul</p>
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[22vw] leading-none tracking-[0.12em] md:text-[15vw]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              HAYUL
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <p className="font-serif text-sm text-cream/60">하율 — 피부의 속도로</p>
            <span ref={num} className="font-display text-6xl tabular-nums md:text-8xl">
              000
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

/** 마우스를 쓰는 기기에서만 보이는 커스텀 커서. 링크 위에서는 커지고, 상품 위에서는 라벨을 보여줌 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<{ hover: boolean; label: string | null }>({ hover: false, label: null });
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      setState({ hover: !!target, label: target?.dataset.cursor ?? null });
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = state.label ? 84 : state.hover ? 44 : 10;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] grid place-items-center rounded-full mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", background: state.label ? "#f4eee6" : state.hover ? "transparent" : "#f4eee6", border: "1px solid #f4eee6" }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
    >
      <AnimatePresence>
        {state.label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-display text-sm text-ink italic"
          >
            {state.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

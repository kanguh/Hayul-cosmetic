"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { CartProvider } from "./CartContext";

/** 페이지가 바뀌면 부드러운 스크롤 위치도 맨 위로 */
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        {reduce ? (
          children
        ) : (
          <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 0.9 }}>
            <ScrollReset />
            {children}
          </ReactLenis>
        )}
      </CartProvider>
    </MotionConfig>
  );
}

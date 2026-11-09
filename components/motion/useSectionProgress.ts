"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useScroll, useTransform } from "motion/react";

/**
 * 요소가 화면을 지나가는 정도를 0~1 로 돌려줌.
 * start: 요소 윗변이 화면의 이 비율 위치에 올 때 0 (0 = 화면 맨 위, 1 = 맨 아래)
 * end:   요소 아랫변이 화면의 이 비율 위치에 올 때 1
 *
 * motion 의 useScroll({ target }) 대신 페이지 스크롤 값으로 직접 계산함.
 * (sticky 섹션에서 target 측정이 중간 이후 거꾸로 줄어드는 문제가 있었음)
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, start: number, end: number) {
  const range = useRef({ from: 0, to: 1 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const vh = window.innerHeight;
      range.current = { from: top - vh * start, to: top + el.offsetHeight - vh * end };
      // 측정값이 바뀌면 현재 위치로 다시 계산되도록 갱신
      scrollY.set(window.scrollY);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, start, end, scrollY]);

  return useTransform(scrollY, (y) => {
    const { from, to } = range.current;
    return Math.min(1, Math.max(0, (y - from) / Math.max(1, to - from)));
  });
}

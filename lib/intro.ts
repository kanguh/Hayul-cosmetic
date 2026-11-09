"use client";

import { useSyncExternalStore } from "react";

// 인트로(프리로더)가 끝났는지 여러 컴포넌트가 함께 알 수 있게 하는 작은 저장소
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

export function useIntroDone() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => done,
    () => false,
  );
}

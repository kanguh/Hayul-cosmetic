"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ingredients } from "@/lib/ingredients";

// 약도 위 대략적인 산지 위치 (정확한 지도가 아닌 일러스트)
const spots: Record<string, [number, number]> = {
  birch: [192, 104],
  mugwort: [92, 118],
  rice: [148, 150],
  greentea: [114, 300],
  centella: [84, 318],
  honey: [158, 262],
  camellia: [104, 384],
};

export function openIngredient(id: string) {
  window.dispatchEvent(new CustomEvent("open-ingredient", { detail: id }));
}

export default function KoreaMap() {
  const [hover, setHover] = useState<string | null>(null);
  const active = ingredients.find((i) => i.id === hover);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <svg viewBox="0 0 300 410" className="w-full" role="img" aria-label="원료 산지 약도">
        <motion.path
          d="M100 70 L170 58 L214 74 L236 120 L250 190 L246 250 L226 300 L190 322 L150 332 L110 330 L74 320 L58 290 L70 250 L58 210 L74 170 L68 130 L84 98 Z"
          fill="none"
          stroke="#1f1714"
          strokeOpacity="0.35"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
        />
        <motion.ellipse
          cx="104"
          cy="386"
          rx="30"
          ry="11"
          fill="none"
          stroke="#1f1714"
          strokeOpacity="0.35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        />
        {ingredients.map((ing, i) => {
          const [x, y] = spots[ing.id];
          return (
            <g
              key={ing.id}
              className="cursor-pointer"
              onPointerEnter={() => setHover(ing.id)}
              onPointerLeave={() => setHover(null)}
              onClick={() => openIngredient(ing.id)}
              role="button"
              aria-label={`${ing.nameKo} (${ing.origin}) 자세히 보기`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openIngredient(ing.id)}
            >
              <motion.circle
                cx={x}
                cy={y}
                r="10"
                fill={ing.accent}
                initial={{ scale: 0.6, opacity: 0.5 }}
                animate={{ scale: [0.6, 2.2], opacity: [0.45, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r={hover === ing.id ? 7 : 5}
                fill={ing.accent}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + i * 0.12, type: "spring", stiffness: 300, damping: 15 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            </g>
          );
        })}
      </svg>
      <motion.div
        key={active?.id ?? "none"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 right-0 text-right"
      >
        <p className="font-display text-3xl italic">{active?.name ?? "Hover a dot"}</p>
        <p className="text-sm text-ink-soft">{active ? `${active.nameKo} · ${active.origin}` : "점을 눌러 원료 보기"}</p>
      </motion.div>
    </div>
  );
}

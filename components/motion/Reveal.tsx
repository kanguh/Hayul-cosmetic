"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "li" | "section";
};

/** 스크롤해서 보이면 아래에서 떠오르며 나타남 */
export default function Reveal({ children, className, delay = 0, y = 40, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Tag>
  );
}

/** 이미지 위를 덮고 있던 막이 걷히며 드러나는 효과 */
export function CurtainReveal({ children, className, color = "var(--color-cream)" }: { children: React.ReactNode; className?: string; color?: string }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute inset-0 origin-top"
        style={{ background: color }}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}

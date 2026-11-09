"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** true 면 화면에 들어올 때, false 면 마운트 즉시 */
  inView?: boolean;
  by?: "char" | "word";
};

/** 글자(또는 단어)가 마스크 아래에서 하나씩 올라오는 제목 */
export default function SplitText({ text, className, delay = 0, inView = true, by = "char" }: Props) {
  const lines = text.split("\n");
  let index = 0;

  return (
    <span className={className} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {(by === "char" ? Array.from(line) : line.split(/(\s+)/)).map((part, i) => {
            if (/^\s+$/.test(part)) return <span key={i}>{part}</span>;
            const d = delay + index++ * (by === "char" ? 0.035 : 0.08);
            const anim = { y: "0%", rotate: 0, opacity: 1 };
            return (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: "110%", rotate: 6, opacity: 0 }}
                  {...(inView ? { whileInView: anim, viewport: { once: true, margin: "-10% 0px" } } : { animate: anim })}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: d }}
                >
                  {part === " " ? " " : part}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

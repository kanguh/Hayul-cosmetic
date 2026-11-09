"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { useCart } from "./CartContext";
import TLink from "./motion/TLink";

const nav = [
  { href: "/shop", label: "Shop", ko: "제품" },
  { href: "/story", label: "Story", ko: "브랜드" },
  { href: "/ingredients", label: "Ingredients", ko: "원료" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, setOpen, bump } = useCart();
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const lenis = useLenis();

  // 아래로 스크롤하면 숨기고, 위로 올리면 다시 보임
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !menu);
    setSolid(y > 40);
  });

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    if (menu) lenis?.stop();
    else lenis?.start();
  }, [menu, lenis]);

  return (
    <>
      <motion.header
        style={{ viewTransitionName: "site-header" }}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid && !menu ? "bg-cream/80 backdrop-blur-md" : ""}`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
          <nav className="hidden flex-1 gap-9 md:flex">
            {nav.map((n) => (
              <TLink key={n.href} href={n.href} className="group relative text-sm tracking-wide">
                {n.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-[var(--ease-expo)] ${
                    pathname.startsWith(n.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </TLink>
            ))}
          </nav>

          <TLink href="/" className={`font-display text-[1.9rem] tracking-[0.35em] md:flex-none ${menu ? "text-cream" : ""}`} aria-label="HAYUL 홈">
            HAYUL
          </TLink>

          <div className="flex flex-1 items-center justify-end gap-5">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`relative text-sm tracking-wide ${menu ? "text-cream" : ""}`}
              aria-label={`장바구니 ${count}개`}
            >
              <span className="hidden md:inline">Bag</span>
              <svg className="md:hidden" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M5 8h14l-1.2 12H6.2z M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <motion.span
                key={bump}
                initial={{ scale: bump ? 1.8 : 1 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="absolute -top-2 -right-4 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[10px] text-cream md:static md:ml-1.5 md:inline-grid"
              >
                {count}
              </motion.span>
            </button>
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-label={menu ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menu}
              className="relative h-8 w-8 md:hidden"
            >
              <span className={`absolute left-1 h-px w-6 transition-all duration-500 ${menu ? "top-4 rotate-45 bg-cream" : "top-3 bg-ink"}`} />
              <span className={`absolute left-1 h-px w-6 transition-all duration-500 ${menu ? "top-4 -rotate-45 bg-cream" : "top-5 bg-ink"}`} />
            </button>
          </div>
        </div>
        {/* 스크롤 진행 막대 */}
        <motion.div className="h-px origin-left bg-clay" style={{ scaleX: scrollYProgress }} />
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pt-28 pb-10 text-cream md:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {[{ href: "/", label: "Home", ko: "홈" }, ...nav].map((n, i) => (
                <div key={n.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.07 }}
                  >
                    <TLink href={n.href} className="flex items-baseline justify-between border-b border-cream/15 py-3">
                      <span className="font-display text-5xl italic">{n.label}</span>
                      <span className="text-sm text-cream/60">{n.ko}</span>
                    </TLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-cream/50"
            >
              Botanical skincare from Korea
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

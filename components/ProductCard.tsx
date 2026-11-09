"use client";

import { ViewTransition, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { won, type Product } from "@/lib/products";
import { useCart } from "./CartContext";
import ProductVisual from "./ProductVisual";
import TLink from "./motion/TLink";

/** 마우스 위치에 따라 살짝 기울어지는 상품 카드. 이미지는 상세 페이지로 모핑됨 */
type Props = {
  product: Product;
  index?: number;
  /** 같은 상품 카드가 한 화면에 두 번 그려질 때는 한쪽만 모핑해야 함 (이름 중복 방지) */
  morph?: boolean;
};

export default function ProductCard({ product, index = 0, morph = true }: Props) {
  const { add } = useCart();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 15 });
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 15 });

  const visual = (
    <ProductVisual
      product={product}
      uid={morph ? "-card" : "-card-m"}
      className="block aspect-[4/5] w-full transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
    />
  );

  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
    >
      <TLink href={`/shop/${product.slug}`} className="block" data-cursor="보기">
        <div style={{ perspective: 900 }}>
          <motion.div
            ref={ref}
            style={{ rotateX, rotateY }}
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse" || !ref.current) return;
              const r = ref.current.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width);
              my.set((e.clientY - r.top) / r.height);
            }}
            onPointerLeave={() => {
              mx.set(0.5);
              my.set(0.5);
            }}
            className="relative overflow-hidden rounded-[2px]"
          >
            {morph ? (
              <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
                {visual}
              </ViewTransition>
            ) : (
              visual
            )}
            <span className="absolute top-4 left-4 rounded-full bg-cream/70 px-3 py-1 text-[11px] tracking-wider backdrop-blur">
              {product.volume}
            </span>
          </motion.div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl leading-tight">{product.name}</h3>
            <p className="mt-1 text-sm text-ink-soft">{product.nameKo}</p>
          </div>
          <p className="shrink-0 pt-1 text-sm">{won(product.price)}</p>
        </div>
      </TLink>
      <button
        type="button"
        onClick={() => add(product.slug)}
        className="relative mt-4 w-full overflow-hidden border border-ink/80 py-3 text-xs tracking-[0.2em] uppercase"
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-y-100" />
        <span className="relative transition-colors duration-500 group-hover:text-cream">Add to bag</span>
      </button>
    </motion.article>
  );
}

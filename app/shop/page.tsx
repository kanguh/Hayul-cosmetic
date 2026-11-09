import type { Metadata } from "next";
import PageTransition from "@/components/motion/PageTransition";
import SplitText from "@/components/motion/SplitText";
import ShopGrid from "@/components/shop/ShopGrid";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-[1440px] px-5 pt-36 md:px-10 md:pt-44">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h1 className="font-display text-[18vw] leading-[0.85] font-light md:text-[10vw]">
            <SplitText text="The Shop" inView={false} delay={0.2} />
          </h1>
          <p className="max-w-xs pb-3 font-serif text-sm leading-7 text-ink-soft">
            {products.length}가지 제품. 하루의 리듬에 맞춰 필요한 것만 골라 쓰세요.
          </p>
        </div>
      </section>
      <ShopGrid />
    </PageTransition>
  );
}

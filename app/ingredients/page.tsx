import type { Metadata } from "next";
import PageTransition from "@/components/motion/PageTransition";
import SplitText from "@/components/motion/SplitText";
import IngredientExplorer from "@/components/ingredients/IngredientExplorer";
import KoreaMap from "@/components/ingredients/KoreaMap";

export const metadata: Metadata = { title: "Ingredients" };

export default function IngredientsPage() {
  return (
    <PageTransition>
      <section className="mx-auto grid max-w-[1440px] items-end gap-10 px-5 pt-36 md:grid-cols-[1.3fr_1fr] md:px-10 md:pt-44">
        <div>
          <p className="text-xs tracking-[0.35em] text-clay uppercase">Ingredient archive</p>
          <h1 className="mt-4 font-display text-[16vw] leading-[0.85] font-light md:text-[8.5vw]">
            <SplitText text={"Seven places,\nseven plants."} inView={false} delay={0.2} />
          </h1>
          <p className="mt-8 max-w-md font-serif leading-8 text-ink-soft">
            하율의 모든 원료는 산지를 밝힙니다. 지도 위의 점을 눌러 보거나, 아래 카드를 열어 원료 이야기를 읽어 보세요.
          </p>
        </div>
        <KoreaMap />
      </section>
      <IngredientExplorer />
    </PageTransition>
  );
}

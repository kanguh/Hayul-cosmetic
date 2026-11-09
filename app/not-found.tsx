import PageTransition from "@/components/motion/PageTransition";
import TLink from "@/components/motion/TLink";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
        <p className="font-display text-[30vw] leading-none font-light text-clay/60 md:text-[16vw]">404</p>
        <p className="mt-4 font-serif text-lg">찾으시는 페이지가 없어요.</p>
        <TLink href="/shop" className="mt-8 border-b border-ink pb-1 text-sm">
          제품 보러 가기 →
        </TLink>
      </section>
    </PageTransition>
  );
}

import type { Metadata } from "next";
import PageTransition from "@/components/motion/PageTransition";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import ScrollWords from "@/components/motion/ScrollWords";
import Marquee from "@/components/motion/Marquee";
import StoryHero from "@/components/story/StoryHero";
import Timeline from "@/components/story/Timeline";

export const metadata: Metadata = { title: "Story" };

const values = [
  { no: "I", en: "Seasonal", ko: "계절을 기다립니다", body: "원료가 가장 좋은 때에만 수확합니다. 그래서 어떤 제품은 1년에 한 번만 만들어집니다." },
  { no: "II", en: "Local", ko: "가까운 땅에서", body: "모든 핵심 원료는 한국 각지의 농가와 직접 계약해 얻고, 산지를 제품에 밝힙니다." },
  { no: "III", en: "Minimal", ko: "필요한 만큼만", body: "피부에 꼭 필요한 성분만 남기고, 향료와 색소는 넣지 않습니다." },
  { no: "IV", en: "Refill", ko: "다시 채워 쓰는", body: "유리 용기와 리필 파우치로 버려지는 플라스틱을 줄입니다." },
];

export default function StoryPage() {
  return (
    <PageTransition>
      <StoryHero />

      <section className="mx-auto max-w-[1440px] px-5 py-32 md:px-10 md:py-44">
        <p className="text-xs tracking-[0.35em] text-clay uppercase">Why HAYUL</p>
        <ScrollWords
          className="mt-10 max-w-5xl font-serif text-[6.6vw] leading-[1.5] font-light md:text-[3vw]"
          text="‘하율(夏律)’은 여름의 리듬이라는 뜻입니다. 가장 생명력이 넘치는 계절처럼, 피부가 스스로의 리듬을 되찾도록 돕고 싶었습니다."
        />
      </section>

      <Timeline />

      <section className="mx-auto max-w-[1440px] px-5 py-32 md:px-10 md:py-44">
        <h2 className="font-display text-6xl leading-none md:text-8xl">
          <SplitText text="What we keep" />
        </h2>
        <div className="mt-16 grid border-t border-ink/15 md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.en} delay={(i % 2) * 0.1} className="group relative overflow-hidden border-b border-ink/15 md:odd:border-r">
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100" />
              <div className="relative p-8 transition-colors duration-700 group-hover:text-cream md:p-12">
                <p className="font-display text-xl italic opacity-50">{v.no}</p>
                <p className="mt-6 font-display text-5xl md:text-6xl">{v.en}</p>
                <p className="mt-2 font-serif">{v.ko}</p>
                <p className="mt-6 max-w-sm text-sm leading-7 opacity-70">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee
        className="bg-clay py-8 font-display text-5xl text-cream italic md:text-7xl"
        items={["Made slowly", "Harvested with patience", "Refill, reuse", "Rooted in Korea"]}
        reverse
      />
    </PageTransition>
  );
}

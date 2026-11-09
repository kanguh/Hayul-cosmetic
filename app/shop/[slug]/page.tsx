import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import PageTransition from "@/components/motion/PageTransition";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import TLink from "@/components/motion/TLink";
import ProductVisual from "@/components/ProductVisual";
import ProductCard from "@/components/ProductCard";
import AddToBag from "@/components/shop/AddToBag";
import Accordion from "@/components/shop/Accordion";
import { categories, getProduct, products, won } from "@/lib/products";
import { getIngredient } from "@/lib/ingredients";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const index = products.indexOf(product);
  const next = products[(index + 1) % products.length];
  const related = products.filter((p) => p.slug !== product.slug && p.slug !== next.slug).slice(index % 4, (index % 4) + 3);

  return (
    <PageTransition>
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-24 md:grid-cols-2 md:gap-16 md:px-10 md:pt-32">
        <div className="md:sticky md:top-28 md:self-start">
          <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
            <ProductVisual product={product} uid="-detail" className="block aspect-[4/5] w-full" />
          </ViewTransition>
        </div>

        <div className="pb-10 md:pt-10">
          <Reveal>
            <TLink href="/shop" className="text-xs tracking-[0.3em] text-ink-soft uppercase hover:text-ink">
              ← Shop / {categories.find((c) => c.id === product.category)?.label}
            </TLink>
          </Reveal>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] md:text-7xl">
            <SplitText text={product.name} inView={false} delay={0.25} by="word" />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-3 font-serif text-lg">{product.nameKo}</p>
            <p className="mt-8 font-display text-3xl italic">“{product.tagline}”</p>
            <p className="mt-6 leading-8 text-ink-soft">{product.description}</p>
            <div className="mt-8 flex items-baseline justify-between border-t border-ink/15 pt-6">
              <span className="text-sm text-ink-soft">{product.volume}</span>
              <span className="text-2xl">{won(product.price)}</span>
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <AddToBag slug={product.slug} />
          </Reveal>
          <Reveal delay={0.55}>
            <Accordion
              items={[
                {
                  title: "핵심 원료",
                  body: (
                    <ul className="space-y-4">
                      {product.ingredients.map((id) => {
                        const ing = getIngredient(id)!;
                        return (
                          <li key={id}>
                            <TLink href={`/ingredients#${id}`} className="font-display text-xl underline-offset-4 hover:underline">
                              {ing.name} · {ing.nameKo}
                            </TLink>
                            <p className="text-sm text-ink-soft">
                              {ing.origin} — {ing.benefit}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  ),
                },
                { title: "사용 방법", body: <p>{product.howTo}</p> },
                { title: "텍스처", body: <p>{product.texture}</p> },
                { title: "배송 · 교환", body: <p>5만 원 이상 무료 배송. 개봉 전 제품은 수령 후 7일 이내 교환·반품할 수 있어요. (샘플 안내)</p> },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pt-28 md:px-10">
        <Reveal>
          <h2 className="font-display text-5xl md:text-6xl">You may also like</h2>
        </Reveal>
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <TLink
        href={`/shop/${next.slug}`}
        data-cursor="Next"
        className="group mt-32 block overflow-hidden border-t border-ink/10 transition-colors duration-700 hover:bg-ink hover:text-cream"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-16 md:px-10 md:py-24">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase opacity-60">Next product</p>
            <p className="mt-3 font-display text-5xl transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 md:text-8xl">
              {next.name}
            </p>
          </div>
          <span className="text-4xl transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3 md:text-6xl">→</span>
        </div>
      </TLink>
    </PageTransition>
  );
}

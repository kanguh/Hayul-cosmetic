import PageTransition from "@/components/motion/PageTransition";
import Marquee from "@/components/motion/Marquee";
import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import Bestsellers from "@/components/home/Bestsellers";
import IngredientSpotlight from "@/components/home/IngredientSpotlight";
import Ritual from "@/components/home/Ritual";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Marquee
        className="border-y border-ink/10 py-6 font-display text-3xl italic md:text-5xl"
        items={["Birch sap from Inje", "Mugwort from Ganghwa", "Camellia from Jeju", "Rice from Yeoju", "Green tea from Boseong"]}
      />
      <Philosophy />
      <Bestsellers />
      <IngredientSpotlight />
      <Ritual />
      <Newsletter />
    </PageTransition>
  );
}

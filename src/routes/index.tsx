import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { CatalogSection } from "@/components/CatalogSection";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopFlow — Premium tools, hand-picked" },
      { name: "description", content: "A curated catalog of premium hardware and everyday objects from independent studios." },
      { property: "og:title", content: "ShopFlow — Premium tools, hand-picked" },
      { property: "og:description", content: "Shop hand-picked hardware and lifestyle essentials. Free overnight shipping over $100." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Features />
      <CatalogSection />
      <Testimonials />
      <FAQ />
    </>
  );
}

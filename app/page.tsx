import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { TickerBanner } from "@/components/home/TickerBanner";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { BrandStory } from "@/components/home/BrandStory";
import { FromNature } from "@/components/home/FromNature";
import { LookbookPreview } from "@/components/home/LookbookPreview";
import { CultureSection } from "@/components/home/CultureSection";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getFeaturedProducts } from "@/lib/supabase/products";

export const metadata: Metadata = {
  title: "SKWIRREL — Born From Odisha. Made For The World.",
  description:
    "Premium cultural streetwear from Odisha, India. Every stitch tells a story of memory, music, language, and pride.",
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <TickerBanner />
      <FeaturedCollection products={featuredProducts} />
      <BrandStory />
      <FromNature />
      <LookbookPreview />
      <CultureSection />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}

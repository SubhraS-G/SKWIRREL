import { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { FounderStory } from "@/components/about/FounderStory";
import { BrandPhilosophy } from "@/components/about/BrandPhilosophy";
import { BrandTimeline } from "@/components/about/BrandTimeline";
import { TeamSection } from "@/components/about/TeamSection";

export const metadata: Metadata = {
  title: "About — Our Story",
  description:
    "SKWIRREL was born in Bhubaneswar, Odisha with a mission to transform culture into clothing. Learn our story.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <AboutHero />
      <FounderStory />
      <BrandPhilosophy />
      <BrandTimeline />
      <TeamSection />
    </div>
  );
}

import { Metadata } from "next";
import { RootsHero } from "@/components/roots/RootsHero";
import { OdishaHistory } from "@/components/roots/OdishaHistory";
import { FestivalsSection } from "@/components/roots/FestivalsSection";
import { TextileHeritage } from "@/components/roots/TextileHeritage";
import { MusicLanguage } from "@/components/roots/MusicLanguage";
import { CoastalHeritage } from "@/components/roots/CoastalHeritage";

export const metadata: Metadata = {
  title: "Our Roots — The Soul of Odisha",
  description:
    "An immersive journey through Odisha's festivals, textiles, music, and heritage that inspires every SKWIRREL piece.",
};

export default function OurRootsPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <RootsHero />
      <OdishaHistory />
      <FestivalsSection />
      <TextileHeritage />
      <MusicLanguage />
      <CoastalHeritage />
    </div>
  );
}

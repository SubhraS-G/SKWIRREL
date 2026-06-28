import { Metadata } from "next";
import {
  SustainHero,
  FabricSection,
  EthicalSourcing,
  PackagingSection,
  OurPromise,
} from "@/components/sustainability";

export const metadata: Metadata = {
  title: "Sustainability — From Nature. Made To Wear.",
  description:
    "SKWIRREL's commitment to sustainable fashion through wood pulp and cotton blends, ethical sourcing, and responsible production.",
};

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <SustainHero />
      <FabricSection />
      <EthicalSourcing />
      <PackagingSection />
      <OurPromise />
    </div>
  );
}

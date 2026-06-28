import { Metadata } from "next";
import { LookbookGallery } from "@/components/lookbook/LookbookGallery";
import { LookbookFilters } from "@/components/lookbook/LookbookFilters";
import { getLookbookImages } from "@/lib/supabase/lookbook";

export const metadata: Metadata = {
  title: "Lookbook — Visual Stories",
  description:
    "Browse SKWIRREL's lookbook — editorial fashion photography rooted in Odisha's culture.",
};

interface LookbookPageProps {
  searchParams: { category?: string };
}

export default async function LookbookPage({ searchParams }: LookbookPageProps) {
  const images = await getLookbookImages(searchParams.category);

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-10">
          <p className="text-brand-orange text-xs tracking-widest uppercase mb-2">Visual Stories</p>
          <h1 className="font-bebas text-6xl lg:text-8xl text-brand-ivory">THE LOOKBOOK</h1>
        </div>
        <LookbookFilters activeCategory={searchParams.category} />
        <LookbookGallery images={images} />
      </div>
    </div>
  );
}

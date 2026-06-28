"use client";

import { useRouter } from "next/navigation";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Campaign", value: "campaign" },
  { label: "Cultural", value: "cultural" },
  { label: "Editorial", value: "editorial" },
  { label: "Behind Scenes", value: "bts" },
];

export function LookbookFilters({ activeCategory }: { activeCategory?: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => router.push(cat.value ? `/lookbook?category=${cat.value}` : "/lookbook")}
          className={`px-5 py-2 text-[0.65rem] tracking-[0.2em] uppercase transition-all border ${
            (activeCategory ?? "") === cat.value
              ? "border-brand-orange bg-brand-orange text-brand-ivory"
              : "border-white/10 text-brand-gray hover:border-brand-gray/30 hover:text-brand-ivory"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

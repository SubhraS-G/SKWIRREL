"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "T-Shirts", value: "t-shirts" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Oversized Fits", value: "oversized" },
  { label: "Cultural Editions", value: "cultural" },
  { label: "Sustainable", value: "sustainable" },
  { label: "Accessories", value: "accessories" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const COLORS = [
  { label: "Black", value: "black", hex: "#0A0A0A" },
  { label: "White", value: "ivory", hex: "#F8F6F2" },
  { label: "Orange", value: "orange", hex: "#E85A1C" },
  { label: "Charcoal", value: "charcoal", hex: "#2a2a2a" },
  { label: "Beige", value: "beige", hex: "#EDE7DE" },
];

const PRICE_RANGES = [
  { label: "Under ₹999", min: 0, max: 999 },
  { label: "₹999 – ₹1,999", min: 999, max: 1999 },
  { label: "₹2,000 – ₹3,499", min: 2000, max: 3499 },
  { label: "Above ₹3,500", min: 3500, max: undefined },
];

interface ShopFiltersProps {
  searchParams: Record<string, string | undefined>;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-white/5 pb-5 mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full mb-4 text-[0.65rem] tracking-[0.3em] text-brand-orange uppercase"
      >
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && children}
    </div>
  );
}

export function ShopFilters({ searchParams }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateFilter = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(
      Object.entries(searchParams).filter(([, v]) => v !== undefined) as [string, string][]
    );
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-[#0d0d0d] p-5">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal size={14} className="text-brand-orange" />
        <span className="text-[0.65rem] tracking-[0.3em] text-brand-gray uppercase">Filters</span>
      </div>

      <FilterSection title="Category">
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => updateFilter("category", cat.value || undefined)}
              className={`block w-full text-left text-xs py-1.5 transition-colors ${
                (searchParams.category ?? "") === cat.value
                  ? "text-brand-orange"
                  : "text-brand-gray hover:text-brand-ivory"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => updateFilter("size", searchParams.size === size ? undefined : size)}
              className={`w-9 h-9 text-xs border transition-all ${
                searchParams.size === size
                  ? "border-brand-orange bg-brand-orange text-brand-ivory"
                  : "border-white/10 text-brand-gray hover:border-brand-orange"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => updateFilter("color", searchParams.color === color.value ? undefined : color.value)}
              title={color.label}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                searchParams.color === color.value
                  ? "border-brand-orange scale-110"
                  : "border-transparent hover:border-brand-gray"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const isActive =
              String(searchParams.minPrice ?? "") === String(range.min) &&
              String(searchParams.maxPrice ?? "") === String(range.max ?? "");
            return (
              <button
                key={range.label}
                onClick={() => {
                  if (isActive) {
                    updateFilter("minPrice", undefined);
                    updateFilter("maxPrice", undefined);
                  } else {
                    updateFilter("minPrice", String(range.min));
                    updateFilter("maxPrice", range.max !== undefined ? String(range.max) : undefined);
                  }
                }}
                className={`block w-full text-left text-xs py-1.5 transition-colors ${
                  isActive ? "text-brand-orange" : "text-brand-gray hover:text-brand-ivory"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <button
        onClick={() => router.push(pathname)}
        className="w-full text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase border border-white/10 py-2.5 hover:border-brand-orange hover:text-brand-orange transition-all"
      >
        Clear All Filters
      </button>
    </div>
  );
}

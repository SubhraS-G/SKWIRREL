"use client";

import { useRouter, usePathname } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductWithVariants } from "@/types";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ProductGridProps {
  products: ProductWithVariants[];
  total: number;
  pages: number;
  currentPage: number;
}

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
];

export function ProductGrid({ products, total, pages, currentPage }: ProductGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<"grid" | "list">("grid");

  const updateSort = (sort: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sort", sort);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
        <p className="text-brand-gray text-xs">
          <span className="text-brand-ivory">{total}</span> products
        </p>
        <div className="flex items-center gap-4">
          <select
            onChange={(e) => updateSort(e.target.value)}
            defaultValue="newest"
            className="bg-[#0d0d0d] border border-white/10 text-brand-gray text-xs px-3 py-2 outline-none focus:border-brand-orange transition-colors"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <div className="hidden sm:flex gap-1">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 transition-colors ${view === "grid" ? "text-brand-orange" : "text-brand-gray hover:text-brand-ivory"}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 transition-colors ${view === "list" ? "text-brand-orange" : "text-brand-gray hover:text-brand-ivory"}`}
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-brand-gray text-sm">No products found.</p>
          <Link href="/shop" className="text-brand-orange text-xs tracking-wider uppercase mt-3 block hover:underline">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className={
          view === "grid"
            ? "grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            : "flex flex-col gap-4"
        }>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-9 h-9 text-xs border transition-all ${
                page === currentPage
                  ? "border-brand-orange bg-brand-orange text-brand-ivory"
                  : "border-white/10 text-brand-gray hover:border-brand-orange"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

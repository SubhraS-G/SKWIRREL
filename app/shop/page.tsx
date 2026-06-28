import { Metadata } from "next";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopSearch } from "@/components/shop/ShopSearch";
import { getProducts } from "@/lib/supabase/products";

export const metadata: Metadata = {
  title: "Shop — Premium Cultural Streetwear",
  description:
    "Browse SKWIRREL's full collection of premium streetwear inspired by Odisha's rich culture.",
};

interface ShopPageProps {
  searchParams: {
    category?: string;
    sort?: string;
    color?: string;
    size?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    q?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { products, total, pages } = await getProducts({
    category: searchParams.category,
    sort: searchParams.sort ?? "newest",
    color: searchParams.color,
    size: searchParams.size,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    page: searchParams.page ? Number(searchParams.page) : 1,
    query: searchParams.q,
  });

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <ShopHeader total={total} />
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-10">
        <ShopSearch />
        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ShopFilters searchParams={searchParams} />
          </aside>
          <main className="flex-1">
            <ProductGrid
              products={products}
              total={total}
              pages={pages}
              currentPage={searchParams.page ? Number(searchParams.page) : 1}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

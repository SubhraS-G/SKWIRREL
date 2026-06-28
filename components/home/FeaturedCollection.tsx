import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductWithVariants } from "@/types";

interface FeaturedCollectionProps {
  products: ProductWithVariants[];
}

export function FeaturedCollection({ products }: FeaturedCollectionProps) {
  return (
    <section className="bg-brand-black py-20 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-2">Featured</p>
            <h2 className="font-bebas text-5xl lg:text-6xl text-brand-ivory leading-none">
              NEW <span className="text-brand-orange">DROPS</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[0.65rem] tracking-[0.25em] text-brand-orange uppercase border-b border-brand-orange pb-0.5 hover:opacity-70 transition-opacity hidden sm:block"
          >
            View All →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#111] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:hidden">
          <Link
            href="/shop"
            className="inline-block border border-brand-gray/30 text-brand-gray px-8 py-3 text-[0.65rem] tracking-[0.2em] uppercase hover:border-brand-orange hover:text-brand-orange transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

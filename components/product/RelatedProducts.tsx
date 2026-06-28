import { ProductCard } from "@/components/product/ProductCard";
import { ProductWithVariants } from "@/types";

interface RelatedProductsProps {
  products: ProductWithVariants[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="py-16 border-t border-white/5">
      <div className="mb-8">
        <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-2">You May Also Like</p>
        <h2 className="font-bebas text-4xl text-brand-ivory">RELATED <span className="text-brand-orange">PRODUCTS</span></h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

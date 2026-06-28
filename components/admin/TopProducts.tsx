import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export async function TopProducts() {
  const products = await prisma.product.findMany({
    where: { is_active: true },
    orderBy: { sold_count: "desc" },
    take: 5,
    include: { category: true },
  });

  return (
    <div className="bg-[#0d0d0d] border border-white/5 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bebas text-lg tracking-wider text-brand-ivory">TOP PRODUCTS</h3>
        <Link href="/admin/products" className="text-[0.6rem] tracking-wider text-brand-orange uppercase hover:underline">
          View All
        </Link>
      </div>
      <div className="space-y-3">
        {products.map((product, i) => (
          <div key={product.id} className="flex items-center gap-3">
            <span className="font-bebas text-base text-brand-gray/30 w-5">{i + 1}</span>
            <div className="relative w-10 h-12 bg-[#1a1a1a] flex-shrink-0">
              {product.images[0] && (
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-brand-ivory text-xs truncate">{product.name}</p>
              <p className="text-brand-gray text-[0.6rem] mt-0.5">{product.category?.name}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bebas text-sm tracking-wider text-brand-orange">₹{Number(product.price).toLocaleString("en-IN")}</p>
              <p className="text-brand-gray text-[0.6rem]">{product.sold_count} sold</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

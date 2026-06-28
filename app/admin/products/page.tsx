import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Products — Admin" };

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  const page = Number(searchParams.page ?? 1);
  const limit = 15;
  const skip = (page - 1) * limit;
  const q = searchParams.q;

  const where = q ? { name: { contains: q, mode: "insensitive" as const } } : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, variants: true },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <AdminSidebar />
      <main className="flex-1 p-8 lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-bebas text-4xl text-brand-ivory tracking-wide">PRODUCTS</h1>
            <p className="text-brand-gray text-sm mt-1">{total} total products</p>
          </div>
          <a
            href="/admin/products/new"
            className="bg-brand-orange text-brand-ivory px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-brand-orange-dark transition-colors"
          >
            + New Product
          </a>
        </div>
        <AdminProductsTable
          products={products}
          total={total}
          page={page}
          pages={Math.ceil(total / limit)}
          query={q}
        />
      </main>
    </div>
  );
}

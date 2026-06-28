import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminCustomersTable } from "@/components/admin/AdminCustomersTable";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Customers — Admin" };

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  const page = Number(searchParams.page ?? 1);
  const limit = 20;
  const skip = (page - 1) * limit;
  const q = searchParams.q;

  const where: any = { role: "customer" };
  if (q) where.OR = [
    { name: { contains: q, mode: "insensitive" } },
    { email: { contains: q, mode: "insensitive" } },
  ];

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: { _count: { select: { orders: true } } },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <AdminSidebar />
      <main className="flex-1 p-8 lg:ml-64">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-brand-ivory tracking-wide">CUSTOMERS</h1>
          <p className="text-brand-gray text-sm mt-1">{total} registered customers</p>
        </div>
        <AdminCustomersTable customers={customers} total={total} page={page} pages={Math.ceil(total / limit)} query={q} />
      </main>
    </div>
  );
}

import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminOrdersTable } from "@/components/admin/AdminOrdersTable";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Orders — Admin" };

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  const page = Number(searchParams.page ?? 1);
  const limit = 20;
  const skip = (page - 1) * limit;
  const status = searchParams.status;

  const where = status ? { status: status as any } : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: { take: 1 } },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <AdminSidebar />
      <main className="flex-1 p-8 lg:ml-64">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-brand-ivory tracking-wide">ORDERS</h1>
          <p className="text-brand-gray text-sm mt-1">{total} total orders</p>
        </div>
        <AdminOrdersTable
          orders={orders}
          total={total}
          page={page}
          pages={Math.ceil(total / limit)}
          activeStatus={status}
        />
      </main>
    </div>
  );
}

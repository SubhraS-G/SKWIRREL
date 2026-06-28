import { prisma } from "@/lib/prisma";

export async function getAdminStats() {
  const [
    totalOrders,
    totalRevenue,
    totalProducts,
    totalCustomers,
    recentOrders,
    pendingOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { payment_status: "paid" },
    }),
    prisma.product.count({ where: { is_active: true } }),
    prisma.user.count({ where: { role: "customer" } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      include: { items: { include: { product: true } } },
    }),
    prisma.order.count({ where: { status: "pending" } }),
  ]);

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.total ?? 0,
    totalProducts,
    totalCustomers,
    recentOrders,
    pendingOrders,
  };
}

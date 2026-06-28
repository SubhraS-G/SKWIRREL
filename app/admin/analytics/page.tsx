import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Analytics — Admin" };

export default async function AdminAnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  // Revenue by month (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [revenueData, ordersByStatus, topCategories, newsletterCount] = await Promise.all([
    prisma.order.groupBy({
      by: ["created_at"],
      where: { payment_status: "paid", created_at: { gte: sixMonthsAgo } },
      _sum: { total: true },
      _count: true,
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.orderItem.groupBy({
      by: ["product_id"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),
    prisma.newsletterSubscriber.count(),
  ]);

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <AdminSidebar />
      <main className="flex-1 p-8 lg:ml-64">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-brand-ivory tracking-wide">ANALYTICS</h1>
          <p className="text-brand-gray text-sm mt-1">Last 6 months overview</p>
        </div>
        <AdminAnalytics
          ordersByStatus={ordersByStatus}
          newsletterCount={newsletterCount}
        />
      </main>
    </div>
  );
}

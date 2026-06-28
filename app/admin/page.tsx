import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminStats } from "@/components/admin/AdminStats";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { TopProducts } from "@/components/admin/TopProducts";
import { getAdminStats } from "@/lib/supabase/admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Admin Dashboard — SKWIRREL" };

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  const stats = await getAdminStats();

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <AdminSidebar />
      <main className="flex-1 p-8 lg:ml-64">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-brand-ivory tracking-wide">DASHBOARD</h1>
          <p className="text-brand-gray text-sm mt-1">Welcome back, Admin</p>
        </div>
        <AdminStats stats={stats} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
          <RecentOrders />
          <TopProducts />
        </div>
      </main>
    </div>
  );
}

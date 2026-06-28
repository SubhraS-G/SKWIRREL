import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminCouponsManager } from "@/components/admin/AdminCouponsManager";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Coupons — Admin" };

export default async function AdminCouponsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  const coupons = await prisma.coupon.findMany({ orderBy: { created_at: "desc" } });

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <AdminSidebar />
      <main className="flex-1 p-8 lg:ml-64">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl text-brand-ivory tracking-wide">COUPONS</h1>
          <p className="text-brand-gray text-sm mt-1">{coupons.length} coupons</p>
        </div>
        <AdminCouponsManager initialCoupons={coupons} />
      </main>
    </div>
  );
}

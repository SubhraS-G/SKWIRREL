import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { OrderHistory } from "@/components/account/OrderHistory";
import { getUserOrders } from "@/lib/supabase/orders";

export default async function AccountOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const orders = await getUserOrders(session.user.id);

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <h1 className="font-bebas text-5xl text-brand-ivory mb-10">ORDER HISTORY</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <AccountSidebar />
          <div className="lg:col-span-3">
            <OrderHistory orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
}

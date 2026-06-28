import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { WishlistGrid } from "@/components/account/WishlistGrid";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <h1 className="font-bebas text-5xl text-brand-ivory mb-10">MY WISHLIST</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <AccountSidebar />
          <div className="lg:col-span-3">
            <WishlistGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

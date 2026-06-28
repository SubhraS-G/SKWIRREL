import { Metadata } from "next";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { AccountOverview } from "@/components/account/AccountOverview";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "My Account — SKWIRREL" };

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <h1 className="font-bebas text-5xl text-brand-ivory mb-10">MY ACCOUNT</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <AccountSidebar />
          <div className="lg:col-span-3">
            <AccountOverview user={session.user} />
          </div>
        </div>
      </div>
    </div>
  );
}

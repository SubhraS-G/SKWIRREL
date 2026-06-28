import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminBlogTable } from "@/components/admin/AdminBlogTable";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Blog — Admin" };

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  const posts = await prisma.blogPost.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <AdminSidebar />
      <main className="flex-1 p-8 lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-bebas text-4xl text-brand-ivory tracking-wide">BLOG & STORIES</h1>
            <p className="text-brand-gray text-sm mt-1">{posts.length} posts</p>
          </div>
          <a href="/admin/blog/new"
            className="bg-brand-orange text-brand-ivory px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-brand-orange-dark transition-colors">
            + New Post
          </a>
        </div>
        <AdminBlogTable posts={posts} />
      </main>
    </div>
  );
}

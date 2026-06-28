"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export function AdminBlogTable({ posts }: { posts: any[] }) {
  const router = useRouter();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Post deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !current, published_at: !current ? new Date().toISOString() : null }),
      });
      toast.success(current ? "Post unpublished" : "Post published!");
      router.refresh();
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="bg-[#0d0d0d] border border-white/5 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            {["Title", "Category", "Author", "Date", "Status", "Actions"].map((h) => (
              <th key={h} className="text-left text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase px-4 py-3 font-normal">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && (
            <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-gray text-sm">No posts yet. Create your first story.</td></tr>
          )}
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
              <td className="px-4 py-3 max-w-[220px]">
                <p className="text-brand-ivory text-xs truncate">{post.title}</p>
                <p className="text-brand-gray text-[0.6rem] mt-0.5 truncate">/blog/{post.slug}</p>
              </td>
              <td className="px-4 py-3 text-brand-gray text-xs">{post.category ?? "—"}</td>
              <td className="px-4 py-3 text-brand-gray text-xs">{post.author_name}</td>
              <td className="px-4 py-3 text-brand-gray text-xs whitespace-nowrap">
                {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
              </td>
              <td className="px-4 py-3">
                <span className={`text-[0.6rem] tracking-wider border px-2 py-0.5 uppercase ${post.is_published ? "text-green-400 border-green-400/30" : "text-brand-gray border-white/10"}`}>
                  {post.is_published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => handleTogglePublish(post.id, post.is_published)}
                    className={`transition-colors ${post.is_published ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300"}`}
                    title={post.is_published ? "Unpublish" : "Publish"}>
                    {post.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <a href={`/admin/blog/${post.id}/edit`}
                    className="text-brand-gray hover:text-brand-orange transition-colors">
                    <Pencil size={14} />
                  </a>
                  <button onClick={() => handleDelete(post.id, post.title)}
                    className="text-brand-gray hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

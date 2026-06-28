import { Metadata } from "next";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { getBlogPosts } from "@/lib/supabase/blog";

export const metadata: Metadata = {
  title: "Stories — Culture, Fashion & More",
  description:
    "Read stories about Odisha's culture, sustainable fashion, brand updates, and the people behind SKWIRREL.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12">
          <p className="text-brand-orange text-xs tracking-widest uppercase mb-2">Read</p>
          <h1 className="font-bebas text-6xl lg:text-8xl text-brand-ivory">STORIES</h1>
        </div>
        <BlogGrid posts={posts} />
      </div>
    </div>
  );
}

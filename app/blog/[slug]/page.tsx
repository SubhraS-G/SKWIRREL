import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/blog/BlogPost";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/supabase/blog";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — SKWIRREL Stories`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.cover_image, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post.id, post.tags);
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <BlogPost post={post} />
      <RelatedPosts posts={related} />
    </div>
  );
}

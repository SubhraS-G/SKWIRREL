import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogPostProps {
  post: {
    title: string;
    excerpt: string;
    cover_image: string;
    content: string;
    author_name: string;
    author_image?: string | null;
    tags: string[];
    category?: string | null;
    published_at?: Date | null;
  };
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-12 py-12">
      {/* Back */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-brand-gray text-xs tracking-wider hover:text-brand-orange transition-colors mb-10">
        <ArrowLeft size={14} /> Back to Stories
      </Link>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 mb-4">
        {post.category && (
          <span className="text-[0.6rem] tracking-[0.3em] text-brand-orange uppercase border border-brand-orange/30 px-3 py-1">
            {post.category}
          </span>
        )}
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[0.6rem] tracking-[0.2em] text-brand-gray uppercase border border-white/10 px-3 py-1">
            #{tag}
          </span>
        ))}
      </div>

      <h1 className="font-playfair text-3xl lg:text-5xl text-brand-ivory leading-tight mb-4">
        {post.title}
      </h1>
      <p className="text-brand-gray text-base leading-relaxed mb-8 font-playfair italic">{post.excerpt}</p>

      {/* Author + Date */}
      <div className="flex items-center gap-3 pb-8 border-b border-white/5 mb-8">
        <div className="w-9 h-9 bg-brand-orange/10 border border-brand-orange/20 rounded-full flex items-center justify-center">
          <span className="font-bebas text-sm text-brand-orange">
            {post.author_name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-brand-ivory text-xs font-medium">{post.author_name}</p>
          {post.published_at && (
            <p className="text-brand-gray text-xs">
              {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </div>
      </div>

      {/* Cover image */}
      {post.cover_image && (
        <div className="relative aspect-[16/9] mb-10 overflow-hidden">
          <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-invert prose-sm max-w-none prose-headings:font-bebas prose-headings:tracking-wider prose-a:text-brand-orange prose-strong:text-brand-ivory"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

import Link from "next/link";
import Image from "next/image";

interface RelatedPostsProps {
  posts: any[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;
  return (
    <section className="border-t border-white/5 py-16 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <p className="text-brand-orange text-[0.65rem] tracking-[0.4em] uppercase mb-2">Continue Reading</p>
        <h2 className="font-bebas text-4xl text-brand-ivory mb-8">MORE STORIES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-video bg-[#111] overflow-hidden mb-3">
                {post.cover_image && (
                  <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
              </div>
              <h3 className="font-playfair text-sm text-brand-ivory group-hover:text-brand-orange transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

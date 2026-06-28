import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  author_name: string;
  tags: string[];
  category?: string | null;
  published_at?: Date | null;
}

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) {
    return <p className="text-brand-gray text-sm">No stories published yet. Check back soon.</p>;
  }

  const [featured, ...rest] = posts;

  return (
    <div className="space-y-12">
      {/* Featured */}
      <Link href={`/blog/${featured.slug}`} className="group block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[16/9] bg-[#111] overflow-hidden">
            {featured.cover_image && (
              <Image
                src={featured.cover_image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>
          <div>
            <div className="flex gap-3 mb-3">
              {featured.category && (
                <span className="text-[0.6rem] tracking-[0.25em] text-brand-orange uppercase">{featured.category}</span>
              )}
              {featured.published_at && (
                <span className="text-[0.6rem] text-brand-gray">
                  {new Date(featured.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              )}
            </div>
            <h2 className="font-playfair text-2xl lg:text-3xl text-brand-ivory leading-snug mb-3 group-hover:text-brand-orange transition-colors">
              {featured.title}
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
            <div className="flex items-center gap-2">
              <span className="text-[0.6rem] tracking-[0.2em] text-brand-orange uppercase">{featured.author_name}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] bg-[#111] overflow-hidden mb-4">
                {post.cover_image && (
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex gap-3 mb-2">
                {post.category && (
                  <span className="text-[0.55rem] tracking-[0.25em] text-brand-orange uppercase">{post.category}</span>
                )}
                {post.published_at && (
                  <span className="text-[0.55rem] text-brand-gray">
                    {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                )}
              </div>
              <h3 className="font-playfair text-lg text-brand-ivory leading-snug mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-brand-gray text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

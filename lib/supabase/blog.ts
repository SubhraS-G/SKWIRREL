import { prisma } from "@/lib/prisma";

export async function getBlogPosts(limit = 12) {
  return prisma.blogPost.findMany({
    where: { is_published: true },
    orderBy: { published_at: "desc" },
    take: limit,
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getRelatedPosts(postId: string, tags: string[]) {
  return prisma.blogPost.findMany({
    where: {
      id: { not: postId },
      is_published: true,
      tags: { hasSome: tags },
    },
    take: 3,
    orderBy: { published_at: "desc" },
  });
}

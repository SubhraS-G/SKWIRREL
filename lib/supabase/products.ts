import { prisma } from "@/lib/prisma";

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { is_featured: true, is_active: true },
    include: { category: true, variants: true },
    take: 8,
    orderBy: { created_at: "desc" },
  });
}

export async function getProducts({
  category,
  sort = "newest",
  page = 1,
  limit = 12,
  query,
  minPrice,
  maxPrice,
  color,
  size,
}: {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
}) {
  const skip = (page - 1) * limit;
  const where: any = { is_active: true };

  if (category) where.category = { slug: category };
  if (query) where.name = { contains: query, mode: "insensitive" };
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = minPrice;
    if (maxPrice) where.price.lte = maxPrice;
  }
  if (color || size) {
    where.variants = { some: {} };
    if (color) where.variants.some.color = { contains: color, mode: "insensitive" };
    if (size) where.variants.some.size = size;
  }

  const orderBy: any =
    sort === "price-asc" ? { price: "asc" }
    : sort === "price-desc" ? { price: "desc" }
    : sort === "popular" ? { sold_count: "desc" }
    : { created_at: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: { category: true, variants: true },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, pages: Math.ceil(total / limit) };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      reviews: {
        where: { is_approved: true },
        include: { user: { select: { name: true } } },
        orderBy: { created_at: "desc" },
        take: 10,
      },
    },
  });
}

export async function getRelatedProducts(productId: string, categoryId: string) {
  return prisma.product.findMany({
    where: {
      category_id: categoryId,
      id: { not: productId },
      is_active: true,
    },
    include: { variants: true },
    take: 4,
  });
}

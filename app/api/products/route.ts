import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productQuerySchema } from "@/lib/validations/product";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = productQuerySchema.parse({
      category: searchParams.get("category") ?? undefined,
      sort: searchParams.get("sort") ?? "newest",
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 12,
      q: searchParams.get("q") ?? undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    });

    const skip = (query.page - 1) * query.limit;

    const where: any = { is_active: true };
    if (query.category) where.category = { slug: query.category };
    if (query.q) where.name = { contains: query.q, mode: "insensitive" };
    if (query.minPrice || query.maxPrice) {
      where.price = {};
      if (query.minPrice) where.price.gte = query.minPrice;
      if (query.maxPrice) where.price.lte = query.maxPrice;
    }

    const orderBy: any =
      query.sort === "price-asc" ? { price: "asc" }
      : query.sort === "price-desc" ? { price: "desc" }
      : query.sort === "popular" ? { sold_count: "desc" }
      : { created_at: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: query.limit,
        include: { category: true, variants: true },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      total,
      pages: Math.ceil(total / query.limit),
      page: query.page,
    });
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({ data: body });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    if (!q || q.trim().length < 2) return NextResponse.json({ results: [] });

    const [products, categories] = await Promise.all([
      prisma.product.findMany({
        where: {
          is_active: true,
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { tags: { has: q.toLowerCase() } },
          ],
        },
        include: { category: true },
        take: 8,
      }),
      prisma.category.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        take: 3,
      }),
    ]);

    return NextResponse.json({ products, categories });
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}

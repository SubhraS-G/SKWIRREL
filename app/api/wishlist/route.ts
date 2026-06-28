import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ items: [] });

    const items = await prisma.wishlist.findMany({
      where: { user_id: session.user.id },
      include: { product: { include: { variants: true, category: true } } },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await request.json();
    const existing = await prisma.wishlist.findUnique({
      where: { user_id_product_id: { user_id: session.user.id, product_id: productId } },
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
      return NextResponse.json({ action: "removed" });
    }

    await prisma.wishlist.create({ data: { user_id: session.user.id, product_id: productId } });
    return NextResponse.json({ action: "added" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

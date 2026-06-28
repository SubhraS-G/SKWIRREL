import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber");
  const email = searchParams.get("email");

  if (!orderNumber || !email) {
    return NextResponse.json({ error: "Order number and email required" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: { order_number: orderNumber, email },
    include: {
      items: {
        include: { product: { select: { name: true, images: true } } },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found. Please check your details." }, { status: 404 });
  }

  return NextResponse.json({ order });
}

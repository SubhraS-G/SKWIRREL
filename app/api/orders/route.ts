import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createOrderSchema } from "@/lib/validations/order";
import { sendOrderConfirmationEmail } from "@/lib/email/orderEmail";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const orders = await prisma.order.findMany({
      where: { user_id: session.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createOrderSchema.parse(body);

    const order = await prisma.order.create({
      data: {
        user_id: data.userId,
        total: data.total,
        status: "pending",
        shipping_address: data.shippingAddress,
        items: {
          create: data.items.map((item) => ({
            product_id: item.productId,
            variant_id: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    await sendOrderConfirmationEmail(order, data.email);

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("[ORDERS_POST]", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

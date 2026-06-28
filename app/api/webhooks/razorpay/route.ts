import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature")!;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      await prisma.order.updateMany({
        where: { razorpay_order_id: payment.order_id },
        data: {
          status: "confirmed",
          payment_status: "paid",
          razorpay_payment_id: payment.id,
        },
      });
    }

    if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;
      await prisma.order.updateMany({
        where: { razorpay_order_id: payment.order_id },
        data: { status: "payment_failed", payment_status: "failed" },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[RAZORPAY_WEBHOOK]", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}

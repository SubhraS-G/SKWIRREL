import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { razorpay } from "@/lib/razorpay/client";
import { checkoutSchema } from "@/lib/validations/checkout";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = checkoutSchema.parse(body);

    if (data.paymentMethod === "stripe") {
      const lineItems = data.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: { productId: item.productId, variantId: item.variantId },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
        metadata: {
          userId: data.userId ?? "",
          shippingAddress: JSON.stringify(data.shippingAddress),
        },
        shipping_address_collection: { allowed_countries: ["IN"] },
        phone_number_collection: { enabled: true },
        locale: "auto",
      });

      return NextResponse.json({ url: session.url, sessionId: session.id });
    }

    if (data.paymentMethod === "razorpay") {
      const order = await razorpay.orders.create({
        amount: Math.round(data.total * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          userId: data.userId ?? "",
          shippingAddress: JSON.stringify(data.shippingAddress),
        },
      });

      return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency });
    }

    return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
  } catch (error) {
    console.error("[CHECKOUT_POST]", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

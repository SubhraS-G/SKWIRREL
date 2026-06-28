import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.toUpperCase();

  if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 });

  const coupon = await prisma.coupon.findUnique({ where: { code } });

  if (!coupon || !coupon.is_active) {
    return NextResponse.json({ error: "Invalid or expired coupon" }, { status: 400 });
  }

  if (coupon.expires_at && coupon.expires_at < new Date()) {
    return NextResponse.json({ error: "Coupon has expired" }, { status: 400 });
  }

  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
    return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
  }

  return NextResponse.json({
    code: coupon.code,
    type: coupon.type,
    value: Number(coupon.value),
    minOrder: coupon.min_order ? Number(coupon.min_order) : null,
  });
}

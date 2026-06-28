import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addressSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const addresses = await prisma.address.findMany({
      where: { user_id: session.user.id },
      orderBy: [{ is_default: "desc" }, { created_at: "desc" }],
    });

    return NextResponse.json({ addresses });
  } catch {
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const data = addressSchema.parse(body);

    // If this is the first address, make it default
    const count = await prisma.address.count({ where: { user_id: session.user.id } });

    const address = await prisma.address.create({
      data: { ...data, user_id: session.user.id, is_default: count === 0 },
    });

    return NextResponse.json({ address }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save address" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.address.deleteMany({ where: { id, user_id: session.user.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete address" }, { status: 500 });
  }
}

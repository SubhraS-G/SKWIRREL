import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactNotification } from "@/lib/email/contactEmail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    await prisma.contactMessage.create({ data });
    await sendContactNotification(data);

    return NextResponse.json({ message: "Message sent!" }, { status: 201 });
  } catch (error) {
    console.error("[CONTACT_POST]", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

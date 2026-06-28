import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent user enumeration
    if (!user) return NextResponse.json({ message: "If account exists, email sent." });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `SKWIRREL <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Reset your SKWIRREL password",
      html: `
        <div style="background:#0A0A0A;color:#F8F6F2;padding:40px;font-family:Arial,sans-serif;max-width:500px;margin:0 auto;">
          <p style="font-size:28px;font-weight:900;letter-spacing:8px;color:#F8F6F2;">SK<span style="color:#E85A1C;">W</span>IRREL</p>
          <h2 style="color:#E85A1C;font-size:20px;letter-spacing:3px;text-transform:uppercase;margin-top:24px;">Password Reset</h2>
          <p style="color:#8B8B8B;font-size:13px;line-height:1.8;margin-top:12px;">Click the button below to reset your password. This link expires in 1 hour.</p>
          <a href="${resetUrl}" style="display:inline-block;background:#E85A1C;color:#fff;padding:14px 32px;text-decoration:none;letter-spacing:3px;text-transform:uppercase;font-size:12px;margin-top:24px;">Reset Password</a>
          <p style="color:#333;font-size:11px;margin-top:24px;">If you didn't request this, ignore this email.</p>
        </div>`,
    });

    return NextResponse.json({ message: "Reset email sent." });
  } catch (error) {
    console.error("[FORGOT_PASSWORD]", error);
    return NextResponse.json({ message: "If account exists, email sent." });
  }
}

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `SKWIRREL <${process.env.EMAIL_FROM}>`,
    to: process.env.SMTP_USER,
    replyTo: data.email,
    subject: `New Contact: ${data.subject ?? "General Inquiry"} — from ${data.name}`,
    html: `
<div style="font-family:Arial;background:#0A0A0A;color:#F8F6F2;padding:32px;max-width:600px;margin:0 auto;">
  <h2 style="color:#E85A1C;letter-spacing:3px;text-transform:uppercase;font-size:18px;">New Contact Message</h2>
  <table style="width:100%;margin-top:20px;">
    <tr><td style="color:#8B8B8B;padding:6px 0;font-size:12px;width:100px;">Name</td><td style="padding:6px 0;">${data.name}</td></tr>
    <tr><td style="color:#8B8B8B;padding:6px 0;font-size:12px;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:#E85A1C;">${data.email}</a></td></tr>
    <tr><td style="color:#8B8B8B;padding:6px 0;font-size:12px;">Subject</td><td style="padding:6px 0;">${data.subject ?? "—"}</td></tr>
  </table>
  <div style="background:#111;padding:20px;margin-top:20px;border-left:3px solid #E85A1C;">
    <p style="color:#8B8B8B;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Message</p>
    <p style="font-size:14px;line-height:1.8;">${data.message}</p>
  </div>
</div>`,
  });
}

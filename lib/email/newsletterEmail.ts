import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendWelcomeEmail(email: string) {
  await transporter.sendMail({
    from: `SKWIRREL <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Welcome to the Movement — SKWIRREL",
    html: `
<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Arial, sans-serif; background: #0A0A0A; color: #F8F6F2; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 0 auto; padding: 60px 24px; text-align: center; }
  .logo { font-size: 32px; letter-spacing: 10px; font-weight: 900; }
  .logo span { color: #E85A1C; }
  .divider { width: 40px; height: 2px; background: #E85A1C; margin: 20px auto; }
  h1 { font-size: 26px; letter-spacing: 3px; text-transform: uppercase; margin: 0; }
  p { color: #8B8B8B; font-size: 13px; line-height: 1.8; max-width: 400px; margin: 16px auto; }
  .coupon { background: #111; border-left: 3px solid #E85A1C; padding: 16px 24px; margin: 24px auto; display: inline-block; font-size: 20px; letter-spacing: 4px; color: #E85A1C; font-weight: bold; }
  .btn { display: inline-block; background: #E85A1C; color: #fff; padding: 14px 36px; text-decoration: none; letter-spacing: 3px; text-transform: uppercase; font-size: 11px; margin-top: 24px; }
  .footer { color: #333; font-size: 10px; margin-top: 40px; letter-spacing: 2px; }
</style></head>
<body>
  <div class="container">
    <div class="logo">SK<span>W</span>IRREL</div>
    <div class="divider"></div>
    <h1>Welcome to the Movement</h1>
    <p>You're now part of a community that wears its culture with pride. Born from Odisha. Made for the world.</p>
    <p>Here's a little welcome gift from us:</p>
    <div class="coupon">WELCOME10</div>
    <p style="font-size:11px;">10% off your first order. No minimum order required.</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/shop" class="btn">Shop Now</a>
    <div class="footer">
      <p>ଓଡ଼ିଶା — Bhubaneswar, Odisha, India</p>
      <p>© ${new Date().getFullYear()} SKWIRREL</p>
    </div>
  </div>
</body>
</html>`,
  });
}

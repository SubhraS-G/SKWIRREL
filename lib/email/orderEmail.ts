import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderConfirmationEmail(order: any, email: string) {
  const itemsHtml = order.items
    .map(
      (item: any) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #1a1a1a;">${item.name}</td>
        <td style="padding:8px;border-bottom:1px solid #1a1a1a;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #1a1a1a;text-align:right;">₹${item.price}</td>
      </tr>`
    )
    .join("");

  await transporter.sendMail({
    from: `SKWIRREL <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `Order Confirmed — #${order.order_number}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Arial', sans-serif; background: #0A0A0A; color: #F8F6F2; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 28px; letter-spacing: 8px; color: #F8F6F2; font-weight: 900; }
    .logo span { color: #E85A1C; }
    .divider { width: 40px; height: 2px; background: #E85A1C; margin: 16px auto; }
    .card { background: #111; padding: 24px; margin-bottom: 20px; }
    h2 { color: #E85A1C; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; }
    table { width: 100%; border-collapse: collapse; }
    .total-row td { padding: 12px 8px; font-weight: bold; color: #E85A1C; font-size: 16px; }
    .footer { text-align: center; color: #555; font-size: 11px; margin-top: 40px; }
    .btn { display: inline-block; background: #E85A1C; color: #fff; padding: 12px 32px; text-decoration: none; letter-spacing: 2px; text-transform: uppercase; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">SK<span>W</span>IRREL</div>
      <div class="divider"></div>
      <p style="color:#8B8B8B;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Order Confirmed</p>
    </div>
    <div class="card">
      <h2>Thank you for your order!</h2>
      <p style="color:#8B8B8B;font-size:13px;">Order #${order.order_number}</p>
      <table style="margin-top:20px;">
        <thead>
          <tr style="color:#8B8B8B;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
            <td style="padding:8px;">Product</td>
            <td style="padding:8px;text-align:center;">Qty</td>
            <td style="padding:8px;text-align:right;">Price</td>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr class="total-row">
            <td colspan="2">Total</td>
            <td style="text-align:right;">₹${order.total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div style="text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/track-order" class="btn">Track Your Order</a>
    </div>
    <div class="footer">
      <p>Born from Odisha. Made for the world.</p>
      <p>© ${new Date().getFullYear()} SKWIRREL, Bhubaneswar, Odisha</p>
    </div>
  </div>
</body>
</html>`,
  });
}

import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

// ─── EMAIL TRANSPORTER ───────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── SHARED EMAIL BUILDER ────────────────────────────────────────
function buildEmail({ iconChar, bannerColor = "#c9930c", title, greeting, intro, detailRows = [], meetingLink, footerNote }: {
  iconChar: string;
  bannerColor?: string;
  title: string;
  greeting: string;
  intro: string;
  detailRows?: [string, string | null][];
  meetingLink?: string | null;
  footerNote?: string | null;
}) {
  const rowsHtml = detailRows
    .filter(([, val]) => val)
    .map(([label, val], i, arr) => `
      <tr>
        <td style="padding:14px 20px;font-size:11px;font-weight:700;letter-spacing:0.8px;color:#9ca3af;width:38%;${i < arr.length - 1 ? "border-bottom:1px solid #f0e0a0;" : ""}">${label}</td>
        <td style="padding:14px 20px;font-size:14px;font-weight:600;color:#1f2937;${i < arr.length - 1 ? "border-bottom:1px solid #f0e0a0;" : ""}">${val}</td>
      </tr>`)
    .join("");

  const meetingBtn = meetingLink ? `
    <div style="text-align:center;margin:28px 0;">
      <a href="${meetingLink}" style="display:inline-block;background:#c9930c;color:#ffffff;text-decoration:none;padding:13px 32px;border-radius:6px;font-size:15px;font-weight:700;">
        Review Booking
      </a>
    </div>` : "";

  const footerNoteHtml = footerNote
    ? `<p style="font-size:13px;color:#9ca3af;font-style:italic;margin:0 0 16px;">${footerNote}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
    <div style="background:${bannerColor};padding:48px;text-align:center;">
      <div style="display:inline-block;width:56px;height:56px;line-height:56px;border-radius:50%;background:rgba(255,255,255,0.15);font-size:24px;color:#fff;margin-bottom:16px;">${iconChar}</div>
      <h1 style="font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;margin:0 0 8px;">${title}</h1>
      <div style="font-size:14px;color:rgba(255,255,255,0.8);font-weight:500;">Hermes</div>
    </div>
    <div style="padding:40px 48px;">
      <p style="font-size:16px;color:#1f2937;margin:0 0 12px;">${greeting}</p>
      <p style="font-size:15px;color:#6b7280;line-height:1.7;margin:0 0 32px;">${intro}</p>
      ${rowsHtml ? `
      <table style="width:100%;border-radius:8px;overflow:hidden;background:#fffbf0;border:1px solid #f0e0a0;margin-bottom:28px;border-collapse:collapse;">
        ${rowsHtml}
      </table>` : ""}
      ${meetingBtn}
      <div style="border-top:1px solid #f3f4f6;padding-top:24px;margin-top:8px;">
        ${footerNoteHtml}
        <p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0;">
          If you have any questions, feel free to reply to this email and we'll be happy to help.
        </p>
      </div>
    </div>
    <div style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:28px 48px;text-align:center;">
      <div style="margin-bottom:12px;">
        <a href="#" style="color:#9ca3af;font-size:12px;text-decoration:none;margin:0 10px;">Privacy Policy</a>
        <a href="#" style="color:#9ca3af;font-size:12px;text-decoration:none;margin:0 10px;">Terms of Service</a>
        <a href="#" style="color:#9ca3af;font-size:12px;text-decoration:none;margin:0 10px;">Contact Us</a>
      </div>
      <p style="font-size:12px;color:#9ca3af;margin:0;">
        © ${new Date().getFullYear()} <a href="#" style="color:#c9930c;text-decoration:none;font-weight:500;">Hermes</a>. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── SEND EMAILS ─────────────────────────────────────────────────
async function sendBookingEmails({ full_name, email, company, preferred_date, preferred_time, message }: {
  full_name: string;
  email: string;
  company: string | null;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
}) {
  // Email to USER
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Appointment Request Received — Awaiting Confirmation`,
    html: buildEmail({
      iconChar: "⏳",
      title: "Appointment Request Received",
      greeting: `Hi <strong>${full_name}</strong>,`,
      intro: "Thank you for reaching out! We've received your appointment request and our team is currently reviewing it. You'll receive another email once your appointment is confirmed.",
      detailRows: [
        ["NAME", full_name],
        ["REQUESTED DATE", preferred_date],
        ["REQUESTED TIME", `${preferred_time} (Asia/Manila)`],
        ["MESSAGE", message],
      ],
      footerNote: "We typically respond within 24 hours on business days.",
    }),
  });

  // Email to ADMIN
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Appointment Request — ${full_name}${company ? ` (${company})` : ""} (Pending)`,
    html: buildEmail({
      iconChar: "📋",
      bannerColor: "#8b6914",
      title: "New Appointment Request",
      greeting: "Hello Admin,",
      intro: "A new appointment has been requested and is awaiting your review. Please check the details below.",
      detailRows: [
        ["NAME",    full_name],
        ["COMPANY", company],
        ["EMAIL",   email],
        ["DATE",    preferred_date],
        ["TIME",    `${preferred_time} (Asia/Manila)`],
        ["MESSAGE", message],
      ],
      footerNote: "This is an automated notification sent to you as the admin.",
    }),
  });

  console.log("✅ Emails sent to user and admin");
}

// ─── ROUTE ───────────────────────────────────────────────────────
router.post("/appointments/book", async (req, res) => {
  console.log("➡️ HIT /api/appointments/book");

  const { full_name, company, email, phone, preferred_date, preferred_time, message, recaptcha_token } = req.body;

  try {
    if (!full_name || !email || !preferred_date || !preferred_time) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    if (process.env.RECAPTCHA_SECRET_KEY && recaptcha_token) {
      const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha_token}`,
        { method: "POST" }
      );
      const verifyData = await verifyRes.json() as { success: boolean };
      if (!verifyData.success) {
        return res.status(400).json({ success: false, error: "reCAPTCHA verification failed." });
      }
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/expo_appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        full_name,
        company:         company || null,
        email,
        phone:           phone || null,
        preferred_date,
        preferred_time,
        message:         message || null,
        recaptcha_token: recaptcha_token || null,
        status:          "pending",
      }),
    });

    const data = await response.json() as any[];

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    // Send emails (non-blocking — won't fail the booking if email fails)
    sendBookingEmails({ full_name, email, company: company || null, preferred_date, preferred_time, message: message || null })
      .catch(err => console.error("⚠️ Email error:", err.message));

    res.json({ success: true, booking_id: data[0].id });

  } catch (err: any) {
    console.error("🔥 BOOK ERROR:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
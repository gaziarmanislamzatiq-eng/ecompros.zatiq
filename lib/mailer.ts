import nodemailer from "nodemailer";

export type BookingInquiry = {
  name: string;
  email: string;
  company: string;
  service: string;
  duration: string;
  budget: string;
  message: string;
};

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT ?? 587);
  const user = process.env.MAIL_USERNAME;
  const pass = process.env.MAIL_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error("Mail is not configured: missing MAIL_HOST, MAIL_USERNAME, or MAIL_PASSWORD.");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildTextBody(data: BookingInquiry) {
  return [
    "New project inquiry from the Ecom ProDesk website",
    "",
    `Name:              ${data.name}`,
    `Email:             ${data.email}`,
    `Company:           ${data.company || "Not provided"}`,
    `Primary need:      ${data.service}`,
    `Project duration:  ${data.duration}`,
    `Budget / timeline: ${data.budget || "Not provided"}`,
    "",
    "Project note:",
    data.message,
  ].join("\n");
}

function buildHtmlBody(data: BookingInquiry) {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "Not provided"],
    ["Primary need", data.service],
    ["Project duration", data.duration],
    ["Budget / timeline", data.budget || "Not provided"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 16px;border-bottom:1px solid #e5e5e5;color:#6b6b6b;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 16px;border-bottom:1px solid #e5e5e5;color:#111;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#111;margin-bottom:4px;">New project inquiry</h2>
      <p style="color:#6b6b6b;margin-top:0;">Submitted from the Ecom ProDesk booking form.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        ${rowsHtml}
      </table>
      <div>
        <p style="color:#6b6b6b;font-size:13px;margin-bottom:4px;">Project note</p>
        <p style="color:#111;font-size:14px;white-space:pre-wrap;border-left:3px solid #e5722c;padding-left:12px;">${escapeHtml(data.message)}</p>
      </div>
    </div>
  `;
}

export async function sendBookingInquiry(data: BookingInquiry) {
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  if (!to) {
    throw new Error("Mail is not configured: missing BOOKING_NOTIFY_EMAIL.");
  }

  const fromAddress = process.env.MAIL_FROM_ADDRESS ?? process.env.MAIL_USERNAME ?? "no-reply@ecompros.dev";
  const fromName = process.env.MAIL_FROM_NAME ?? "Ecom ProDesk Website";
  const subjectLabel = data.company || data.name;

  await getTransporter().sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    replyTo: data.email,
    subject: `Ecom ProDesk project inquiry - ${subjectLabel}`,
    text: buildTextBody(data),
    html: buildHtmlBody(data),
  });
}

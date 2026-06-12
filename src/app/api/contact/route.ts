import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Signal System <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `[Signal] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #8A8A82; margin-bottom: 24px;">
            New message from heyjubril.space
          </p>

          <h2 style="font-size: 20px; font-weight: 500; color: #0A0A0A; margin-bottom: 4px;">
            ${subject}
          </h2>

          <p style="font-size: 13px; color: #8A8A82; margin-bottom: 32px;">
            From ${name} — ${email}
          </p>

          <div style="border-left: 2px solid #E0E0D8; padding-left: 20px; margin-bottom: 32px;">
            <p style="font-size: 15px; color: #4A4A45; line-height: 1.8; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="border-top: 1px solid #E0E0D8; padding-top: 24px;">
            
              href="mailto:${email}"
              style="display: inline-block; padding: 10px 20px; background: #0A0A0A; color: #F7F7F2; border-radius: 8px; font-size: 13px; text-decoration: none;"
            >
              Reply to ${name}
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
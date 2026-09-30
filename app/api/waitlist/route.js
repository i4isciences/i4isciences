import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, role, source } = body;

    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email is required." },
        { status: 400 }
      );
    }

    if (process.env.N8N_LEAD_WEBHOOK_URL) {
      fetch(process.env.N8N_LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "waitlist",
          email,
          role: role || null,
          source: source || "postdocworks",
        }),
      }).catch(() => {}); // n8n being down shouldn't block the signup
    }

    const { error } = await resend.emails.send({
      from: "i4iSciences <contact@i4isciences.com>",
      to: ["ranjit@i4isciences.com"],
      replyTo: email,
      subject: `PostdocWorks waitlist signup${role ? ` — ${role}` : ""}`,
      html: `
        <div style="font-family:Arial;padding:24px">
          <h2>New waitlist signup</h2>
          <hr/>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Role:</strong> ${role || "Not specified"}</p>
          <p><strong>Source:</strong> ${source || "postdocworks"}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

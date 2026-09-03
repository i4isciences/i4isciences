import { NextResponse } from "next/server";
import { Resend } from "resend";

import { generateCode, createOtpToken } from "@/lib/otp";

const resend = new Resend(process.env.RESEND_API_KEY);

function buildEmail(studentName: string, parentEmail: string, code: string) {
  const displayName = studentName || "A student";
  return {
    subject: `${displayName} wants to join i4iSciences — your approval needed`,
    html: `
<div style="background:#F9FBFF;padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,138,0.08);">
    <tr>
      <td style="background:#0A2E8A;padding:28px 32px;text-align:center;">
        <img src="https://www.i4isciences.com/images/favicon.png" width="40" height="40" alt="i4iSciences" style="display:block;margin:0 auto 10px;border-radius:8px;" />
        <span style="color:#FFFFFF;font-size:18px;font-weight:700;letter-spacing:-0.01em;">i4iSciences</span>
      </td>
    </tr>
    <tr>
      <td style="padding:36px 32px 8px;text-align:center;">
        <h1 style="margin:0 0 12px;font-size:20px;font-weight:800;color:#10204E;">A sign-up request from your child</h1>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.65;color:rgba(16,32,78,0.68);text-align:left;">
          <strong>${displayName}</strong> has entered your email address, <strong>${parentEmail}</strong>, while creating a student account on i4iSciences — our AI education platform for tutoring, teacher training, and learning support.
        </p>
        <p style="margin:0 0 28px;font-size:14px;line-height:1.65;color:rgba(16,32,78,0.68);text-align:left;">
          Because they're under 18, we ask a parent or guardian to confirm before the account is created. <strong>If this is your child and you're happy for them to continue</strong>, share the code below with them to finish signing up:
        </p>
        <div style="display:inline-block;background:#F9FBFF;border:1.5px solid rgba(10,46,138,0.14);border-radius:12px;padding:16px 28px;margin-bottom:16px;">
          <span style="font-size:32px;font-weight:800;letter-spacing:0.28em;color:#0A2E8A;">${code}</span>
        </div>
        <p style="margin:0 0 28px;font-size:13px;color:rgba(16,32,78,0.5);">This code expires in 10 minutes and can only be used once.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 28px;text-align:left;">
        <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(16,32,78,0.55);">
          Didn't expect this, or don't recognize this request? Please don't share the code — instead, report it to us at
          <a href="mailto:manager@i4isciences.com" style="color:#0A2E8A;font-weight:700;">manager@i4isciences.com</a> and we'll look into it right away.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 32px 28px;border-top:1px solid rgba(10,46,138,0.08);text-align:center;">
        <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(16,32,78,0.45);">
          i4iSciences · AI Education Platform
        </p>
      </td>
    </tr>
  </table>
</div>`,
  };
}

export async function POST(req: Request) {
  try {
    const { email, studentName } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "A parent email address is required." }, { status: 400 });
    }

    const code = generateCode();
    const token = createOtpToken(email, code);
    const { subject, html } = buildEmail(typeof studentName === "string" ? studentName : "", email, code);

    const { error } = await resend.emails.send({
      from: "i4iSciences <verify@i4isciences.com>",
      to: [email],
      subject,
      html,
    });

    if (error) {
      console.error("parent-otp/send:", error);
      return NextResponse.json(
        { success: false, error: "We couldn't send the code. Please try again in a moment." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, token });
  } catch (err) {
    console.error("parent-otp/send:", err);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}

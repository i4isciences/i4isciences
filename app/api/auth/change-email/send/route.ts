import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { createClient } from "@/utils/supabase/server";
import { generateCode, createOtpToken } from "@/lib/otp";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildEmail(name: string, code: string) {
  return {
    subject: "Confirm your new email address",
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
        <h1 style="margin:0 0 12px;font-size:20px;font-weight:800;color:#10204E;">Confirm your new email</h1>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.65;color:rgba(16,32,78,0.68);text-align:left;">
          Hi ${name || "there"}, we received a request to change the email on your i4iSciences account to this address. Enter this code in the app to confirm it's you:
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
          Didn't request this? You can safely ignore this email — your account email won't change unless this code is entered.
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
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Please sign in again." }, { status: 401 });
    }

    const { email } = await req.json();
    if (!email || typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (email.trim().toLowerCase() === (user.email ?? "").toLowerCase()) {
      return NextResponse.json({ success: false, error: "That's already your current email." }, { status: 400 });
    }

    const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
    const fullName = typeof meta.full_name === "string" ? meta.full_name : "";

    const code = generateCode();
    const token = createOtpToken(email.trim(), code);
    const { subject, html } = buildEmail(fullName.split(" ")[0], code);

    const { error } = await resend.emails.send({
      from: "i4iSciences <verify@i4isciences.com>",
      to: [email.trim()],
      subject,
      html,
    });

    if (error) {
      console.error("change-email/send:", error);
      return NextResponse.json({ success: false, error: "We couldn't send the code. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, token });
  } catch (err) {
    console.error("change-email/send:", err);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}

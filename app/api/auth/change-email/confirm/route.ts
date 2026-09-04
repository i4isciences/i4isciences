import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { verifyOtpToken } from "@/lib/otp";

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

    const { email, token, code } = await req.json();
    if (!email || !token || !code) {
      return NextResponse.json({ success: false, error: "Missing email, token, or code." }, { status: 400 });
    }

    const result = verifyOtpToken(token, email, code);
    if (!result.valid) {
      const message = result.reason === "expired" ? "That code has expired. Please request a new one." : "That code didn't match. Please try again.";
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin.auth.admin.updateUserById(user.id, {
      email,
      email_confirm: true,
    });

    if (error) {
      console.error("change-email/confirm:", error.message);
      const message = error.message.toLowerCase().includes("already")
        ? "That email is already in use by another account."
        : "We couldn't update your email. Please try again.";
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("change-email/confirm:", err);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}

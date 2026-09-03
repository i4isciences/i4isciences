import { NextResponse } from "next/server";

import { verifyOtpToken } from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const { email, token, code } = await req.json();

    if (!email || !token || !code) {
      return NextResponse.json({ success: false, verified: false, error: "Missing email, token, or code." }, { status: 400 });
    }

    const result = verifyOtpToken(token, email, code);

    if (!result.valid) {
      const message =
        result.reason === "expired"
          ? "That code has expired. Please request a new one."
          : "That code didn't match. Please try again.";
      return NextResponse.json({ success: false, verified: false, error: message }, { status: 400 });
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (err) {
    console.error("parent-otp/verify:", err);
    return NextResponse.json({ success: false, verified: false, error: "Something went wrong." }, { status: 500 });
  }
}

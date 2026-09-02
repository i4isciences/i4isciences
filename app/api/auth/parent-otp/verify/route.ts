import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export async function POST(req: Request) {
  try {
    const { email, token } = await req.json();

    if (!email || !token) {
      return NextResponse.json({ success: false, error: "Missing email or code." }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });

    if (error) {
      console.error("parent-otp/verify:", error.message);
      return NextResponse.json({ success: false, verified: false, error: "That code didn't match. Please try again." }, { status: 400 });
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (err) {
    console.error("parent-otp/verify:", err);
    return NextResponse.json({ success: false, verified: false, error: "Something went wrong." }, { status: 500 });
  }
}

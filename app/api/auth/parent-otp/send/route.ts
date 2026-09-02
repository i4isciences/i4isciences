import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Plain (non-SSR, non-cookie-bound) client on purpose — sending/verifying the
// parent's OTP must never set a session cookie on the browser, since the
// account being created belongs to the student, not the parent.
export async function POST(req: Request) {
  try {
    const { email, studentName } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "A parent email address is required." }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        data: { student_name: typeof studentName === "string" ? studentName : "" },
      },
    });

    if (error) {
      console.error("parent-otp/send:", error.message);
      return NextResponse.json(
        { success: false, error: "We couldn't send the code. Please try again in a moment." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("parent-otp/send:", err);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}

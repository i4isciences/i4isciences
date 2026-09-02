import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function I4ICorePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  if (!user || meta.employee_system !== "i4icore") {
    redirect("/login/employee");
  }

  const fullName = typeof meta.full_name === "string" ? meta.full_name : user.email;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: "120px 24px 80px",
        background: "#F9FBFF",
        textAlign: "center",
        fontFamily: "var(--font-geist-sans), 'Geist', sans-serif",
      }}
    >
      <Image src="/images/logo.svg" alt="i4iSciences" width={48} height={48} />
      <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(16,32,78,0.5)" }}>
        I4ICore
      </span>
      <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#10204E", margin: 0 }}>
        Welcome back, {fullName}.
      </h1>
      <p style={{ maxWidth: 460, color: "rgba(16,32,78,0.65)", fontSize: "1rem", lineHeight: 1.6, margin: 0 }}>
        The employee workspace is on its way — we&apos;re still building it. Check back soon.
      </p>
      <SignOutButton redirectTo="/login/employee" />
    </main>
  );
}

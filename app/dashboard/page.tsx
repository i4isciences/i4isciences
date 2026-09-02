import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const fullName = typeof meta.full_name === "string" ? meta.full_name : user.email;
  const role = typeof meta.role === "string" ? meta.role : "member";

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
      <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#10204E", margin: 0 }}>
        Welcome back, {fullName}.
      </h1>
      <p style={{ maxWidth: 460, color: "rgba(16,32,78,0.65)", fontSize: "1rem", lineHeight: 1.6, margin: 0 }}>
        Your {role} dashboard is on its way — we&apos;re still building it. Check back soon.
      </p>
      <SignOutButton />
    </main>
  );
}

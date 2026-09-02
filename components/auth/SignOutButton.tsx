"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export default function SignOutButton({ redirectTo = "/login" }: { redirectTo?: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      style={{
        marginTop: 8,
        padding: "10px 26px",
        borderRadius: 999,
        background: "rgba(10,46,138,0.06)",
        border: "1px solid rgba(10,46,138,0.18)",
        fontFamily: "var(--font-geist-sans), 'Geist', sans-serif",
        fontSize: "0.9rem",
        fontWeight: 600,
        color: "#0A2E8A",
        cursor: "pointer",
      }}
    >
      Sign out
    </button>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import DashboardNav from "./DashboardNav";
import AmbientBackground from "./AmbientBackground";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const fullName = typeof meta.full_name === "string" ? meta.full_name : (user.email ?? "there");
  const avatarUrl = typeof meta.avatar_url === "string" ? meta.avatar_url : null;
  const gender = typeof meta.gender === "string" ? meta.gender : null;

  return (
    <div style={{ minHeight: "100vh", background: "#fbfbfd" }}>
      <AmbientBackground />
      <DashboardNav fullName={fullName} email={user.email ?? ""} avatarUrl={avatarUrl} gender={gender} />
      <main style={{ paddingTop: 64, position: "relative", zIndex: 1 }}>{children}</main>
    </div>
  );
}

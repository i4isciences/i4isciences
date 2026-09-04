import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import DashboardHome from "./DashboardHome";

export default async function DashboardHomePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const fullName = typeof meta.full_name === "string" ? meta.full_name : (user?.email ?? "there");
  const role = typeof meta.role === "string" ? meta.role : "member";

  return <DashboardHome fullName={fullName} role={role} />;
}

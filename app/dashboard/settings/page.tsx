import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import SettingsView from "./SettingsView";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;

  return (
    <SettingsView
      userId={user.id}
      email={user.email ?? ""}
      fullName={typeof meta.full_name === "string" ? meta.full_name : ""}
      username={typeof meta.username === "string" ? meta.username : ""}
      bio={typeof meta.bio === "string" ? meta.bio : ""}
      phone={typeof meta.phone === "string" ? meta.phone : ""}
      country={typeof meta.country === "string" ? meta.country : "US"}
      gender={typeof meta.gender === "string" ? meta.gender : ""}
      classGrade={typeof meta.class_grade === "string" ? meta.class_grade : ""}
      avatarUrl={typeof meta.avatar_url === "string" ? meta.avatar_url : null}
      role={typeof meta.role === "string" ? meta.role : ""}
    />
  );
}

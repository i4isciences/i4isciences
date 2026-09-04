"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Password reset now lands on /login directly, which detects the recovery
// session itself. This redirect only exists for links already sent out
// pointing at the old /reset-password destination.
export default function ResetPasswordRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/login${window.location.search}${window.location.hash}`);
  }, [router]);

  return null;
}

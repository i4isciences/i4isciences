import type { NextRequest } from "next/server";

import { createClient } from "@/utils/middleware";

export async function proxy(request: NextRequest) {
  return await createClient(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

import type { Metadata } from "next";

import LegalDocument from "@/components/legal/LegalDocument";
import { privacyPolicyContent } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how i4iSciences collects, uses, and protects personal information.",
  alternates: {
    canonical: "https://www.i4isciences.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalDocument {...privacyPolicyContent} />;
}

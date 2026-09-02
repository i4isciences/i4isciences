import type { Metadata } from "next";

import LegalDocument from "@/components/legal/LegalDocument";
import { termsOfServiceContent } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the i4iSciences website and services.",
  alternates: {
    canonical: "https://www.i4isciences.com/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return <LegalDocument {...termsOfServiceContent} />;
}

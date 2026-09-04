import { BookOpen } from "lucide-react";

import ComingSoon from "../ComingSoon";

export default function ResourcesPage() {
  return (
    <ComingSoon
      icon={<BookOpen size={28} />}
      title="Resources"
      description="A library of study guides, practice materials, and reference tools is on its way."
    />
  );
}

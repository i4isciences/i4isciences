import { CalendarDays } from "lucide-react";

import ComingSoon from "../ComingSoon";

export default function CalendarPage() {
  return (
    <ComingSoon
      icon={<CalendarDays size={28} />}
      title="Calendar"
      description="Track your upcoming sessions, classes, and important dates here soon."
      accentColor="#0891b2"
    />
  );
}

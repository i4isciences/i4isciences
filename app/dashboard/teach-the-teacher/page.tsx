import ServiceStub from "../ServiceStub";
import { DASHBOARD_SERVICES } from "../services-data";

export default function Page() {
  return <ServiceStub service={DASHBOARD_SERVICES.find((s) => s.slug === "teach-the-teacher")!} />;
}

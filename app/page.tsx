import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Ecosystems from "@/components/home/Ecosystems";
import PlatformOverview from "@/components/home/PlatformOverview";
import RoleBasedExperience from '@/components/home/RoleExperience';
import AIfeatures from "@/components/home/AIFeatures";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/Testimonials";
import EnterprisePartnershipSection from "@/components/home/Partnerships";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Ecosystems />
      <PlatformOverview />
      <RoleBasedExperience />
      <AIfeatures />
      <HowItWorks />
      <TestimonialsSection />
      <EnterprisePartnershipSection />
      <FinalCTA />

    </main>
  );
}
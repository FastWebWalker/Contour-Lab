import { Hero } from "@/components/Hero";
import { IconsSection } from "@/components/IconsSection";
import { OurServicesSection } from "@/components/OurServicesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";

export default function Home() {
  return (
    <>
      <Hero />
      <IconsSection />
      <WhyChooseSection />
      <OurServicesSection />
      <main id="content" className="min-h-[50vh]" />
    </>
  );
}

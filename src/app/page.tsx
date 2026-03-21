import { Hero } from "@/components/Hero";
import { IconsSection } from "@/components/IconsSection";
import { OurServicesSection } from "@/components/OurServicesSection";
import { OurGallerySection } from "@/components/OurGallerySection";
import { OurTeamSection } from "@/components/OurTeamSection";
import { FutureIsHereSection } from "@/components/FutureIsHereSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";

export default function Home() {
  return (
    <>
      <Hero />
      <IconsSection />
      <WhyChooseSection />
      <OurServicesSection />
      <OurGallerySection />
      <OurTeamSection />
      <FutureIsHereSection />
      <main id="content" className="min-h-[50vh]" />
    </>
  );
}

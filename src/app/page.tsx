import { Hero } from "@/components/Hero";
import { IconsSection } from "@/components/IconsSection";
import { OurServicesSection } from "@/components/OurServicesSection";
import { OurGallerySection } from "@/components/OurGallerySection";
import { OurTeamSection } from "@/components/OurTeamSection";
import { FutureIsHereSection } from "@/components/FutureIsHereSection";
import { PrecisionQualitySection } from "@/components/PrecisionQualitySection";
import { WhatOurClientsSaySection } from "@/components/WhatOurClientsSaySection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import {
  homeHeroTitle,
  homeHeroSubtitle,
  homeHeroImage,
  homeHeroButtons,
  homeHeroStats,
  homeHeroSocialLinks,
} from "@/components/hero/homeHeroData";


export default function Home() {
  return (
    <>
      <Hero
        titleContent={homeHeroTitle}
        subtitle={homeHeroSubtitle}
        heroImage={homeHeroImage}
        showButtons
        buttons={homeHeroButtons}
        showStats
        stats={homeHeroStats}
        showSocialLinks
        socialLinks={homeHeroSocialLinks}
      />
      <IconsSection />
      <WhyChooseSection />
      <OurServicesSection />
      <OurGallerySection />
      <OurTeamSection />
      <FutureIsHereSection />
      <PrecisionQualitySection />
      <WhatOurClientsSaySection />
      <main id="content" className="min-h-[50vh]" />
    </>
  );
}

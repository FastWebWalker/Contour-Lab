import { Hero } from "@/components/Hero";
import { IconsSection } from "@/components/sections/IconsSection";
import { OurServicesSection } from "@/components/sections/OurServicesSection";
import { OurGallerySection } from "@/components/sections/OurGallerySection";
import { OurTeamSection } from "@/components/sections/OurTeamSection";
import { FutureIsHereSection } from "@/components/sections/FutureIsHereSection";
import { PrecisionQualitySection } from "@/components/sections/PrecisionQualitySection";
import { WhatOurClientsSaySection } from "@/components/sections/WhatOurClientsSaySection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";
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
      <QuestionMapFormSection />
      <main id="content" />
    </>
  );
}

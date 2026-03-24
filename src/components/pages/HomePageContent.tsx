"use client";

import * as React from "react";
import { Hero } from "@/components/sections/Hero";
import { IconsSection } from "@/components/sections/IconsSection";
import { OurServicesSection } from "@/components/sections/OurServicesSection";
import { OurGallerySection } from "@/components/sections/OurGallerySection";
import { OurTeamSection } from "@/components/sections/OurTeamSection";
import { FutureIsHereSection } from "@/components/sections/FutureIsHereSection";
import { PrecisionQualitySection } from "@/components/sections/PrecisionQualitySection";
import { WhatOurClientsSaySection } from "@/components/sections/WhatOurClientsSaySection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";
import { PriceFormModal } from "@/components/modals/PriceFormModal";
import {
  homeHeroTitle,
  homeHeroSubtitle,
  homeHeroImage,
  homeHeroButtons,
  homeHeroStats,
  homeHeroSocialLinks,
} from "@/components/hero/homeHeroData";

export function HomePageContent() {
  const [priceModalOpen, setPriceModalOpen] = React.useState(false);
  const openPriceModal = React.useCallback(() => setPriceModalOpen(true), []);

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
        onPrimaryCtaClick={openPriceModal}
        onOutlineCtaClick={openPriceModal}
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
      <PriceFormModal
        open={priceModalOpen}
        onClose={() => setPriceModalOpen(false)}
      />
    </>
  );
}

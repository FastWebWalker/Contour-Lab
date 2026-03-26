"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
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
  homeHeroImage,
  homeHeroSocialLinks,
} from "@/components/hero/homeHeroData";

export function HomePageContent() {
  const t = useTranslations("homeHero");
  const [priceModalOpen, setPriceModalOpen] = React.useState(false);
  const openPriceModal = React.useCallback(() => setPriceModalOpen(true), []);

  const homeHeroTitle = (
    <>
      {t("titleLine1")}
      <br />
      {t("titleLine2")}{" "}
      <span style={{ color: "var(--color-red-main)" }}>{t("titleAccent")}</span>
    </>
  );

  const homeHeroButtons = [
    { label: t("order"), href: "#order", variant: "primary" as const },
    { label: t("price"), href: "#price", variant: "outline" as const },
  ];

  const homeHeroStats = [
    { value: "600", label: t("statClients") },
    { value: "5,000", label: t("statCases") },
  ];

  return (
    <>
      <Hero
        titleContent={homeHeroTitle}
        subtitle={t("subtitle")}
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

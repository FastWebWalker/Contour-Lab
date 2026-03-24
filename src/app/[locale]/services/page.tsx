"use client";

import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { IconsSection } from "@/components/sections/IconsSection";
import { ServicesListSection } from "@/components/sections/ServicesListSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";
import { WhatOurClientsSaySection } from "@/components/sections/WhatOurClientsSaySection";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";

const servicesHeroImage = "/hero/image 151.png";

export default function ServicesPage() {
  const t = useTranslations("servicesPage");
  const servicesHeroTitle = (
    <>
      {t("titleBefore")}
      <br />
      <span style={{ color: "var(--color-red-main)" }}>{t("titleAccent")}</span>
    </>
  );

  return (
    <>
      <Hero
        titleContent={servicesHeroTitle}
        subtitle={t("subtitle")}
        heroImage={servicesHeroImage}
        showButtons={false}
        showStats={false}
        showSocialLinks={true}
        socialLinks={homeHeroSocialLinks}
      />
      <IconsSection />
      <ServicesListSection />
      <AdvantagesSection />
      <WhatOurClientsSaySection />
      <QuestionMapFormSection />
    </>
  );
}

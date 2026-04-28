"use client";

import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";
import { BlogCardsSection } from "@/components/sections/BlogCardsSection";

const blogHeroImage = "/hero/photo hero other.png";

export default function BlogPage() {
  const t = useTranslations("blogPage");
  const blogHeroTitle = (
    <>
      {t("titleBefore")}{" "}
      <span style={{ color: "var(--color-red-main)" }}>{t("titleAccent")}</span>
    </>
  );

  return (
    <>
      <Hero
        titleContent={blogHeroTitle}
        subtitle={t("subtitle")}
        heroImage={blogHeroImage}
        showButtons={false}
        showStats={false}
        showSocialLinks={true}
        socialLinks={homeHeroSocialLinks}
      />
      <BlogCardsSection />
      <QuestionMapFormSection />
    </>
  );
}

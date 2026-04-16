import { getTranslations } from "next-intl/server";
import { CVFormSection } from "@/components/CVFormSection";

import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";
import { VacanciesJobsSection } from "@/components/sections/VacanciesJobsSection";
import { Hero } from "@/components/sections/Hero";
import { homeHeroImage } from "@/components/hero/homeHeroData";

export default async function VacanciesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vacanciesPage" });

  const vacanciesHeroTitle = (
    <>
      {t("titleBefore")} <br />
      <span style={{ color: "var(--color-red-main)" }}>{t("titleAccent")}</span>
    </>
  );

  return (
    <>
      <Hero
        titleContent={vacanciesHeroTitle}
        subtitle={t("subtitle")}
        heroImage={homeHeroImage}
        showSocialLinks
        socialLinks={homeHeroSocialLinks}
      />
      <main id="content" className="w-full">
        <VacanciesJobsSection />
        <CVFormSection id="apply-job-form" />
      </main>
    </>
  );
}

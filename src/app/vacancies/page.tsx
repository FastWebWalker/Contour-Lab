import { CVFormSection } from "@/components/CVFormSection";

import {
  vacanciesHeroTitle,
  vacanciesHeroSubtitle,
  vacanciesHeroImage,
} from "@/components/hero/vacanciesHeroData";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";
import { VacanciesJobsSection } from "@/components/sections/VacanciesJobsSection";
import { Hero } from "@/components/sections/Hero";

export default function VacanciesPage() {
  return (
    <>
      <Hero
        titleContent={vacanciesHeroTitle}
        subtitle={vacanciesHeroSubtitle}
        heroImage={vacanciesHeroImage}
        showSocialLinks
        socialLinks={homeHeroSocialLinks}
      />
      <main id="content" className="w-full">
        <VacanciesJobsSection />
        <CVFormSection />
      </main>
    </>
  );
}

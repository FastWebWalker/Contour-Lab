import { CVFormSection } from "@/components/CVFormSection";
import { Hero } from "@/components/Hero";
import { VacanciesJobsSection } from "@/components/VacanciesJobsSection";
import {
  vacanciesHeroTitle,
  vacanciesHeroSubtitle,
  vacanciesHeroImage,
} from "@/components/hero/vacanciesHeroData";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";

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

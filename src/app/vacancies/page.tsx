import { Hero } from "@/components/sections/Hero";
import { VacanciesJobsSection } from "@/components/sections/VacanciesJobsSection";
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
      </main>
    </>
  );
}

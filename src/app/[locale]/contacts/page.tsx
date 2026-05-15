import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";
import { ContactsInfoGridSection } from "@/components/sections/ContactsInfoGridSection";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";

const contactsHeroImage = "/hero/photo hero other.png";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactsPage" });

  const contactsHeroTitle = (
    <>
      {t("titleLine1")} <br /> {t("titleLine2")} <br />
      <span style={{ color: "var(--color-red-main)" }}>{t("titleAccent")}</span>
    </>
  );

  return (
    <>
      <Hero
        titleContent={contactsHeroTitle}
        subtitle={t("subtitle")}
        heroImage={contactsHeroImage}
        heroImageContainerClassName="lg:-bottom-[30px]"
        showButtons={false}
        showStats={false}
        showSocialLinks
        socialLinks={homeHeroSocialLinks}
        socialLinksClassName="lg:-mt-[calc(clamp(40px,6.25vw+20px,110px)*0.91)]"
      />
      <main id="content" className="w-full">
        <ContactsInfoGridSection />
        <QuestionMapFormSection />
      </main>
    </>
  );
}

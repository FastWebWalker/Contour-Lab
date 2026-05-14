import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { GalleryTabSection } from "@/components/sections/GalleryTabSection";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";
import { readGalleryManifest } from "@/lib/galleryManifest";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";

const galleryHeroImage = "/hero/" + encodeURIComponent("photo hero other.png");

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "galleryPage" });
  const manifest = readGalleryManifest();


  const galleryHeroTitle = (
    <>
      {t("titleLine1")}
      <br />
      <span style={{ color: "var(--color-red-main)" }}>{t("titleAccent")}</span>
    </>
  );

  return (
    <>
      <Hero
        titleContent={galleryHeroTitle}
        subtitle={t("subtitle")}
        heroImage={galleryHeroImage}
        heroImageContainerClassName="lg:-bottom-[30px]"
        showButtons={false}
        showStats={false}
        showSocialLinks={true}
        socialLinks={homeHeroSocialLinks}
      />
      <main id="content" className="w-full pb-16 md:pb-20">
        <GalleryTabSection manifest={manifest} />
        <QuestionMapFormSection />
      </main>
    </>
  );
}

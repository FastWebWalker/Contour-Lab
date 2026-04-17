import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { GalleryTabSection } from "@/components/sections/GalleryTabSection";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";
import { readGalleryManifest } from "@/lib/galleryManifest";

const galleryHeroImage = "/hero/" + encodeURIComponent("image 151.png");

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "galleryPage" });
  const manifest = readGalleryManifest();
  console.log(manifest);

  const galleryHeroTitle = (
    <>
      {t("titleLine1")}
      <br />
      <span style={{ color: "var(--color-red-main)" }}>{t("titleLine2")}</span>
    </>
  );

  return (
    <>
      <Hero
        titleContent={galleryHeroTitle}
        subtitle={t("subtitle")}
        heroImage={galleryHeroImage}
        showButtons={false}
        showStats={false}
        showSocialLinks={false}
      />
      <main id="content" className="w-full pb-16 md:pb-20">
        <GalleryTabSection manifest={manifest} />
        <QuestionMapFormSection />
      </main>
    </>
  );
}

import { Hero } from "@/components/sections/Hero";
import {
  galleryHeroTitle,
  galleryHeroSubtitle,
  galleryHeroImage,
} from "@/components/hero/galleryHeroData";
import { GalleryTabSection } from "@/components/sections/GalleryTabSection";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";
import { readGalleryManifest } from "@/lib/galleryManifest";

export default function GalleryPage() {
  const manifest = readGalleryManifest();

  return (
    <>
      <Hero
        titleContent={galleryHeroTitle}
        subtitle={galleryHeroSubtitle}
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

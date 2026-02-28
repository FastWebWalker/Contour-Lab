import { Hero } from "@/components/Hero";
import { IconsSection } from "@/components/IconsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <IconsSection />
      <main id="content" className="min-h-[50vh]" />
    </>
  );
}

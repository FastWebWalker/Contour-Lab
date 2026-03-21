"use client";

import { Hero } from "@/components/Hero";
import { IconsSection } from "@/components/IconsSection";
import { OurServicesSection } from "@/components/OurServicesSection";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";

const servicesHeroTitle = (
    <>
        Більше про
        <br />
        <span style={{ color: "var(--color-red-main)" }}>наші послуги</span>
    </>
);

const servicesHeroSubtitle =
    "У вас є питання? Ми готові відповісти на них і допомогти вам з будь-яким запитом!";

const servicesHeroImage = "/hero/image 151.png";

export default function ServicesPage() {
    return (
        <>
            <Hero
                titleContent={servicesHeroTitle}
                subtitle={servicesHeroSubtitle}
                heroImage={servicesHeroImage}
                showButtons={false}
                showStats={false}
                showSocialLinks={true}
                socialLinks={homeHeroSocialLinks}
            />
            <IconsSection />
            <OurServicesSection />
        </>
    );
}

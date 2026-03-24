"use client";

import { Hero } from "@/components/sections/Hero";
import { IconsSection } from "@/components/sections/IconsSection";
import { ServicesListSection } from "@/components/sections/ServicesListSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";
import { WhatOurClientsSaySection } from "@/components/sections/WhatOurClientsSaySection";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";

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
            <ServicesListSection />
            <AdvantagesSection />
            <WhatOurClientsSaySection />
            <QuestionMapFormSection />
        </>
    );
}

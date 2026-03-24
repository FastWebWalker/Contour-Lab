"use client";

import { Hero } from "@/components/sections/Hero";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";
import { ContactsInfoGridSection } from "@/components/sections/ContactsInfoGridSection";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";

const contactsHeroTitle = (
    <>
        Залишайтеся <br /> на зв'язку <br />
        <span style={{ color: "var(--color-red-main)" }}>з нами</span>
    </>
);

const contactsHeroSubtitle =
    "У вас є питання? Ми готові відповісти на них і допомогти вам з будь-яким запитом!";

const contactsHeroImage = "/hero/image 151.png";

export default function ContactsPage() {
    return (
        <>
            <Hero
                titleContent={contactsHeroTitle}
                subtitle={contactsHeroSubtitle}
                heroImage={contactsHeroImage}
                showButtons={false}
                showStats={false}
                showSocialLinks={true}
                socialLinks={homeHeroSocialLinks}
            />
            <ContactsInfoGridSection />
            <QuestionMapFormSection />
        </>
    );
}

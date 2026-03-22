"use client";

import { Hero } from "@/components/sections/Hero";
import { homeHeroSocialLinks } from "@/components/hero/homeHeroData";
import { QuestionMapFormSection } from "@/components/sections/QuestionMapFormSection";

const blogHeroTitle = (
    <>
        Наш
        <span style={{ color: "var(--color-red-main)" }}> Блог</span>
    </>
);

const blogHeroSubtitle =
    "Дізнавайтеся про останні новини нашої компанії, читаючи наш блог та розсилку!";

const blogHeroImage = "/hero/image 151.png";

export default function BlogPage() {
    return (
        <>
            <Hero
                titleContent={blogHeroTitle}
                subtitle={blogHeroSubtitle}
                heroImage={blogHeroImage}
                showButtons={false}
                showStats={false}
                showSocialLinks={true}
                socialLinks={homeHeroSocialLinks}
            />
            <QuestionMapFormSection />
        </>
    );
}

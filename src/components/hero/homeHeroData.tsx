import type { HeroButton, StatItem, SocialLink } from "../sections/Hero";

export const homeHeroTitle = (
    <>
        Цифрова зуботехнічна
        <br />
        лабораторія{" "}
        <span style={{ color: "var(--color-red-main)" }}>CONTOUR</span>
    </>
);

export const homeHeroSubtitle =
    "Зробіть своє перше замовлення та отримайте тимчасову конструкцію на спеціальних умовах!";

export const homeHeroImage =
    "/hero/" + encodeURIComponent("ChatGPT Image 16 вер. 2025 р., 14_28_11 2.png");

export const homeHeroButtons: HeroButton[] = [
    { label: "Зробити замовлення", href: "#order", variant: "primary" },
    { label: "Завантажити Прайс", href: "#price", variant: "outline" },
];

export const homeHeroStats: StatItem[] = [
    { value: "600", label: "дуже задоволених клієнтів" },
    { value: "5,000", label: "успішно завершених кейсів" },
];

export const homeHeroSocialLinks: SocialLink[] = [
    { href: "mailto:info@contour-lab.com", src: "/hero/mail.svg", label: "Email" },
    { href: "https://facebook.com", src: "/hero/Social Icons.svg", label: "Facebook" },
    { href: "https://instagram.com", src: "/hero/Social Icons2.svg", label: "Instagram" },
];

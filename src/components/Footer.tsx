"use client";

import Link from "next/link";
import { Container } from "./Container";
import { SecondaryButton } from "./Button";
import { FacebookIcon } from "./icons/Facebook";
import { InstagramIcon } from "./icons/Instagram";

const footerLinks = [
  { href: "#about", label: "Про Нас" },
  { href: "#services", label: "Послуги" },
  { href: "/vacancies", label: "Вакансії" },
  { href: "#gallery", label: "Галерея" },
  { href: "#blog", label: "Блог" },
];

export function Footer() {
  return (
    <div className="m-5 mt-auto">
      <footer
        className="overflow-hidden"
        style={{
          background: "var(--footer-gradient)",
          borderRadius: 50,
        }}
      >
      <Container className="py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: Logo, tagline, socials */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link href="/" className="w-fit">
              <img
                src="/logo-light.svg"
                alt="Contour dental laboratory"
                width={174}
                height={69}
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </Link>
            <p
              className="text-base lg:text-lg leading-relaxed max-w-xs"
              style={{
                color: "white",
                fontFamily: "var(--font-sans)",
              }}
            >
              Контроль над функцією та естетикою.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center text-white bg-transparent hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center text-white bg-transparent hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Right: Nav, CTA text, button */}
          <div className="lg:col-span-7 flex flex-col gap-5 lg:items-end">
            <nav className="flex flex-wrap gap-2">
              {footerLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2.5 rounded-full text-[15px] font-medium border border-white text-white bg-transparent hover:bg-white/10 transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <p
              className="text-[15px] leading-relaxed max-w-lg lg:text-right"
              style={{
                color: "white",
                fontFamily: "var(--font-sans)",
              }}
            >
              Ми раді, коли ви задоволені, і завжди хочемо почути, якщо щось
              пішло не так, як очікувалося.
            </p>
            <SecondaryButton size="md">
              Зв&apos;язатися
            </SecondaryButton>
          </div>
        </div>

        <div
          className=" pt-6 text-center text-[13px]"
          style={{
            color: "rgba(255,255,255,0.95)",
            fontFamily: "var(--font-sans)",
          }}
        >
          © Contour Lab 2025. All Times Reserved
        </div>
      </Container>
    </footer>
    </div>
  );
}

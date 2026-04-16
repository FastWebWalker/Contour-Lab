"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container } from "../ui/Container";
import { SecondaryButton } from "../ui/Button";
import { FacebookIcon } from "../icons/Facebook";
import { InstagramIcon } from "../icons/Instagram";
import {
  fadeUpVariants,
  staggerContainerVariants,
  sectionViewport,
} from "@/lib/motion";

const FOOTER_LINKS = [
  { href: "/#about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/vacancies", key: "vacancies" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/blog", key: "blog" as const },
] as const;

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const reduced = useReducedMotion() ?? false;

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
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12"
            variants={staggerContainerVariants(reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport({ amount: 0.3 })}
          >
            {/* Left: Logo, tagline, socials */}
            <motion.div variants={fadeUpVariants(reduced)} className="lg:col-span-5 flex flex-col gap-5">
              <Link href="/" className="w-fit">
                <img
                  src="/logo-light.svg"
                  alt="Contour dental laboratory"
                  width={174}
                  height={69}
                  className="h-12 lg:h-14 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <p
                className="text-base lg:text-lg leading-relaxed max-w-xs"
                style={{
                  color: "white",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {tFooter("tagline")}
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
            </motion.div>

            {/* Right: Nav, CTA text, button */}
            <motion.div variants={fadeUpVariants(reduced)} className="lg:col-span-7 flex flex-col gap-5 lg:items-end">
              <nav className="flex flex-wrap gap-2">
                {FOOTER_LINKS.map(({ href, key }) => (
                  <Link
                    key={href}
                    href={href}
                    className="px-4 py-2.5 rounded-full text-[15px] font-medium border border-white text-white bg-transparent hover:bg-white/10 transition-colors"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {tNav(key)}
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
                {tFooter("ctaText")}
              </p>
              <SecondaryButton size="md">{tFooter("contact")}</SecondaryButton>
            </motion.div>
          </motion.div>

          <motion.div
            className=" pt-6 text-center text-[13px]"
            style={{
              color: "rgba(255,255,255,0.95)",
              fontFamily: "var(--font-sans)",
            }}
            variants={fadeUpVariants(reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport({ amount: 0.3 })}
          >
            {tFooter("copyright")}
          </motion.div>
        </Container>
      </footer>
    </div>
  );
}

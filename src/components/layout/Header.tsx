"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Container } from "../ui/Container";
import { Logo } from "../layout/header/Logo";
import { NavLink } from "../layout/header/NavLink";
import { LanguageSelector } from "../layout/header/LanguageSelector";
import { OutlineLightButton } from "../ui/Button";
import { BurgerToCloseIcon } from "../icons/BurgerToClose";

const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/services", key: "services" as const },
  { href: "/vacancies", key: "vacancies" as const },
  { href: "/contacts", key: "contacts" as const },
  { href: "/gallery", key: "gallery" as const },
] as const;

const MOBILE_NAV_LINKS = [
  ...NAV_LINKS,
  { href: "/blog", key: "blog" as const },
] as const;

const SCROLL_THRESHOLD = 1;

const LG_BREAKPOINT = 1024;

export function Header() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBelowLg, setIsBelowLg] = useState(true);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById("contact-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= SCROLL_THRESHOLD);
    onScroll(); // init
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsBelowLg(window.innerWidth < LG_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [menuOpen]);

  const headerBg =
    isBelowLg
      ? menuOpen
        ? "transparent"
        : "var(--color-header-bg)"
      : scrolled
        ? "var(--color-header-bg)"
        : "transparent";

  return (
    <>
      <header
        className={`sticky z-[9999] w-full transition-all duration-200 py-2 lg:py-0 ${!isBelowLg && !scrolled ? "lg:top-5" : "top-0"}`}
        style={{ backgroundColor: headerBg }}
      >
        {/* padding-x: 16 / 32 / 60 px (mobile / tablet / desktop); padding-y на header */}
        <div className="h-11 md:h-[65px] lg:h-20 flex items-center justify-between gap-4 lg:gap-6 xl:gap-8 px-4 md:px-8 lg:px-[60px] w-full">
          {/* Лого ховаємо при відкритому burger menu (тільки на tablet/mobile) */}
          {menuOpen && isBelowLg ? (
            <div className="flex-1 min-w-0" aria-hidden />
          ) : (
            <Logo />
          )}

          {/* Tablet (lg) + Desktop: nav with adaptive gap; transparent bg at scroll 0 */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-[20px]">
            {NAV_LINKS.map(({ href, key }) => {
              const active = !href.includes("#") && pathname === href;
              return (
                <NavLink
                  key={href}
                  href={href}
                  className={[
                    !scrolled
                      ? "!bg-transparent !border-black/10 hover:!border-black/20 hover:!bg-black/5"
                      : "",
                    active ? "!bg-[#ebebeb] !border-[#d0d0d0]" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {tNav(key)}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <LanguageSelector transparent={!scrolled} />
            <OutlineLightButton
              size="sm"
              onClick={scrollToContact}
            >
              {tCommon("contact")}
            </OutlineLightButton>
          </div>

          {/* Tablet: burger ↔ close with morph animation (below lg) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 -m-2 rounded-full text-[var(--color-black)] hover:bg-black/5 transition-colors flex items-center justify-center"
            aria-label={menuOpen ? tCommon("closeMenu") : tCommon("openMenu")}
            aria-expanded={menuOpen}
          >
            <BurgerToCloseIcon open={menuOpen} size={44} />
          </button>
        </div>
      </header>

      {/* Tablet overlay menu — рендеримо тільки на екранах < lg, щоб не блокувати кліки на desktop */}
      {isBelowLg && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tCommon("menu")}
          className="fixed inset-0 z-[80] overflow-hidden"
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        >
          {/* Sliding container: 100dvh to respect browser chrome on real devices */}
          <div
            className="absolute left-0 w-full flex flex-col transition-[top] duration-300 ease-out z-10"
            style={{
              height: '100dvh',
              top: menuOpen ? 0 : '-100%',
              backgroundColor: '#F8F8F8',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Backdrop full screen */}
            <div
              className="absolute inset-0 "
              onClick={closeMenu}
              aria-hidden
            />
            {/* Panel content (same layer, full size) */}
            <div className="absolute inset-0 flex flex-col overflow-hidden">
              {/* Left logo: mobile 117×207, tablet+ 179.831×415. Mobile позиція: left-[…] top-[…]; tablet+: md:left-[-3%] md:top-1/2 */}
              <div
                className="absolute pointer-events-none flex items-center justify-center -translate-y-1/2 w-[140px] h-[248px] min-[500px]:w-[216px] min-[500px]:h-[498px] left-[-6%] top-[18%] min-[500px]:left-[-3%] min-[500px]:top-[46%]"
              >
                <Image
                  src="/hero/LogoMenu.svg"
                  alt=""
                  width={180}
                  height={415}
                  className="w-full h-full object-contain object-center"
                  aria-hidden
                />
              </div>
              {/* Right logo: mobile 145×58, tablet+ 204×204. Mobile позиція: left-[…] top-[…]; tablet+: md:left-[80%] md:top-[70%] */}
              <div
                className="absolute pointer-events-none w-[174px] h-[70px] min-[500px]:w-[245px] min-[500px]:h-[245px] left-[70%] top-[74%] min-[500px]:left-[80%] min-[500px]:top-[74%]"
              >
                <Image
                  src="/hero/Group.svg"
                  alt=""
                  width={204}
                  height={205}
                  className="w-full h-full object-contain object-right object-bottom"
                  aria-hidden
                />
              </div>

              {/* Контейнер для контенту меню — uses clamp with dvh for adaptive spacing */}
              <Container
                className="relative flex flex-1 flex-col items-center justify-center min-h-0 overflow-hidden"
                style={{ paddingTop: 'clamp(16px, 2dvh, 24px)', paddingBottom: 'clamp(24px, 5dvh, 48px)', marginTop: 'clamp(40px, 7dvh, 56px)' }}
              >
                {/* LanguageSelector, nav, button — adaptive to viewport */}
                <div className="flex flex-col justify-between items-center w-full flex-1 min-h-0" style={{ gap: 'clamp(8px, 2dvh, 20px)' }}>
                  <div className="flex justify-center shrink-0">
                    <LanguageSelector />
                  </div>
                  <nav className="flex flex-col items-center overflow-y-auto min-h-0 flex-1 justify-center w-full" style={{ gap: 'clamp(8px, 1.5dvh, 16px)' }}>
                    {MOBILE_NAV_LINKS.map(({ href, key }) => {
                      const active = !href.includes("#") && pathname === href;
                      return (
                        <NavLink
                          key={href}
                          href={href}
                          className={[
                            "text-center border-[#d9d9d9] bg-[#ebebeb] hover:border-[#d0d0d0] hover:bg-[#e5e5e5] shrink-0",
                            active ? "!border-[#B9040F]" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          style={{ padding: 'clamp(8px, 1.2dvh, 16px) clamp(16px, 3dvh, 24px)', fontSize: 'clamp(14px, 2dvh, 18px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={closeMenu}
                        >
                          {tNav(key)}
                        </NavLink>
                      );
                    })}
                  </nav>
                  <div className="flex justify-center shrink-0 mb-10">
                    <OutlineLightButton
                      size="md"
                      className="min-w-[200px]"
                      style={{ height: 'clamp(40px, 6dvh, 56px)', fontSize: 'clamp(14px, 2dvh, 18px)' }}
                      onClick={() => {
                        closeMenu();
                        setTimeout(scrollToContact, 350);
                      }}
                    >
                      {tCommon("contact")}
                    </OutlineLightButton>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

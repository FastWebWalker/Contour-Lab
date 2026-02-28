"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Container } from "./Container";
import { Logo } from "./header/Logo";
import { NavLink } from "./header/NavLink";
import { LanguageSelector } from "./header/LanguageSelector";
import { OutlineLightButton } from "./Button";
import { BurgerToCloseIcon } from "./icons/BurgerToClose";

const navLinks = [
  { href: "#general", label: "Головна" },
  { href: "#services", label: "Послуги" },
  { href: "#vacancies", label: "Вакансії" },
  { href: "#contacts", label: "Контакти" },
  { href: "#gallery", label: "Галерея" },
];

const SCROLL_THRESHOLD = 1;

const LG_BREAKPOINT = 1024;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBelowLg, setIsBelowLg] = useState(true);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

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
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
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
        {/* mobile: h-44px (px 16 from Container) | tablet: h-65px (px 32 from Container) | desktop: h-20 */}
        <Container className="h-11 md:h-[65px] lg:h-20 flex items-center justify-between gap-4 lg:gap-6 xl:gap-8">
          {/* Лого ховаємо при відкритому burger menu (тільки на tablet/mobile) */}
          {menuOpen && isBelowLg ? (
            <div className="flex-1 min-w-0" aria-hidden />
          ) : (
            <Logo />
          )}

          {/* Tablet (lg) + Desktop: nav with adaptive gap; transparent bg at scroll 0 */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-[20px]">
            {navLinks.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                className={
                  !scrolled
                    ? "!bg-transparent !border-black/10 hover:!border-black/20 hover:!bg-black/5"
                    : undefined
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <LanguageSelector transparent={!scrolled} />
            <OutlineLightButton
              size="sm"
              className={
                !scrolled
                  ? "!bg-transparent !border-[var(--color-red-main)] hover:!bg-black/5"
                  : undefined
              }
            />
          </div>

          {/* Tablet: burger ↔ close with morph animation (below lg) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 -m-2 rounded-full text-[var(--color-black)] hover:bg-black/5 transition-colors flex items-center justify-center"
            aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={menuOpen}
          >
            <BurgerToCloseIcon open={menuOpen} size={44} />
          </button>
        </Container>
      </header>

      {/* Tablet overlay menu — рендеримо тільки на екранах < lg, щоб не блокувати кліки на desktop */}
      {isBelowLg && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        className="fixed inset-0 z-[80] overflow-hidden"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        {/* Sliding container: 100%×100%, top -100% when closed, top 0 when open */}
        <div
          className="absolute left-0 w-full h-full flex flex-col transition-[top] duration-300 ease-out z-10"
          style={{
            top: menuOpen ? 0 : "-100%",
            backgroundColor: "#F8F8F8",
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
              className="absolute pointer-events-none flex items-center justify-center -translate-y-1/2 w-[117.001px] h-[207px] md:w-[179.831px] md:h-[415px] left-[-3%] top-1/2 md:left-[-3%] md:top-1/2"
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
              className="absolute pointer-events-none w-[145px] h-[58px] md:w-[204px] md:h-[204px] left-[80%] top-[70%] md:left-[80%] md:top-[70%]"
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

            {/* Контейнер для контенту меню: 40px відступ зверху щоб не заходив під хрестик */}
            <Container className="relative flex flex-1 flex-col items-center justify-center min-h-0 overflow-hidden pt-6 pb-8 mt-10">
              {/* LanguageSelector, nav, button — max 89% висоти, по центру, space-between між блоками */}
              <div className="flex flex-col justify-between items-center w-full h-[89%] max-h-[89%] min-h-0">
                <div className="flex justify-center">
                  <LanguageSelector />
                </div>
                <nav className="flex flex-col gap-4 items-center">
                  {navLinks.map(({ href, label }) => (
                    <NavLink
                      key={href}
                      href={href}
                      className="w-full text-center min-h-11 py-3 px-5 text-[15px] border-[#d9d9d9] bg-[#ebebeb] hover:border-[#d0d0d0] hover:bg-[#e5e5e5]"
                      onClick={closeMenu}
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>
                <div className="flex justify-center">
                  <OutlineLightButton size="md" onClick={closeMenu}>
                    Зв&apos;язатися
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

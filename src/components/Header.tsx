"use client";

import { Container } from "./Container";
import { Logo } from "./header/Logo";
import { NavLink } from "./header/NavLink";
import { LanguageSelector } from "./header/LanguageSelector";
import { OutlineLightButton } from "./Button";

const navLinks = [
  { href: "#general", label: "General" },
  { href: "#services", label: "Services" },
  { href: "#vacancies", label: "Vacancies" },
  { href: "#contacts", label: "Contacts" },
  { href: "#gallery", label: "Gallery" },
];

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "var(--color-header-bg)" }}
    >
      <Container className="h-20 flex items-center justify-between gap-8">
        <Logo />

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map(({ href, label }) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <OutlineLightButton size="sm" />
        </div>
      </Container>
    </header>
  );
}

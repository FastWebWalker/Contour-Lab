"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/**
 * Foldable contact widget shown in the hero (desktop) and as a fixed
 * floating button in the bottom-right corner (mobile / tablet).
 *
 * Closed → single envelope trigger.
 * Open   → row (desktop) / column (mobile) of phone, WhatsApp, Telegram,
 *          Viber + an X close button.
 */

const PHONE_TEL = "+380675634655";
const PHONE_DISPLAY = "+380 67 563 46 55";
const WA_NUMBER = "380633556550";
const TG_HANDLE = "Labcontour";
const VIBER_NUMBER = "%2B380633556550";

interface Contact {
  href: string;
  src: string;
  label: string;
  external?: boolean;
}

const CONTACTS: Contact[] = [
  {
    href: `tel:${PHONE_TEL}`,
    src: "/icons/hero/phone-outgoing.svg",
    label: `Phone ${PHONE_DISPLAY}`,
  },
  {
    href: `https://wa.me/${WA_NUMBER}`,
    src: "/icons/hero/Social (2).svg",
    label: "WhatsApp",
    external: true,
  },
  {
    href: `https://t.me/${TG_HANDLE}`,
    src: "/icons/hero/Social (1).svg",
    label: "Telegram",
    external: true,
  },
  {
    href: `viber://chat?number=${VIBER_NUMBER}`,
    src: "/icons/hero/Social.svg",
    label: "Viber",
    external: true,
  },
];

interface ContactWidgetProps {
  variant: "inline" | "fixed";
}

export function ContactWidget({ variant }: ContactWidgetProps) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isHorizontal = variant === "inline";

  /* The container hides itself on the breakpoints where the other variant is in
     charge, so we can render both side by side without media-query branching. */
  const visibility =
    variant === "fixed" ? "flex lg:hidden" : "hidden lg:flex";
  const positioning =
    variant === "fixed"
      ? "fixed bottom-5 right-5 z-50"
      : "";
  const itemSizeClass =
    variant === "fixed"
      ? "h-14 w-14 min-[400px]:h-16 min-[400px]:w-16"
      : "h-12 w-12";
  const iconSize = variant === "fixed" ? 28 : 24;
  const iconSizeClass = variant === "fixed" ? "min-[400px]:h-8 min-[400px]:w-8" : "";

  /* DOM/visual order matches the design: phone, WhatsApp, Telegram, Viber,
     then the trigger button (rightmost on desktop, bottom on mobile).
     We stagger so the icon closest to the trigger pops out first.            */
  const lastIdx = CONTACTS.length - 1;

  return (
    <div className={[visibility, positioning].filter(Boolean).join(" ")}>
      <div
        className={[
          "flex items-center gap-2.5",
          isHorizontal ? "flex-row" : "flex-col",
        ].join(" ")}
      >
        <AnimatePresence initial={false}>
          {open &&
            CONTACTS.map((c, i) => {
              const fromOffset = isHorizontal ? { x: 24 } : { y: 24 };
              const stepDelay = (lastIdx - i) * 0.04;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  aria-label={c.label}
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.55, ...fromOffset }
                  }
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.55, ...fromOffset }
                  }
                  transition={{
                    duration: 0.22,
                    delay: reduced ? 0 : stepDelay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex ${itemSizeClass} shrink-0 items-center justify-center rounded-full border-[0.5px] border-[var(--color-grey)] bg-white p-3 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)]/40`}
                >
                  <Image
                    src={c.src}
                    alt=""
                    width={iconSize}
                    height={iconSize}
                    className={`shrink-0 ${iconSizeClass}`}
                  />
                </motion.a>
              );
            })}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close contacts" : "Open contacts"}
          aria-expanded={open}
          className={`relative flex ${itemSizeClass} shrink-0 items-center justify-center rounded-full border-[0.5px] border-[var(--color-grey)] ${variant === "fixed" ? "bg-white" : "bg-transparent"} p-3 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-red-main)]/40`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "mail"}
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, rotate: -90, scale: 0.6 }
              }
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, rotate: 90, scale: 0.6 }
              }
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
            >
              <Image
                src={open ? "/icons/hero/x.svg" : "/hero/mail.svg"}
                alt=""
                width={iconSize}
                height={iconSize}
                className={`shrink-0 ${iconSizeClass}`}
              />
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface FormSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function FormSuccessModal({ open, onClose }: FormSuccessModalProps) {
  const t = useTranslations("formSuccessModal");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="presentation"
      className="fixed inset-0 z-[10060] flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("ariaLabel")}
        className="relative h-[min(440px,90vh)] w-[min(960px,90vw)] overflow-hidden rounded-[20px] bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-black)] transition-colors hover:bg-black/5"
          aria-label={t("close")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <Image
          src="/Group 1.png"
          alt=""
          width={125}
          height={351}
          className="absolute left-0 top-0 h-full w-auto object-cover opacity-20"
        />

        <div className="flex h-full items-center justify-center px-8 text-center">
          <p
            className="max-w-[540px] text-[30px] font-normal leading-[1.2] text-[var(--color-black)] max-[768px]:text-[24px]"
            style={{ fontFamily: "var(--font-sans), Gilroy, sans-serif" }}
          >
            {t("line1")}
            <br />
            {t("line2")}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

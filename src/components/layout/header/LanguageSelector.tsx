"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export interface LanguageSelectorProps {
  /** When true, background is transparent (e.g. header at scroll 0) */
  transparent?: boolean;
}

type AppLocale = (typeof routing.locales)[number];

export function LanguageSelector({ transparent }: LanguageSelectorProps) {
  const t = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();

  const target: AppLocale = locale === "uk" ? "en" : "uk";
  const label = locale === "uk" ? "EN" : "UA";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: target })}
      className={`w-[54px] h-[54px] z-[9999] rounded-full flex items-center justify-center text-[18px] font-medium transition-colors border-2 border-[0.5px] border-[var(--color-red-main)] ${
        transparent
          ? "bg-transparent hover:bg-white/20"
          : "bg-white hover:bg-[var(--color-red-main)] hover:text-white"
      }`}
      style={{
        color: "var(--color-black)",
        fontFamily: "var(--font-inter)",
      }}
      aria-label={t("selectLanguage")}
    >
      {label}
    </button>
  );
}

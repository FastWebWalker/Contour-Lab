"use client";

export interface LanguageSelectorProps {
  /** When true, background is transparent (e.g. header at scroll 0) */
  transparent?: boolean;
}

export function LanguageSelector({ transparent }: LanguageSelectorProps) {
  return (
    <button
      type="button"
      className={`w-[54px] h-[54px] z-[9999] rounded-full flex items-center justify-center text-[18px] font-medium transition-colors border-2 border-[0.5px] border-[var(--color-red-main)] ${
        transparent
          ? "bg-transparent hover:bg-white/20"
          : "bg-white hover:bg-[var(--color-red-main)] hover:text-white"
      }`}
      style={{
        color: "var(--color-black)",
        fontFamily: "var(--font-inter)",
      }}
      aria-label="Select language"
    >
      EN
    </button>
  );
}

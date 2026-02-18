"use client";

export function LanguageSelector() {
  return (
    <button
      type="button"
      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-medium transition-colors hover:bg-[var(--color-red-main)] hover:text-white border-2 border-dashed border-[var(--color-red-main)]"
      style={{
        color: "var(--color-black)",
        fontFamily: "var(--font-sans)",
      }}
      aria-label="Select language"
    >
      EN
    </button>
  );
}

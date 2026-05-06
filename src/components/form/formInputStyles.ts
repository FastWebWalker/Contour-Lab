import type { CSSProperties } from "react";

/** Як у QuestionMapFormSection — спільні класи для полів форм. */
export const FORM_INPUT_CLASSNAME =
  "flex w-full min-w-0 flex-1 items-center gap-2.5 rounded-[24px] border border-[#D0D0D0] bg-white p-4 text-[16px] font-normal leading-[1.2] outline-none transition-[border-color,box-shadow] placeholder:text-[rgba(20,20,20,0.45)] focus:border-[var(--color-red-main)] focus:ring-1 focus:ring-[var(--color-red-main)] md:rounded-[40px] md:px-5 md:py-[15px] md:text-[20px]";

export const FORM_INPUT_STYLE: CSSProperties = {
  color: "rgba(20, 20, 20, 0.85)",
  fontFamily: "var(--font-inter), Inter, sans-serif",
};

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { messagesByLocale } from "@/messages";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const messages =
    messagesByLocale[locale as keyof typeof messagesByLocale] ??
    messagesByLocale.uk;

  return {
    locale,
    messages,
  };
});

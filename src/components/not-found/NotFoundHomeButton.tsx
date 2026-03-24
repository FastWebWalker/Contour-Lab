"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { PrimaryButton } from "@/components/ui/Button";

export function NotFoundHomeButton() {
  const router = useRouter();
  const t = useTranslations("notFound");
  return (
    <PrimaryButton size="lg" type="button" onClick={() => router.push("/")}>
      {t("home")}
    </PrimaryButton>
  );
}

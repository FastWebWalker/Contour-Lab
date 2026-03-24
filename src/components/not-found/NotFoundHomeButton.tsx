"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/ui/Button";

export function NotFoundHomeButton() {
  const router = useRouter();
  return (
    <PrimaryButton size="lg" type="button" onClick={() => router.push("/")}>
      Головна
    </PrimaryButton>
  );
}

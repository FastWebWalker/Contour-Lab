"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const ContourGoogleMapInteractive = dynamic(
  () =>
    import("./ContourGoogleMapInteractive").then((m) => m.ContourGoogleMapInteractive),
  { ssr: false, loading: () => <MapSkeleton /> }
);

function MapSkeleton() {
  return (
    <div
      className="h-full min-h-[280px] w-full animate-pulse rounded-[30px] bg-[#e8e8e8]"
      aria-hidden
    />
  );
}

/** Embed без ключа (Google Maps search embed) */
const MAPS_EMBED_FALLBACK =
  "https://www.google.com/maps?q=Contour+Dental+Laboratory+Lviv+Ukraine&output=embed&z=15";

export interface ContourGoogleMapProps {
  className?: string;
}

/**
 * Якщо є `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — інтерактивна карта (`@react-google-maps/api`).
 * Інакше — iframe embed (без ключа).
 */
export function ContourGoogleMap({ className = "" }: ContourGoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <iframe
        title="Contour Dental Laboratory на карті"
        src={MAPS_EMBED_FALLBACK}
        className={["h-full w-full rounded-[30px] border-0", className].filter(Boolean).join(" ")}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div
      className={[
        "relative h-full min-h-[280px] w-full overflow-hidden rounded-[30px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ContourGoogleMapInteractive apiKey={apiKey} />
    </div>
  );
}

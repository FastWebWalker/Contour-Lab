"use client";

import * as React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const DEFAULT_CENTER = { lat: 49.841_42, lng: 24.029_88 };

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: "30px",
};

export function ContourGoogleMapInteractive({ apiKey }: { apiKey: string }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (loadError) {
    return (
      <div className="flex h-full min-h-[280px] w-full items-center justify-center rounded-[30px] bg-[#f0f0f0] px-4 text-center text-sm text-[#555]">
        Не вдалося завантажити карту. Перевірте ключ API.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="h-full min-h-[280px] w-full animate-pulse rounded-[30px] bg-[#e8e8e8]"
        aria-hidden
      />
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      mapContainerClassName="h-full w-full min-h-0"
      center={DEFAULT_CENTER}
      zoom={15}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      }}
    >
      <Marker position={DEFAULT_CENTER} title="Contour Dental Laboratory" />
    </GoogleMap>
  );
}

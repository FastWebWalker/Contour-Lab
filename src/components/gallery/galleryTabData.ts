import type { GalleryManifest, GalleryTabId } from "./galleryTypes";

/** Унікальний список усіх фото для табу «Всі Фото». */
export function getImagesForTab(
  manifest: GalleryManifest,
  tab: GalleryTabId
): string[] {
  if (tab === "all") {
    const seen = new Set<string>();
    for (const paths of Object.values(manifest.imagesByTab)) {
      for (const src of paths) {
        seen.add(src);
      }
    }
    return Array.from(seen);
  }
  return manifest.imagesByTab[tab] ?? [];
}

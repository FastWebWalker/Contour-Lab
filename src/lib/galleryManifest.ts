import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { GalleryManifest } from "@/components/gallery/galleryTypes";

/** Маніфест з `public/galleryTab/gallery.json` (читається на сервері при рендері сторінки). */
export function readGalleryManifest(): GalleryManifest {
  const raw = readFileSync(
    join(process.cwd(), "public/galleryTab/gallery.json"),
    "utf8"
  );
  return JSON.parse(raw) as GalleryManifest;
}

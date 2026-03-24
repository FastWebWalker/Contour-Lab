export type GalleryTabId =
  | "all"
  | "veneers"
  | "bridges"
  | "anatomy"
  | "allon";

export interface GalleryTabItem {
  id: GalleryTabId;
  label: string;
}

export interface GalleryManifest {
  version: number;
  tabs: GalleryTabItem[];
  imagesByTab: Record<
    Exclude<GalleryTabId, "all">,
    string[]
  >;
}

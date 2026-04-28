import type { ReactNode } from "react";

export const galleryHeroTitle: ReactNode = (
  <>
    Наша галерея
    <br />
    <span style={{ color: "var(--color-red-main)" }}>робіт</span>
  </>
);

export const galleryHeroSubtitle =
  "Переконайтеся в нашому професіоналізмі та акуратності, переглянувши фотографії наших робіт!";

/** Та сама 3D-графіка, що на сторінці послуг */
export const galleryHeroImage =
  "/hero/" + encodeURIComponent("photo hero other.png");

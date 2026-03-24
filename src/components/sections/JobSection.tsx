"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Container } from "../ui/Container";
import { JobCard } from "../cards/JobCard";
import type { JobCardProps } from "../cards/JobCard";

export interface JobSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  dateText?: string;
  salaryText?: string;
  locationType?: string;
  description?: string;
  bullets?: string[];
  applyLabel?: string;
  imageSrc?: string;
}

const JOB_IMAGE_DEFAULT =
  "/jobSection/be9e6b62e99cebce95a2f7a1e5ee9d68a2b70e82.png";

export function JobSection({
  title: titleProp,
  dateText: dateTextProp,
  salaryText: salaryTextProp,
  locationType: locationTypeProp,
  description: descriptionProp,
  bullets: bulletsProp,
  applyLabel: applyLabelProp,
  imageSrc = JOB_IMAGE_DEFAULT,
  className = "",
  ...props
}: JobSectionProps) {
  const t = useTranslations("jobSection");
  const tApply = useTranslations("jobCard");
  const defaultBullets = t.raw("bullets") as string[];

  const title = titleProp ?? t("title");
  const dateText = dateTextProp ?? t("dateText");
  const salaryText = salaryTextProp ?? t("salaryText");
  const locationType = locationTypeProp ?? t("locationType");
  const description = descriptionProp ?? t("description");
  const bullets = bulletsProp ?? defaultBullets;
  const applyLabel = applyLabelProp ?? tApply("apply");

  return (
    <section
      aria-label={title}
      className={["w-full py-8 min-[768px]:py-12", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Container>
        <JobCard
          title={title}
          dateText={dateText}
          salaryText={salaryText}
          locationType={locationType}
          description={description}
          bullets={bullets}
          applyLabel={applyLabel}
          imageSrc={imageSrc}
        />
      </Container>
    </section>
  );
}

export { JobCard } from "../cards/JobCard";

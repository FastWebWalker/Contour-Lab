"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { JobCard } from "../cards/JobCard";
import type { JobCardProps } from "../cards/JobCard";
import { VACANCIES_JOB_IMAGES } from "../data/vacanciesJobsData";

export interface VacanciesJobsSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Повні дані карток (наприклад, для Storybook); інакше береться з перекладів + зображень */
  jobs?: JobCardProps[];
}

/**
 * Блок вакансій: max 1440px, padding 80px 60px (на великих екранах), колонка, gap 40px між картками.
 */
export function VacanciesJobsSection({
  jobs: jobsOverride,
  className = "",
  ...props
}: VacanciesJobsSectionProps) {
  const t = useTranslations("vacanciesJobs");
  const tApply = useTranslations("jobCard");
  const tAria = useTranslations("vacanciesPageSection");

  const jobs = React.useMemo(() => {
    if (jobsOverride?.length) return jobsOverride;
    const raw = t.raw("jobs") as Omit<JobCardProps, "imageSrc" | "applyLabel">[];
    return raw.map((job, i) => ({
      ...job,
      imageSrc: VACANCIES_JOB_IMAGES[i] ?? VACANCIES_JOB_IMAGES[0],
      applyLabel: tApply("apply"),
    }));
  }, [jobsOverride, t, tApply]);

  return (
    <section
      aria-label={tAria("aria")}
      className={["w-full", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-center gap-10 px-4 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[1440px]:px-[60px] min-[1440px]:py-[80px]"
      >
        {jobs.map((job) => (
          <JobCard key={job.title} {...job} />
        ))}
      </div>
    </section>
  );
}

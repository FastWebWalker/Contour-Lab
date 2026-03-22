"use client";

import * as React from "react";
import { JobCard } from "../cards/JobCard";
import { VACANCIES_JOBS } from "../data/vacanciesJobsData";


export interface VacanciesJobsSectionProps extends React.HTMLAttributes<HTMLElement> {
  jobs?: typeof VACANCIES_JOBS;
}

/**
 * Блок вакансій: max 1440px, padding 80px 60px (на великих екранах), колонка, gap 40px між картками.
 */
export function VacanciesJobsSection({
  jobs = VACANCIES_JOBS,
  className = "",
  ...props
}: VacanciesJobsSectionProps) {
  return (
    <section
      aria-label="Відкриті вакансії"
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

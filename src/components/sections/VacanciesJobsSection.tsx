"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { JobCard } from "../cards/JobCard";
import type { JobCardProps } from "../cards/JobCard";
import { VACANCIES_JOB_IMAGES } from "../data/vacanciesJobsData";
import { sectionViewport, MOTION_EASE } from "@/lib/motion";

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
  const reduced = useReducedMotion() ?? false;

  const jobs = React.useMemo(() => {
    if (jobsOverride?.length) return jobsOverride;
    const raw = t.raw("jobs") as Omit<JobCardProps, "imageSrc" | "applyLabel">[];
    return raw.map((job, i) => ({
      ...job,
      imageSrc: VACANCIES_JOB_IMAGES[i] ?? VACANCIES_JOB_IMAGES[0],
      applyLabel: tApply("apply"),
    }));
  }, [jobsOverride, t, tApply]);

  const scrollToApplyForm = React.useCallback(() => {
    const form = document.getElementById("apply-job-form");
    if (!form) return;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      aria-label={tAria("aria")}
      className={["w-full", className].filter(Boolean).join(" ")}
      {...props}
    >
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-center gap-10 px-4 py-12 min-[768px]:px-8 min-[768px]:py-16 min-[1440px]:px-[60px] min-[1440px]:py-[80px]"
      >
        {jobs.map((job, i) => (
          <motion.div
            key={job.title}
            className="w-full"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionViewport({ amount: 0.15 })}
            transition={{
              duration: reduced ? 0 : 0.6,
              delay: reduced ? 0 : i * 0.15,
              ease: MOTION_EASE,
            }}
          >
            <JobCard {...job} onApplyClick={scrollToApplyForm} rotateImage={i === 0} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

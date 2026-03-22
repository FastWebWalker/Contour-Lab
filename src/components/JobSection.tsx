"use client";

import * as React from "react";
import { Container } from "./ui/Container";
import { JobCard } from "./JobCard";
import type { JobCardProps } from "./JobCard";

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

const defaultBullets = [
  "Робота з високоестетичними безметалевими реставраціями",
  "Висока заробітна плата",
  "Співпраця з найкращими клініками країни",
  "Навчання в Україні та за кордоном",
  "Сучасне робоче місце та обладнання",
];

const JOB_IMAGE_DEFAULT =
  "/jobSection/be9e6b62e99cebce95a2f7a1e5ee9d68a2b70e82.png";

export function JobSection({
  title = "Кераміст",
  dateText = "Сер 29, 2025",
  salaryText = "$1000–1500 в місяць",
  locationType = "Офіс",
  description = "Бажаєте працювати в команді сучасної цифрової лабораторії Contour? Ми шукаємо техніка-кераміста в нашу команду!",
  bullets = defaultBullets,
  applyLabel = "Відгукнутись",
  imageSrc = JOB_IMAGE_DEFAULT,
  className = "",
  ...props
}: JobSectionProps) {
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

export { JobCard } from "./JobCard";

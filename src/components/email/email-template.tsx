import * as React from "react";

interface EmailTemplateProps {
  title: string;
  fields: Array<{ label: string; value: string }>;
}

export function EmailTemplate({ title, fields }: EmailTemplateProps) {
  return (
    <div>
      <h1>Сповіщення з сайту Contour Lab</h1>
      <p>
        <strong>{title}</strong>
      </p>
      <ul>
        {fields.map((field) => (
          <li key={field.label}>
            <strong>{field.label}:</strong> {field.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

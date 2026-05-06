import { EmailTemplate } from "@/components/email/email-template";
import { getResend } from "@/lib/resend";
import { NextResponse } from "next/server";

type SendFormPayload = {
  formType?: string;
  subject?: string;
  replyTo?: string;
  fields?: Array<{ label: string; value: string | number | null | undefined }>;
};

const ASCII_ONLY = /^[\x00-\x7F]+$/;

function getSafeFromAddress() {
  const rawFrom = process.env.RESEND_FROM_EMAIL?.trim();
  if (!rawFrom) return "onboarding@resend.dev";
  if (ASCII_ONLY.test(rawFrom)) return rawFrom;

  const bracketEmailMatch = rawFrom.match(/<([^>]+)>/);
  if (bracketEmailMatch?.[1] && ASCII_ONLY.test(bracketEmailMatch[1])) {
    return bracketEmailMatch[1];
  }

  return "onboarding@resend.dev";
}

export async function POST(request: Request) {
  try {
    const resend = getResend();
    const body = (await request.json()) as SendFormPayload;
    const recipients =
      process.env.RESEND_TO_EMAIL?.split(",")
        .map((email) => email.trim())
        .filter(Boolean) ?? [];

    const { data, error } = await resend.emails.send({
      from: getSafeFromAddress(),
      to: recipients.length > 0 ? recipients : ["delivered@resend.dev"],
      subject: body.subject ?? "New form submission",
      replyTo: body.replyTo,
      react: EmailTemplate({
        title: body.formType
          ? `Contour Lab: ${body.formType} submission`
          : "Contour Lab: New form submission",
        fields:
          body.fields?.map((field) => ({
            label: field.label,
            value: String(field.value ?? ""),
          })) ?? [],
      }),
    });

    if (error) {
      return NextResponse.json(
        { error: error.message ?? "Resend failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { EmailTemplate } from "@/components/email/email-template";
import { getResend } from "@/lib/resend";
import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";

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
    const contentType = request.headers.get("content-type") ?? "";
    let body: SendFormPayload;
    let cvAttachment:
      | {
          filename: string;
          content: Buffer;
          contentType?: string;
        }
      | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const payloadRaw = formData.get("payload");
      body = payloadRaw ? (JSON.parse(String(payloadRaw)) as SendFormPayload) : {};

      const cvFile = formData.get("cvFile");
      if (cvFile instanceof File && cvFile.size > 0) {
        cvAttachment = {
          filename: cvFile.name || "cv.pdf",
          content: Buffer.from(await cvFile.arrayBuffer()),
          contentType: cvFile.type || "application/pdf",
        };
      }
    } else {
      body = (await request.json()) as SendFormPayload;
    }

    const recipients =
      process.env.RESEND_TO_EMAIL?.split(",")
        .map((email) => email.trim())
        .filter(Boolean) ?? [];

    const { data, error } = await resend.emails.send({
      from: getSafeFromAddress(),
      to: recipients.length > 0 ? recipients : ["delivered@resend.dev"],
      subject: body.subject ?? "Contour Lab: Нова заявка з сайту",
      replyTo: body.replyTo,
      react: EmailTemplate({
        title: body.formType
          ? `Contour Lab: ${body.formType}`
          : "Contour Lab: Нова заявка з сайту",
        fields:
          body.fields?.map((field) => ({
            label: field.label,
            value: String(field.value ?? ""),
          })) ?? [],
      }),
      attachments: cvAttachment ? [cvAttachment] : undefined,
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

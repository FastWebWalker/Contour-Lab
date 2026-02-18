import { EmailTemplate } from "@/components/email-template";
import { getResend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const resend = getResend();
    const body = await request.json();
    const { to, subject, firstName = "User" } = body;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: to ?? ["delivered@resend.dev"],
      subject: subject ?? "Hello from Contour Lab",
      react: EmailTemplate({ firstName }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

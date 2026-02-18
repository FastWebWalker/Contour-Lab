import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY. Add it to your .env file.");
  }
  return new Resend(apiKey);
}

export { getResend };

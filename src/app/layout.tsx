import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contour Lab",
  description: "Next.js app with Tailwind and Resend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

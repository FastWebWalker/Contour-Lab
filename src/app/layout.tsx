import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ weight: "400", subsets: ["latin", "cyrillic"], variable: "--font-inter" });

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
      <body className={`antialiased font-sans flex flex-col min-h-screen relative ${inter.variable}`}>
        <Header />
        <main className="flex-1 lg:-mt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

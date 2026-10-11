import type { Metadata } from "next";
import localFont from "next/font/local";
import { getSiteSettings } from "@/lib/supabase/content";
import "./globals.css";

const dmSans = localFont({
  src: [
    {
      path: "./fonts/DMSans-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/DMSans-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteSettings();
  return { title: seo.title, description: seo.description };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import { DEFAULT_SITE_SETTINGS } from "@/lib/content/siteSettings";
import { getSiteSettings } from "@/lib/supabase/content";
import { themeStyle } from "@/lib/theme";
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

const montserrat = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo, brand } = await getSiteSettings();
  const favicon = brand.faviconUrl.trim() || DEFAULT_SITE_SETTINGS.brand.faviconUrl;
  return {
    title: seo.title,
    description: seo.description,
    icons: { icon: favicon, apple: favicon },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = await getSiteSettings();

  return (
    <html
      lang="cs"
      // Lets Next.js turn smooth scrolling off during route changes.
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${montserrat.variable} h-full antialiased`}
      style={themeStyle(theme)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

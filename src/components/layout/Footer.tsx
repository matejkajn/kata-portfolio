import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import type { SiteSettings } from "@/types";

interface FooterProps {
  content: SiteSettings["footer"];
  /** Logo URL from site settings. */
  logoUrl?: string;
}

/** Site footer: monogram, contact details and social links. */
export function Footer({ content, logoUrl }: FooterProps) {
  return (
    <footer className="bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-16">
          <Logo
            src={logoUrl}
            imageClassName="h-[76px] w-auto max-w-[200px]"
            className="shrink-0"
          />

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${content.email}`}
              className="text-lg font-semibold text-wine hover:text-navy"
            >
              {content.email}
            </a>

            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-wine hover:text-navy"
            >
              <Image
                src="/footer/logo_instagram.png"
                alt=""
                width={18}
                height={18}
                className="size-4.5"
              />
              {content.instagramLabel}
            </a>

            <a
              href={content.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-wine hover:text-navy"
            >
              <Image
                src="/footer/logo_linkedin.png"
                alt=""
                width={18}
                height={18}
                className="size-4.5"
              />
              {content.linkedinLabel}
            </a>
          </div>
        </div>

        <p className="text-right text-xs text-muted">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
}

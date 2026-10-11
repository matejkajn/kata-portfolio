import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import type { SiteSettings } from "@/types";

interface FooterProps {
  content: SiteSettings["footer"];
}

/** Site footer: monogram, contact details and social links. */
export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-white px-6 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-16">
          <Logo imageClassName="h-[76px] w-[120px]" className="shrink-0" />

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${content.email}`}
              className="text-lg font-semibold text-ink hover:text-brand"
            >
              {content.email}
            </a>

            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-muted hover:text-brand"
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
              className="inline-flex items-center gap-3 text-sm text-muted hover:text-brand"
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

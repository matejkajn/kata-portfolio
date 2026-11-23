import { SocialLink } from "@/components/layout/SocialLink";
import { Logo } from "@/components/ui/Logo";
import { DEFAULT_SITE_SETTINGS } from "@/lib/content/siteSettings";
import type { SiteSettings } from "@/types";

interface FooterProps {
  content: SiteSettings["footer"];
  /** Brand settings; the footer logo falls back to the main logo. */
  brand: SiteSettings["brand"];
}

/** Site footer: monogram, contact details and social links. */
export function Footer({ content, brand }: FooterProps) {
  return (
    <footer className="bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-16">
          <Logo
            src={brand.footerLogoUrl.trim() || brand.logoUrl}
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

            <SocialLink
              href={content.instagramUrl}
              label={content.instagramLabel}
              iconUrl={content.instagramIconUrl}
              fallbackIconUrl={DEFAULT_SITE_SETTINGS.footer.instagramIconUrl}
            />

            <SocialLink
              href={content.linkedinUrl}
              label={content.linkedinLabel}
              iconUrl={content.linkedinIconUrl}
              fallbackIconUrl={DEFAULT_SITE_SETTINGS.footer.linkedinIconUrl}
            />
          </div>
        </div>

        <p className="text-right text-xs text-muted">
          {content.copyright}
        </p>
      </div>
    </footer>
  );
}

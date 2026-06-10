import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/icons";

const EMAIL = "hrselova.katerina@gmail.com";

/** Site footer: monogram, contact details and social links. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-white px-6 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4">
          <Logo />
          <div className="flex flex-col gap-2 text-sm text-ink">
            <a href={`mailto:${EMAIL}`} className="font-medium hover:text-brand">
              {EMAIL}
            </a>
            <a
              href="https://instagram.com/katerina.graphics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted hover:text-brand"
            >
              <InstagramIcon className="size-4" />
              katerina.graphics
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted hover:text-brand"
            >
              <LinkedInIcon className="size-4" />
              Kateřina Hršelová
            </a>
          </div>
        </div>

        <p className="text-xs text-muted">
          © 2025 Kateřina Hršelová. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

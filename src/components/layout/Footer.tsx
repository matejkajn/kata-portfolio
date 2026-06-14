import Image from "next/image";
import { Logo } from "@/components/ui/Logo";

const EMAIL = "hrselova.katerina@gmail.com";

/** Site footer: monogram, contact details and social links. */
export function Footer() {
  return (
    <footer className="bg-white px-6 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-16">
          <Logo imageClassName="h-[76px] w-[120px]" className="shrink-0" />

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="text-lg font-semibold text-ink hover:text-brand"
            >
              {EMAIL}
            </a>

            <a
              href="https://instagram.com/katerina.graphics"
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
              katerina.graphics
            </a>

            <a
              href="https://www.linkedin.com/in/kateřina-hršelová-35a324279"
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
              Kateřina Hršelová
            </a>
          </div>
        </div>

        <p className="text-right text-xs text-muted">
          © 2026 Kateřina Hršelová. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

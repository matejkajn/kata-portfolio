import Image from "next/image";
import { cn } from "@/lib/cn";
import { DEFAULT_SITE_SETTINGS } from "@/lib/content/siteSettings";

interface LogoImageProps {
  /** Logo URL from site settings; empty falls back to the built-in monogram. */
  src?: string;
  /**
   * "dark" renders the logo as-is (light backgrounds);
   * "light" turns it white for dark backgrounds.
   */
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
}

/** The bare logo image, shared by the public {@link Logo} and the admin sidebar. */
export function LogoImage({ src, variant = "dark", className, priority }: LogoImageProps) {
  const url = src?.trim() || DEFAULT_SITE_SETTINGS.brand.logoUrl;

  return (
    <Image
      src={url}
      alt=""
      width={120}
      height={76}
      priority={priority}
      // next/image refuses to optimise SVGs; serve them as-is.
      unoptimized={url.toLowerCase().split("?")[0].endsWith(".svg")}
      className={cn(
        "object-contain",
        className,
        variant === "light" && "brightness-0 invert",
      )}
    />
  );
}

import Image from "next/image";

interface SocialLinkProps {
  href: string;
  label: string;
  /** Icon URL from site settings; empty falls back to {@link fallbackIconUrl}. */
  iconUrl: string;
  fallbackIconUrl: string;
}

/** A footer social link: small icon followed by the profile label. */
export function SocialLink({ href, label, iconUrl, fallbackIconUrl }: SocialLinkProps) {
  const icon = iconUrl.trim() || fallbackIconUrl;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 text-sm text-wine hover:text-navy"
    >
      <Image
        src={icon}
        alt=""
        width={18}
        height={18}
        // next/image refuses to optimise SVGs; serve them as-is.
        unoptimized={icon.toLowerCase().split("?")[0].endsWith(".svg")}
        className="size-4.5 object-contain"
      />
      {label}
    </a>
  );
}

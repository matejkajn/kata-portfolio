import { cn } from "@/lib/cn";

interface ImagePreviewProps {
  src: string | null | undefined;
  alt?: string;
  className?: string;
}

/**
 * Thumbnail for admin forms. A plain `<img>` on purpose: the URL can be any
 * address typed by the admin, which next/image would reject unless allowlisted.
 */
export function ImagePreview({ src, alt = "", className }: ImagePreviewProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg border border-line bg-[repeating-conic-gradient(#f3f3f7_0_25%,#fff_0_50%)] bg-[length:16px_16px]",
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
      ) : (
        <span className="text-xs text-muted">Bez obrázku</span>
      )}
    </div>
  );
}

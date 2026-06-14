import Image from "next/image";
import type { ProjectImage } from "@/types";
import { cn } from "@/lib/cn";

interface ProjectImageBlockProps {
  image: ProjectImage;
  /** Eager-load + prioritise (use for the above-the-fold hero image). */
  priority?: boolean;
  className?: string;
}

/**
 * A full-width case-study image rendered at its natural aspect ratio. The
 * body images are composed layouts (typography, colours, logo variants), so
 * they must never be cropped — hence intrinsic sizing rather than a fixed box.
 */
export function ProjectImageBlock({
  image,
  priority = false,
  className,
}: ProjectImageBlockProps) {
  return (
    <Image
      src={image.url}
      alt={image.alt}
      // Dimensions are unknown ahead of time; `h-auto w-full` lets the image
      // settle to its true ratio once loaded.
      width={0}
      height={0}
      sizes="(min-width: 1152px) 1152px, 100vw"
      quality={90}
      priority={priority}
      className={cn("h-auto w-full rounded-2xl", className)}
    />
  );
}

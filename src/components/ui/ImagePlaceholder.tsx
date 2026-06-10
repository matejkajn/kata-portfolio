import { cn } from "@/lib/cn";

interface ImagePlaceholderProps {
  /** Label shown centered (e.g. project title) until a real image exists. */
  label?: string;
  /** Background color of the placeholder. */
  color?: string;
  className?: string;
}

/**
 * Stand-in for imagery that will be served from Supabase in a later step.
 * Renders a solid tile with an optional centered label so layout/aspect
 * ratios can be reviewed before assets are wired up.
 */
export function ImagePlaceholder({
  label,
  color = "#2b2f36",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden",
        className,
      )}
      style={{ backgroundColor: color }}
    >
      {label && (
        <span className="px-4 text-center text-sm font-medium text-white/70">
          {label}
        </span>
      )}
    </div>
  );
}

import { cn } from "@/lib/cn";
import { MAX_RATING } from "@/lib/rating";

interface StarRatingProps {
  rating: number;
  className?: string;
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={cn("size-4", filled ? "fill-accent" : "fill-white/30")}
    >
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

/** Frosted badge with the client's star rating. */
export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`Hodnocení ${rating} z ${MAX_RATING}`}
      className={cn(
        "flex items-center gap-1.5 rounded-md bg-[linear-gradient(180deg,#3a33c9_0%,#7d78dc_100%)] px-5 py-2.5 shadow-[0_8px_20px_-8px_rgba(28,22,104,0.6)] ring-1 ring-white/20",
        className,
      )}
    >
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <Star key={index} filled={index < rating} />
      ))}
    </div>
  );
}

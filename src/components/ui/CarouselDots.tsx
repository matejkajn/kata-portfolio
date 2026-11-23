import { cn } from "@/lib/cn";

interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

/** Dash-style position indicators for a carousel; hidden when there is one page. */
export function CarouselDots({ count, activeIndex, onSelect, className }: CarouselDotsProps) {
  if (count <= 1) return null;

  return (
    <div className={cn("flex justify-center gap-3", className)}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Zobrazit pozici ${index + 1} z ${count}`}
          aria-current={index === activeIndex}
          className="group py-2"
        >
          <span
            className={cn(
              "block h-px w-14 rounded-full md:h-1 transition-colors",
              index === activeIndex ? "bg-wine" : "bg-wine/30 group-hover:bg-wine/50",
            )}
          />
        </button>
      ))}
    </div>
  );
}

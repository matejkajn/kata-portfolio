import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import type { ProcessStep as ProcessStepType } from "@/types";

interface ProcessStepProps {
  step: ProcessStepType;
  /** Which side of the center line the step sits on (desktop only). */
  side: "left" | "right";
}

/**
 * One timeline entry. On mobile it sits to the right of a left-hand line; on
 * desktop it alternates across a centered line.
 */
export function ProcessStep({ step, side }: ProcessStepProps) {
  const isLeft = side === "left";

  return (
    <li
      className={cn(
        "relative grid md:grid-cols-2",
        // Mobile: offset content to the right of the left line.
        "pl-8 md:pl-0",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          isLeft
            ? "md:col-start-1 md:items-end md:pr-12 md:text-right"
            : "md:col-start-2 md:items-start md:pl-12 md:text-left",
        )}
      >
        <Pill>{step.label}</Pill>
        <p className="max-w-sm text-sm leading-relaxed text-white/70">
          {step.description}
        </p>
      </div>
    </li>
  );
}

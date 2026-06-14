"use client";

import { motion } from "framer-motion";
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
 * desktop it alternates across a centered line. Slides in from its side as it
 * scrolls into view.
 */
export function ProcessStep({ step, side }: ProcessStepProps) {
  const isLeft = side === "left";

  return (
    <motion.li
      className={cn(
        "relative grid md:grid-cols-2",
        // Mobile: offset content to the right of the left line.
        "pl-8 md:pl-0",
      )}
      initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-3 text-center",
          isLeft ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12",
        )}
      >
        <Pill>{step.label}</Pill>
        <p className="max-w-sm text-sm leading-relaxed text-white/70">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}

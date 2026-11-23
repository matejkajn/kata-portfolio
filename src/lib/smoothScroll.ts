/** Ease-in-out cubic: slow start, quick middle, gentle landing. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

const INTERRUPT_EVENTS = ["wheel", "touchstart", "keydown"] as const;

let cancelCurrent: (() => void) | null = null;

/**
 * Scrolls the window to `targetY` over `duration` ms with easing. A new call
 * replaces any scroll in progress, and the visitor can interrupt it by
 * scrolling, touching or pressing a key. Jumps instantly when the visitor
 * prefers reduced motion.
 */
export function smoothScrollTo(targetY: number, duration: number): void {
  cancelCurrent?.();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: targetY, behavior: "instant" });
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    INTERRUPT_EVENTS.forEach((type) => window.removeEventListener(type, stop));
    cancelCurrent = null;
  };

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    // "instant" bypasses the stylesheet's `scroll-behavior: smooth`.
    window.scrollTo({ top: startY + distance * easeInOutCubic(progress), behavior: "instant" });
    if (progress < 1) frame = requestAnimationFrame(step);
    else stop();
  };

  INTERRUPT_EVENTS.forEach((type) => window.addEventListener(type, stop, { passive: true }));
  cancelCurrent = stop;
  frame = requestAnimationFrame(step);
}

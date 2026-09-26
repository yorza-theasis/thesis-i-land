import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

type CounterProps = { end: number; suffix: string; delay?: number };

/* The real value is always the rendered text (SSR, crawlers, no-JS); the
 * count-up only rewrites textContent once in view, then restores it. Writes
 * go straight to the DOM so the ticks never re-render React. */
const Counter = ({ end, suffix, delay = 0 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const finalText = `${end}${suffix}`;

  useEffect(() => {
    if (!inView || reduced) return undefined;
    let frame = 0;
    const duration = 1400;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - p) ** 3;
        if (ref.current) {
          ref.current.textContent =
            p < 1 ? `${Math.round(end * eased)}${suffix}` : finalText;
        }
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      if (ref.current) ref.current.textContent = finalText;
    };
  }, [inView, reduced, end, suffix, delay, finalText]);

  return <span ref={ref}>{finalText}</span>;
};

export { Counter };

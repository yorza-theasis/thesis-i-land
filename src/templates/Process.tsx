import type { MotionValue } from 'framer-motion';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { Reveal } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Fills as the scroll-driven track reaches this step. */
const StepNode = ({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
}) => {
  const at = index / (total - 1);
  const fill = useTransform(progress, [at - 0.08, at], [0, 1]);
  return (
    <span className="relative flex size-[15px] items-center justify-center rounded-full border border-line/20 bg-bg">
      <motion.span
        style={{ opacity: fill, scale: fill }}
        className="size-[7px] rounded-full bg-signal"
      />
    </span>
  );
};

const Process = () => {
  const { process } = useT();
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 80%', 'end 55%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const total = process.steps.length;

  return (
    <Section id="process">
      <SectionHeader title={process.title} description={process.description} />

      <div className="relative mt-14 md:mt-20">
        {/* Progress track: vertical on small screens, horizontal from lg. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-2 left-[7px] w-px bg-line/10 lg:hidden"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute inset-y-2 left-[7px] w-px origin-top bg-signal lg:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-[7px] hidden h-px bg-line/10 lg:block"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-[7px] hidden h-px origin-left bg-signal lg:block"
        />

        <ol
          ref={trackRef}
          className="relative grid gap-12 lg:grid-cols-5 lg:gap-8"
        >
          {process.steps.map((step, i) => (
            <li key={step.title} className="relative pl-10 lg:pl-0">
              <div className="absolute left-0 top-1 lg:static">
                <StepNode progress={progress} index={i} total={total} />
              </div>
              <Reveal delay={i * 0.06} className="lg:mt-10">
                <h3 className="text-2xl font-medium tracking-heading text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {step.description}
                </p>
                <p className="label mt-6">{process.deliverable}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink">
                  {step.deliverable}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export { Process };

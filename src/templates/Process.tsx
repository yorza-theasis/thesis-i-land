import type { Icon } from '@phosphor-icons/react';
import {
  Code,
  Compass,
  Lightbulb,
  MagnifyingGlass,
  PenNib,
} from '@phosphor-icons/react';
import type { MotionValue } from 'framer-motion';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { Reveal } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Aligned with process.steps: Idea, Discovery, Strategy, Design, Build. */
const STEP_ICONS: Icon[] = [Lightbulb, MagnifyingGlass, Compass, PenNib, Code];

/* Turns blue once the scroll-driven track reaches this step. */
const StepNode = ({
  progress,
  index,
  total,
  StepIcon,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  StepIcon: Icon;
}) => {
  const at = index / (total - 1);
  const fill = useTransform(progress, [at - 0.08, at], [0, 1]);
  return (
    <span className="relative flex size-10 items-center justify-center rounded-full border border-line/15 bg-bg text-muted">
      <StepIcon size={18} weight="regular" aria-hidden="true" />
      <motion.span
        style={{ opacity: fill }}
        className="absolute inset-0 flex items-center justify-center rounded-full bg-signal-strong text-white"
      >
        <StepIcon size={18} weight="regular" aria-hidden="true" />
      </motion.span>
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
        {/* Progress track through the node centres: vertical on small
            screens, horizontal from lg. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-5 left-[calc(1.25rem-0.5px)] w-px bg-line/10 lg:hidden"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute inset-y-5 left-[calc(1.25rem-0.5px)] w-px origin-top bg-signal lg:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-5 top-[calc(1.25rem-0.5px)] hidden h-px bg-line/10 lg:block"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-5 top-[calc(1.25rem-0.5px)] hidden h-px origin-left bg-signal lg:block"
        />

        <ol
          ref={trackRef}
          className="relative grid gap-10 lg:grid-cols-5 lg:gap-8"
        >
          {process.steps.map((step, i) => (
            <li key={step.title} className="relative pl-16 lg:pl-0">
              <div className="absolute left-0 top-0 lg:static">
                <StepNode
                  progress={progress}
                  index={i}
                  total={total}
                  StepIcon={STEP_ICONS[i]!}
                />
              </div>
              <Reveal delay={i * 0.06} className="lg:mt-8">
                <h3 className="text-2xl font-medium tracking-heading text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {step.description}
                </p>
                <div className="mt-5 rounded-2xl bg-elev p-4 ring-1 ring-line/[0.06]">
                  <p className="label">{process.deliverable}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink">
                    {step.deliverable}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export { Process };

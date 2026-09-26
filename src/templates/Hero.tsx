import { Check } from '@phosphor-icons/react';
import type { MotionValue } from 'framer-motion';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';
import { Fragment, memo, useRef } from 'react';

import { ButtonLink } from '../components/ButtonLink';
import { Counter } from '../components/Counter';
import { Dot } from '../components/Dot';
import { Frame } from '../components/Frame';
import { EASE, Reveal } from '../components/motion';
import { useBase, useT } from '../i18n/LocaleContext';

/* ─── Evidence stack ───────────────────────────────────
 * Real project artefacts instead of an abstract 3D blob: one software
 * product, one robot, one circuit board — the studio's range at a glance.
 * Pointer parallax runs entirely on motion values (no React re-renders). */

type LayerProps = {
  children: ReactNode;
  className: string;
  rotate: number;
  depth: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  delay: number;
};

const Layer = ({
  children,
  className,
  rotate,
  depth,
  px,
  py,
  delay,
}: LayerProps) => {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  return (
    <motion.figure
      className={`absolute ${className}`}
      style={{ x, y, rotate }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.figure>
  );
};

/* Drawing-sheet reference code pinned to each plate; the legend below the
 * stack spells them out, so plates never carry overlapping captions. */
const CodeTag = ({ code }: { code: string }) => (
  <span className="absolute left-3 top-3 rounded-full bg-bg/85 px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-ink">
    {code}
  </span>
);

const STACK_LEGEND = [
  { code: 'SW-01', key: 'extensa' },
  { code: 'HW-07', key: 'qpick' },
  { code: 'HW-13', key: 'crsf' },
] as const;

const NowBuilding = ({
  label,
  project,
}: {
  label: string;
  project: string;
}) => (
  <div className="inline-flex max-w-full items-center gap-3 rounded-[1.25rem] border border-line/10 bg-elev/95 py-2 pl-3 pr-4 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.45)]">
    <span className="relative flex size-2 shrink-0">
      <span className="animate-ping-soft absolute inset-0 rounded-full bg-signal" />
      <span className="relative size-2 rounded-full bg-signal" />
    </span>
    <span className="label shrink-0 whitespace-nowrap !text-subtle">
      {label}
    </span>
    <span className="text-sm text-ink">{project}</span>
  </div>
);

const EvidenceStack = memo(() => {
  const { hero } = useT();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 100, damping: 20 });
  const py = useSpring(my, { stiffness: 100, damping: 20 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative aspect-square w-full"
      >
        <Layer
          className="right-0 top-[7%] w-[68%]"
          rotate={2.5}
          depth={-14}
          px={px}
          py={py}
          delay={0.25}
        >
          <Frame innerClassName="aspect-square">
            <img
              src="/assets/images/extensa.jpg"
              alt={hero.captions.extensa}
              className="size-full object-cover"
            />
            <CodeTag code="SW-01" />
          </Frame>
        </Layer>

        <Layer
          className="bottom-0 left-[2%] z-10 w-[42%]"
          rotate={-3}
          depth={22}
          px={px}
          py={py}
          delay={0.4}
        >
          <Frame innerClassName="aspect-[4/5]">
            <img
              src="/assets/images/qpick.jpg"
              alt={hero.captions.qpick}
              className="size-full object-cover"
              style={{ objectPosition: '50% 35%' }}
            />
            <CodeTag code="HW-07" />
          </Frame>
        </Layer>

        <Layer
          className="bottom-[3%] right-[5%] z-20 w-[28%]"
          rotate={4}
          depth={34}
          px={px}
          py={py}
          delay={0.55}
        >
          <Frame innerClassName="aspect-[3/4] bg-[#193461]">
            <img
              src="/assets/images/crsf-pcb.jpg"
              alt={hero.captions.crsf}
              className="size-full object-cover"
            />
            <CodeTag code="HW-13" />
          </Frame>
        </Layer>

        <motion.div
          className="absolute left-0 top-0 z-30"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
        >
          <NowBuilding label={hero.now.label} project={hero.now.project} />
        </motion.div>
      </div>

      <ul className="mt-10 grid gap-2 border-t border-line/10 pt-4">
        {STACK_LEGEND.map((item) => (
          <li key={item.code} className="flex gap-4 font-mono text-[11px]">
            <span className="w-12 shrink-0 text-signal-ink">{item.code}</span>
            <span className="text-muted">{hero.captions[item.key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
EvidenceStack.displayName = 'EvidenceStack';

/* Mobile/tablet: same artefacts, flat grid — no rotation or overlap. */
const EvidenceGrid = () => {
  const { hero } = useT();
  return (
    <div className="grid grid-cols-2 gap-3">
      <figure className="row-span-2">
        <Frame innerClassName="aspect-[4/5]">
          <img
            src="/assets/images/qpick.jpg"
            alt={hero.captions.qpick}
            loading="lazy"
            className="size-full object-cover"
            style={{ objectPosition: '50% 35%' }}
          />
        </Frame>
      </figure>
      <figure>
        <Frame innerClassName="aspect-square">
          <img
            src="/assets/images/extensa.jpg"
            alt={hero.captions.extensa}
            loading="lazy"
            className="size-full object-cover"
          />
        </Frame>
      </figure>
      <div className="col-span-2 mt-2">
        <NowBuilding label={hero.now.label} project={hero.now.project} />
      </div>
    </div>
  );
};

const Headline = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <h1 className="mt-7 text-[2.5rem] font-medium leading-[1.02] tracking-display text-ink sm:text-6xl xl:text-[4.5rem]">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.08 + i * 0.05 }}
            >
              {word}
              {i === words.length - 1 && <Dot />}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </h1>
  );
};

const Hero = () => {
  const { hero } = useT();
  const base = useBase();

  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-signal" />
                {hero.eyebrow}
              </p>
            </Reveal>

            <Headline text={hero.headline} />

            <Reveal delay={0.35}>
              <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-muted">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ButtonLink href={`${base}/contact/`}>
                  {hero.cta.primary}
                </ButtonLink>
                <ButtonLink href="#cases" variant="secondary" icon="down">
                  {hero.cta.secondary}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {hero.facts.map((fact) => (
                  <li
                    key={fact}
                    className="flex items-center gap-2 text-sm text-subtle"
                  >
                    <Check
                      size={14}
                      weight="regular"
                      className="text-signal-ink"
                      aria-hidden="true"
                    />
                    {fact}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="hidden lg:block">
              <EvidenceStack />
            </div>
            <div className="lg:hidden">
              <EvidenceGrid />
            </div>
          </div>
        </div>

        <Reveal delay={0.2} className="mt-20 md:mt-28">
          <dl className="grid grid-cols-2 gap-px overflow-hidden border-y border-line/10 bg-line/10 lg:grid-cols-4">
            {hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col bg-bg py-8 pr-4 sm:pr-8 lg:pl-8 lg:first:pl-0 [&:nth-child(even)]:pl-5"
              >
                <dt className="order-2 mt-3 text-sm font-medium text-ink">
                  {stat.label}
                </dt>
                <dd className="order-1 font-mono text-4xl font-medium tabular-nums tracking-tight text-ink md:text-5xl">
                  <Counter
                    end={stat.value}
                    suffix={stat.suffix}
                    delay={i * 120}
                  />
                </dd>
                <dd className="order-3 mt-1 text-sm leading-snug text-subtle">
                  {stat.note}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export { Hero };

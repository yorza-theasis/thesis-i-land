import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { parseAccent } from '../components/Accented';
import { ButtonLink } from '../components/ButtonLink';
import { Dot } from '../components/Dot';
import { EASE, Reveal } from '../components/motion';
import type { CaseId } from '../data/cases';
import { caseHref, caseThumb, getCase } from '../data/cases';
import { useBase, useT } from '../i18n/LocaleContext';

/* Word-by-word mask reveal. The *accented* phrase takes the brand blue and
 * the logo's dot closes the sentence. */
const Headline = ({ text }: { text: string }) => {
  const words = parseAccent(text).flatMap((seg) =>
    seg.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, accent: seg.accent })),
  );
  return (
    <h1 className="mt-5 text-[2rem] font-medium leading-[1.04] tracking-display text-ink xs:text-4xl sm:text-5xl lg:text-[2.875rem] xl:text-[3.5rem] [@media(max-height:500px)]:text-4xl">
      {words.map(({ word, accent }, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className={`inline-block ${accent ? 'text-signal-ink' : ''}`}
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

/* ─── Project orbit ────────────────────────────────────
 * The studio in the centre, real projects around it: photos on two rings
 * plus a few text chips naming the directions.
 *
 * Motion is layered:
 * - the rings turn in opposite directions, and their radii and node sizes
 *   (all in % of the orbit) keep nodes from ever touching;
 * - node content counter-rotates to stay upright;
 * - light sweeps run along both rings, and signals travel from the studio
 *   out to each project;
 * - the whole system sits in 3D, with outer nodes nearer the viewer, drifts
 *   slowly, tilts toward the pointer and leans back as the hero scrolls away.
 *
 * Hovering or focusing a node pauses the rings, lights up its link to the
 * centre and dims the rest, so every node is easy to read and click. */

type Node =
  | { kind: 'case'; id: CaseId; angle: number }
  | { kind: 'chip'; index: number; angle: number };

type RingSpec = {
  key: 'inner' | 'outer';
  nodes: Node[];
  /** Ring radius, % of the orbit width. */
  radius: number;
  /** Photo node width, % of the orbit width. */
  size: number;
  spin: 'cw' | 'ccw';
  /** Distance toward the viewer, in cqw of the orbit so depth scales with it. */
  depth: string;
  /** Entrance order offset, so the inner ring lands first. */
  order: number;
};

const RINGS: RingSpec[] = [
  {
    key: 'outer',
    radius: 47.5,
    size: 16,
    spin: 'cw',
    depth: '13cqw',
    order: 3,
    nodes: [
      // Chips sit 60deg from every inner node: on phones, where the rings
      // turn together, that keeps the wide labels clear of the photos.
      { kind: 'case', id: 'niania', angle: 10 },
      { kind: 'chip', index: 0, angle: 90 },
      { kind: 'case', id: 'wirebender', angle: 130 },
      { kind: 'chip', index: 1, angle: 210 },
      { kind: 'case', id: 'compliance', angle: 250 },
      { kind: 'chip', index: 2, angle: 330 },
    ],
  },
  {
    key: 'inner',
    radius: 23,
    size: 19,
    spin: 'ccw',
    depth: '6.5cqw',
    order: 0,
    nodes: [
      { kind: 'case', id: 'extensa', angle: 270 },
      { kind: 'case', id: 'qpick', angle: 30 },
      { kind: 'case', id: 'crsf', angle: 150 },
    ],
  },
];

const RING_SPIN = { cw: 'orbit-cw', ccw: 'orbit-ccw' } as const;

/* Offsets into the 6s signal cycle, spread so pulses never fire together. */
const SIGNAL_DELAYS = {
  outer: [3.1, 0.4, 4.6, 1.7, 5.3, 2.5],
  inner: [1.2, 3.8, 5.9],
};

const polar = (angle: number, r: number) => {
  const rad = (angle * Math.PI) / 180;
  // Rounded so server and client render identical attribute strings.
  return {
    x: +(50 + r * Math.cos(rad)).toFixed(3),
    y: +(50 + r * Math.sin(rad)).toFixed(3),
  };
};

const nodeKey = (ring: string, n: Node) => `${ring}-${n.angle}`;

const CaseNode = ({ id, deep }: { id: CaseId; deep: boolean }) => {
  const { cases } = useT();
  const base = useBase();
  const thumb = caseThumb(getCase(id));
  return (
    <Link
      href={caseHref(base, id)}
      className="group/node relative block w-full"
      aria-label={cases[id].title}
    >
      <span
        className={`block aspect-square overflow-hidden rounded-2xl bg-surface ring-1 ring-line/15 transition-transform duration-500 ease-spring group-hover/node:scale-[1.08] group-focus-visible/node:scale-[1.08] ${
          deep
            ? 'shadow-[0_28px_50px_-20px_rgb(0_0_0/0.7)]'
            : 'shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)]'
        }`}
        style={
          thumb?.background ? { backgroundColor: thumb.background } : undefined
        }
      >
        {thumb && (
          <img
            src={thumb.src}
            alt=""
            className={`size-full ${thumb.background ? 'object-contain p-1.5' : 'object-cover'}`}
            style={
              thumb.position ? { objectPosition: thumb.position } : undefined
            }
          />
        )}
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-bg/90 px-2.5 py-1 text-xs text-ink opacity-0 ring-1 ring-line/10 transition-opacity duration-300 group-hover/node:opacity-100 group-focus-visible/node:opacity-100">
        {cases[id].title}
      </span>
    </Link>
  );
};

const Ring = ({
  spec,
  active,
  onActive,
}: {
  spec: RingSpec;
  active: string | null;
  onActive: (key: string | null) => void;
}) => {
  const { hero } = useT();
  return (
    <div className={`orbit-3d absolute inset-0 ${RING_SPIN[spec.spin]}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full overflow-visible"
      >
        {spec.nodes.map((n, i) => {
          const p = polar(n.angle, spec.radius);
          const lit = active === nodeKey(spec.key, n);
          return (
            <Fragment key={n.angle}>
              <motion.line
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                strokeWidth="0.2"
                style={{
                  stroke: lit
                    ? 'rgb(var(--signal) / 0.7)'
                    : 'rgb(var(--line) / 0.12)',
                  transition: 'stroke 300ms',
                }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.9,
                  ease: EASE,
                  delay: 0.7 + (spec.order + i) * 0.07,
                }}
              />
              <line
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                pathLength={100}
                strokeWidth="0.45"
                strokeLinecap="round"
                stroke="rgb(var(--signal))"
                className="orbit-signal"
                style={
                  {
                    '--signal-delay': `${SIGNAL_DELAYS[spec.key][i]}s`,
                  } as CSSProperties
                }
              />
            </Fragment>
          );
        })}
      </svg>
      {spec.nodes.map((n, i) => {
        const p = polar(n.angle, spec.radius);
        const key = nodeKey(spec.key, n);
        return (
          <div
            key={n.angle}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: n.kind === 'case' ? `${spec.size}%` : undefined,
              transform: `translate(-50%, -50%) translateZ(${spec.depth})`,
            }}
            // Mouse only: a tap on a phone would otherwise leave the rest
            // of the orbit dimmed.
            onPointerEnter={(e) => e.pointerType === 'mouse' && onActive(key)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && onActive(null)}
            onFocus={() => onActive(key)}
            onBlur={() => onActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 16,
                delay: 0.95 + (spec.order + i) * 0.08,
              }}
            >
              <div className="orbit-upright">
                <div
                  className={`transition-opacity duration-300 ${
                    active && active !== key ? 'opacity-40' : ''
                  }`}
                >
                  {n.kind === 'case' ? (
                    <CaseNode id={n.id} deep={spec.key === 'outer'} />
                  ) : (
                    <span className="block whitespace-nowrap rounded-full bg-surface px-2 py-0.5 text-[0.6875rem] font-medium text-ink shadow-[0_14px_34px_-14px_rgb(0_0_0/0.6)] ring-1 ring-line/15 sm:px-3 sm:py-1.5 sm:text-xs xl:text-[0.8125rem]">
                      {hero.orbit.chips[n.index]}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

const ProjectOrbit = () => {
  const { hero } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref);
  const [active, setActive] = useState<string | null>(null);

  // Pointer position relative to the orbit centre, -1..1 on each axis.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduceMotion || !inView) return undefined;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      pointerX.set(
        clamp((e.clientX - r.left - r.width / 2) / (window.innerWidth / 2)),
      );
      pointerY.set(
        clamp((e.clientY - r.top - r.height / 2) / (window.innerHeight / 2)),
      );
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [reduceMotion, inView, pointerX, pointerY]);

  // Leans back and settles as the hero scrolls out of view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center center', 'end start'],
  });
  const lean = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const settle = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotateX = useTransform(
    [springY, lean],
    ([y, l]: number[]) => -y! * 10 + l!,
  );
  const rotateY = useTransform(springX, (x) => x * 12);

  return (
    <motion.div
      ref={ref}
      role="group"
      aria-label={hero.orbit.label}
      className="orbit relative mx-auto aspect-square w-[80%] max-w-[34rem] [container-type:inline-size] sm:w-[86%] lg:w-[92%] lg:max-w-[min(34rem,calc(100dvh-10rem))] xl:w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
    >
      {/* Perspective and depths are in cqw, so a phone-sized orbit tilts
          exactly like the desktop one instead of bulging past the screen. */}
      <div className="size-full" style={{ perspective: '265cqw' }}>
        <motion.div
          className="orbit-3d relative size-full"
          style={reduceMotion ? undefined : { rotateX, rotateY, scale: settle }}
        >
          <div className="orbit-3d orbit-drift absolute inset-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="absolute inset-0 size-full -rotate-90 overflow-visible"
            >
              {RINGS.map((ring) => (
                <motion.circle
                  key={ring.key}
                  cx="50"
                  cy="50"
                  r={ring.radius}
                  fill="none"
                  stroke="rgb(var(--line) / 0.1)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.6,
                    ease: EASE,
                    delay: 0.3 + ring.order * 0.08,
                  }}
                />
              ))}
            </svg>
            {RINGS.map((ring) => (
              <span
                key={ring.key}
                aria-hidden="true"
                className={`orbit-sweep absolute rounded-full ${
                  ring.spin === 'cw' ? 'orbit-sweep-cw' : 'orbit-sweep-ccw'
                }`}
                style={{ inset: `${50 - ring.radius}%` }}
              />
            ))}

            {RINGS.map((ring) => (
              <Ring
                key={ring.key}
                spec={ring}
                active={active}
                onActive={setActive}
              />
            ))}

            {/* The studio at the centre of its work. */}
            <div
              className="absolute left-1/2 top-1/2 size-[21%]"
              style={{ transform: 'translate(-50%, -50%) translateZ(9.5cqw)' }}
            >
              <motion.div
                className="flex size-full items-center justify-center rounded-full bg-surface shadow-[0_24px_60px_-24px_rgb(0_0_0/0.65)] ring-1 ring-line/15"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 14,
                  delay: 0.25,
                }}
              >
                <img
                  src="/tslight.png"
                  alt="thesis-i"
                  className="block w-[54%] dark:hidden"
                />
                <img
                  src="/ts.png"
                  alt="thesis-i"
                  className="hidden w-[54%] dark:block"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { hero, common } = useT();
  const base = useBase();

  return (
    <section className="flex min-h-[100dvh] items-center overflow-x-clip pb-16 pt-24 [@media(max-height:500px)]:pt-20">
      <div className="container-page grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="text-sm text-muted">{hero.eyebrow}</p>
          </Reveal>
          <Headline text={hero.headline} />
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted">
              {hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={`${base}/contact/`}>
                {common.bookCall}
              </ButtonLink>
              <ButtonLink href={`${base}/cases/`} variant="secondary">
                {common.allCases}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <ProjectOrbit />
        </div>
      </div>
    </section>
  );
};

/* Track record from the company deck, directly under the hero. */
const Stats = () => {
  const { hero } = useT();
  return (
    <section className="pb-16 sm:pb-24">
      <div className="container-page">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-line/10 ring-1 ring-line/10 lg:grid-cols-4">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-0 flex-col bg-bg p-5 sm:p-6 md:p-8"
              >
                <dt className="order-2 mt-3 text-sm font-medium text-ink">
                  {stat.label}
                </dt>
                <dd className="order-1 text-3xl font-medium tabular-nums tracking-[-0.03em] text-ink xs:text-4xl md:text-5xl">
                  {stat.value}
                  <span className="text-signal-ink">{stat.suffix}</span>
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

export { Hero, Stats };

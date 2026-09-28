import { motion } from 'framer-motion';
import Link from 'next/link';
import { Fragment } from 'react';

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
    <h1 className="mt-5 text-4xl font-medium leading-[1.04] tracking-display text-ink sm:text-5xl lg:text-[2.875rem] xl:text-[3.5rem]">
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
 * plus a few text chips naming the directions. Both rings turn together at
 * one slow speed (CSS transforms only) so nodes never collide, node content
 * counter-rotates to stay upright, and the orbit pauses on hover or focus
 * so every node is easy to click. */

type Node =
  | { kind: 'case'; id: CaseId; angle: number }
  | { kind: 'chip'; index: number; angle: number };

const INNER: Node[] = [
  { kind: 'case', id: 'extensa', angle: 270 },
  { kind: 'case', id: 'qpick', angle: 30 },
  { kind: 'case', id: 'crsf', angle: 150 },
];

const OUTER: Node[] = [
  { kind: 'chip', index: 0, angle: 0 },
  { kind: 'case', id: 'niania', angle: 60 },
  { kind: 'chip', index: 1, angle: 120 },
  { kind: 'case', id: 'wirebender', angle: 180 },
  { kind: 'chip', index: 2, angle: 240 },
  { kind: 'case', id: 'compliance', angle: 300 },
];

const RING_SPIN = { cw: 'orbit-cw', ccw: 'orbit-ccw' } as const;

const INNER_R = 29;
const OUTER_R = 45;

const polar = (angle: number, r: number) => {
  const rad = (angle * Math.PI) / 180;
  // Rounded so server and client render identical attribute strings.
  return {
    x: +(50 + r * Math.cos(rad)).toFixed(3),
    y: +(50 + r * Math.sin(rad)).toFixed(3),
  };
};

const CaseNode = ({ id, size }: { id: CaseId; size: string }) => {
  const { cases } = useT();
  const base = useBase();
  const meta = getCase(id);
  const thumb = caseThumb(meta);
  return (
    <Link
      href={caseHref(base, id)}
      className={`group/node relative block ${size}`}
      aria-label={cases[id].title}
    >
      <span
        className="block aspect-square overflow-hidden rounded-2xl bg-surface shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)] ring-1 ring-line/15 transition-transform duration-500 ease-spring group-hover/node:scale-[1.08]"
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
  nodes,
  radius,
  direction,
  nodeSize,
}: {
  nodes: Node[];
  radius: number;
  direction: 'cw' | 'ccw';
  nodeSize: string;
}) => {
  const { hero } = useT();
  return (
    <div className={`absolute inset-0 ${RING_SPIN[direction]}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full overflow-visible"
      >
        {nodes.map((n) => {
          const p = polar(n.angle, radius);
          return (
            <line
              key={n.angle}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke="rgb(var(--line) / 0.12)"
              strokeWidth="0.2"
            />
          );
        })}
      </svg>
      {nodes.map((n) => {
        const p = polar(n.angle, radius);
        return (
          <div
            key={n.angle}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="orbit-upright">
              {n.kind === 'case' ? (
                <CaseNode id={n.id} size={nodeSize} />
              ) : (
                <span className="block whitespace-nowrap rounded-full bg-surface px-2.5 py-1 text-[0.6875rem] font-medium text-ink shadow-[0_10px_30px_-14px_rgb(0_0_0/0.5)] ring-1 ring-line/15 sm:px-3 sm:py-1.5 sm:text-sm">
                  {hero.orbit.chips[n.index]}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ProjectOrbit = () => {
  const { hero } = useT();
  return (
    <motion.div
      role="group"
      aria-label={hero.orbit.label}
      className="orbit relative mx-auto aspect-square w-[88%] max-w-[34rem] sm:w-full"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
    >
      <span
        aria-hidden="true"
        className="absolute rounded-full border border-line/10"
        style={{ inset: `${50 - OUTER_R}%` }}
      />
      <span
        aria-hidden="true"
        className="absolute rounded-full border border-line/10"
        style={{ inset: `${50 - INNER_R}%` }}
      />

      <Ring
        nodes={OUTER}
        radius={OUTER_R}
        direction="cw"
        nodeSize="w-[3.25rem] sm:w-[5.25rem]"
      />
      <Ring
        nodes={INNER}
        radius={INNER_R}
        direction="cw"
        nodeSize="w-[3.75rem] sm:w-[6.25rem]"
      />

      {/* The studio at the centre of its work. */}
      <div className="absolute left-1/2 top-1/2 flex size-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface shadow-[0_24px_60px_-24px_rgb(0_0_0/0.6)] ring-1 ring-line/15">
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
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { hero, common } = useT();
  const base = useBase();

  return (
    <section className="flex min-h-[100dvh] items-center pb-16 pt-24">
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
    <section className="pb-24">
      <div className="container-page">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-line/10 ring-1 ring-line/10 lg:grid-cols-4">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-bg p-6 md:p-8">
                <dt className="order-2 mt-3 text-sm font-medium text-ink">
                  {stat.label}
                </dt>
                <dd className="order-1 text-4xl font-medium tabular-nums tracking-[-0.03em] text-ink md:text-5xl">
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

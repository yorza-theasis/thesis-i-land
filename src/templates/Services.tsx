import { motion, useInView } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { memo, useEffect, useRef, useState } from 'react';

import { EASE, RevealGroup, RevealItem } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Order matches services.items in translations. */
const TAGS = [
  ['RAG', 'LLM agents', 'NER', 'On-premise'],
  ['Next.js', 'React Native', 'Kotlin', 'KMP'],
  ['Java', 'Spring Boot', 'gRPC', 'Kafka'],
  ['PCB design', 'Control electronics', 'Robotics', '3D printing'],
  ['AWS', 'Kubernetes', 'Docker', 'Helm'],
  ['System design', 'API design', 'GitOps', 'DDD'],
  ['Design', 'Architecture & Logic', 'Backend & Security'],
];

const LAYOUT = [
  'md:col-span-2 lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-5 lg:row-span-2',
  'lg:col-span-7',
  'lg:col-span-3',
  'lg:col-span-4',
];

/* ─── Perpetual tile visuals — each isolated so its loop never re-renders
 * the grid. Only transform/opacity animate. ─────────────────────────── */

const LOG_LINES = [
  { text: '› night run 02:00 · ward AIS-2', tone: 'muted' },
  { text: '› episode 1182 · 37 documents queued', tone: 'muted' },
  { text: '› rules engine ········ 35/37 passed', tone: 'muted' },
  { text: '› llm review ·········· 2 flags raised', tone: 'signal' },
  { text: '› rag lookup: MoH protocol §4.3', tone: 'muted' },
  { text: '› report → attending physician', tone: 'ink' },
] as const;

const TONE = {
  muted: 'text-muted',
  signal: 'text-signal-ink',
  ink: 'text-ink',
} as const;

const AgentLog = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!inView) return undefined;
    const done = count >= LOG_LINES.length;
    const id = setTimeout(
      () => setCount(done ? 1 : count + 1),
      done ? 2600 : 900,
    );
    return () => clearTimeout(id);
  }, [count, inView]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="flex flex-col rounded-2xl bg-bg/70 ring-1 ring-line/[0.08]"
    >
      <div className="flex items-center justify-between border-b border-line/[0.08] px-5 py-3">
        <span className="font-mono text-[11px] text-subtle">
          gmi-verifier / agent.log
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] text-subtle">
          <span className="relative flex size-1.5">
            <span className="animate-ping-soft absolute inset-0 rounded-full bg-signal" />
            <span className="relative size-1.5 rounded-full bg-signal" />
          </span>
          live
        </span>
      </div>
      {/* Every line is always in the DOM (hidden until reached), so the
          log keeps a constant height while it types itself out. */}
      <div className="space-y-1.5 p-5 font-mono text-[12px] leading-6">
        {LOG_LINES.map((line, i) => (
          <motion.p
            key={line.text}
            initial={false}
            animate={i < count ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={TONE[line.tone]}
          >
            {line.text}
            {i === count - 1 && (
              <span className="animate-caret ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-ink/70" />
            )}
          </motion.p>
        ))}
      </div>
    </div>
  );
});
AgentLog.displayName = 'AgentLog';

const BARS = [
  0.42, 0.55, 0.38, 0.62, 0.48, 0.7, 0.44, 0.58, 0.36, 0.66, 0.5, 0.4, 0.6,
  0.46, 0.52, 0.34,
];

const LatencyBars = memo(() => (
  <div aria-hidden="true" className="flex items-end justify-between gap-6">
    <div className="flex h-14 flex-1 items-end gap-[3px]">
      {BARS.map((h, i) => (
        <span
          key={i}
          className={`animate-bar block h-full flex-1 rounded-sm ${
            i === BARS.length - 1 ? 'bg-signal' : 'bg-line/15'
          }`}
          style={
            {
              '--from': h * 0.6,
              '--to': h,
              animationDelay: `${i * -0.17}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
    <div className="text-right font-mono">
      <div className="text-[11px] uppercase tracking-label text-subtle">
        p95
      </div>
      <div className="text-lg text-ink">42 ms</div>
    </div>
  </div>
));
LatencyBars.displayName = 'LatencyBars';

const STAGES = ['build', 'test', 'scan', 'deploy'];

const Pipeline = memo(() => (
  <div aria-hidden="true">
    <div className="relative flex items-center justify-between overflow-hidden py-2">
      <span className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-line/15" />
      <span className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <span className="animate-travel block">
          <span className="block size-1.5 rounded-full bg-signal shadow-[0_0_0_4px_rgb(var(--signal)/0.15)]" />
        </span>
      </span>
      {STAGES.map((s) => (
        <span
          key={s}
          className="relative rounded-full border border-line/15 bg-elev px-3 py-1 font-mono text-[11px] text-muted"
        >
          {s}
        </span>
      ))}
    </div>
    <p className="mt-4 font-mono text-[11px] text-subtle">
      deploy #412 · main · 3m 18s ·{' '}
      <span className="text-signal-ink">healthy</span>
    </p>
  </div>
));
Pipeline.displayName = 'Pipeline';

const HardwareShots = () => (
  <div className="grid flex-1 grid-cols-2 gap-3">
    {[
      {
        src: '/assets/images/crsf-pcb.jpg',
        label: 'PCB · CRSF',
        bg: 'bg-[#193461]',
      },
      { src: '/assets/images/wire-bender-1.jpg', label: '1,400 / h', bg: '' },
    ].map((shot) => (
      <figure key={shot.src} className="flex flex-col">
        {/* Grows with the tile (row-span-2 on desktop), 4:5 when stacked. */}
        <div
          className={`relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-line/[0.08] lg:aspect-auto lg:min-h-[240px] lg:flex-1 ${shot.bg}`}
        >
          <img
            src={shot.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
        <figcaption className="mt-2 font-mono text-[11px] text-subtle">
          {shot.label}
        </figcaption>
      </figure>
    ))}
  </div>
);

const VISUALS: Record<number, ReactNode> = {
  0: <AgentLog />,
  2: <LatencyBars />,
  3: <HardwareShots />,
  4: <Pipeline />,
};

const Services = () => {
  const { services } = useT();

  return (
    <Section id="services">
      <SectionHeader
        index="02"
        label={services.label}
        title={services.title}
        description={services.description}
      />

      <RevealGroup className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 lg:auto-rows-[minmax(250px,auto)] lg:grid-cols-12">
        {services.items.map((service, i) => {
          const visual = VISUALS[i];
          return (
            <RevealItem
              as="article"
              key={service.title}
              className={`group relative flex flex-col rounded-[1.5rem] bg-elev p-7 ring-1 ring-line/[0.07] transition-shadow duration-500 hover:ring-line/[0.16] md:p-8 ${LAYOUT[i]}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                <span className="font-mono text-xs text-signal-ink">
                  {service.stat}
                </span>
              </div>

              {visual && (
                <div className="mt-7 flex flex-1 flex-col">{visual}</div>
              )}

              <div className={`${visual ? 'mt-8' : 'mt-auto pt-12'}`}>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-ink md:text-[1.375rem]">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-muted">
                  {service.description}
                </p>
                <p className="mt-5 font-mono text-[11px] leading-5 text-subtle">
                  {TAGS[i]!.join(' / ')}
                </p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
};

export { Services };

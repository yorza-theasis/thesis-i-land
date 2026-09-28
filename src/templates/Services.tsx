import type { Icon } from '@phosphor-icons/react';
import {
  Brain,
  CloudArrowUp,
  Cpu,
  Database,
  DeviceMobile,
  TreeStructure,
  Wrench,
} from '@phosphor-icons/react';
import type { ReactNode } from 'react';

import { RevealGroup, RevealItem } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Everything below is aligned with services.items in translations. */
const TAGS = [
  ['RAG', 'LLM agents', 'NER', 'On-premise'],
  ['Next.js', 'React Native', 'Kotlin', 'KMP'],
  ['Java', 'Spring Boot', 'gRPC', 'Kafka'],
  ['PCB design', 'Control electronics', 'Robotics', '3D printing'],
  ['AWS', 'Kubernetes', 'Docker', 'Helm'],
  ['System design', 'API design', 'GitOps', 'DDD'],
  ['Design', 'Architecture & Logic', 'Backend & Security'],
];

const ICONS: Icon[] = [
  Brain,
  DeviceMobile,
  Database,
  Cpu,
  CloudArrowUp,
  TreeStructure,
  Wrench,
];

const LAYOUT = [
  'md:col-span-2 lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-5 lg:row-span-2',
  'md:col-span-2 lg:col-span-7',
  'lg:col-span-3',
  'lg:col-span-4',
];

const Shot = ({
  src,
  className = '',
  position,
  background,
}: {
  src: string;
  className?: string;
  position?: string;
  background?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-xl ring-1 ring-line/[0.08] ${className}`}
    style={background ? { backgroundColor: background } : undefined}
  >
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      style={position ? { objectPosition: position } : undefined}
    />
  </div>
);

/* Real product screenshots and hardware photos; the last tile is tinted. */
const VISUALS: Record<number, ReactNode> = {
  0: (
    <Shot
      src="/assets/images/ai-agent-compliance.jpg"
      position="0% 50%"
      className="aspect-[16/10] lg:aspect-auto lg:min-h-[16rem] lg:flex-1"
    />
  ),
  1: (
    <Shot
      src="/assets/images/21_1x_shots_so.jpg"
      position="50% 30%"
      className="aspect-[16/9]"
    />
  ),
  2: (
    <Shot
      src="/assets/images/shot_zzk.jpg"
      position="0% 0%"
      className="aspect-[16/9]"
    />
  ),
  3: (
    <div className="grid flex-1 grid-cols-2 gap-3">
      <Shot
        src="/assets/images/crsf-pcb.jpg"
        background="#193461"
        className="aspect-[4/5] lg:aspect-auto lg:min-h-[15rem]"
      />
      <Shot
        src="/assets/images/wire-bender-1.jpg"
        className="aspect-[4/5] lg:aspect-auto lg:min-h-[15rem]"
      />
    </div>
  ),
  4: (
    <Shot
      src="/assets/images/684_1x_shots_so.jpg"
      className="aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[12rem]"
    />
  ),
  5: (
    <Shot
      src="/assets/images/nexus.jpg"
      position="0% 0%"
      className="aspect-[16/10]"
    />
  ),
};

const Services = () => {
  const { services } = useT();

  return (
    <Section id="services" tone="alt">
      <SectionHeader
        title={services.title}
        description={services.description}
      />

      <RevealGroup className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-12">
        {services.items.map((service, i) => {
          const visual = VISUALS[i];
          const TileIcon = ICONS[i]!;
          const tinted = i === 6;
          const wide = i === 4;
          // Tall tiles let the image grow; others pin their tags to the bottom.
          const tall = i === 0 || i === 3;
          const copy = (
            <div className={`flex flex-col ${tall ? '' : 'flex-1'}`}>
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-signal/10 text-signal-ink">
                  <TileIcon size={22} weight="regular" aria-hidden="true" />
                </span>
                <span className="text-sm text-subtle">{service.stat}</span>
              </div>
              <h3 className="mt-5 text-xl font-medium tracking-[-0.02em] text-ink md:text-[1.375rem]">
                {service.title}
              </h3>
              <p className="mt-2 max-w-[54ch] text-[0.9375rem] leading-relaxed text-muted">
                {service.description}
              </p>
              <p className="mt-auto pt-5 text-sm text-subtle">
                {TAGS[i]!.join(', ')}
              </p>
            </div>
          );
          return (
            <RevealItem
              as="article"
              key={service.title}
              className={`group relative flex flex-col gap-6 rounded-[1.5rem] p-6 ring-1 md:p-7 ${LAYOUT[i]} ${
                tinted
                  ? 'bg-signal/[0.08] ring-signal/25'
                  : 'bg-surface ring-line/[0.07]'
              } ${wide ? 'lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-8' : ''}`}
            >
              {wide ? (
                <>
                  {copy}
                  {visual}
                </>
              ) : (
                <>
                  {visual && (
                    <div className={`flex flex-col ${tall ? 'lg:flex-1' : ''}`}>
                      {visual}
                    </div>
                  )}
                  {copy}
                </>
              )}
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
};

export { Services };

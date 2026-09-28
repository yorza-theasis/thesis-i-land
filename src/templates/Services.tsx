import type { ReactNode } from 'react';

import { RevealGroup, RevealItem } from '../components/motion';
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

const Shot = ({
  src,
  className = '',
  position,
}: {
  src: string;
  className?: string;
  position?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-xl ring-1 ring-line/[0.08] ${className}`}
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

/* Real product and hardware photos give the grid its visual variety. */
const VISUALS: Record<number, ReactNode> = {
  0: (
    <Shot
      src="/assets/images/ai-agent-compliance.jpg"
      position="0% 50%"
      className="aspect-[16/10] lg:aspect-auto lg:min-h-[260px] lg:flex-1"
    />
  ),
  3: (
    <div className="grid flex-1 grid-cols-2 gap-3">
      <Shot
        src="/assets/images/crsf-pcb.jpg"
        className="aspect-[4/5] bg-[#193461] lg:aspect-auto lg:min-h-[240px]"
      />
      <Shot
        src="/assets/images/wire-bender-1.jpg"
        className="aspect-[4/5] lg:aspect-auto lg:min-h-[240px]"
      />
    </div>
  ),
};

const Services = () => {
  const { services } = useT();

  return (
    <Section id="services">
      <SectionHeader
        title={services.title}
        description={services.description}
      />

      <RevealGroup className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:auto-rows-[minmax(240px,auto)] lg:grid-cols-12">
        {services.items.map((service, i) => {
          const visual = VISUALS[i];
          const wide = i === 4;
          return (
            <RevealItem
              as="article"
              key={service.title}
              className={`group relative flex flex-col rounded-[1.5rem] p-7 ring-1 md:p-8 ${LAYOUT[i]} ${
                i === 6
                  ? 'bg-signal/[0.07] ring-signal/20'
                  : 'bg-elev ring-line/[0.07]'
              }`}
            >
              {visual && (
                <div className="mb-8 flex flex-1 flex-col">{visual}</div>
              )}

              <div
                className={`flex flex-1 flex-col ${
                  wide ? 'lg:grid lg:grid-cols-2 lg:gap-8' : ''
                }`}
              >
                <div>
                  <p className="text-sm text-subtle">{service.stat}</p>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] text-ink md:text-[1.375rem]">
                    {service.title}
                  </h3>
                </div>
                <div className={wide ? '' : 'mt-auto'}>
                  <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <p className="mt-4 text-sm text-subtle">
                    {TAGS[i]!.join(', ')}
                  </p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
};

export { Services };

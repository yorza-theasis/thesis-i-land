import { RevealGroup, RevealItem } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { SERVICE_ICONS } from '../data/serviceIcons';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Everything below is aligned with services.items in translations. */
const TAGS = [
  ['RAG', 'LLM agents', 'NER', 'On-premise'],
  ['Next.js', 'React Native', 'Kotlin', 'KMP'],
  ['Java', 'Spring Boot', 'gRPC', 'Kafka'],
  ['PCB design', 'Control electronics', 'Robotics'],
  ['AWS', 'Kubernetes', 'Docker', 'Helm'],
  ['System design', 'API design', 'DDD'],
  ['Design', 'Architecture & Logic', 'Backend & Security'],
];

/* One real artefact per capability, cropped to the part that reads at
 * thumbnail size. The last service has no picture: it spans the full row. */
const THUMBS: ({ src: string; position: string } | null)[] = [
  { src: '/assets/images/ai-agent-compliance.jpg', position: '72% 55%' },
  { src: '/assets/images/21_1x_shots_so.jpg', position: '68% 42%' },
  { src: '/assets/images/shot_zzk.jpg', position: '18% 12%' },
  { src: '/assets/images/wire-bender-1.jpg', position: '50% 45%' },
  { src: '/assets/images/684_1x_shots_so.jpg', position: '22% 32%' },
  { src: '/assets/images/nexus.jpg', position: '30% 18%' },
  null,
];

/* Screenshots come in light and dark UIs; showing them in greyscale keeps
 * the grid calm, and the colour version fades in (opacity only) on hover. */
const Thumb = ({ src, position }: { src: string; position: string }) => (
  <div className="relative aspect-[4/3] w-20 shrink-0 self-start overflow-hidden rounded-xl bg-bg ring-1 ring-line/10 xs:w-28 sm:w-40 sm:self-stretch lg:w-36 xl:w-40">
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute inset-0 size-full object-cover opacity-80 grayscale dark:brightness-[0.8]"
      style={{ objectPosition: position }}
    />
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute inset-0 size-full object-cover opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
      style={{ objectPosition: position }}
    />
  </div>
);

const Services = () => {
  const { services } = useT();

  return (
    <Section id="services" tone="alt">
      <SectionHeader
        title={services.title}
        description={services.description}
      />

      <RevealGroup className="mt-12 grid gap-3 md:mt-14 md:gap-4 lg:grid-cols-2">
        {services.items.map((service, i) => {
          const TileIcon = SERVICE_ICONS[i]!;
          const thumb = THUMBS[i];

          if (!thumb) {
            // Closing capability: full row, brand tint, text split in two.
            return (
              <RevealItem
                as="article"
                key={service.title}
                className="grid gap-4 rounded-[1.25rem] bg-signal/[0.08] p-5 ring-1 ring-signal/25 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 md:p-7 lg:col-span-2"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-signal-strong text-white">
                    <TileIcon size={20} weight="regular" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-signal-ink">{service.area}</p>
                    <h3 className="mt-1 text-lg font-medium tracking-[-0.01em] text-ink md:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-subtle">{service.stat}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[0.9375rem] leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <p className="mt-3 text-sm text-subtle">
                    {TAGS[i]!.join(', ')}
                  </p>
                </div>
              </RevealItem>
            );
          }

          return (
            <RevealItem
              as="article"
              key={service.title}
              className="group flex min-w-0 gap-4 rounded-[1.25rem] bg-surface p-3 ring-1 ring-line/[0.07] transition-shadow duration-300 hover:ring-line/[0.16] sm:gap-5 sm:p-4"
            >
              <Thumb src={thumb.src} position={thumb.position} />
              <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
                <p className="flex items-center gap-2 text-xs text-signal-ink sm:text-[0.8125rem]">
                  <TileIcon
                    size={16}
                    weight="regular"
                    aria-hidden="true"
                    className="shrink-0"
                  />
                  {service.area}
                </p>
                <h3 className="mt-1.5 text-base font-medium leading-snug tracking-[-0.01em] text-ink sm:text-lg">
                  {service.title}
                </h3>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <p className="mt-auto flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-2 text-xs text-subtle">
                  <span className="min-w-0">{TAGS[i]!.join(', ')}</span>
                  <span className="shrink-0 text-signal-ink">
                    {service.stat}
                  </span>
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

import { Frame } from '../components/Frame';
import { Reveal, RevealGroup, RevealItem } from '../components/motion';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

const About = () => {
  const { about } = useT();

  return (
    <Section id="about" tone="alt">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="text-[2rem] font-medium leading-[1.12] tracking-heading text-ink md:text-[2.625rem]">
              {about.statement}{' '}
              <span className="text-subtle">{about.statementMuted}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Frame innerClassName="aspect-[16/9]">
              <img
                src="/assets/images/why-thesis-i.jpg"
                alt=""
                width={1400}
                height={793}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </Frame>
          </Reveal>
        </div>

        <RevealGroup className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-6">
          {about.principles.map((p) => (
            <RevealItem
              key={p.title}
              className="flex flex-col rounded-[1.5rem] bg-surface p-7 ring-1 ring-line/[0.07] md:p-8"
            >
              <span
                aria-hidden="true"
                className="h-1 w-8 rounded-full bg-signal"
              />
              <h3 className="mt-6 text-lg font-medium tracking-[-0.01em] text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                {p.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
};

export { About };

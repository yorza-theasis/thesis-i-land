import { Reveal, RevealGroup, RevealItem } from '../components/motion';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

const About = () => {
  const { about } = useT();

  return (
    <Section id="about">
      <Reveal>
        <p className="label flex items-center gap-3">
          <span className="text-signal-ink">05</span>
          <span aria-hidden="true" className="h-px w-8 bg-line/20" />
          {about.label}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <h2 className="text-[2rem] font-medium leading-[1.12] tracking-heading text-ink md:text-[2.75rem]">
            {about.statement}{' '}
            <span className="text-subtle">{about.statementMuted}</span>
          </h2>
        </Reveal>

        <RevealGroup className="grid gap-px overflow-hidden rounded-[1.5rem] bg-line/10 ring-1 ring-line/10 sm:grid-cols-2 lg:col-span-6">
          {about.principles.map((p, i) => (
            <RevealItem
              key={p.title}
              className="flex flex-col bg-bg p-7 md:p-8"
            >
              <span className="font-mono text-xs text-subtle">0{i + 1}</span>
              <h3 className="mt-10 text-lg font-medium tracking-[-0.01em] text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {p.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <div className="mt-24 md:mt-32">
        <Reveal>
          <h3 className="label">{about.industriesLabel}</h3>
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-5 grid border-t border-line/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {about.industries.map((item) => (
            <RevealItem
              as="li"
              key={item.name}
              className="flex items-baseline gap-5 border-b border-line/10 py-6 sm:pr-8"
            >
              <span className="flex w-28 shrink-0 items-center gap-2.5 text-base font-medium text-ink">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-signal"
                />
                {item.name}
              </span>
              <span className="text-[15px] leading-relaxed text-muted">
                {item.text}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
};

export { About };

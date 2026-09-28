import { Reveal, RevealGroup, RevealItem } from '../components/motion';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

const About = () => {
  const { about } = useT();

  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <h2 className="text-[2rem] font-medium leading-[1.12] tracking-heading text-ink md:text-[2.75rem]">
            {about.statement}{' '}
            <span className="text-subtle">{about.statementMuted}</span>
          </h2>
        </Reveal>

        <RevealGroup className="grid gap-px overflow-hidden rounded-[1.5rem] bg-line/10 ring-1 ring-line/10 sm:grid-cols-2 lg:col-span-6">
          {about.principles.map((p) => (
            <RevealItem
              key={p.title}
              className="flex flex-col bg-bg p-7 md:p-8"
            >
              <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
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

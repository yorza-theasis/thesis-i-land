import { RevealGroup, RevealItem } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Every answer visible at once — six short answers don't need an accordion. */
const Faq = () => {
  const { faq } = useT();

  return (
    <Section id="faq">
      <SectionHeader index="07" label={faq.label} title={faq.title} />

      <RevealGroup
        as="div"
        className="mt-16 grid gap-x-12 md:mt-20 md:grid-cols-2"
      >
        {faq.items.map((item) => (
          <RevealItem key={item.q} className="border-t border-line/10 py-8">
            <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] text-ink">
              {item.q}
            </h3>
            <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-muted">
              {item.a}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
};

export { Faq };

import { Accented } from '../components/Accented';
import { Frame } from '../components/Frame';
import { Reveal, RevealGroup, RevealItem } from '../components/motion';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Every answer visible at once: six short answers don't need an accordion. */
const Faq = () => {
  const { faq } = useT();

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 className="text-[2rem] font-medium leading-[1.06] tracking-heading text-ink sm:text-[2.625rem] lg:text-5xl">
                <Accented text={faq.title} />
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 hidden lg:block">
              <Frame innerClassName="aspect-[4/5]">
                <img
                  src="/assets/images/consultation.jpg"
                  alt=""
                  width={800}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </Frame>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="grid gap-4 lg:col-span-8">
          {faq.items.map((item) => (
            <RevealItem
              key={item.q}
              className="rounded-[1.5rem] bg-elev p-6 ring-1 ring-line/[0.06] md:p-8"
            >
              <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] text-ink">
                {item.q}
              </h3>
              <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted">
                {item.a}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
};

export { Faq };

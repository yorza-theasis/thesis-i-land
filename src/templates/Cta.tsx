import {
  ArrowUpRight,
  Check,
  EnvelopeSimple,
  LinkedinLogo,
  TelegramLogo,
} from '@phosphor-icons/react';

import { ButtonLink } from '../components/ButtonLink';
import { Frame } from '../components/Frame';
import { Reveal } from '../components/motion';
import { useBase, useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';
import { AppConfig } from '../utils/AppConfig';

const channels = [
  {
    label: 'Email',
    value: AppConfig.contact.email,
    href: `mailto:${AppConfig.contact.email}`,
    Icon: EnvelopeSimple,
  },
  {
    label: 'Telegram',
    value: '@vu_boru',
    href: AppConfig.contact.telegram,
    Icon: TelegramLogo,
  },
  {
    label: 'LinkedIn',
    value: 'thesis-i',
    href: AppConfig.contact.linkedin,
    Icon: LinkedinLogo,
  },
];

const Cta = () => {
  const { cta, common } = useT();
  const base = useBase();

  return (
    <Section id="contact">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="max-w-[18ch] text-4xl font-medium leading-[1.04] tracking-display text-ink md:text-5xl xl:text-[3.5rem]">
              {cta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-muted">
              {cta.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9">
              <ButtonLink href={`${base}/contact/`}>
                {common.bookCall}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <Frame innerClassName="p-7 md:p-9">
            <p className="text-base font-medium text-ink">
              {cta.benefitsLabel}
            </p>
            <ul className="mt-5 space-y-3">
              {cta.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[15px] text-muted"
                >
                  <Check
                    size={16}
                    weight="regular"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-signal-ink"
                  />
                  {b}
                </li>
              ))}
            </ul>

            <p className="mt-10 text-base font-medium text-ink">
              {cta.channelsLabel}
            </p>
            <ul className="mt-3 space-y-1">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors duration-300 hover:bg-line/[0.05]"
                  >
                    <Icon
                      size={20}
                      weight="light"
                      aria-hidden="true"
                      className="text-muted"
                    />
                    <span className="flex-1 truncate text-[15px] text-ink">
                      {value}
                    </span>
                    <span className="sr-only">{label}</span>
                    <ArrowUpRight
                      size={16}
                      weight="regular"
                      aria-hidden="true"
                      className="text-subtle transition-transform duration-300 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Frame>
        </Reveal>
      </div>
    </Section>
  );
};

export { Cta };

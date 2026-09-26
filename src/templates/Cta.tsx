import {
  ArrowUpRight,
  Check,
  EnvelopeSimple,
  LinkedinLogo,
  TelegramLogo,
} from '@phosphor-icons/react';

import { ButtonLink } from '../components/ButtonLink';
import { Dot } from '../components/Dot';
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
  const { cta } = useT();
  const base = useBase();

  return (
    <Section id="contact">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-signal" />
              {cta.label}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-7 max-w-[18ch] text-[2.5rem] font-medium leading-[1.02] tracking-display text-ink md:text-6xl xl:text-[4.25rem]">
              {cta.title}
              <Dot />
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted">
              {cta.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={`${base}/contact/`}>{cta.primary}</ButtonLink>
              <ButtonLink
                href={`mailto:${AppConfig.contact.email}`}
                variant="secondary"
              >
                {cta.secondary}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <Frame innerClassName="p-7 md:p-9">
            <p className="label">{cta.benefitsLabel}</p>
            <ul className="mt-5 space-y-3.5">
              {cta.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[15px] text-ink"
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

            <p className="label mt-10">{cta.channelsLabel}</p>
            <ul className="mt-3 border-t border-line/10">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group flex items-center gap-4 border-b border-line/10 py-3.5"
                  >
                    <Icon
                      size={20}
                      weight="light"
                      aria-hidden="true"
                      className="text-muted"
                    />
                    <span className="w-20 text-sm text-subtle">{label}</span>
                    <span className="flex-1 truncate text-[15px] text-ink">
                      {value}
                    </span>
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

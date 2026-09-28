import {
  ArrowUpRight,
  Check,
  EnvelopeSimple,
  LinkedinLogo,
  TelegramLogo,
} from '@phosphor-icons/react';

import { ButtonLink } from '../components/ButtonLink';
import { Reveal } from '../components/motion';
import { useBase, useT } from '../i18n/LocaleContext';
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

/* The page's single brand-colour block: the last thing on the page and
 * the one place that should be impossible to miss. */
const Cta = () => {
  const { cta, common } = useT();
  const base = useBase();

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-12 overflow-hidden rounded-[2rem] bg-signal-strong px-6 py-12 text-white sm:px-10 md:py-16 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-20">
            <div className="lg:col-span-7">
              <h2 className="max-w-[18ch] text-4xl font-medium leading-[1.04] tracking-display md:text-5xl xl:text-[3.5rem]">
                {cta.title}
              </h2>
              <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-white">
                {cta.subtitle}
              </p>
              <div className="mt-9">
                <ButtonLink href={`${base}/contact/`} variant="inverse">
                  {common.bookCall}
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-black/15 p-7 ring-1 ring-white/15 md:p-9 lg:col-span-5">
              <p className="text-base font-medium">{cta.benefitsLabel}</p>
              <ul className="mt-5 space-y-3">
                {cta.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[0.9375rem] text-white"
                  >
                    <Check
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-white"
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-base font-medium">{cta.channelsLabel}</p>
              <ul className="mt-3 space-y-1">
                {channels.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors duration-300 hover:bg-white/10"
                    >
                      <Icon size={20} weight="regular" aria-hidden="true" />
                      <span className="flex-1 truncate text-[0.9375rem]">
                        {value}
                      </span>
                      <span className="sr-only">{label}</span>
                      <ArrowUpRight
                        size={16}
                        weight="regular"
                        aria-hidden="true"
                        className="text-white transition-transform duration-300 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export { Cta };

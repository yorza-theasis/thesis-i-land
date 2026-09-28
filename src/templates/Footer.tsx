import {
  ArrowUp,
  EnvelopeSimple,
  LinkedinLogo,
  TelegramLogo,
} from '@phosphor-icons/react';
import Link from 'next/link';

import { useBase, useT } from '../i18n/LocaleContext';
import { AppConfig } from '../utils/AppConfig';
import { Logo } from './Logo';

const channels = [
  {
    label: AppConfig.contact.email,
    href: `mailto:${AppConfig.contact.email}`,
    Icon: EnvelopeSimple,
  },
  { label: 'Telegram', href: AppConfig.contact.telegram, Icon: TelegramLogo },
  { label: 'LinkedIn', href: AppConfig.contact.linkedin, Icon: LinkedinLogo },
];

const Footer = () => {
  const { footer, nav, common } = useT();
  const base = useBase();

  const links = [
    { label: nav.process, href: `${base}/#process` },
    { label: nav.services, href: `${base}/#services` },
    { label: nav.work, href: `${base}/cases/` },
    { label: nav.about, href: `${base}/#about` },
    { label: nav.faq, href: `${base}/#faq` },
    { label: common.bookCall, href: `${base}/contact/` },
  ];

  return (
    <footer className="border-t border-line/10">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 text-base font-medium text-ink">
            {footer.tagline}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {footer.description}
          </p>
        </div>

        <nav aria-label={footer.navigate} className="md:col-span-3">
          <h2 className="label">{footer.navigate}</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="label">{footer.contact}</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {channels.map(({ label, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="inline-flex items-center gap-3 text-sm text-muted transition-colors duration-300 hover:text-ink"
                >
                  <Icon size={18} weight="light" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-4 border-t border-line/10 py-6 text-sm text-subtle md:flex-row md:items-center md:justify-between">
          <p>{footer.copyright}</p>
          <p>{footer.location}</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-ink"
          >
            {common.backToTop}
            <ArrowUp size={14} weight="regular" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };

import Link from 'next/link';

import { localeBase, useLocale, useT } from './LocaleContext';
import type { Locale } from './translations';

const LOCALES: { id: Locale; label: string; hrefLang: string }[] = [
  { id: 'en', label: 'EN', hrefLang: 'en' },
  { id: 'ua', label: 'UA', hrefLang: 'uk' },
];

/* Segmented EN / UA control. `subPath` keeps the visitor on the same page
 * (e.g. "cases/") when switching language. */
const LanguageSwitcher = ({ subPath = '' }: { subPath?: string }) => {
  const locale = useLocale();
  const { common } = useT();

  return (
    <div
      role="group"
      aria-label={common.switchLanguage}
      className="flex h-9 items-center rounded-full border border-line/10 p-0.5 font-mono text-[0.6875rem] font-medium tracking-[0.08em]"
    >
      {LOCALES.map((l) => {
        const active = l.id === locale;
        // English keeps its canonical root URLs rather than the /en/ mirror.
        const href = `${localeBase(l.id)}/${subPath}`;
        return active ? (
          <span
            key={l.id}
            aria-current="true"
            className="flex h-full items-center rounded-full bg-line/[0.08] px-2.5 text-ink"
          >
            {l.label}
          </span>
        ) : (
          <Link
            key={l.id}
            href={href}
            hrefLang={l.hrefLang}
            className="flex h-full items-center rounded-full px-2.5 text-subtle transition-colors duration-300 hover:text-ink"
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
};

export { LanguageSwitcher };

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { Locale, Translations } from './translations';
import { translations } from './translations';

const LocaleContext = createContext<Locale>('en');

const LocaleProvider = ({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);

const useLocale = (): Locale => useContext(LocaleContext);

const useT = (): Translations => {
  const locale = useContext(LocaleContext);
  return translations[locale];
};

/** Every locale with its switcher label and its BCP 47 and Open Graph tags,
 * in the order the language switcher shows them. */
const LOCALES: { id: Locale; label: string; hrefLang: string; og: string }[] = [
  { id: 'en', label: 'EN', hrefLang: 'en', og: 'en_US' },
  { id: 'ua', label: 'UA', hrefLang: 'uk', og: 'uk_UA' },
  { id: 'es', label: 'ES', hrefLang: 'es', og: 'es_ES' },
];

/** Path prefix for internal links: '' for English (canonical root URLs),
 * '/ua' and '/es' for the others. */
const localeBase = (locale: Locale) => (locale === 'en' ? '' : `/${locale}`);

const useBase = (): string => localeBase(useContext(LocaleContext));

export { localeBase, LocaleProvider, LOCALES, useBase, useLocale, useT };

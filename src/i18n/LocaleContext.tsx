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

export { LocaleProvider, useLocale, useT };

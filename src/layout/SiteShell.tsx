import type { ReactNode } from 'react';

import { LocaleProvider, useT } from '../i18n/LocaleContext';
import type { Locale } from '../i18n/translations';
import { Navbar } from '../navigation/Navbar';
import { Footer } from '../templates/Footer';
import { Meta } from './Meta';

type SiteShellProps = {
  locale: Locale;
  title: string;
  description: string;
  /** Path after the locale prefix: "" (home), "cases/", "contact/". */
  path: string;
  noindex?: boolean;
  children: ReactNode;
};

const SkipLink = () => {
  const { nav } = useT();
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-overlay -translate-y-24 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
    >
      {nav.skip}
    </a>
  );
};

/* Shared chrome for every page: locale context, SEO, nav, footer, grain. */
const SiteShell = ({
  locale,
  title,
  description,
  path,
  noindex,
  children,
}: SiteShellProps) => (
  <LocaleProvider locale={locale}>
    <Meta
      title={title}
      description={description}
      locale={locale}
      path={path}
      noindex={noindex}
    />
    <div id="top" />
    <SkipLink />
    <Navbar subPath={path} />
    <main id="main">{children}</main>
    <Footer />
    <div aria-hidden="true" className="grain z-grain hidden md:block" />
  </LocaleProvider>
);

export { SiteShell };

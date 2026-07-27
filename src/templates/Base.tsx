import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { LocaleProvider } from '../i18n/LocaleContext';
import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { Meta } from '../layout/Meta';
import { Footer } from './Footer';
import { Hero } from './Hero';

const Sponsors = dynamic(() =>
  import('./Sponsors').then((mod) => mod.Sponsors),
);
const VerticalFeatures = dynamic(() =>
  import('./VerticalFeatures').then((mod) => mod.VerticalFeatures),
);
const Team = dynamic(() => import('./Team').then((mod) => mod.Team));
const TechStack = dynamic(() =>
  import('./TechStack').then((mod) => mod.TechStack),
);
const Banner = dynamic(() => import('./Banner').then((mod) => mod.Banner));

type BaseProps = { locale?: Locale };

const Base = ({ locale = 'en' }: BaseProps) => {
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale === 'ua' ? 'uk' : 'en';
  }, [locale]);

  return (
    <LocaleProvider locale={locale}>
      <div className="bg-kosmos-950 text-gray-300 antialiased">
        <Meta title={t.meta.title} description={t.meta.description} />
        <Hero />
        <Sponsors />
        <VerticalFeatures />
        <Team />
        <TechStack />
        <Banner />
        <Footer />
      </div>
    </LocaleProvider>
  );
};

export { Base };

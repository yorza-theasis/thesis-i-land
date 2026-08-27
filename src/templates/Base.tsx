import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { GlobalBackground } from '../background/GlobalBackground';
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
      <div
        className="mx-[-300px] overflow-x-clip px-[300px] text-gray-300 antialiased"
        // Clip 300px further out than the viewport on each side (margin
        // pulls the box out, padding pushes content back to the same visual
        // position) so ambient glows fully fade before hitting the clip
        // line instead of being flattened at the edge. html/body carry
        // their own overflow-x: hidden to absorb this bleed.
      >
        <Meta title={t.meta.title} description={t.meta.description} />
        <GlobalBackground />
        <Hero />
        <Sponsors />
        <VerticalFeatures />
        <TechStack />
        <Banner />
        <Footer />
      </div>
    </LocaleProvider>
  );
};

export { Base };

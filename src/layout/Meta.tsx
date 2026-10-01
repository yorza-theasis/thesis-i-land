import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { localeBase, LOCALES } from '../i18n/LocaleContext';
import type { Locale } from '../i18n/translations';
import { AppConfig } from '../utils/AppConfig';

type MetaProps = {
  title: string;
  description: string;
  locale: Locale;
  /** Page path after the locale prefix, e.g. "" or "cases/". */
  path: string;
  noindex?: boolean;
};

const Meta = ({ title, description, locale, path, noindex }: MetaProps) => {
  const site = AppConfig.site_url;
  const urlFor = (l: Locale) => `${site}${localeBase(l)}/${path}`;
  const url = urlFor(locale);
  const { og } = LOCALES.find((l) => l.id === locale)!;
  const image = `${site}/thesis-igraphitegray.png`;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" key="apple" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
          key="icon16"
        />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        noindex={noindex}
        languageAlternates={[
          ...LOCALES.map((l) => ({ hrefLang: l.hrefLang, href: urlFor(l.id) })),
          { hrefLang: 'x-default', href: urlFor('en') },
        ]}
        openGraph={{
          type: 'website',
          url,
          title,
          description,
          locale: og,
          site_name: AppConfig.site_name,
          images: [{ url: image, width: 1200, height: 1200, alt: 'thesis-i' }],
        }}
        twitter={{ cardType: 'summary' }}
      />
    </>
  );
};

export { Meta };

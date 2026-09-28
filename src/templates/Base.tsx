import Head from 'next/head';

import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { SiteShell } from '../layout/SiteShell';
import { AppConfig } from '../utils/AppConfig';
import { About } from './About';
import { Challenges } from './Challenges';
import { Cta } from './Cta';
import { Faq } from './Faq';
import { Hero, Stats } from './Hero';
import { Process } from './Process';
import { Services } from './Services';
import { TechStack } from './TechStack';
import { Work } from './Work';

const Base = ({ locale = 'en' }: { locale?: Locale }) => {
  const t = translations[locale];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: AppConfig.site_name,
    url: AppConfig.site_url,
    logo: `${AppConfig.site_url}/thesis-igraphitegray.png`,
    image: `${AppConfig.site_url}/thesis-igraphitegray.png`,
    description: t.meta.description,
    email: AppConfig.contact.email,
    sameAs: [AppConfig.contact.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lviv',
      addressCountry: 'UA',
    },
    knowsAbout: [
      'Hardware development',
      'Embedded systems',
      'Artificial intelligence',
      'Mobile development',
      'Backend development',
      'Cloud and DevOps',
    ],
  };

  return (
    <SiteShell
      locale={locale}
      title={t.meta.title}
      description={t.meta.description}
      path=""
    >
      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <Hero />
      <Stats />
      <Challenges />
      <Services />
      <Work />
      <Process />
      <About />
      <TechStack />
      <Faq />
      <Cta />
    </SiteShell>
  );
};

export { Base };

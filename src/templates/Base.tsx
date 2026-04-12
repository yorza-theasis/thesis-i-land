import dynamic from 'next/dynamic';

import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
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

const Base = () => (
  <div className="text-gray-600 antialiased dark:text-gray-300">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <Sponsors />
    <VerticalFeatures />
    <Team />
    <TechStack />
    <Banner />
    <Footer />
  </div>
);

export { Base };

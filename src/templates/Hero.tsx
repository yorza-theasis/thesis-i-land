import Head from 'next/head';
import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { Logo } from './Logo';

const Hero = () => (
  <>
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'thesis-i',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Lviv',
              addressCountry: 'UA',
            },
            description:
              'Software studio specializing in mobile and backend development.',
            image: 'https://your-domain.com/apple-touch-icon.png',
            knowsAbout: [
              'Mobile Development',
              'Backend Development',
              'React Native',
              'Next.js',
            ],
          }),
        }}
      />
    </Head>

    <header
      role="banner"
      className="fixed inset-x-0 top-0 z-[100] w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-700/70"
    >
      <Section yPadding="py-4">
        <NavbarTwoColumns logo={<Logo xl />} themeToggle={<ThemeToggle />}>
          <li>
            <Link href="#services">Services</Link>
          </li>
          <li>
            <Link href="#cases">Cases</Link>
          </li>
          <li>
            <Link href="#team">Team</Link>
          </li>
          <li>
            <Link href="/contact/" aria-label="Go to contact page">
              Contact
            </Link>
          </li>
        </NavbarTwoColumns>
      </Section>
    </header>

    <main>
      <Background color="bg-white dark:bg-gray-700" withGlow>
        <Section yPadding="pt-40 pb-32">
          <HeroOneButton
            title={
              <>
                {'Engineering Excellence,\n'}
                <span className="text-primary-500">Delivered.</span>
              </>
            }
            description={
              <>
                A Lviv-based software studio with 5+ years of experience each,
                building scalable mobile and full-stack solutions for clients
                worldwide.
              </>
            }
            button={
              <Link href="/contact/" aria-label="Get in Touch">
                <Button xl>Get in Touch</Button>
              </Link>
            }
          />
        </Section>
      </Background>
    </main>
  </>
);

export { Hero };

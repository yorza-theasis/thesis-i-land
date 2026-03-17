import { Database, Globe, Server, ShieldCheck, Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Background } from '../background/Background';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { CenteredFooter } from '../footer/CenteredFooter';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { Logo } from '../templates/Logo';
import { AppConfig } from '../utils/AppConfig';

function TechBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-800 shadow-sm dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

const CasesPage = () => {
  return (
    <div className="text-gray-600 antialiased dark:text-gray-300">
      <Meta
        title={`Cases - ${AppConfig.site_name}`}
        description="Explore our successful projects and case studies. From complex AI platforms to reliable mobile applications."
      />

      {/* Header / Навігація */}
      <Background color="border-gray-200/50 bg-white/70 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-700/70">
        <Section yPadding="py-6">
          <NavbarTwoColumns logo={<Logo xl />} themeToggle={<ThemeToggle />}>
            <li>
              <Link href="/#services">Services</Link>
            </li>
            <li>
              <Link href="/cases">Cases</Link>
            </li>
            <li>
              <Link href="/#team">Team</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
          </NavbarTwoColumns>
        </Section>
      </Background>

      {/* Основний контент сторінки */}
      <Background color="bg-gray-100 dark:bg-gray-600" withGlow>
        <Section yPadding="py-16">
          <div className="flex flex-col overflow-hidden pb-[50px]">
            {/* Заголовок сторінки */}
            <div className="mb-4 px-4 text-center">
              <h1 className="md:text-7xl text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Our <span className="text-primary-500">Cases</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-100">
                From complex AI platforms to reliable mobile applications. See
                how we turn ideas into working products.
              </p>
            </div>

            {/* Кейс 1: AI Dept */}
            <ContainerScroll
              titleComponent={
                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                      Web Development
                    </span>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                      AI Integration
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-[4rem]">
                    AI Dept Platform <br />
                    <span className="mt-2 block text-2xl font-medium text-gray-500 dark:text-gray-300 md:text-4xl">
                      From Design to Kubernetes Deployment
                    </span>
                  </h2>
                  <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-200 md:text-xl">
                    Complete design overhaul, backend logic, and admin panel
                    development. Implemented engaging animations, UI elements,
                    database architecture, and a custom RAG system. Fully
                    deployed on a Kubernetes cluster.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <TechBadge icon={<Globe size={16} />} text="Next.js" />
                    <TechBadge icon={<Server size={16} />} text="Spring" />
                    <TechBadge icon={<Database size={16} />} text="MongoDB" />
                    <TechBadge icon={<Server size={16} />} text="Ollama" />
                    <TechBadge icon={<Server size={16} />} text="Kubernetes" />
                  </div>
                </div>
              }
            >
              <Image
                src="/assets/images/684_1x_shots_so.jpeg"
                alt="AI Dept Platform Dashboard"
                height={720}
                width={1400}
                className="mx-auto h-full rounded-2xl object-cover object-center"
                draggable={false}
              />
            </ContainerScroll>

            {/* Кейс 2: НЯНЯ24 */}
            <ContainerScroll
              titleComponent={
                <div className="mb-8 mt-10 md:mt-0">
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      Mobile App
                    </span>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                      Cross-platform
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-[4rem]">
                    Niania24 App <br />
                    <span className="mt-2 block text-2xl font-medium text-gray-500 dark:text-gray-300 md:text-4xl">
                      Universal for iOS and Android
                    </span>
                  </h2>
                  <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-200 md:text-xl">
                    Achieved full feature parity with the web platform while
                    introducing unique mobile-first capabilities. Designed in
                    strict alignment with the web identity and secured with a
                    robust personal data protection mechanism.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <TechBadge
                      icon={<Smartphone size={16} />}
                      text="React Native"
                    />
                    <TechBadge icon={<Database size={16} />} text="Supabase" />
                    <TechBadge icon={<Smartphone size={16} />} text="Expo" />
                    <TechBadge
                      icon={<ShieldCheck size={16} />}
                      text="Data Protection"
                    />
                  </div>
                </div>
              }
            >
              <Image
                src="/assets/images/21_1x_shots_so.jpeg"
                alt="Niania24 Mobile App"
                height={720}
                width={1400}
                className="mx-auto h-full rounded-2xl object-cover object-center"
                draggable={false}
              />
            </ContainerScroll>

            {/* Call to Action Block */}
            <div className="mt-16 text-center">
              <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                Ready to build something great together?
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-200">
                Let&apos;s discuss your project and see how we can help you
                achieve your goals with cutting-edge technology.
              </p>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center rounded-md bg-primary-500 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Get in touch
                <svg
                  className="ml-2 size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </Section>
      </Background>

      {/* Footer / Футер */}
      <Background color="bg-white dark:bg-gray-700">
        <Section>
          <CenteredFooter
            logo={<Logo />}
            iconList={
              <>
                <Link
                  href="/contact/"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>

                <Link
                  href="https://www.linkedin.com/company/thesis-i"
                  target="_blank"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>

                <Link
                  href="https://t.me/vu_boru"
                  target="_blank"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </Link>
              </>
            }
          >
            <li>
              <Link href="/#services">Services</Link>
            </li>
            <li>
              <Link href="/#cases">Cases</Link>
            </li>
            <li>
              <Link href="/#team">Team</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
          </CenteredFooter>
        </Section>
      </Background>
    </div>
  );
};

export default CasesPage;

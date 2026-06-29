import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '../button/Button';
import { CenteredFooter } from '../footer/CenteredFooter';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { Logo } from '../templates/Logo';
import { AppConfig } from '../utils/AppConfig';

type CaseStatus = 'completed' | 'in_progress';

type CaseItem = {
  num: string;
  title: string;
  subtitle: string;
  category: string[];
  description: string;
  image: string;
  imageAlt: string;
  stack: string[];
  highlights: string[];
  status: CaseStatus;
  href?: string;
};

const CASES: CaseItem[] = [
  {
    num: '01',
    title: 'AI Dept Platform',
    subtitle: 'From Design to Kubernetes Deployment',
    category: ['Web Development', 'AI Integration'],
    description:
      'Complete design overhaul, backend logic, and admin panel development. Implemented engaging animations, custom UI elements, database architecture, and a custom RAG system. Fully deployed on a production Kubernetes cluster.',
    image: '/assets/images/684_1x_shots_so.jpeg',
    imageAlt: 'AI Dept Platform Dashboard',
    stack: ['Next.js', 'Spring Boot', 'MongoDB', 'Ollama', 'Kubernetes'],
    highlights: ['Custom RAG', 'K8s Cluster', 'Full Stack'],
    status: 'in_progress',
  },
  {
    num: '02',
    title: 'Niania24',
    subtitle: 'Universal App for iOS and Android',
    category: ['Mobile App', 'Cross-platform'],
    description:
      'Full feature parity with the web platform plus unique mobile-first capabilities. Built in strict alignment with the web identity and secured with a robust personal data protection layer. Real-time booking, reviews, and secure payments.',
    image: '/assets/images/21_1x_shots_so.jpeg',
    imageAlt: 'Niania24 Mobile App',
    stack: ['React Native', 'Expo', 'Supabase', 'Next.js'],
    highlights: ['iOS & Android', 'Real-time', 'Secure Payments'],
    status: 'completed',
    href: 'https://niania24.pl',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const CasesPage = () => (
  <div className="bg-kosmos-950 text-gray-300 antialiased">
    <Meta
      title={`Cases — ${AppConfig.site_name}`}
      description="Explore our published case studies: AI platforms, mobile apps, and enterprise solutions."
    />

    {/* Navbar */}
    <header
      role="banner"
      className="border-white/8 glass-panel fixed inset-x-0 top-0 z-[100] w-full border-b"
    >
      <Section yPadding="py-4">
        <NavbarTwoColumns logo={<Logo xl />} themeToggle={<ThemeToggle />}>
          <li>
            <Link
              href="/#services"
              className="text-gray-400 transition-colors duration-300 hover:text-neon-purple-bright"
            >
              Services
            </Link>
          </li>
          <li>
            <Link href="/cases" className="text-neon-purple-bright">
              Cases
            </Link>
          </li>
          <li>
            <Link
              href="/#team"
              className="text-gray-400 transition-colors duration-300 hover:text-neon-purple-bright"
            >
              Team
            </Link>
          </li>
          <li>
            <Link
              href="/contact/"
              className="text-gray-400 transition-colors duration-300 hover:text-neon-purple-bright"
            >
              Contact
            </Link>
          </li>
        </NavbarTwoColumns>
      </Section>
    </header>

    <main>
      {/* Page intro */}
      <section className="relative overflow-hidden pb-16 pt-40">
        <div className="pointer-events-none absolute left-1/2 top-0 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-purple/5 blur-[130px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(176,38,255,0.9) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
        />

        <div className="relative mx-auto max-w-screen-xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-neon-purple-bright/55"
          >
            <span className="h-px w-6 bg-neon-purple/50" />
            Selected work
            <span className="h-px w-6 bg-neon-purple/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.85,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-5 text-5xl font-bold tracking-tightest text-white md:text-7xl"
          >
            Case <span className="text-gradient">Studies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mx-auto max-w-lg text-lg text-gray-500"
          >
            Two published case studies. More projects delivered under NDA —
            details available on request.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-white/8 mt-8 inline-flex items-center gap-2 rounded-full border bg-white/[0.03] px-4 py-2 font-mono text-xs text-gray-600"
          >
            <span className="size-1.5 rounded-full bg-neon-purple/50" />2 public
            · 5+ under NDA
          </motion.div>
        </div>
      </section>

      {/* Case studies */}
      {CASES.map((c) => {
        const isLive = c.status === 'completed';
        return (
          <section
            key={c.num}
            className="border-white/6 relative border-t py-24"
          >
            {/* Ghost number */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-8 select-none font-mono text-[9rem] font-bold leading-none text-white opacity-[0.025] md:text-[13rem]"
            >
              {c.num}
            </div>

            <div className="relative mx-auto max-w-screen-xl px-6">
              {/* Header: number + categories + status */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mb-8 flex flex-wrap items-center gap-3"
              >
                <span className="font-mono text-sm font-semibold text-gray-700">
                  {c.num}
                </span>
                <span className="h-4 w-px bg-white/10" />
                {c.category.map((cat) => (
                  <span
                    key={cat}
                    className="border-neon-purple/18 rounded-full border bg-neon-purple/5 px-3 py-0.5 font-mono text-xs text-neon-purple-bright/70"
                  >
                    {cat}
                  </span>
                ))}
                <div className="ml-auto">
                  {isLive ? (
                    <div className="flex items-center gap-1.5 rounded-full border border-neon-blue/25 bg-kosmos-900/85 px-3 py-1 font-mono text-xs text-neon-blue-bright/80">
                      <span className="size-1.5 rounded-full bg-neon-blue" />
                      Live
                    </div>
                  ) : (
                    <div className="border-neon-purple/28 flex items-center gap-1.5 rounded-full border bg-kosmos-900/85 px-3 py-1 font-mono text-xs text-neon-purple-bright/80">
                      <span className="animate-pulse-dot size-1.5 rounded-full bg-neon-purple" />
                      In Development
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mb-6"
              >
                <h2 className="text-4xl font-bold tracking-tightest text-white md:text-[3.25rem]">
                  {c.title}
                </h2>
                <p className="mt-2 text-xl text-gray-500">{c.subtitle}</p>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mb-12 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg"
              >
                {c.description}
              </motion.p>

              {/* Screenshot — no device frame */}
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="border-white/8 group relative mb-10 overflow-hidden rounded-2xl border"
              >
                <img
                  src={c.image}
                  alt={c.imageAlt}
                  className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-kosmos-950/65 to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: 'inset 0 0 80px rgba(176,38,255,0.06)' }}
                />
              </motion.div>

              {/* Stack + highlights */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex flex-wrap gap-2">
                  {c.stack.map((t) => (
                    <span
                      key={t}
                      className="border-white/8 rounded-full border bg-white/[0.03] px-3 py-1 font-mono text-xs text-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {c.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-1.5 font-mono text-xs text-gray-600"
                    >
                      <span className="size-1 rounded-full bg-neon-purple/55" />
                      {h}
                    </div>
                  ))}
                  {c.href && (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-neon-purple-bright/65 transition-colors duration-200 hover:text-neon-purple-bright"
                    >
                      Visit live
                      <svg
                        className="size-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="border-white/6 relative border-t py-24">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="size-[500px] rounded-full bg-neon-purple/5 blur-[110px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-screen-xl px-6 text-center"
        >
          <h3 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to build something great?
          </h3>
          <p className="mx-auto mb-10 max-w-xl text-lg text-gray-500">
            Let&apos;s discuss your project and see how we can help you ship
            faster and build better.
          </p>
          <Link href="/contact/">
            <Button xl>Get in touch</Button>
          </Link>
        </motion.div>
      </section>
    </main>

    {/* Footer */}
    <div className="border-white/8 border-t bg-kosmos-950">
      <Section yPadding="py-12">
        <CenteredFooter
          logo={<Logo />}
          iconList={
            <>
              <Link
                href="/contact/"
                className="text-gray-600 transition-colors hover:text-neon-purple-bright"
                aria-label="Email us"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="20"
                  height="20"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/company/thesis-i"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-neon-purple-bright"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href="https://t.me/vu_boru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-neon-purple-bright"
                aria-label="Telegram"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.277-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </Link>
            </>
          }
        >
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
        </CenteredFooter>
      </Section>
    </div>
  </div>
);

export default CasesPage;

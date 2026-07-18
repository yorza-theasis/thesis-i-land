import { motion, useInView } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../button/Button';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { Logo } from './Logo';

/* ─── Animated counter ───────────────────────── */
type CounterProps = { end: number; suffix: string; delay?: number };

const Counter = ({ end, suffix, delay = 0 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let intervalId: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      const step = 16;
      const total = 1400 / step;
      const inc = end / total;
      let cur = 0;
      intervalId = setInterval(() => {
        cur += inc;
        if (cur >= end) {
          setValue(end);
          clearInterval(intervalId);
        } else {
          setValue(Math.floor(cur));
        }
      }, step);
    }, delay);
    return () => {
      clearTimeout(t);
      clearInterval(intervalId);
    };
  }, [inView, end, delay]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

const stats = [
  { end: 50, suffix: 'M+', label: 'Users served' },
  { end: 10, suffix: '+', label: 'Products shipped' },
  { end: 5, suffix: '', label: 'Industries' },
  { end: 4, suffix: 'yrs', label: 'In production' },
];

/* ─── Mobile lightweight sphere ──────────────── */
const MobileSphere = () => (
  <div className="relative flex size-[180px] items-center justify-center">
    <div
      className="pointer-events-none absolute size-[170px] rounded-full opacity-50 blur-[40px]"
      style={{
        background:
          'radial-gradient(circle, rgba(176,38,255,0.5) 0%, rgba(0,71,255,0.3) 55%, transparent 70%)',
      }}
    />
    <div
      className="animate-spin-ring absolute size-[155px] rounded-full will-change-transform"
      style={{ border: '1px solid rgba(176,38,255,0.13)' }}
    />
    <div
      className="animate-counter-spin-ring absolute size-[115px] rounded-full will-change-transform"
      style={{
        border: '1px dashed rgba(0,71,255,0.1)',
        animationDuration: '12s',
      }}
    />
    <div
      className="animate-morph-sphere size-[70px] will-change-transform"
      style={{
        background:
          'radial-gradient(circle at 33% 28%, rgba(229,181,255,0.9) 0%, rgba(176,38,255,0.78) 24%, rgba(0,71,255,0.5) 58%, rgba(5,5,14,0.97) 80%)',
        boxShadow:
          '0 0 35px rgba(176,38,255,0.55), 0 0 70px rgba(176,38,255,0.12)',
      }}
    >
      <div
        className="absolute rounded-full bg-white/35 blur-[6px]"
        style={{ width: '38%', height: '28%', top: '14%', left: '16%' }}
      />
    </div>
  </div>
);

/* ─── SVG data tick ring ──────────────────────── */
const DataRing = () => {
  const ticks = Array.from({ length: 36 });
  return (
    <svg
      className="pointer-events-none absolute will-change-transform"
      style={{
        width: 530,
        height: 530,
        animation: 'spin-ring 90s linear infinite',
      }}
      viewBox="0 0 530 530"
    >
      <circle
        cx="265"
        cy="265"
        r="258"
        fill="none"
        stroke="rgba(176,38,255,0.07)"
        strokeWidth="0.75"
        strokeDasharray="2 4"
      />
      {ticks.map((_, i) => {
        const angle = (i * 360) / 36;
        const rad = ((angle - 90) * Math.PI) / 180;
        const r = 258;
        const isMajor = i % 9 === 0;
        const isMid = i % 3 === 0;
        let tickLen = 4;
        if (isMajor) tickLen = 14;
        else if (isMid) tickLen = 8;
        const x1 = 265 + r * Math.cos(rad);
        const y1 = 265 + r * Math.sin(rad);
        const x2 = 265 + (r - tickLen) * Math.cos(rad);
        const y2 = 265 + (r - tickLen) * Math.sin(rad);
        let tickStroke = 'rgba(176,38,255,0.08)';
        if (isMajor) tickStroke = 'rgba(176,38,255,0.55)';
        else if (isMid) tickStroke = 'rgba(176,38,255,0.22)';
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={tickStroke}
            strokeWidth={isMajor ? 1.5 : 0.75}
          />
        );
      })}
      {[0, 90, 180, 270].map((angle) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const cx = 265 + 258 * Math.cos(rad);
        const cy = 265 + 258 * Math.sin(rad);
        return (
          <circle
            key={angle}
            cx={cx}
            cy={cy}
            r="3"
            fill="#b026ff"
            opacity="0.65"
          />
        );
      })}
    </svg>
  );
};

/* ─── Floating tech label ─────────────────────── */
type FloatLabelProps = { text: string; style: CSSProperties; delay: number };

const FloatLabel = ({ text, style, delay }: FloatLabelProps) => (
  <motion.div
    className="animate-float border-neon-purple/18 absolute rounded-lg border bg-kosmos-900/85 px-3 py-1.5 font-mono text-xs font-medium text-neon-purple-bright/75 backdrop-blur-md"
    style={style}
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  >
    {text}
  </motion.div>
);

/* ─── Full animated sphere ────────────────────── */
const AnimatedSphere = () => (
  <div className="relative flex size-[530px] items-center justify-center">
    <div
      className="pointer-events-none absolute size-[460px] rounded-full opacity-45 blur-[100px]"
      style={{
        background:
          'radial-gradient(circle, rgba(176,38,255,0.5) 0%, rgba(0,71,255,0.3) 50%, transparent 70%)',
      }}
    />

    <DataRing />

    <div
      className="animate-spin-ring absolute size-[430px] rounded-full will-change-transform"
      style={{ border: '1px solid rgba(176,38,255,0.09)' }}
    />
    <div
      className="animate-counter-spin-ring absolute size-[352px] rounded-full will-change-transform"
      style={{ border: '1px dashed rgba(0,71,255,0.13)' }}
    />
    <div
      className="animate-spin-ring absolute size-[290px] rounded-full will-change-transform"
      style={{
        border: '1px solid rgba(176,38,255,0.07)',
        animationDuration: '20s',
      }}
    >
      <div className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-neon-purple/85 shadow-[0_0_8px_rgba(176,38,255,0.9)]" />
      <div className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-neon-blue/60" />
      <div className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-neon-blue/40" />
    </div>

    <div
      className="animate-morph-sphere relative z-10 size-[230px] will-change-transform md:size-[265px]"
      style={{
        background:
          'radial-gradient(circle at 32% 26%, rgba(229,181,255,0.94) 0%, rgba(176,38,255,0.8) 20%, rgba(80,10,180,0.72) 42%, rgba(0,71,255,0.52) 60%, rgba(5,5,14,0.98) 80%)',
        boxShadow:
          '0 0 90px rgba(176,38,255,0.65), 0 0 180px rgba(176,38,255,0.16), 0 0 45px rgba(0,71,255,0.28), inset 0 0 60px rgba(0,71,255,0.18)',
      }}
    >
      <div
        className="bg-white/38 absolute rounded-full blur-[10px]"
        style={{ width: '36%', height: '26%', top: '14%', left: '16%' }}
      />
      <div
        className="bg-neon-blue/16 absolute rounded-full blur-[6px]"
        style={{ width: '20%', height: '16%', bottom: '20%', right: '12%' }}
      />
    </div>

    {[
      {
        cls: 'size-2 bg-neon-purple/80',
        pos: { left: '4%', top: '18%' },
        delay: '0s',
      },
      {
        cls: 'size-1.5 bg-neon-blue/70',
        pos: { right: '6%', top: '38%' },
        delay: '1.4s',
      },
      {
        cls: 'size-1 bg-white/60',
        pos: { bottom: '22%', left: '10%' },
        delay: '2.7s',
      },
      {
        cls: 'size-2.5 bg-neon-purple/40 blur-[2px]',
        pos: { right: '14%', bottom: '28%' },
        delay: '0.9s',
      },
    ].map((p, i) => (
      <div
        key={i}
        className={`animate-float absolute rounded-full ${p.cls}`}
        style={{ ...p.pos, animationDelay: p.delay }}
      />
    ))}

    <svg
      className="pointer-events-none absolute inset-0 z-10 size-full"
      style={{ overflow: 'visible' }}
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 1.2, ease: 'easeInOut' }}
        d="M -20 80 L 60 150 L 265 265 L 260 -40 L 500 100 L 265 265 L 550 350 L 265 550 L 265 265 L 80 530 L -20 430 L 60 150 M -20 80 L 260 -40 M 500 100 L 550 350 M -20 430 L 80 530"
        fill="none"
        stroke="rgba(176,38,255,0.35)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
    </svg>

    <FloatLabel
      text="Python / FastAPI"
      style={{ left: -40, top: 60 }}
      delay={0.8}
    />
    <FloatLabel
      text="Kotlin / KMP"
      style={{ left: 60, top: 150 }}
      delay={0.9}
    />
    <FloatLabel text="AI Agents" style={{ left: 220, top: -60 }} delay={1.0} />
    <FloatLabel text="Spring Boot" style={{ left: 470, top: 80 }} delay={1.1} />
    <FloatLabel text="LLMs & RAG" style={{ left: 520, top: 330 }} delay={1.2} />
    <FloatLabel
      text="React Native"
      style={{ left: 225, top: 540 }}
      delay={1.3}
    />
    <FloatLabel text="Kubernetes" style={{ left: 50, top: 520 }} delay={1.4} />
    <FloatLabel text="Next.js" style={{ left: -40, top: 410 }} delay={1.5} />
  </div>
);

/* ─── Hero ────────────────────────────────────── */
const Hero = () => {
  const schemaData = {
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
  };

  const headline1 = ['Scaling', 'Businesses'];
  const headline2 = ['with AI &', 'Software.'];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18025811889"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18025811889');
          `,
        }}
      />

      {/* Navbar */}
      <NavbarTwoColumns
        logo={<Logo xl />}
        themeToggle={<ThemeToggle />}
        navItems={[
          {
            label: 'Services',
            href: '#services',
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            ),
          },
          {
            label: 'Portfolio',
            href: '#cases',
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            ),
          },
          {
            label: 'Tech Stack',
            href: '#techstack',
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            ),
          },
          {
            label: 'Team',
            href: '#team',
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            ),
          },
          {
            label: 'Start Project',
            href: '/contact/',
            isButton: true,
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ),
          },
        ]}
      />

      {/* Hero */}
      <main className="relative overflow-hidden bg-kosmos-950">
        {/* Ambient mesh */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="bg-neon-purple/6 absolute left-[-10%] top-[-20%] size-[800px] rounded-full blur-[140px]" />
          <div className="bg-neon-blue/4 absolute bottom-[-20%] right-[-10%] size-[700px] rounded-full blur-[120px]" />
        </div>

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(176,38,255,0.9) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
        />

        {/* Perspective vanishing grid — bottom of hero */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[220px] overflow-hidden">
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(to right, rgba(176,38,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(176,38,255,0.09) 1px, transparent 1px)',
              backgroundSize: '55px 28px',
              transform: 'perspective(350px) rotateX(55deg)',
              transformOrigin: 'top center',
              opacity: 0.5,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kosmos-950 via-kosmos-950/70 to-transparent" />
        </div>

        <Section yPadding="pt-40 pb-28">
          {/* 2-col grid */}
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
            {/* Left */}
            <div className="flex flex-col items-start">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -6, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 22,
                  delay: 0.05,
                }}
                className="border-neon-purple/22 bg-neon-purple/7 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs font-medium tracking-wide text-neon-purple-bright/85"
              >
                <span className="animate-pulse-dot size-1.5 rounded-full bg-neon-purple" />
                Available for new projects
              </motion.div>

              {/* Headline */}
              <h1
                className="mb-6 text-5xl font-bold tracking-tightest text-white md:text-6xl xl:text-[4.25rem]"
                style={{ lineHeight: '1.1' }}
              >
                <span className="block overflow-hidden pb-[0.2em]">
                  {headline1.map((word, i) => (
                    <motion.span
                      key={word}
                      className="mr-[0.22em] inline-block"
                      initial={{ y: '110%', filter: 'blur(10px)' }}
                      animate={{ y: 0, filter: 'blur(0px)' }}
                      transition={{
                        delay: 0.1 + i * 0.09,
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <span className="block overflow-hidden pb-[0.2em]">
                  {headline2.map((word, i) => (
                    <motion.span
                      key={word}
                      className="text-gradient mr-[0.22em] inline-block"
                      initial={{ y: '110%', filter: 'blur(10px)' }}
                      animate={{ y: 0, filter: 'blur(0px)' }}
                      transition={{
                        delay: 0.28 + i * 0.09,
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.75,
                  delay: 0.52,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-10 max-w-[480px] text-base leading-relaxed text-gray-500 sm:text-lg"
              >
                We build premium AI-powered software and autonomous agents
                designed to automate workflows, scale operations, and directly
                multiply your business revenue.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.62 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link href="#cases" aria-label="View our portfolio">
                  <Button xl>View Portfolio</Button>
                </Link>
                <Link href="#services" aria-label="Our services">
                  <Button xl outline>
                    Our Services
                  </Button>
                </Link>
              </motion.div>

              {/* System readout */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.88 }}
                className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-700"
              >
                <span className="flex items-center gap-1.5">
                  <span className="size-1 animate-pulse rounded-full bg-green-500/70" />
                  sys.online
                </span>
                <span className="h-3 w-px bg-white/10" />
                <span>response &lt; 24h</span>
                <span className="h-3 w-px bg-white/10" />
                <span>lviv, ua · remote</span>
              </motion.div>
            </div>

            {/* Right — varies by breakpoint */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(24px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 1.2,
                delay: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Mobile + Tablet: sphere */}
              <div className="lg:hidden">
                <MobileSphere />
              </div>
              {/* Desktop: full sphere */}
              <div className="hidden lg:flex">
                <AnimatedSphere />
              </div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82 }}
            className="border-white/6 mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t pt-12 sm:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <div className="font-mono text-3xl font-bold tracking-tightest text-white md:text-4xl">
                  <Counter
                    end={stat.end}
                    suffix={stat.suffix}
                    delay={i * 120}
                  />
                </div>
                <div className="text-xs text-gray-600 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </Section>

        {/* Scroll indicator — desktop only */}
        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-800">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="size-4 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 5v14M5 12l7 7 7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export { Hero };

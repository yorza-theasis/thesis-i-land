import { motion, useInView, useReducedMotion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';

import { Button } from '../button/Button';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { Logo } from './Logo';

/* ─── Animated counter ─────────────────────────
 * The final value is always the element's real text content — set once on
 * mount and restored at the end of the animation — so crawlers and
 * screen readers (and anyone with JS disabled) always see the real number,
 * not a "0" that only becomes correct after a count-up animation runs. */
type CounterProps = {
  end: number;
  suffix: string;
  delay?: number;
  onProgress?: (progress: number) => void;
};

const Counter = ({ end, suffix, delay = 0, onProgress }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const finalText = `${end}${suffix}`;

  useEffect(() => {
    if (!inView || prefersReducedMotion) return undefined;
    let intervalId: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      const step = 16;
      const total = 1400 / step;
      const inc = end / total;
      let cur = 0;
      intervalId = setInterval(() => {
        cur += inc;
        if (cur >= end) {
          if (ref.current) ref.current.textContent = finalText;
          onProgress?.(1);
          clearInterval(intervalId);
        } else {
          if (ref.current)
            ref.current.textContent = `${Math.floor(cur)}${suffix}`;
          onProgress?.(cur / end);
        }
      }, step);
    }, delay);
    return () => {
      clearTimeout(t);
      clearInterval(intervalId);
    };
  }, [inView, end, suffix, delay, finalText, prefersReducedMotion, onProgress]);

  return <span ref={ref}>{finalText}</span>;
};

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
        opacity: 'calc(0.35 + 0.65 * var(--data-density, 1))',
        transition: 'opacity 200ms linear',
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
        // Rounded to avoid a hydration mismatch — server and client can
        // compute the last digit of Math.cos/sin differently.
        const x1 = +(265 + r * Math.cos(rad)).toFixed(3);
        const y1 = +(265 + r * Math.sin(rad)).toFixed(3);
        const x2 = +(265 + (r - tickLen) * Math.cos(rad)).toFixed(3);
        const y2 = +(265 + (r - tickLen) * Math.sin(rad)).toFixed(3);
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
        const cx = +(265 + 258 * Math.cos(rad)).toFixed(3);
        const cy = +(265 + 258 * Math.sin(rad)).toFixed(3);
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
type FloatLabelProps = {
  text: string;
  delay: number;
  reduced?: boolean;
  variant?: 'tech' | 'business';
};

const FloatLabel = ({
  text,
  delay,
  reduced,
  variant = 'tech',
}: FloatLabelProps) => (
  <motion.div
    className={`animate-float rounded-lg border bg-kosmos-900/95 px-3 py-1.5 font-mono text-xs font-medium ${
      variant === 'business'
        ? 'border-neon-gold/25 text-neon-gold-bright/90'
        : 'border-neon-purple/18 text-neon-purple-bright/75'
    }`}
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={
      reduced
        ? { duration: 0 }
        : { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  >
    {text}
  </motion.div>
);

/* ─── Orbit label — placed at a fixed angle/radius on a ring, then nested
 * inside that ring's rotation with an equal-and-opposite "cancel" spin so
 * the label sweeps around the sphere while its own text stays upright. All
 * three transforms involved (ring spin, placement, cancel spin) are plain
 * `rotate`/`translate` — compositor-only, so this costs nothing extra per
 * frame regardless of OS or browser. ───────────────────────────────── */
type OrbitLabelProps = {
  text: string;
  angle: number;
  radius: number;
  variant: 'tech' | 'business';
  delay: number;
  reduced: boolean;
  cancelSpinClassName: string;
};

const OrbitLabel = ({
  text,
  angle,
  radius,
  variant,
  delay,
  reduced,
  cancelSpinClassName,
}: OrbitLabelProps) => (
  <div
    className="absolute left-1/2 top-1/2"
    style={{
      // The trailing translate(-50%,-50%) centers the label on the orbit
      // point. It has to live in this same static inline transform (rather
      // than a Tailwind translate utility on the child) because the child's
      // cancel-spin keyframe sets `transform` directly each frame, which
      // would silently wipe out any transform-utility classes on that
      // element instead of composing with them.
      transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg) translate(-50%, -50%)`,
    }}
  >
    <div className={cancelSpinClassName}>
      <FloatLabel
        text={text}
        delay={delay}
        reduced={reduced}
        variant={variant}
      />
    </div>
  </div>
);

const TECH_ORBIT_LABELS = [
  { text: 'Python / FastAPI', angle: 45 },
  { text: 'Kotlin / KMP', angle: 135 },
  { text: 'Kubernetes', angle: 225 },
  { text: 'Next.js', angle: 315 },
];

/* ─── Mobile lightweight sphere ──────────────── */
const MobileSphere = ({
  reduced,
  businessLabels,
}: {
  reduced: boolean;
  businessLabels: [string, string, string, string];
}) => (
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
      style={{
        border: '1px solid rgba(176,38,255,0.13)',
        opacity: 'calc(0.4 + 0.6 * var(--data-density, 1))',
        transition: 'opacity 200ms linear',
      }}
    />
    <div
      className="animate-counter-spin-ring absolute size-[115px] rounded-full will-change-transform"
      style={{
        border: '1px dashed rgba(0,71,255,0.1)',
        animationDuration: '12s',
        opacity: 'calc(0.4 + 0.6 * var(--data-density, 1))',
        transition: 'opacity 200ms linear',
      }}
    />

    {/* Compact orbit — 2 tech + 2 business labels on one ring. Desktop got a
        full two-ring orbit; this is the same mechanism scaled down instead
        of the plain unlabeled ball mobile had before. */}
    <div className="animate-ring-a absolute inset-0 will-change-transform">
      <OrbitLabel
        text="Kotlin / KMP"
        angle={0}
        radius={118}
        variant="tech"
        delay={0.8}
        reduced={reduced}
        cancelSpinClassName="animate-ring-a-cancel"
      />
      <OrbitLabel
        text={businessLabels[0]}
        angle={90}
        radius={118}
        variant="business"
        delay={0.9}
        reduced={reduced}
        cancelSpinClassName="animate-ring-a-cancel"
      />
      <OrbitLabel
        text="Next.js"
        angle={180}
        radius={118}
        variant="tech"
        delay={1.0}
        reduced={reduced}
        cancelSpinClassName="animate-ring-a-cancel"
      />
      <OrbitLabel
        text={businessLabels[2]}
        angle={270}
        radius={118}
        variant="business"
        delay={1.1}
        reduced={reduced}
        cancelSpinClassName="animate-ring-a-cancel"
      />
    </div>

    <div
      className="animate-morph-sphere size-[70px]"
      style={{
        background:
          'radial-gradient(circle at 33% 28%, rgba(229,181,255,0.9) 0%, rgba(176,38,255,0.78) 24%, rgba(0,71,255,0.5) 58%, rgba(5,5,14,0.97) 80%)',
        boxShadow:
          '0 0 35px rgba(176,38,255,0.55), 0 0 70px rgba(176,38,255,0.12)',
        willChange: 'border-radius',
      }}
    >
      <div
        className="absolute rounded-full bg-white/35 blur-[6px]"
        style={{ width: '38%', height: '28%', top: '14%', left: '16%' }}
      />
    </div>
  </div>
);

/* ─── Full animated sphere ────────────────────── */
const AnimatedSphere = ({
  reduced,
  businessLabels,
}: {
  reduced: boolean;
  businessLabels: [string, string, string, string];
}) => (
  <div
    className="relative flex size-[530px] items-center justify-center"
    style={{ perspective: '1300px' }}
  >
    <div
      className="pointer-events-none absolute size-[460px] rounded-full opacity-45 blur-[60px]"
      style={{
        background:
          'radial-gradient(circle, rgba(176,38,255,0.5) 0%, rgba(0,71,255,0.3) 50%, transparent 70%)',
      }}
    />

    {/* Orbit scene — tilted in 3D so the rings and labels read as an actual
        disc seen at an angle instead of flat concentric circles. The tilt
        itself is static (painted once); only the rotations inside it
        animate, so the 3D context adds depth without adding per-frame cost. */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{ transformStyle: 'preserve-3d', transform: 'rotateX(24deg)' }}
    >
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

      {/* Ring A — inner, tech labels, clockwise */}
      <div className="animate-ring-a absolute inset-0 will-change-transform">
        {TECH_ORBIT_LABELS.map((item, i) => (
          <OrbitLabel
            key={item.text}
            text={item.text}
            angle={item.angle}
            radius={190}
            variant="tech"
            delay={0.8 + i * 0.1}
            reduced={reduced}
            cancelSpinClassName="animate-ring-a-cancel"
          />
        ))}
      </div>

      {/* Ring B — outer, business/stat labels, counter-clockwise */}
      <div className="animate-ring-b absolute inset-0 will-change-transform">
        {businessLabels.map((text, i) => (
          <OrbitLabel
            key={text}
            text={text}
            angle={i * 90}
            radius={265}
            variant="business"
            delay={1.2 + i * 0.1}
            reduced={reduced}
            cancelSpinClassName="animate-ring-b-cancel"
          />
        ))}
      </div>
    </div>

    <div
      className="animate-morph-sphere relative z-10 size-[230px] md:size-[265px]"
      style={{
        background:
          'radial-gradient(circle at 32% 26%, rgba(229,181,255,0.94) 0%, rgba(176,38,255,0.8) 20%, rgba(80,10,180,0.72) 42%, rgba(0,71,255,0.52) 60%, rgba(5,5,14,0.98) 80%)',
        // Trimmed from 4 stacked shadows to 2 — border-radius is animating
        // every frame here, so every shadow layer gets recomputed on every
        // frame too. Fewer + smaller layers keeps the glow without paying
        // for it 9s in a loop, forever, the whole time the hero is visible.
        boxShadow:
          '0 0 90px rgba(176,38,255,0.55), inset 0 0 50px rgba(0,71,255,0.18)',
        willChange: 'border-radius',
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
        style={{
          ...p.pos,
          animationDelay: p.delay,
          opacity: 'calc(0.3 + 0.7 * var(--data-density, 1))',
          transition: 'opacity 200ms linear',
        }}
      />
    ))}
  </div>
);

/* ─── Hero ────────────────────────────────────── */
const Hero = () => {
  const t = useT();
  const { hero, nav } = t;
  const prefersReducedMotion = useReducedMotion();

  // Reuses the hero's own real numbers so the orbit reads as "this is our
  // scale," not an invented claim — see hero.stats / hero.readout above.
  const businessLabels: [string, string, string, string] = [
    `${hero.stats[0]!.end}${hero.stats[0]!.suffix} ${hero.stats[0]!.label}`,
    `${hero.stats[1]!.end}${hero.stats[1]!.suffix} ${hero.stats[1]!.label}`,
    `${hero.stats[2]!.end}${hero.stats[2]!.suffix} ${hero.stats[2]!.label}`,
    hero.readout.response,
  ];

  // The sphere's ring/particle density tracks the stats count-up progress —
  // it reads as a visualization of scale filling in, not just decoration.
  // Written directly to a CSS var (no setState) so ~90 ticks/sec never
  // re-renders React; descendants pick it up via inheritance.
  const sphereWrapRef = useRef<HTMLDivElement>(null);
  const counterProgressRef = useRef<number[]>(hero.stats.map(() => 0));
  const lastDensityWriteRef = useRef(0);
  const handleCounterProgress = (index: number, value: number) => {
    counterProgressRef.current[index] = value;
    // Throttled: the receiving elements transition opacity over 200ms, so
    // writing this var on every 16ms tick (up to 4 counters at once) was
    // forcing far more style recalcs than the visible effect needed.
    const now = Date.now();
    if (value < 1 && now - lastDensityWriteRef.current < 50) return;
    lastDensityWriteRef.current = now;
    const avg =
      counterProgressRef.current.reduce((a, b) => a + b, 0) /
      counterProgressRef.current.length;
    sphereWrapRef.current?.style.setProperty('--data-density', `${avg}`);
  };

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

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18025811889"
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
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
        langSwitcher={<LanguageSwitcher />}
        navItems={[
          {
            label: nav.services,
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
            label: nav.portfolio,
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
            label: nav.techStack,
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
            label: nav.startProject,
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
      <main className="relative">
        {/* Ambient mesh — no clipping, glows bleed into adjacent sections */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[-10%] top-[-15%] size-[900px] rounded-full bg-neon-purple/[0.07] blur-[80px]" />
          <div className="absolute bottom-[-18%] right-[-10%] size-[800px] rounded-full bg-neon-blue/[0.05] blur-[75px]" />
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

        {/* Perspective vanishing grid — bottom of hero. Faded via a mask
            (not an opaque overlay) so the shared global background shows
            through cleanly instead of a solid patch cutting it off. */}
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
              WebkitMaskImage:
                'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.7) 50%, black 100%)',
              maskImage:
                'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.7) 50%, black 100%)',
            }}
          />
        </div>

        <Section yPadding="pt-40 pb-28">
          {/* 2-col grid */}
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
            {/* Left */}
            <div className="flex flex-col items-start">
              {/* Headline */}
              <h1
                className="mb-6 text-5xl font-bold tracking-tightest text-white md:text-6xl xl:text-[4.25rem]"
                style={{ lineHeight: '1.1' }}
              >
                <span className="block overflow-hidden pb-[0.2em]">
                  {hero.headline1.map((word, i) => (
                    <motion.span
                      key={word}
                      className="mr-[0.22em] inline-block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
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
                  {hero.headline2.map((word, i) => (
                    <motion.span
                      key={word}
                      className="text-gradient mr-[0.22em] inline-block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.52,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mb-10 max-w-[480px] text-base leading-relaxed text-gray-400 sm:text-lg"
              >
                {hero.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.62 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link href="#cases" aria-label={hero.cta.primary}>
                  <Button xl>{hero.cta.primary}</Button>
                </Link>
                <Link href="#services" aria-label={hero.cta.secondary}>
                  <Button xl outline>
                    {hero.cta.secondary}
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
                  {hero.readout.online}
                </span>
                <span className="h-3 w-px bg-white/10" />
                <span>{hero.readout.response}</span>
                <span className="h-3 w-px bg-white/10" />
                <span>{hero.readout.location}</span>
              </motion.div>
            </div>

            {/* Right — varies by breakpoint */}
            <motion.div
              ref={sphereWrapRef}
              className="flex items-center justify-center"
              style={{ '--data-density': 1 } as CSSProperties}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1.2, delay: 0.22, ease: [0.16, 1, 0.3, 1] }
              }
            >
              {/* Mobile + Tablet: sphere */}
              <div className="lg:hidden">
                <MobileSphere
                  reduced={!!prefersReducedMotion}
                  businessLabels={businessLabels}
                />
              </div>
              {/* Desktop: full sphere */}
              <div className="hidden lg:flex">
                <AnimatedSphere
                  reduced={!!prefersReducedMotion}
                  businessLabels={businessLabels}
                />
              </div>
            </motion.div>
          </div>

          {/* Stats strip — centered as its own compact block below the
              two-column layout above, not stretched to match either column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82 }}
            className="border-white/6 mx-auto mt-20 grid max-w-xl grid-cols-3 gap-x-6 gap-y-8 border-t pt-12 text-center sm:gap-x-10"
          >
            {hero.stats.map((stat, i) => (
              <Link
                key={stat.label}
                href="#cases"
                aria-label={`${stat.label}: ${stat.end}${stat.suffix} — ${nav.portfolio}`}
                className="group flex flex-col items-center gap-1 outline-none"
              >
                <div className="font-mono text-3xl font-bold tracking-tightest text-white transition-colors duration-200 group-hover:text-neon-purple-bright group-focus-visible:text-neon-purple-bright md:text-4xl">
                  <Counter
                    end={stat.end}
                    suffix={stat.suffix}
                    delay={i * 120}
                    onProgress={(p) => handleCounterProgress(i, p)}
                  />
                </div>
                <div className="text-xs text-gray-600 transition-colors duration-200 group-hover:text-gray-400 sm:text-sm">
                  {stat.label}
                </div>
              </Link>
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
            {hero.scroll}
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

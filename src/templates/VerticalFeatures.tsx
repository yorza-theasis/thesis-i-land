import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

type CaseStatus = 'completed' | 'in_progress';
type TabFilter = 'all' | CaseStatus;

// `num` must match CASES_META's `num` in src/pages/cases.tsx for the SAME
// project (matched by image, since this array's own order does NOT match
// that file's order — e.g. Niania24 and AI Dept Platform are swapped
// between the two lists). Used to build each card's `/cases#case-N` anchor.
const casesMeta: {
  num: string;
  image: string;
  status: CaseStatus;
  isRealPhoto?: boolean;
}[] = [
  {
    num: '01',
    image: '/assets/images/extensa.jpg',
    status: 'completed',
    isRealPhoto: true,
  },
  {
    num: '02',
    image: '/assets/images/gmi.svg',
    status: 'in_progress',
    isRealPhoto: true,
  },
  {
    num: '04',
    image: '/assets/images/21_1x_shots_so.jpg',
    status: 'completed',
    isRealPhoto: true,
  },
  {
    num: '03',
    image: '/assets/images/684_1x_shots_so.jpg',
    status: 'completed',
    isRealPhoto: true,
  },
  {
    num: '05',
    image: '/assets/images/shot_zzk.jpg',
    status: 'completed',
    isRealPhoto: true,
  },
  {
    num: '06',
    image: '/assets/images/gmi.svg',
    status: 'in_progress',
    isRealPhoto: false,
  },
  {
    num: '07',
    image: '/assets/images/qpick.jpg',
    status: 'in_progress',
    isRealPhoto: true,
  },
  {
    num: '08',
    image: '/assets/images/ai-agent-compliance.jpg',
    status: 'completed',
    isRealPhoto: true,
  },
  {
    num: '09',
    image: '/assets/images/butics.jpg',
    status: 'completed',
    isRealPhoto: true,
  },
  {
    num: '10',
    image: '/assets/images/nexus.jpg',
    status: 'completed',
    isRealPhoto: true,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const VerticalFeatures = () => {
  const { portfolio } = useT();
  const [activeTab, setActiveTab] = useState<TabFilter>('all');

  const casesData = portfolio.cases.slice(0, casesMeta.length).map((c, i) => ({
    ...c,
    ...casesMeta[i]!,
    caseId: `case-${casesMeta[i]!.num}`,
  }));

  const tabs: { id: TabFilter; label: string }[] = [
    { id: 'all', label: portfolio.tabs.all },
    { id: 'completed', label: portfolio.tabs.completed },
    { id: 'in_progress', label: portfolio.tabs.in_progress },
  ];

  const filtered =
    activeTab === 'all'
      ? casesData
      : casesData.filter((c) => c.status === activeTab);

  const counts = {
    all: casesData.length,
    completed: casesData.filter((c) => c.status === 'completed').length,
    in_progress: casesData.filter((c) => c.status === 'in_progress').length,
  };

  return (
    <Section
      id="cases"
      eyebrow={portfolio.eyebrow}
      title={portfolio.title}
      description={portfolio.description}
    >
      {/* Tab filter — horizontally scrollable so long locale labels (e.g.
          "In Development") never overlap or clip on narrow screens */}
      <div className="mb-12 flex justify-center overflow-x-auto px-4">
        <div className="border-white/8 flex shrink-0 gap-1 rounded-full border bg-white/[0.03] p-1 backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 sm:gap-2 sm:px-5 sm:text-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-neon-purple'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 font-mono text-xs ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white/8 text-gray-600'
                }`}
              >
                {counts[tab.id]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio grid */}
      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((c) => {
          const isInProgress = c.status === 'in_progress';
          return (
            <motion.div
              key={c.title}
              variants={cardVariants}
              className="glass-card group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-kosmos-800">
                <img
                  src={c.image}
                  alt={c.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className={[
                    'size-full transition-all duration-700 group-hover:scale-105',
                    c.isRealPhoto
                      ? 'object-cover'
                      : 'object-contain p-6 opacity-50',
                    isInProgress
                      ? 'opacity-30 blur-[3px] grayscale group-hover:blur-[2px]'
                      : '',
                    !isInProgress && c.isRealPhoto
                      ? 'opacity-75 group-hover:opacity-90'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />

                {/* Bottom image gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-kosmos-900/90 to-transparent" />

                {/* Status badge */}
                <div className="absolute left-3 top-3">
                  {isInProgress ? (
                    <div className="border-neon-purple/28 flex items-center gap-1.5 rounded-full border bg-kosmos-900/85 px-2.5 py-1 font-mono text-xs font-medium text-neon-purple-bright/80 backdrop-blur-sm">
                      <span className="animate-pulse-dot size-1.5 rounded-full bg-neon-purple" />
                      {portfolio.status.inDev}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 rounded-full border border-neon-blue/25 bg-kosmos-900/85 px-2.5 py-1 font-mono text-xs font-medium text-neon-blue-bright/80 backdrop-blur-sm">
                      <span className="size-1.5 rounded-full bg-neon-blue" />
                      {portfolio.status.live}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-widest text-neon-purple-bright/55">
                  {c.category}
                </div>

                <h3 className="mb-2.5 text-lg font-semibold tracking-tight text-white">
                  {c.title}
                </h3>

                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500">
                  {c.description}
                </p>

                {/* Tags */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-white/8 rounded-full border bg-white/[0.03] px-2.5 py-0.5 font-mono text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                {isInProgress ? (
                  <button
                    disabled
                    className="border-white/8 mt-auto inline-flex cursor-not-allowed items-center justify-center rounded-full border bg-white/[0.03] px-5 py-2 text-sm font-medium text-gray-700"
                  >
                    {portfolio.comingSoon}
                  </button>
                ) : (
                  <Link
                    href={`/cases#${c.caseId}`}
                    className="group/link mt-auto inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-neon-purple-bright"
                  >
                    {portfolio.viewCase}
                    <svg
                      className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-14 flex justify-center"
      >
        <Link
          href="/cases"
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-semibold text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-neon-purple/35 hover:text-white hover:shadow-neon-purple"
        >
          {portfolio.viewAll}
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </motion.div>
    </Section>
  );
};

export { VerticalFeatures };

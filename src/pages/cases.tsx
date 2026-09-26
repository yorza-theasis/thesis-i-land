import { ArrowUpRight } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { CaseMedia } from '../components/CaseMedia';
import { Frame } from '../components/Frame';
import { EASE, Reveal, SPRING } from '../components/motion';
import { StatusBadge } from '../components/StatusBadge';
import type { CaseMeta, CaseType } from '../data/cases';
import { CASES } from '../data/cases';
import { useT } from '../i18n/LocaleContext';
import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { SiteShell } from '../layout/SiteShell';
import { Cta } from '../templates/Cta';
import { AppConfig } from '../utils/AppConfig';

type Filter = 'all' | CaseType;

const mediaAspect = (meta: CaseMeta) => {
  if (meta.id === 'qpick') return 'aspect-[4/5] lg:aspect-[4/3]';
  return 'aspect-[4/3]';
};

const CaseStudy = ({ meta, flip }: { meta: CaseMeta; flip: boolean }) => {
  const { cases, casesPage, common } = useT();
  const c = cases[meta.id];

  return (
    <motion.article
      id={`case-${meta.num}`}
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="border-t border-line/10 py-16 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
          <Reveal>
            <p className="label flex flex-wrap items-center gap-3">
              <span className="text-signal-ink">{meta.num}</span>
              <span aria-hidden="true" className="h-px w-5 bg-line/20" />
              <span>{c.category}</span>
              <span aria-hidden="true" className="text-line/30">
                ·
              </span>
              <span>
                {meta.type === 'hardware' ? common.hardware : common.software}
              </span>
            </p>
            <h2 className="mt-5 text-[2rem] font-medium leading-[1.05] tracking-heading text-ink md:text-5xl">
              {c.title}
            </h2>
            <p className="mt-3 text-lg text-muted">{c.subtitle}</p>
            <div className="mt-5">
              <StatusBadge status={meta.status} />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            {c.goal && c.solution && c.result ? (
              <dl className="mt-10 border-t border-line/10">
                {[
                  { term: casesPage.labels.goal, detail: c.goal },
                  { term: casesPage.labels.solution, detail: c.solution },
                ].map((row) => (
                  <div key={row.term} className="border-b border-line/10 py-5">
                    <dt className="label">{row.term}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                      {row.detail}
                    </dd>
                  </div>
                ))}
                <div className="border-b border-line/10 py-5">
                  <dt className="label">{casesPage.labels.result}</dt>
                  <dd className="mt-3">
                    <ul className="space-y-2">
                      {c.result.map((r) => (
                        <li
                          key={r.text}
                          className="flex gap-3 text-[15px] leading-relaxed text-ink"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-signal"
                          />
                          {r.text}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="mt-10 border-t border-line/10 pt-6 text-[15px] leading-relaxed text-muted">
                {c.description}
              </p>
            )}
          </Reveal>
        </div>

        <Reveal
          delay={0.12}
          className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}
        >
          <div className="group">
            <Frame innerClassName={mediaAspect(meta)}>
              <CaseMedia
                meta={meta}
                alt={c.imageAlt}
                figureCaption={c.figure}
              />
            </Frame>
          </div>
          <div className="mt-6 flex flex-col gap-5 px-1 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="label">{casesPage.labels.stack}</p>
              <p className="mt-2 font-mono text-xs leading-5 text-muted">
                {meta.stack.join(' / ')}
              </p>
              <p className="mt-4 text-sm text-subtle">{c.tags.join(' · ')}</p>
            </div>
            {meta.href && (
              <a
                href={meta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex shrink-0 items-center gap-2 rounded-full border border-line/15 px-4 py-2 text-sm text-ink transition-colors duration-300 hover:border-line/30 hover:bg-line/[0.04]"
              >
                {casesPage.visitLive}
                <ArrowUpRight
                  size={14}
                  weight="regular"
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-spring group-hover/link:-translate-y-px group-hover/link:translate-x-0.5"
                />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </motion.article>
  );
};

const CasesContent = () => {
  const { casesPage, common } = useT();
  const router = useRouter();

  // The active filter lives in the URL (?type=hardware) so it can be shared
  // and survives reloads. Empty during prerender, filled after hydration.
  const { type } = router.query;
  const filter: Filter =
    type === 'software' || type === 'hardware' ? type : 'all';
  const setFilter = (next: Filter) => {
    const query = { ...router.query };
    delete query.type;
    if (next !== 'all') query.type = next;
    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const counts = {
    all: CASES.length,
    software: CASES.filter((c) => c.type === 'software').length,
    hardware: CASES.filter((c) => c.type === 'hardware').length,
  };
  const visible =
    filter === 'all' ? CASES : CASES.filter((c) => c.type === filter);
  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: common.all },
    { id: 'software', label: common.software },
    { id: 'hardware', label: common.hardware },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 md:pb-20 md:pt-44">
        <div
          aria-hidden="true"
          className="blueprint pointer-events-none absolute inset-0"
        />
        <div className="container-page relative">
          <Reveal>
            <p className="label flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-signal" />
              {casesPage.label}
            </p>
          </Reveal>
          <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <h1 className="text-[2.75rem] font-medium leading-[1.02] tracking-display text-ink sm:text-6xl xl:text-7xl">
                {casesPage.title}
              </h1>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">
                {casesPage.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4 lg:justify-self-end">
              <p className="font-mono text-sm text-subtle">
                <span className="text-ink">{counts.all}</span>{' '}
                {casesPage.count.cases} ·{' '}
                <span className="text-ink">{counts.software}</span>{' '}
                {casesPage.count.software} ·{' '}
                <span className="text-ink">{counts.hardware}</span>{' '}
                {casesPage.count.hardware}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div
              role="tablist"
              aria-label={casesPage.filterLabel}
              className="mt-12 inline-flex rounded-full border border-line/10 bg-elev/60 p-1"
            >
              {tabs.map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(tab.id)}
                    className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="cases-filter"
                        transition={SPRING}
                        className="absolute inset-0 rounded-full bg-line/[0.08]"
                      />
                    )}
                    <span className="relative">{tab.label}</span>
                    <span className="relative font-mono text-xs text-subtle">
                      {counts[tab.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-page">
        <AnimatePresence initial={false}>
          {visible.map((meta, i) => (
            <CaseStudy key={meta.id} meta={meta} flip={i % 2 === 1} />
          ))}
        </AnimatePresence>
      </div>

      <div className="pt-8">
        <Cta />
      </div>
    </>
  );
};

const CasesPage = ({ locale = 'en' as Locale }: { locale?: Locale }) => {
  const t = translations[locale];
  return (
    <SiteShell
      locale={locale}
      title={`${t.casesPage.title} — ${AppConfig.site_name}`}
      description={t.casesPage.subtitle}
      path="cases/"
    >
      <CasesContent />
    </SiteShell>
  );
};

export default CasesPage;

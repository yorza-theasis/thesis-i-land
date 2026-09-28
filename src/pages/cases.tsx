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

const CaseStudy = ({ meta }: { meta: CaseMeta }) => {
  const { cases, casesPage } = useT();
  const c = cases[meta.id];

  return (
    <motion.article
      id={`case-${meta.num}`}
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="py-14 md:py-20"
    >
      {/* Text always left, media always right: a consistent reading line
          rather than a zig-zag. */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-sm text-subtle">{c.category}</p>
            <h2 className="mt-3 text-[2rem] font-medium leading-[1.05] tracking-heading text-ink md:text-[2.75rem]">
              {c.title}
            </h2>
            <p className="mt-3 text-lg text-muted">{c.subtitle}</p>
            <p className="mt-3">
              <StatusBadge status={meta.status} />
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            {c.goal && c.solution && c.result ? (
              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="text-sm font-medium text-ink">
                    {casesPage.labels.goal}
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-muted">
                    {c.goal}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-ink">
                    {casesPage.labels.solution}
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-muted">
                    {c.solution}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-ink">
                    {casesPage.labels.result}
                  </dt>
                  <dd className="mt-1.5 space-y-1.5">
                    {c.result.map((r) => (
                      <p
                        key={r.text}
                        className="text-[15px] leading-relaxed text-ink"
                      >
                        {r.text}
                      </p>
                    ))}
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="mt-10 text-[15px] leading-relaxed text-muted">
                {c.description}
              </p>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-7">
          <div className="group">
            <Frame innerClassName="aspect-[4/3]">
              <CaseMedia
                meta={meta}
                alt={c.imageAlt}
                figureCaption={c.figure}
              />
            </Frame>
          </div>
          <div className="mt-6 flex flex-col gap-5 px-1 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium text-ink">
                {casesPage.labels.stack}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {meta.stack.join(', ')}
              </p>
              <p className="mt-3 text-sm text-subtle">{c.tags.join(', ')}</p>
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
      <section className="pb-8 pt-32 md:pt-40">
        <div className="container-page">
          <Reveal>
            <h1 className="text-[2.75rem] font-medium leading-[1.02] tracking-display text-ink sm:text-6xl">
              {casesPage.title}
            </h1>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">
              {casesPage.subtitle}
            </p>
            <p className="mt-3 text-sm text-subtle">
              {counts.all} {casesPage.count.cases}: {counts.software}{' '}
              {casesPage.count.software}, {counts.hardware}{' '}
              {casesPage.count.hardware}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              role="tablist"
              aria-label={casesPage.filterLabel}
              className="mt-10 inline-flex rounded-full border border-line/10 bg-elev/60 p-1"
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
                    <span className="relative text-xs tabular-nums text-subtle">
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
          {visible.map((meta) => (
            <CaseStudy key={meta.id} meta={meta} />
          ))}
        </AnimatePresence>
      </div>

      <Cta />
    </>
  );
};

const CasesPage = ({ locale = 'en' as Locale }: { locale?: Locale }) => {
  const t = translations[locale];
  return (
    <SiteShell
      locale={locale}
      title={`${t.casesPage.title} | ${AppConfig.site_name}`}
      description={t.casesPage.subtitle}
      path="cases/"
    >
      <CasesContent />
    </SiteShell>
  );
};

export default CasesPage;

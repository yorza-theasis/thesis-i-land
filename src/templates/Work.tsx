import { ArrowUpRight } from '@phosphor-icons/react';
import Link from 'next/link';

import { ButtonLink } from '../components/ButtonLink';
import { CaseMedia } from '../components/CaseMedia';
import { Frame } from '../components/Frame';
import { Reveal, RevealGroup, RevealItem } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import type { CaseId } from '../data/cases';
import { caseHref, CASES, getCase } from '../data/cases';
import { useBase, useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Curated mix of hardware and software; aspect ratios vary on purpose so
 * the offset two-column grid reads as an editorial spread. */
const FEATURED: { id: CaseId; aspect: string }[] = [
  { id: 'qpick', aspect: 'aspect-[4/5]' },
  { id: 'extensa', aspect: 'aspect-square' },
  { id: 'wirebender', aspect: 'aspect-[4/3]' },
  { id: 'gmi', aspect: 'aspect-[4/3]' },
  { id: 'niania', aspect: 'aspect-[4/3]' },
  { id: 'crsf', aspect: 'aspect-[4/3]' },
];

const WorkCard = ({ id, aspect }: { id: CaseId; aspect: string }) => {
  const { cases, common } = useT();
  const base = useBase();
  const meta = getCase(id);
  const copy = cases[id];

  return (
    <Link href={caseHref(base, id)} className="group block rounded-[1.75rem]">
      <Frame innerClassName={aspect}>
        <CaseMedia
          meta={meta}
          alt={copy.imageAlt}
          figureCaption={copy.figure}
        />
      </Frame>
      <div className="mt-6 flex items-start justify-between gap-6 px-1">
        <div>
          <p className="text-sm text-subtle">{copy.category}</p>
          <h3 className="mt-2 text-2xl font-medium tracking-heading text-ink md:text-[1.75rem]">
            {copy.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
            {copy.summary}
          </p>
          <p className="mt-3">
            <StatusBadge status={meta.status} />
          </p>
        </div>
        <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-line/15 text-ink transition-[background-color,color,border-color] duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
          <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
          <span className="sr-only">{common.viewCase}</span>
        </span>
      </div>
    </Link>
  );
};

/* Remaining projects as a horizontal strip of image cards, not a long list. */
const MoreStrip = () => {
  const { work, cases } = useT();
  const base = useBase();
  const featured = FEATURED.map((f) => f.id);
  const more = CASES.filter((c) => !featured.includes(c.id));

  return (
    <Reveal className="mt-24 md:mt-28">
      <h3 className="text-xl font-medium tracking-[-0.02em] text-ink">
        {work.more}
      </h3>
      <ul className="-mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 md:-mx-8 md:px-8">
        {more.map((c) => (
          <li key={c.id} className="w-64 shrink-0 snap-start md:w-72">
            <Link
              href={caseHref(base, c.id)}
              className="group block rounded-[1.75rem]"
            >
              <Frame innerClassName="aspect-[4/3]">
                <CaseMedia
                  meta={c}
                  alt={cases[c.id].imageAlt}
                  figureCaption={cases[c.id].figure}
                />
              </Frame>
              <p className="mt-4 px-1 text-base font-medium text-ink">
                {cases[c.id].title}
              </p>
              <p className="mt-1 px-1 text-sm text-subtle">
                {cases[c.id].category}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
};

const Work = () => {
  const { work, common } = useT();
  const base = useBase();

  return (
    <Section id="cases" tone="alt">
      <SectionHeader title={work.title} description={work.description} />

      <RevealGroup className="mt-14 grid gap-x-8 gap-y-16 md:mt-16 md:grid-cols-2 md:pb-28">
        {FEATURED.map((f) => (
          // Offset lives on an inner wrapper: Framer owns the item's own transform.
          <RevealItem
            key={f.id}
            className="md:[&:nth-child(even)>div]:translate-y-28"
          >
            <div>
              <WorkCard id={f.id} aspect={f.aspect} />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <MoreStrip />

      <div className="mt-10">
        <ButtonLink href={`${base}/cases/`} variant="secondary">
          {common.allCases}
        </ButtonLink>
      </div>
    </Section>
  );
};

export { Work };

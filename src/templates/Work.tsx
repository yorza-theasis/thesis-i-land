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
        <span className="label absolute left-4 top-4 rounded-full bg-bg/85 px-2.5 py-1 !text-ink">
          {meta.type === 'hardware' ? common.hardware : common.software}
        </span>
      </Frame>
      <div className="mt-6 flex items-start justify-between gap-6 px-1">
        <div>
          <p className="label flex items-center gap-3">
            <span>{meta.num}</span>
            <span aria-hidden="true" className="h-px w-5 bg-line/20" />
            <span className="truncate">{copy.category}</span>
          </p>
          <h3 className="mt-3 text-2xl font-medium tracking-heading text-ink md:text-[1.75rem]">
            {copy.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-[52ch] text-[15px] leading-relaxed text-muted">
            {copy.summary}
          </p>
          <div className="mt-4">
            <StatusBadge status={meta.status} />
          </div>
        </div>
        <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-line/15 text-ink transition-[background-color,color,border-color,transform] duration-300 ease-spring group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
          <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
          <span className="sr-only">{common.viewCase}</span>
        </span>
      </div>
    </Link>
  );
};

const Work = () => {
  const { work, cases, common } = useT();
  const base = useBase();
  const featuredIds = FEATURED.map((f) => f.id);
  const more = CASES.filter((c) => !featuredIds.includes(c.id));

  return (
    <Section id="cases">
      <SectionHeader
        index="03"
        label={work.label}
        title={work.title}
        description={work.description}
      />

      <RevealGroup className="mt-16 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-2 md:pb-28">
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

      <Reveal className="mt-24 md:mt-28">
        <h3 className="label">{work.more}</h3>
        <ul className="mt-5 border-t border-line/10">
          {more.map((c) => (
            <li key={c.id}>
              <Link
                href={caseHref(base, c.id)}
                className="group grid grid-cols-[2.5rem_1fr_1.25rem] items-center gap-4 border-b border-line/10 py-5 transition-colors duration-300 hover:bg-line/[0.025] md:grid-cols-[3.5rem_1.1fr_1fr_8rem_1.25rem]"
              >
                <span className="font-mono text-xs text-subtle">{c.num}</span>
                <span className="text-lg font-medium tracking-[-0.01em] text-ink transition-transform duration-500 ease-spring group-hover:translate-x-1">
                  {cases[c.id].title}
                </span>
                <span className="hidden truncate text-sm text-muted md:block">
                  {cases[c.id].category}
                </span>
                <span className="label hidden md:block">
                  {c.type === 'hardware' ? common.hardware : common.software}
                </span>
                <ArrowUpRight
                  size={18}
                  weight="regular"
                  aria-hidden="true"
                  className="justify-self-end text-subtle transition-transform duration-300 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href={`${base}/cases/`} variant="secondary">
            {work.viewAll}
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
};

export { Work };

import { ArrowUpRight } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { Frame } from '../components/Frame';
import { EASE, Reveal } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import type { CaseId } from '../data/cases';
import { caseHref, caseThumb, getCase } from '../data/cases';
import { useBase, useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Cases that prove each answer, aligned with challenges.items by index. */
const PROOF: CaseId[][] = [
  ['niania', 'extensa'],
  ['aidept', 'ibd'],
  ['compliance', 'gmi'],
  ['qpick', 'crsf'],
  ['wirebender', 'butics'],
];

const ProofCard = ({ id }: { id: CaseId }) => {
  const { cases } = useT();
  const base = useBase();
  const thumb = caseThumb(getCase(id));
  return (
    <Link
      href={caseHref(base, id)}
      className="group flex items-center gap-4 rounded-2xl bg-bg/60 p-2 pr-4 ring-1 ring-line/[0.08] transition-colors duration-300 hover:bg-bg"
    >
      <span
        className="relative block aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-xl"
        style={
          thumb?.background ? { backgroundColor: thumb.background } : undefined
        }
      >
        {thumb && (
          <img
            src={thumb.src}
            alt=""
            loading="lazy"
            className={`size-full transition-transform duration-700 ease-out group-hover:scale-105 ${
              thumb.background ? 'object-contain p-1' : 'object-cover'
            }`}
            style={
              thumb.position ? { objectPosition: thumb.position } : undefined
            }
          />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.9375rem] font-medium text-ink">
          {cases[id].title}
        </span>
        <span className="block truncate text-sm text-subtle">
          {cases[id].category}
        </span>
      </span>
      <ArrowUpRight
        size={16}
        weight="regular"
        aria-hidden="true"
        className="shrink-0 text-subtle transition-transform duration-300 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:text-ink"
      />
    </Link>
  );
};

const Answer = ({ index }: { index: number }) => {
  const { challenges } = useT();
  const item = challenges.items[index]!;
  return (
    <>
      <p className="text-sm font-medium text-signal-ink">{item.capability}</p>
      <p className="mt-3 text-xl font-medium leading-snug tracking-[-0.02em] text-ink md:text-[1.375rem]">
        {item.answer}
      </p>
      <p className="label mt-8">{challenges.proof}</p>
      <div className="mt-3 grid grid-cols-1 gap-2">
        {PROOF[index]!.map((id) => (
          <ProofCard key={id} id={id} />
        ))}
      </div>
    </>
  );
};

/* Visitor picks the request that matches theirs; the panel answers it. */
const Challenges = () => {
  const { challenges } = useT();
  const [active, setActive] = useState(0);

  return (
    <Section id="challenges" tone="alt">
      <SectionHeader
        title={challenges.title}
        description={challenges.description}
      />

      <div className="mt-14 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <ul className="space-y-1">
            {challenges.items.map((item, i) => {
              const isActive = i === active;
              return (
                <li
                  key={item.problem}
                  className={`border-l-2 pl-5 transition-colors duration-500 md:pl-6 ${
                    isActive ? 'border-signal' : 'border-line/10'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="w-full py-4 text-left md:py-5"
                  >
                    <span
                      className={`text-xl font-medium leading-snug tracking-[-0.02em] transition-colors duration-500 md:text-[1.625rem] ${
                        isActive ? 'text-ink' : 'text-subtle hover:text-muted'
                      }`}
                    >
                      {item.problem}
                    </span>
                  </button>

                  {/* Inline answer on small screens, where the side panel is hidden. */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="pb-6 lg:hidden"
                      >
                        <Answer index={i} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <Frame innerClassName="p-7 xl:p-9">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <Answer index={active} />
                </motion.div>
              </AnimatePresence>
            </Frame>
          </div>
        </div>
      </div>
    </Section>
  );
};

export { Challenges };

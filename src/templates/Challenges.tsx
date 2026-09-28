import { ArrowUpRight } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { Frame } from '../components/Frame';
import { EASE, Reveal } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import type { CaseId } from '../data/cases';
import { caseHref } from '../data/cases';
import { useBase, useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Cases that prove each answer, aligned with challenges.items by index. */
const PROOF: CaseId[][] = [
  ['niania', 'extensa'],
  ['aidept', 'ibd'],
  ['gmi', 'compliance'],
  ['qpick', 'crsf'],
  ['wirebender', 'cardio'],
];

const ProofLinks = ({ ids }: { ids: CaseId[] }) => {
  const { cases, challenges } = useT();
  const base = useBase();
  return (
    <div>
      <p className="label">{challenges.proof}</p>
      <ul className="mt-3 space-y-1">
        {ids.map((id) => (
          <li key={id}>
            <Link
              href={caseHref(base, id)}
              className="group -mx-3 flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors duration-300 hover:bg-line/[0.05]"
            >
              <span>
                <span className="text-[15px] text-ink">{cases[id].title}</span>
                <span className="ml-2 text-sm text-subtle">
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
          </li>
        ))}
      </ul>
    </div>
  );
};

const Answer = ({ index }: { index: number }) => {
  const { challenges } = useT();
  const item = challenges.items[index]!;
  return (
    <>
      <p className="text-sm font-medium text-signal-ink">{item.capability}</p>
      <p className="mt-4 text-xl font-medium leading-snug tracking-[-0.02em] text-ink md:text-2xl">
        {item.answer}
      </p>
      <div className="mt-8">
        <ProofLinks ids={PROOF[index]!} />
      </div>
    </>
  );
};

/* Visitor picks the request that matches theirs; the panel answers it. */
const Challenges = () => {
  const { challenges } = useT();
  const [active, setActive] = useState(0);

  return (
    <Section id="challenges">
      <SectionHeader
        title={challenges.title}
        description={challenges.description}
      />

      <div className="mt-14 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <ul>
            {challenges.items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.problem}>
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
            <Frame innerClassName="p-8 xl:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="min-h-[320px]"
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

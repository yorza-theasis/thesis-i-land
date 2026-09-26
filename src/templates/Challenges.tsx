import { ArrowUpRight } from '@phosphor-icons/react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Frame } from '../components/Frame';
import { EASE, Reveal, SPRING } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import type { CaseId } from '../data/cases';
import { caseHref, getCase } from '../data/cases';
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

const CYCLE_MS = 6000;

const ProofLinks = ({ ids }: { ids: CaseId[] }) => {
  const { cases, challenges } = useT();
  const base = useBase();
  return (
    <div>
      <p className="label">{challenges.proof}</p>
      <ul className="mt-3 border-t border-line/10">
        {ids.map((id) => (
          <li key={id}>
            <Link
              href={caseHref(base, id)}
              className="group flex items-center justify-between gap-4 border-b border-line/10 py-3.5"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-subtle">
                  {getCase(id).num}
                </span>
                <span className="text-[15px] text-ink">{cases[id].title}</span>
                <span className="hidden text-sm text-subtle sm:inline">
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

const Challenges = () => {
  const { challenges } = useT();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { amount: 0.4 });

  // Gently cycles through the requests until the visitor picks one.
  useEffect(() => {
    if (!auto || !inView) return undefined;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % challenges.items.length),
      CYCLE_MS,
    );
    return () => clearTimeout(id);
  }, [auto, inView, active, challenges.items.length]);

  const select = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const current = challenges.items[active]!;

  return (
    <Section id="challenges">
      <SectionHeader
        index="01"
        label={challenges.label}
        title={challenges.title}
        description={challenges.description}
      />

      <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <ol ref={listRef} className="border-b border-line/10">
            {challenges.items.map((item, i) => {
              const isActive = i === active;
              return (
                <li
                  key={item.problem}
                  className="relative border-t border-line/10"
                >
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => select(i)}
                    onMouseEnter={() => select(i)}
                    className="group grid w-full grid-cols-[2.25rem_1fr_1rem] items-baseline gap-3 py-6 text-left md:grid-cols-[3rem_1fr_1rem] md:py-7"
                  >
                    <span className="font-mono text-sm text-subtle">
                      0{i + 1}
                    </span>
                    <span
                      className={`text-xl font-medium leading-snug tracking-[-0.02em] transition-colors duration-500 md:text-2xl ${
                        isActive
                          ? 'text-ink'
                          : 'text-subtle group-hover:text-muted'
                      }`}
                    >
                      {item.problem}
                    </span>
                    <span className="relative size-2 self-center justify-self-end">
                      {isActive && (
                        <motion.span
                          layoutId="challenge-dot"
                          transition={SPRING}
                          className="absolute inset-0 rounded-full bg-signal"
                        />
                      )}
                    </span>
                  </button>

                  {isActive && auto && inView && (
                    <motion.span
                      key={`progress-${active}`}
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-px origin-left bg-signal"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                    />
                  )}

                  {/* Inline answer on small screens, where the side panel is hidden. */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="pb-8 pl-[2.25rem] md:pl-12 lg:hidden"
                      >
                        <p className="font-mono text-xs text-signal-ink">
                          → {item.capability}
                        </p>
                        <p className="mt-3 text-base leading-relaxed text-muted">
                          {item.answer}
                        </p>
                        <div className="mt-6">
                          <ProofLinks ids={PROOF[i]!} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <Frame innerClassName="min-h-[420px] p-8 xl:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex min-h-[340px] flex-col"
                >
                  <div className="flex items-center justify-between">
                    <p className="label">{challenges.approach}</p>
                    <p className="font-mono text-xs text-signal-ink">
                      → {current.capability}
                    </p>
                  </div>
                  <p className="mt-8 text-2xl font-medium leading-snug tracking-[-0.02em] text-ink">
                    {current.answer}
                  </p>
                  <div className="mt-auto pt-10">
                    <ProofLinks ids={PROOF[active]!} />
                  </div>
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

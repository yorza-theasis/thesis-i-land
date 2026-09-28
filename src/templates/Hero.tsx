import { motion } from 'framer-motion';
import { Fragment } from 'react';

import { ButtonLink } from '../components/ButtonLink';
import { Dot } from '../components/Dot';
import { Frame } from '../components/Frame';
import { EASE, Reveal } from '../components/motion';
import { useBase, useT } from '../i18n/LocaleContext';

/* Word-by-word mask reveal; the logo's blue dot closes the sentence. */
const Headline = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <h1 className="mt-5 text-4xl font-medium leading-[1.04] tracking-display text-ink sm:text-5xl lg:text-[2.875rem] xl:text-[3.5rem]">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.08 + i * 0.05 }}
            >
              {word}
              {i === words.length - 1 && <Dot />}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </h1>
  );
};

/* Two real artefacts, one software and one hardware, offset without rotation. */
const HeroVisual = () => {
  const { hero } = useT();
  return (
    <div className="relative pb-[12%]">
      <motion.div
        className="ml-auto w-[84%]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      >
        <Frame innerClassName="aspect-square">
          <img
            src="/assets/images/extensa.jpg"
            alt={hero.imageAlt.extensa}
            width={1024}
            height={1024}
            fetchPriority="high"
            className="size-full object-cover"
          />
        </Frame>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 w-[40%]"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.4 }}
      >
        <Frame innerClassName="aspect-[4/5]">
          <img
            src="/assets/images/qpick.jpg"
            alt={hero.imageAlt.qpick}
            width={575}
            height={900}
            className="size-full object-cover"
            style={{ objectPosition: '50% 35%' }}
          />
        </Frame>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const { hero, common } = useT();
  const base = useBase();

  return (
    <section className="flex min-h-[100dvh] items-center pb-16 pt-24">
      <div className="container-page grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-sm text-muted">{hero.eyebrow}</p>
          </Reveal>
          <Headline text={hero.headline} />
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted">
              {hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={`${base}/contact/`}>
                {common.bookCall}
              </ButtonLink>
              <ButtonLink href={`${base}/cases/`} variant="secondary">
                {common.allCases}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

/* Track record from the company deck, directly under the hero. */
const Stats = () => {
  const { hero } = useT();
  return (
    <section className="pb-8">
      <div className="container-page">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-line/10 ring-1 ring-line/10 lg:grid-cols-4">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-bg p-6 md:p-8">
                <dt className="order-2 mt-3 text-sm font-medium text-ink">
                  {stat.label}
                </dt>
                <dd className="order-1 text-4xl font-medium tabular-nums tracking-[-0.03em] text-ink md:text-5xl">
                  {stat.value}
                  {stat.suffix}
                </dd>
                <dd className="order-3 mt-1 text-sm leading-snug text-subtle">
                  {stat.note}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export { Hero, Stats };

import type { ReactNode } from 'react';

import { Reveal } from './motion';

type SectionHeaderProps = {
  title: ReactNode;
  description?: string;
};

/* Headline with an optional lede stacked underneath. No eyebrow. */
const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <div className="max-w-3xl">
    <Reveal>
      <h2 className="text-[2rem] font-medium leading-[1.06] tracking-heading text-ink sm:text-[2.625rem] lg:text-5xl">
        {title}
      </h2>
    </Reveal>
    {description && (
      <Reveal delay={0.08}>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      </Reveal>
    )}
  </div>
);

export { SectionHeader };

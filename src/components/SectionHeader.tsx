import type { ReactNode } from 'react';

import { Reveal } from './motion';

type SectionHeaderProps = {
  index?: string;
  label: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
};

/* Thesis-style chapter header: index + label in the margin column, title
 * and lede in the main column. */
const SectionHeader = ({
  index,
  label,
  title,
  description,
  children,
}: SectionHeaderProps) => (
  <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-8">
    <Reveal className="md:col-span-4 lg:col-span-3">
      <p className="label flex items-center gap-3 pt-2">
        {index && <span className="text-signal-ink">{index}</span>}
        <span aria-hidden="true" className="h-px w-8 bg-line/20" />
        {label}
      </p>
    </Reveal>
    <div className="md:col-span-8 lg:col-span-9">
      <Reveal>
        <h2 className="max-w-[20ch] text-[2.125rem] font-medium leading-[1.04] tracking-heading text-ink sm:text-5xl lg:text-[3.375rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  </div>
);

export { SectionHeader };

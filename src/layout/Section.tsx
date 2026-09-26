import type { ReactNode } from 'react';

/* Registration mark drawn where a section rule meets the column edge —
 * a drafting-table detail that ties the grid to the brand. */
const Crosshair = ({ side }: { side: 'left' | 'right' }) => (
  <span
    aria-hidden="true"
    className={`absolute top-1/2 size-[11px] -translate-y-1/2 ${
      side === 'left' ? 'left-[-5px]' : 'right-[-5px]'
    }`}
  >
    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line/40" />
    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line/40" />
  </span>
);

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  rule?: boolean;
};

const Section = ({
  id,
  children,
  className = '',
  rule = true,
}: SectionProps) => (
  <section id={id} className={`relative pb-24 md:pb-36 ${className}`}>
    {rule && (
      <div className="container-page">
        <div className="relative h-px bg-line/10">
          <Crosshair side="left" />
          <Crosshair side="right" />
        </div>
      </div>
    )}
    <div className={`container-page ${rule ? 'pt-20 md:pt-28' : ''}`}>
      {children}
    </div>
  </section>
);

export { Section };

import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** "alt" sections sit on a slightly lifted band so neighbours read apart. */
  tone?: 'base' | 'alt';
};

const Section = ({
  id,
  children,
  className = '',
  tone = 'base',
}: SectionProps) => (
  <section
    id={id}
    className={`relative py-16 sm:py-24 md:py-32 ${tone === 'alt' ? 'bg-elev' : ''} ${className}`}
  >
    <div className="container-page">{children}</div>
  </section>
);

export { Section };

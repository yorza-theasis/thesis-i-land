import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/* Sections are separated by spacing alone, no decorative rules. */
const Section = ({ id, children, className = '' }: SectionProps) => (
  <section id={id} className={`relative py-24 md:py-32 ${className}`}>
    <div className="container-page">{children}</div>
  </section>
);

export { Section };

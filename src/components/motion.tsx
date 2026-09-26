import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE = [0.16, 1, 0.3, 1] as const;

export const SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const;

/* Heavy fade-up that resolves from a slight blur. `custom` carries the
 * per-element delay so it survives the variant's own transition. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const Reveal = ({ children, className, delay = 0 }: RevealProps) => (
  <motion.div
    className={className}
    variants={revealVariants}
    custom={delay}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul' | 'ol';
};

/* Parent and children must share one client tree for staggerChildren to
 * orchestrate — RevealItem only works inside RevealGroup. */
const RevealGroup = ({
  children,
  className,
  stagger = 0.08,
  as = 'div',
}: RevealGroupProps) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </Component>
  );
};

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
};

const RevealItem = ({ children, className, as = 'div' }: RevealItemProps) => {
  const Component = motion[as];
  return (
    <Component className={className} variants={revealVariants}>
      {children}
    </Component>
  );
};

export { Reveal, RevealGroup, RevealItem };

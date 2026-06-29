import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  description?: string;
  eyebrow?: string;
  yPadding?: string;
  id?: string;
  children: ReactNode;
};

const Section = (props: ISectionProps) => (
  <div
    id={props.id}
    className={`mx-auto max-w-screen-xl px-6 ${
      props.yPadding ? props.yPadding : 'py-24'
    }`}
  >
    {(props.eyebrow || props.title || props.description) && (
      <div className="mb-16 text-center">
        {props.eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-neon-purple-bright/60"
          >
            <span className="h-px w-6 bg-gradient-to-r from-neon-purple to-neon-blue opacity-60" />
            {props.eyebrow}
            <span className="h-px w-6 bg-gradient-to-l from-neon-purple to-neon-blue opacity-60" />
          </motion.div>
        )}
        {props.title && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.65,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl font-bold tracking-tighter text-white"
            >
              {props.title}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mx-auto mt-5 h-px w-24 origin-left bg-gradient-to-r from-neon-purple via-neon-blue to-transparent"
            />
          </>
        )}
        {props.description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base leading-relaxed text-gray-500 md:px-20"
          >
            {props.description}
          </motion.p>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { Section };

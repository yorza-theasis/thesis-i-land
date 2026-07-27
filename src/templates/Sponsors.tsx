import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { Background } from '../background/Background';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

const ServiceIcon = ({ idx }: { idx: number }): ReactNode => {
  if (idx === 0)
    return (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    );
  if (idx === 1)
    return (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="7" rx="1" />
        <rect x="2" y="14" width="20" height="7" rx="1" />
        <circle cx="6" cy="6.5" r="1" fill="currentColor" />
        <circle cx="6" cy="17.5" r="1" fill="currentColor" />
      </svg>
    );
  if (idx === 2)
    return (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 19a4.5 4.5 0 01-.42-8.98 7 7 0 0113.84 0A4.5 4.5 0 0117.5 19H6.5z" />
      </svg>
    );
  if (idx === 3)
    return (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z" />
      </svg>
    );
  return (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16v16H4z" />
      <path d="M8 8l8 8" />
      <path d="M16 8l-8 8" />
    </svg>
  );
};

const serviceNums = ['01', '02', '03', '04', '05'];

const serviceTags = [
  ['Next.js', 'React Native', 'Kotlin', 'KMP'],
  ['Java', 'Spring Boot', 'gRPC', 'Kafka'],
  ['AWS', 'Kubernetes', 'Docker', 'Helm'],
  ['System Design', 'API Design', 'GitOps', 'DDD'],
  ['AI Strategy', 'Custom Models', 'Clean Architecture'],
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const Sponsors = () => {
  const { services } = useT();

  return (
    <Background withGrid withGlow>
      <Section
        id="services"
        eyebrow={services.eyebrow}
        title={services.title}
        description={services.description}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {services.items.map((service, idx) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="shimmer-hover glass-card group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neon-purple"
            >
              {/* Ghost background number */}
              <div
                className="text-8xl pointer-events-none absolute right-5 top-3 select-none font-mono font-black leading-none text-white/[0.03] transition-all duration-500 group-hover:text-white/[0.05]"
                aria-hidden="true"
              >
                {serviceNums[idx]}
              </div>

              {/* Header row */}
              <div className="relative mb-6 flex items-center justify-between">
                <div className="border-neon-purple/22 bg-neon-purple/8 group-hover:bg-neon-purple/16 flex size-11 items-center justify-center rounded-xl border text-neon-purple-bright transition-all duration-300 group-hover:border-neon-purple/45">
                  <ServiceIcon idx={idx} />
                </div>
                <span className="border-white/8 bg-white/4 rounded-full border px-3 py-1 font-mono text-xs text-gray-600">
                  {service.stat}
                </span>
              </div>

              <h3 className="relative mb-3 text-xl font-semibold tracking-tight text-white">
                {service.title}
              </h3>

              <p className="relative mb-6 text-sm leading-relaxed text-gray-500">
                {service.description}
              </p>

              {/* Tech tags */}
              <div className="relative flex flex-wrap gap-2">
                {serviceTags[idx]!.map((tag) => (
                  <span
                    key={tag}
                    className="border-white/7 rounded-full border bg-white/[0.03] px-3 py-1 font-mono text-xs text-gray-600 transition-colors duration-200 hover:border-neon-purple/25 hover:text-neon-purple-bright/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-neon-purple via-neon-blue to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </Background>
  );
};

export { Sponsors };

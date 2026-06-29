import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';

const services = [
  {
    num: '01',
    title: 'Mobile & Web Development',
    description:
      'Cross-platform mobile apps with Kotlin & KMP, and modern web interfaces with React/Next.js. Performant, polished experiences from native Android to the browser.',
    tags: ['Next.js', 'React Native', 'Kotlin', 'KMP'],
    stat: '8+ apps',
    icon: (
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
    ),
  },
  {
    num: '02',
    title: 'Backend & API Development',
    description:
      'Scalable Java/Spring microservices, RESTful and gRPC APIs, event-driven systems with Kafka — built to handle millions of requests at enterprise scale.',
    tags: ['Java', 'Spring Boot', 'gRPC', 'Kafka'],
    stat: '12+ services',
    icon: (
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
    ),
  },
  {
    num: '03',
    title: 'Cloud & DevOps',
    description:
      'Cloud-native infrastructure on AWS and Azure. Docker, Kubernetes, Helm — full CI/CD pipelines with automated deployments, monitoring, and reliable operations.',
    tags: ['AWS', 'Kubernetes', 'Docker', 'Helm'],
    stat: '5+ clusters',
    icon: (
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
    ),
  },
  {
    num: '04',
    title: 'Architecture & Consulting',
    description:
      'Technical leadership from service boundaries and API contracts to technology selection. We bring architectural clarity and engineering confidence to complex systems.',
    tags: ['System Design', 'API Design', 'GitOps', 'DDD'],
    stat: '3 greenfields',
    icon: (
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
    ),
  },
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

const Sponsors = () => (
  <Background withGrid withGlow>
    <Section
      id="services"
      eyebrow="What we build"
      title="Engineering Excellence."
      description="We operate at the intersection of strong technical craft and product thinking — covering the full stack, from pixel to pipeline."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        {services.map((service) => (
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
              {service.num}
            </div>

            {/* Header row */}
            <div className="relative mb-6 flex items-center justify-between">
              <div className="border-neon-purple/22 bg-neon-purple/8 group-hover:bg-neon-purple/16 flex size-11 items-center justify-center rounded-xl border text-neon-purple-bright transition-all duration-300 group-hover:border-neon-purple/45">
                {service.icon}
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
              {service.tags.map((tag) => (
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

export { Sponsors };

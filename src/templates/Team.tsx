import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { Background } from '@/background/Background';

import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

const teamMeta = [
  {
    initials: 'VB',
    name: 'Vitalii Bretsko',
    experience: '5+ yrs',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes', 'AWS'],
    gradientFrom: '#b026ff',
    gradientTo: '#0047ff',
    linkedin: 'https://www.linkedin.com/in/vitalii-bretsko',
  },
  {
    initials: 'YO',
    name: 'Yevhenii Orza',
    experience: '4+ yrs',
    skills: ['Next.js', 'React', 'React Native', 'TypeScript', 'Tailwind CSS'],
    gradientFrom: '#0047ff',
    gradientTo: '#b026ff',
    linkedin: 'https://www.linkedin.com/in/yevhenii-orza',
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const Team = () => {
  const { team } = useT();

  return (
    <Background withGlow>
      <Section
        id="team"
        eyebrow={team.eyebrow}
        title={team.title}
        description={team.description}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          {teamMeta.map((meta, idx) => {
            const memberT = team.members[idx]!;
            return (
              <motion.div
                key={meta.name}
                variants={cardVariants}
                className="shimmer-hover glass-card group flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-neon-purple"
              >
                {/* Avatar + meta row */}
                <div className="mb-6 flex items-start gap-5">
                  {/* Avatar */}
                  <div
                    className="relative shrink-0 p-[1.5px]"
                    style={{
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${meta.gradientFrom}, ${meta.gradientTo})`,
                    }}
                  >
                    <div className="flex size-16 items-center justify-center rounded-full bg-kosmos-900">
                      <span className="font-mono text-xl font-bold text-white">
                        {meta.initials}
                      </span>
                    </div>
                  </div>

                  {/* Name + role + exp */}
                  <div className="flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        {meta.name}
                      </h3>
                    </div>
                    <p className="mb-2 font-mono text-xs font-medium text-neon-purple-bright/75">
                      {memberT.role}
                    </p>
                    <span className="border-neon-purple/18 bg-neon-purple/7 rounded-full border px-2.5 py-0.5 font-mono text-xs text-neon-purple-bright/60">
                      {meta.experience}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500">
                  {memberT.bio}
                </p>

                {/* Divider */}
                <div className="bg-white/6 mb-5 h-px" />

                {/* Skills */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {meta.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border-white/8 rounded-full border bg-white/[0.03] px-3 py-1 font-mono text-xs text-gray-600 transition-colors duration-200 hover:border-neon-purple/25 hover:text-neon-purple-bright/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* LinkedIn */}
                <Link
                  href={meta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-gray-600 transition-colors duration-200 hover:text-neon-purple-bright"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  {team.linkedin}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>
    </Background>
  );
};

export { Team };

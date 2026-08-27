import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

const techStack = [
  'Kotlin',
  'Java',
  'Jetpack Compose',
  'Android SDK',
  'KMP',
  'Compose Multiplatform',
  'Java 8–24',
  'Spring Boot',
  'Spring Cloud',
  'Quarkus',
  'Hibernate',
  'gRPC',
  'Next.js',
  'React',
  'React Native',
  'TypeScript',
  'Tailwind CSS',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'Elasticsearch',
  'DynamoDB',
  'MongoDB',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes',
  'Helm',
  'Jenkins',
  'REST',
  'Kafka',
  'RabbitMQ',
  'WebSockets',
  'JUnit',
  'Mockito',
  'Testcontainers',
  'SonarQube',
  'Firebase',
  'Git',
];

/* Two rows with different speeds for depth */
const row1 = techStack.slice(0, Math.ceil(techStack.length / 2));
const row2 = techStack.slice(Math.ceil(techStack.length / 2));

const MarqueeRow = ({
  items,
  reverse = false,
  speed = 40,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) => (
  <div className="relative overflow-hidden py-1.5">
    {/* Edge fade via mask (not an opaque overlay), so the shared global
        background shows through instead of a solid patch cutting it off. */}
    <div
      className="flex"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)',
        maskImage:
          'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)',
      }}
    >
      <div
        className="flex shrink-0 gap-3 pr-3"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {[...items, ...items].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="bg-white/4 border-white/8 shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 font-mono text-xs font-medium text-gray-400 transition-colors duration-200 hover:border-neon-purple/30 hover:text-neon-purple-bright"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const TechStack = () => {
  const { techStack: t } = useT();

  return (
    <Section
      id="techstack"
      eyebrow={t.eyebrow}
      title={t.title}
      description={t.description}
    >
      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} speed={45} />
        <MarqueeRow items={row2} speed={35} reverse />
      </div>
    </Section>
  );
};

export { TechStack };

import type { Icon } from '@phosphor-icons/react';
import {
  Brain,
  Circuitry,
  Cpu,
  Cube,
  Eye,
  Gear,
  Graph,
  TextAa,
} from '@phosphor-icons/react';

import { RevealGroup, RevealItem } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/** `logo` is a file name in public/assets/logos (simple-icons slug). */
type Tool = { name: string; logo?: string; icon?: Icon };

/* Brand marks are simple-icons SVGs (CC0) served from public/assets/logos and
 * painted through a CSS mask, so they cost no JS and follow the theme colour.
 * Concepts without a brand get a Phosphor glyph; tools with no mark at all
 * are listed as text under each cluster. Order matches techStack.groups. */
const CLUSTERS: { tools: Tool[]; also: string[] }[] = [
  {
    tools: [
      { name: 'Kotlin', logo: 'kotlin' },
      { name: 'Jetpack Compose', logo: 'jetpackcompose' },
      { name: 'Android SDK', logo: 'android' },
      { name: 'React / React Native', logo: 'react' },
      { name: 'Next.js', logo: 'nextdotjs' },
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'Tailwind CSS', logo: 'tailwindcss' },
    ],
    also: ['KMP', 'Compose Multiplatform'],
  },
  {
    tools: [
      { name: 'Java 8-24', logo: 'openjdk' },
      { name: 'Spring Boot', logo: 'springboot' },
      { name: 'Quarkus', logo: 'quarkus' },
      { name: 'Hibernate', logo: 'hibernate' },
      { name: 'Python', logo: 'python' },
      { name: 'FastAPI', logo: 'fastapi' },
      { name: 'PostgreSQL', logo: 'postgresql' },
      { name: 'MySQL', logo: 'mysql' },
      { name: 'Redis', logo: 'redis' },
      { name: 'Elasticsearch', logo: 'elasticsearch' },
      { name: 'DynamoDB', logo: 'amazondynamodb' },
      { name: 'MongoDB', logo: 'mongodb' },
      { name: 'Kafka', logo: 'apachekafka' },
      { name: 'RabbitMQ', logo: 'rabbitmq' },
      { name: 'AWS', logo: 'amazonwebservices' },
      { name: 'Docker', logo: 'docker' },
      { name: 'Kubernetes', logo: 'kubernetes' },
      { name: 'Helm', logo: 'helm' },
      { name: 'Jenkins', logo: 'jenkins' },
      { name: 'Firebase', logo: 'firebase' },
      { name: 'JUnit', logo: 'junit5' },
      { name: 'Git', logo: 'git' },
    ],
    also: [
      'Spring Cloud',
      'gRPC',
      'REST',
      'WebSockets',
      'Azure',
      'Testcontainers',
      'Mockito',
      'SonarQube',
    ],
  },
  {
    tools: [
      { name: 'LLM agents', icon: Brain },
      { name: 'RAG', icon: Graph },
      { name: 'NER', icon: TextAa },
      { name: 'Computer vision', icon: Eye },
      { name: 'PCB design', icon: Circuitry },
      { name: 'Control electronics', icon: Cpu },
      { name: 'Stepper drives', icon: Gear },
      { name: '3D printing', icon: Cube },
    ],
    also: [],
  },
];

const ToolTile = ({ tool }: { tool: Tool }) => {
  const Glyph = tool.icon;
  return (
    <li className="flex items-center gap-3 rounded-xl bg-surface px-3.5 py-3 ring-1 ring-line/[0.07]">
      {tool.logo ? (
        <span
          aria-hidden="true"
          className="size-5 shrink-0 bg-ink/80"
          style={{
            WebkitMask: `url(/assets/logos/${tool.logo}.svg) center / contain no-repeat`,
            mask: `url(/assets/logos/${tool.logo}.svg) center / contain no-repeat`,
          }}
        />
      ) : (
        Glyph && (
          <Glyph
            size={20}
            weight="regular"
            aria-hidden="true"
            className="shrink-0 text-signal-ink"
          />
        )
      )}
      <span className="min-w-0 text-sm leading-tight text-ink">
        {tool.name}
      </span>
    </li>
  );
};

const TechStack = () => {
  const { techStack } = useT();
  // Platform is the largest cluster, so it gets the full width.
  const order = [1, 0, 2];
  const span = ['lg:col-span-12', 'lg:col-span-7', 'lg:col-span-5'];
  const cols = [
    'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
    'grid-cols-2 sm:grid-cols-3',
    'grid-cols-2',
  ];

  return (
    <Section id="techstack" tone="alt">
      <SectionHeader
        title={techStack.title}
        description={techStack.description}
      />

      <RevealGroup className="mt-14 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-x-10">
        {order.map((groupIndex, i) => {
          const cluster = CLUSTERS[groupIndex]!;
          return (
            <RevealItem key={groupIndex} className={span[i]}>
              <h3 className="text-base font-medium text-ink">
                {techStack.groups[groupIndex]}
              </h3>
              <ul className={`mt-4 grid gap-2 ${cols[i]}`}>
                {cluster.tools.map((tool) => (
                  <ToolTile key={tool.name} tool={tool} />
                ))}
              </ul>
              {cluster.also.length > 0 && (
                <p className="mt-4 text-sm text-subtle">
                  {techStack.also}: {cluster.also.join(', ')}
                </p>
              )}
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
};

export { TechStack };

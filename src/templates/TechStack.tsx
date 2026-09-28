import { RevealGroup, RevealItem } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Three clusters instead of a row-per-category spec sheet. Order matches
 * techStack.groups in translations. */
const CLUSTERS: string[][] = [
  [
    'Kotlin',
    'Jetpack Compose',
    'Android SDK',
    'KMP',
    'Compose Multiplatform',
    'React Native',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
  ],
  [
    'Java 8-24',
    'Spring Boot',
    'Spring Cloud',
    'Quarkus',
    'Hibernate',
    'gRPC',
    'Python',
    'FastAPI',
    'PostgreSQL',
    'MySQL',
    'Redis',
    'Elasticsearch',
    'DynamoDB',
    'MongoDB',
    'Kafka',
    'RabbitMQ',
    'WebSockets',
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'Helm',
    'Jenkins',
    'Firebase',
    'JUnit',
    'Testcontainers',
    'SonarQube',
  ],
  [
    'LLM agents',
    'RAG',
    'NER',
    'Computer vision',
    'PCB design',
    'Control electronics',
    'Stepper drives',
    '3D printing',
  ],
];

const TechStack = () => {
  const { techStack } = useT();

  return (
    <Section id="techstack">
      <SectionHeader
        title={techStack.title}
        description={techStack.description}
      />

      <RevealGroup className="mt-14 grid gap-12 md:mt-16 lg:grid-cols-[1fr_1.6fr_1fr] lg:gap-14">
        {techStack.groups.map((group, i) => (
          <RevealItem key={group}>
            <h3 className="text-base font-medium text-ink">{group}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">
              {CLUSTERS[i]!.join(', ')}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
};

export { TechStack };

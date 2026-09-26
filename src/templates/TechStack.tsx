import { RevealGroup, RevealItem } from '../components/motion';
import { SectionHeader } from '../components/SectionHeader';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

/* Order matches techStack.groups in translations. */
const GROUPS: string[][] = [
  [
    'Kotlin',
    'Jetpack Compose',
    'Android SDK',
    'KMP',
    'Compose Multiplatform',
    'React Native',
  ],
  [
    'Java 8–24',
    'Spring Boot',
    'Spring Cloud',
    'Quarkus',
    'Hibernate',
    'gRPC',
    'Python',
    'FastAPI',
  ],
  ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  ['LLM agents', 'RAG', 'NER', 'Computer vision'],
  ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'DynamoDB', 'MongoDB'],
  [
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'Helm',
    'Jenkins',
    'Firebase',
    'Git',
  ],
  ['REST', 'Kafka', 'RabbitMQ', 'WebSockets'],
  ['JUnit', 'Mockito', 'Testcontainers', 'SonarQube'],
  ['PCB design', 'Control electronics', 'Stepper drives', '3D printing'],
];

const TechStack = () => {
  const { techStack } = useT();

  return (
    <Section id="techstack">
      <SectionHeader
        index="06"
        label={techStack.label}
        title={techStack.title}
        description={techStack.description}
      />

      <RevealGroup
        as="div"
        className="mt-16 grid gap-x-12 md:mt-20 md:grid-cols-2"
      >
        {techStack.groups.map((group, i) => (
          <RevealItem
            key={group}
            className="grid grid-cols-[8.5rem_1fr] gap-4 border-t border-line/10 py-5 md:grid-cols-[10rem_1fr]"
          >
            <h3 className="label pt-1">{group}</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[15px] text-ink/85">
              {GROUPS[i]!.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
};

export { TechStack };

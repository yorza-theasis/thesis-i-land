import { useEffect, useRef } from 'react';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';

const techCategories = [
  {
    name: 'Mobile',
    techs: [
      'Kotlin',
      'Java',
      'Jetpack Compose',
      'Android SDK',
      'KMP',
      'Compose Multiplatform',
    ],
  },
  {
    name: 'Backend',
    techs: [
      'Java 8-24',
      'Spring Boot',
      'Spring Cloud',
      'Quarkus',
      'Hibernate',
      'gRPC',
    ],
  },
  {
    name: 'Frontend',
    techs: ['Next.js', 'React', 'React Native', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Databases',
    techs: [
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Elasticsearch',
      'DynamoDB',
      'MongoDB',
    ],
  },
  {
    name: 'Cloud & DevOps',
    techs: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Helm', 'Jenkins'],
  },
  {
    name: 'Messaging & APIs',
    techs: ['REST', 'gRPC', 'Kafka', 'RabbitMQ', 'WebSockets'],
  },
  {
    name: 'Quality & Tools',
    techs: [
      'JUnit',
      'Mockito',
      'Testcontainers',
      'SonarQube',
      'Firebase',
      'Git',
    ],
  },
];

const TechStack = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth, children } =
        scrollRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = children[0]?.clientWidth || 320;
        const gap = 24;
        scrollRef.current.scrollBy({
          left: cardWidth + gap,
          behavior: 'smooth',
        });
      }
    }
  };

  const prevSlide = () => {
    if (scrollRef.current) {
      const { children } = scrollRef.current;
      const cardWidth = children[0]?.clientWidth || 320;
      const gap = 24;
      scrollRef.current.scrollBy({
        left: -(cardWidth + gap),
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Background color="bg-gray-100 dark:bg-gray-800" withGrid withGlow>
      <Section
        title="Technology Stack"
        description="Battle-tested technologies we use to deliver robust solutions."
      >
        <div className="relative w-full px-4 py-8 sm:px-12 md:px-16">
          {/* Обгортка з ефектом туману */}
          <div
            className="w-full"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            <div
              ref={scrollRef}
              className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 pt-2 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {techCategories.map((category) => (
                <div
                  key={category.name}
                  className="w-full shrink-0 snap-start rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-600 dark:bg-gray-700 sm:w-80"
                >
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.techs.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-500 shadow-md transition-colors hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 sm:size-12"
            aria-label="Previous technologies"
          >
            <svg
              className="size-5 sm:size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-500 shadow-md transition-colors hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 sm:size-12"
            aria-label="Next technologies"
          >
            <svg
              className="size-5 sm:size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </Section>
    </Background>
  );
};

export { TechStack };

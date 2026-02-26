import { useEffect, useRef, useState } from 'react';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';

const Sponsors = () => {
  // Стан для відстеження, чи з'явилася секція на екрані
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          // Відключаємо обзервер після першого спрацьовування,
          // щоб анімація не програвалася заново при скролі туди-сюди
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.3, // Анімація почнеться, коли хоча б 10% секції буде видно
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Функція-хелпер, щоб не дублювати довгі класи для кожної картки.
  // Вона приймає клас затримки (delay) і додає базові стилі + стилі анімації.
  const getCardClasses = (delayClass: string) => {
    return `rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800 transition-all duration-[1000ms] ease-out ${delayClass} ${
      isVisible
        ? 'opacity-100 translate-y-0' // Кінцевий стан: видно, на своєму місці
        : 'opacity-0 translate-y-16' // Початковий стан: прозоре, зміщене вниз на 64px
    }`;
  };

  return (
    <Background color="bg-white dark:bg-gray-900" withGrid>
      <Section
        id="services"
        title="What We Do"
        description="From mobile apps to enterprise backends, we deliver scalable software solutions."
      >
        {/* Вішаємо ref на контейнер карток */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Картка 1: Mobile (Швидко) */}
          <div className={getCardClasses('delay-[100ms]')}>
            <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 dark:bg-primary-900">
              <svg
                className="size-8 text-primary-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="7" y="2" width="10" height="20" rx="2" />
                <path d="M12 18h.01" />
              </svg>
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Mobile Development
            </h3>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              Mobile applications built with Kotlin, Jetpack Compose, and Kotlin
              Multiplatform. From native Android to cross-platform solutions, we
              deliver performant, polished experiences.
            </p>
          </div>

          {/* Картка 2: Web & Frontend (Повільно) */}
          <div className={getCardClasses('delay-[400ms]')}>
            <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 dark:bg-primary-900">
              <svg
                className="size-8 text-primary-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Web & Frontend Development
            </h3>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              Modern, responsive, and accessible web applications. We build
              dynamic user interfaces using React, Vue, and modern CSS
              frameworks to deliver engaging experiences for your users.
            </p>
          </div>

          {/* Картка 3: Backend (Середньо) */}
          <div className={getCardClasses('delay-[200ms]')}>
            <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 dark:bg-primary-900">
              <svg
                className="size-8 text-primary-500"
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
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Backend & API Development
            </h3>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              Robust Java and Spring Boot microservices. RESTful APIs, gRPC,
              event-driven systems, and complex business logic — built to handle
              millions of requests at scale.
            </p>
          </div>

          {/* Картка 4: Full-Stack from Scratch (Дуже повільно) */}
          <div className={getCardClasses('delay-[600ms]')}>
            <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 dark:bg-primary-900">
              <svg
                className="size-8 text-primary-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 12 12 17 22 12" />
                <polyline points="2 17 12 22 22 17" />
              </svg>
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Full-Stack Solutions
            </h3>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              End-to-end product development from scratch. We handle everything
              from database architecture and secure backends to intuitive
              frontends, delivering complete, production-ready systems.
            </p>
          </div>

          {/* Картка 5: Cloud & DevOps (Середньо-швидко) */}
          <div className={getCardClasses('delay-[300ms]')}>
            <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 dark:bg-primary-900">
              <svg
                className="size-8 text-primary-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6.5 19a4.5 4.5 0 01-.42-8.98 7 7 0 0113.84 0A4.5 4.5 0 0117.5 19H6.5z" />
              </svg>
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Cloud & DevOps
            </h3>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              AWS, Azure, Docker, and Kubernetes. We architect cloud-native
              infrastructure with full CI/CD pipelines, monitoring, and
              automated deployments for reliable operations.
            </p>
          </div>

          {/* Картка 6: Architecture (Повільно) */}
          <div className={getCardClasses('delay-[500ms]')}>
            <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 dark:bg-primary-900">
              <svg
                className="size-8 text-primary-500"
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
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Architecture & Consulting
            </h3>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              Technical leadership and architectural guidance. From designing
              service boundaries and API contracts to selecting the right
              technologies and patterns for your product.
            </p>
          </div>
        </div>
      </Section>
    </Background>
  );
};

export { Sponsors };

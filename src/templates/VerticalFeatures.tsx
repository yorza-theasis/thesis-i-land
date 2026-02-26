import { useEffect, useState } from 'react';

import { Background } from '../background/Background';
import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

const casesData = [
  {
    title: 'Sports Streaming Platform',
    description:
      "Developed key mobile features for one of the world's largest sports video streaming services with 50M+ users across mobile and TV. Optimized app loading times by over 30% and improved internationalization services by 60%, delivering a smoother experience for a global audience.",
    image: '/assets/images/feature.svg',
    imageAlt: 'Sports streaming platform illustration',
    reverse: false,
  },
  {
    title: 'Semiconductor Management Platform',
    description:
      'Built a comprehensive IoT platform for managing semiconductor etching operations across industrial devices. Implemented a Digital Twin for real-time simulation and anomaly detection using ETL pipelines, enabling intelligent decision-making based on live sensor data and historical analytics.',
    image: '/assets/images/feature2.svg',
    imageAlt: 'IoT platform illustration',
    reverse: true,
  },
  {
    title: 'Energy Sector Automation',
    description:
      'Engineered an enterprise-grade platform for the energy sector, centralizing complex operational workflows including energy distribution, resource planning, and real-time monitoring with advanced data analytics across distributed networks.',
    image: '/assets/images/feature3.svg',
    imageAlt: 'Energy automation illustration',
    reverse: false,
  },
  {
    title: 'Navigation & Route Optimization',
    description:
      'Built a mobile navigation platform integrating real-time air quality monitoring with route optimization. Implemented advanced mapping solutions with Google Maps and HERE SDK, custom tiles, and ground overlays for professional drivers across multilingual markets.',
    image: '/assets/images/feature.svg',
    imageAlt: 'Navigation platform illustration',
    reverse: true,
  },
  {
    title: 'Fintech Cashback Platform',
    description:
      'Developed a fintech platform for calculating and distributing cashback to users. Implemented transaction processing, rule validation for categories and promo campaigns, and payment provider integrations — with idempotency, auditability, and reliable event-driven architecture.',
    image: '/assets/images/feature2.svg',
    imageAlt: 'Fintech platform illustration',
    reverse: false,
  },
];

const VerticalFeatures = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === casesData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? casesData.length - 1 : prev - 1));
  };

  // Автоматичне перемикання (Autoplay)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === casesData.length - 1 ? 0 : prev + 1));
    }, 5000); // 5000 мс = 5 секунд

    // Очищаємо таймер, щоб уникнути багів при ручному перемиканні
    return () => clearInterval(timer);
  }, [currentIndex]); // Залежність від currentIndex скидає таймер при ручному кліку

  return (
    <Background color="bg-gray-100 dark:bg-gray-800" withGrid withGlow>
      <Section
        id="cases"
        title="Selected Work"
        description="A glimpse into the projects we have delivered across industries. All details are shared within NDA boundaries."
      >
        <div className="relative w-full p-4 sm:px-12 md:px-16">
          {/* Ось тут додано маску. 
            Контейнер обрізає зайве, а mask-image робить краї (перші та останні 5%) напівпрозорими 
          */}
          <div
            className="w-full overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            {/* Трек каруселі */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {casesData.map((caseItem, index) => (
                <div key={index} className="w-full min-w-full shrink-0">
                  <VerticalFeatureRow
                    title={caseItem.title}
                    description={caseItem.description}
                    image={caseItem.image}
                    imageAlt={caseItem.imageAlt}
                    reverse={caseItem.reverse}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Ліва кнопка */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-500 shadow-md transition-colors hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 sm:size-12"
            aria-label="Previous slide"
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

          {/* Права кнопка */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-500 shadow-md transition-colors hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 sm:size-12"
            aria-label="Next slide"
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

        {/* Індикатори (крапочки) знизу */}
        <div className="mt-6 flex justify-center gap-2 sm:gap-3">
          {casesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`size-2 rounded-full transition-all duration-300 sm:size-3 ${
                currentIndex === index
                  ? 'w-4 bg-primary-500 sm:w-6'
                  : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Section>
    </Background>
  );
};

export { VerticalFeatures };

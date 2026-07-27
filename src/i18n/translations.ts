export type Locale = 'en' | 'ua';

type ServiceTranslation = {
  title: string;
  description: string;
  stat: string;
};

type CaseTranslation = {
  title: string;
  category: string;
  description: string;
  imageAlt: string;
};

type TeamMemberTranslation = {
  role: string;
  bio: string;
};

type StatTranslation = {
  end: number;
  suffix: string;
  label: string;
};

export type Translations = {
  meta: { title: string; description: string };
  nav: {
    services: string;
    portfolio: string;
    techStack: string;
    team: string;
    startProject: string;
  };
  hero: {
    badge: string;
    headline1: string[];
    headline2: string[];
    subtitle: string;
    cta: { primary: string; secondary: string };
    stats: StatTranslation[];
    readout: { online: string; response: string; location: string };
    scroll: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceTranslation[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    tabs: { all: string; completed: string; in_progress: string };
    status: { live: string; inDev: string };
    viewCase: string;
    comingSoon: string;
    viewAll: string;
    cases: CaseTranslation[];
  };
  team: {
    eyebrow: string;
    title: string;
    description: string;
    linkedin: string;
    members: TeamMemberTranslation[];
  };
  techStack: {
    eyebrow: string;
    title: string;
    description: string;
  };
  casesPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badge: string;
    status: { live: string; inDev: string };
    visitLive: string;
    cta: { title: string; subtitle: string; button: string };
    cases: Array<{ subtitle: string; description: string }>;
  };
  contactPage: {
    title: string;
    subtitle: string;
    fields: { name: string; email: string; company: string; message: string };
    success: { title: string; subtitle: string; backHome: string };
    submit: string;
    submitting: string;
  };
  banner: {
    title: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    description: string;
    copyright: string;
    quickLinks: string;
    contact: string;
    links: {
      services: string;
      portfolio: string;
      techStack: string;
      team: string;
      contact: string;
    };
  };
};

export const translations: Record<Locale, Translations> = {
  en: {
    meta: {
      title: 'thesis-i | Expert Mobile & Backend Solutions in Lviv',
      description:
        'thesis-i is a software development studio specializing in high-performance mobile apps and scalable backend systems. Building digital excellence since 2020.',
    },
    nav: {
      services: 'Services',
      portfolio: 'Portfolio',
      techStack: 'Tech Stack',
      team: 'Team',
      startProject: 'Start Project',
    },
    hero: {
      badge: 'Available for new projects',
      headline1: ['Scaling', 'Businesses'],
      headline2: ['with AI &', 'Software.'],
      subtitle:
        'We build premium AI-powered software and autonomous agents designed to automate workflows, scale operations, and directly multiply your business revenue.',
      cta: { primary: 'View Portfolio', secondary: 'Our Services' },
      stats: [
        { end: 50, suffix: 'M+', label: 'Users served' },
        { end: 10, suffix: '+', label: 'Products shipped' },
        { end: 5, suffix: '', label: 'Industries' },
        { end: 4, suffix: 'yrs', label: 'In production' },
      ],
      readout: {
        online: 'sys.online',
        response: 'response < 24h',
        location: 'lviv, ua · remote',
      },
      scroll: 'scroll',
    },
    services: {
      eyebrow: 'What we build',
      title: 'Engineering Excellence.',
      description:
        'We operate at the intersection of strong technical craft and product thinking — covering the full stack, from pixel to pipeline.',
      items: [
        {
          title: 'Mobile & Web Development',
          description:
            'Cross-platform mobile apps with Kotlin & KMP, and modern web interfaces with React/Next.js. Performant, polished experiences from native Android to the browser.',
          stat: '8+ apps',
        },
        {
          title: 'Backend & API Development',
          description:
            'Scalable Java/Spring microservices, RESTful and gRPC APIs, event-driven systems with Kafka — built to handle millions of requests at enterprise scale.',
          stat: '12+ services',
        },
        {
          title: 'Cloud & DevOps',
          description:
            'Cloud-native infrastructure on AWS and Azure. Docker, Kubernetes, Helm — full CI/CD pipelines with automated deployments, monitoring, and reliable operations.',
          stat: '5+ clusters',
        },
        {
          title: 'Architecture & Consulting',
          description:
            'Technical leadership from service boundaries and API contracts to technology selection. We bring architectural clarity and engineering confidence to complex systems.',
          stat: '3 greenfields',
        },
        {
          title: 'Reducing AI-Slop',
          description:
            'We architect purposeful machine learning systems that directly drive ROI. We replace generic, bloated AI integrations with fine-tuned, scalable models designed for precision and operational efficiency.',
          stat: 'High ROI',
        },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Selected Work',
      description:
        'A glimpse into the projects we have delivered across industries. Details shared within NDA boundaries.',
      tabs: { all: 'All', completed: 'Live', in_progress: 'In Development' },
      status: { live: 'Live', inDev: 'In Dev' },
      viewCase: 'View Case',
      comingSoon: 'Coming Soon',
      viewAll: 'View all cases',
      cases: [
        {
          title: 'Extensa AI',
          category: 'Agentic Outreach',
          description:
            'A FastAPI-based B2B platform using an autonomous Claude GoalAgent to continuously build, refine, and test Ideal Customer Profiles (ICPs) based on direct feedback and onboarding goals.',
          imageAlt: 'Extensa AI Dashboard',
        },
        {
          title: 'GMI Doc Verifier',
          category: 'AI & HealthTech',
          description:
            'Nightly AI assistant for acute stroke (AIS) wards that automatically verifies 37 mandatory clinical documents per patient episode against official MoH protocols — using a three-layer pipeline of rules-engine, LLM content analysis, and RAG-based protocol lookup — surfacing discrepancies and missing entries as actionable doctor reports.',
          imageAlt: 'GMI Documentation Verifier Dashboard',
        },
        {
          title: 'Niania24',
          category: 'Web & Mobile',
          description:
            'Childcare service platform connecting families with trusted babysitters. Full-stack web and mobile solution with real-time booking, reviews, and secure payments.',
          imageAlt: 'Niania24 platform screenshot',
        },
        {
          title: 'AI Department',
          category: 'AI & Automation',
          description:
            'Internal AI-powered platform for automating department workflows, documentation, and reporting — built to reduce ops overhead and surface actionable insights.',
          imageAlt: 'AI Department tool screenshot',
        },
      ],
    },
    team: {
      eyebrow: 'The studio',
      title: 'Meet the Team',
      description:
        'Deep expertise and one shared mission: building software that makes a difference.',
      linkedin: 'LinkedIn',
      members: [
        {
          role: 'Head of Backend Engineering',
          bio: '5+ years in backend engineering specializing in scalable microservices. Led development teams at GlobalLogic and CodeLions, driving architectural decisions from service boundaries to API contracts. Deep expertise across fintech, energy, semiconductor, and transportation domains with both greenfield and legacy modernization projects.',
        },
        {
          role: 'Head of Frontend Engineering',
          bio: '4+ years of front-end development experience building modern web and mobile applications. Expertise in creating performant, responsive user interfaces using Next.js, pure React, and React Native for cross-platform solutions.',
        },
      ],
    },
    techStack: {
      eyebrow: 'Tools of the trade',
      title: 'Technology Stack',
      description:
        'Battle-tested technologies we use to deliver robust, scalable solutions across the full product lifecycle.',
    },
    casesPage: {
      eyebrow: 'Selected work',
      title: 'Case Studies',
      subtitle:
        'Published case studies. More projects delivered under NDA — details available on request.',
      badge: '4 cases · 3 public · 1 in dev',
      status: { live: 'Live', inDev: 'In Development' },
      visitLive: 'Visit live',
      cta: {
        title: 'Ready to build something great?',
        subtitle:
          "Let's discuss your project and see how we can help you ship faster and build better.",
        button: 'Get in touch',
      },
      cases: [
        {
          subtitle: 'Agentic B2B Outreach Platform',
          description:
            'A FastAPI-based B2B outreach platform powered by Claude. Extensa automatically creates and manages Ideal Customer Profiles (ICPs) using an autonomous GoalAgent that reasons about target segments, gathers clarifying information, and learns from user feedback.',
        },
        {
          subtitle: 'AI-Powered Clinical Documentation Audit',
          description:
            'Nightly AI assistant for acute stroke (AIS) wards that automatically verifies 37 mandatory clinical documents per patient episode against official MoH protocols — using a three-layer pipeline of rules-engine, LLM content analysis, and RAG-based protocol lookup — surfacing discrepancies and missing entries as actionable doctor reports.',
        },
        {
          subtitle: 'From Design to Kubernetes Deployment',
          description:
            'Complete design overhaul, backend logic, and admin panel development. Implemented engaging animations, custom UI elements, database architecture, and a custom RAG system. Fully deployed on a production Kubernetes cluster.',
        },
        {
          subtitle: 'Universal App for iOS and Android',
          description:
            'Full feature parity with the web platform plus unique mobile-first capabilities. Built in strict alignment with the web identity and secured with a robust personal data protection layer. Real-time booking, reviews, and secure payments.',
        },
      ],
    },
    contactPage: {
      title: 'Get in Touch',
      subtitle:
        "Have a project in mind? Fill out the form below and we'll get back to you as soon as possible.",
      fields: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        message: 'Message',
      },
      success: {
        title: 'Thank you!',
        subtitle: "Your message has been sent. We'll be in touch soon.",
        backHome: 'Back to Homepage',
      },
      submit: 'Send Message',
      submitting: 'Sending...',
    },
    banner: {
      title: "Let's build something remarkable.",
      subtitle: 'Tell us about your project.',
      cta: 'Contact Us',
    },
    footer: {
      description:
        'A software engineering studio combining strong technical execution with architecture-driven thinking. We build things that work.',
      copyright: '© 2026 thesis-i. All rights reserved.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      links: {
        services: 'Services',
        portfolio: 'Portfolio',
        techStack: 'Tech Stack',
        team: 'Team',
        contact: 'Contact',
      },
    },
  },

  ua: {
    meta: {
      title: 'thesis-i | Мобільна та бекенд-розробка у Львові',
      description:
        'thesis-i — студія розробки програмного забезпечення, що спеціалізується на мобільних застосунках та масштабованих бекенд-системах. Будуємо цифрову досконалість з 2020 року.',
    },
    nav: {
      services: 'Послуги',
      portfolio: 'Портфоліо',
      techStack: 'Стек',
      team: 'Команда',
      startProject: 'Почати проєкт',
    },
    hero: {
      badge: 'Відкрито до нових проєктів',
      headline1: ['Масштабуємо', 'Бізнеси'],
      headline2: ['за допомогою', 'ШІ та Software.'],
      subtitle:
        'Ми створюємо якісне програмне забезпечення на основі ШІ та автономні агенти, призначені для автоматизації процесів, масштабування операцій та прямого збільшення доходу вашого бізнесу.',
      cta: { primary: 'Портфоліо', secondary: 'Наші послуги' },
      stats: [
        { end: 50, suffix: 'M+', label: 'Користувачів' },
        { end: 10, suffix: '+', label: 'Продуктів' },
        { end: 5, suffix: '', label: 'Галузей' },
        { end: 4, suffix: 'р.', label: 'У продакшні' },
      ],
      readout: {
        online: 'sys.online',
        response: 'відповідь < 24г',
        location: 'львів · remote',
      },
      scroll: 'scroll',
    },
    services: {
      eyebrow: 'Що ми будуємо',
      title: 'Інженерна досконалість.',
      description:
        'Ми працюємо на перетині міцного технічного виконання та продуктового мислення — покриваючи повний стек, від пікселя до пайплайну.',
      items: [
        {
          title: 'Мобільна та веброзробка',
          description:
            'Крос-платформні мобільні застосунки на Kotlin & KMP та сучасні вебінтерфейси з React/Next.js. Продуктивний, відточений досвід від нативного Android до браузера.',
          stat: '8+ застосунків',
        },
        {
          title: 'Бекенд та API-розробка',
          description:
            'Масштабовані мікросервіси на Java/Spring, RESTful та gRPC API, event-driven системи з Kafka — для обробки мільйонів запитів корпоративного масштабу.',
          stat: '12+ сервісів',
        },
        {
          title: 'Хмара та DevOps',
          description:
            'Cloud-native інфраструктура на AWS та Azure. Docker, Kubernetes, Helm — повні CI/CD пайплайни з автоматизованими деплоями, моніторингом та надійними операціями.',
          stat: '5+ кластерів',
        },
        {
          title: 'Архітектура та консалтинг',
          description:
            'Технічне лідерство — від меж сервісів та API-контрактів до вибору технологій. Ми привносимо архітектурну ясність та інженерну впевненість у складні системи.',
          stat: '3 greenfields',
        },
        {
          title: 'Боротьба з AI-Slop',
          description:
            'Ми проєктуємо цілеспрямовані ML-системи, що генерують прямий ROI. Замінюємо роздуті generic AI-інтеграції точно налаштованими, масштабованими моделями для ефективних операцій.',
          stat: 'Високий ROI',
        },
      ],
    },
    portfolio: {
      eyebrow: 'Портфоліо',
      title: 'Вибрані роботи',
      description:
        'Огляд проєктів, реалізованих у різних галузях. Деталі надаються в межах NDA.',
      tabs: { all: 'Всі', completed: 'Активні', in_progress: 'В розробці' },
      status: { live: 'Активний', inDev: 'В розробці' },
      viewCase: 'Переглянути кейс',
      comingSoon: 'Незабаром',
      viewAll: 'Всі кейси',
      cases: [
        {
          title: 'Extensa AI',
          category: 'Агентський аутрич',
          description:
            "FastAPI-платформа B2B з автономним GoalAgent на базі Claude для безперервного формування, вдосконалення та тестування Ідеальних профілів клієнтів (ICP) на основі зворотного зв'язку та цілей.",
          imageAlt: 'Extensa AI Dashboard',
        },
        {
          title: 'GMI Doc Verifier',
          category: 'ШІ та MedTech',
          description:
            "AI-асистент нічної перевірки медичної документації для відділень гострого мозкового інсульту. Автоматично верифікує 37 обов'язкових документів епізоду за протоколами МОЗ — через механізм правил, AI-аналіз змісту та RAG-довідник — і формує для лікаря звіт із конкретними рекомендаціями.",
          imageAlt: 'GMI Doc Verifier дашборд',
        },
        {
          title: 'Niania24',
          category: 'Веб та мобайл',
          description:
            "Платформа для пошуку нянь, що з'єднує сім'ї з перевіреними бебіситтерами. Повностекове веб- та мобільне рішення з онлайн-бронюванням, відгуками та захищеними платежами.",
          imageAlt: 'Niania24 скріншот платформи',
        },
        {
          title: 'AI Department',
          category: 'ШІ та автоматизація',
          description:
            'Внутрішня платформа на основі ШІ для автоматизації робочих процесів відділу, документообігу та звітності — для зменшення операційних витрат та видобування корисних аналітичних даних.',
          imageAlt: 'AI Department скріншот',
        },
      ],
    },
    team: {
      eyebrow: 'Студія',
      title: 'Наша команда',
      description:
        'Глибока експертиза та єдина місія: будувати програмне забезпечення, що має значення.',
      linkedin: 'LinkedIn',
      members: [
        {
          role: 'Керівник бекенд-розробки',
          bio: '5+ років у бекенд-розробці зі спеціалізацією на масштабованих мікросервісах. Очолював команди розробки у GlobalLogic та CodeLions, приймаючи архітектурні рішення від меж сервісів до API-контрактів. Глибока експертиза у фінтех, енергетиці, напівпровідниках та транспорті — у greenfield- та legacy-проєктах.',
        },
        {
          role: 'Керівник фронтенд-розробки',
          bio: '4+ роки досвіду фронтенд-розробки у створенні сучасних веб- та мобільних застосунків. Експертиза у розробці продуктивних адаптивних інтерфейсів на Next.js, React та React Native для крос-платформних рішень.',
        },
      ],
    },
    techStack: {
      eyebrow: 'Інструменти ремесла',
      title: 'Технологічний стек',
      description:
        'Перевірені технології, якими ми користуємося для надійних, масштабованих рішень протягом усього продуктового циклу.',
    },
    casesPage: {
      eyebrow: 'Вибрані роботи',
      title: 'Кейс-стаді',
      subtitle:
        'Опубліковані кейс-стаді. Більше проєктів реалізовано під NDA — деталі доступні за запитом.',
      badge: '4 кейси · 3 публічних · 1 в розробці',
      status: { live: 'Активний', inDev: 'В розробці' },
      visitLive: 'Відкрити',
      cta: {
        title: 'Готові побудувати щось видатне?',
        subtitle:
          'Розкажіть про свій проєкт — разом знайдемо найкраще рішення.',
        button: "Зв'язатися",
      },
      cases: [
        {
          subtitle: 'Агентська B2B-платформа аутричу',
          description:
            "FastAPI-платформа B2B з автономним GoalAgent на базі Claude для безперервного формування, вдосконалення та тестування Ідеальних профілів клієнтів (ICP) на основі зворотного зв'язку та цілей.",
        },
        {
          subtitle: 'AI-аудит клінічної документації',
          description:
            "AI-асистент нічної перевірки медичної документації для відділень гострого мозкового інсульту. Автоматично верифікує 37 обов'язкових документів за протоколами МОЗ — через механізм правил, AI-аналіз змісту та RAG-довідник — і формує звіт із рекомендаціями для лікаря.",
        },
        {
          subtitle: 'Від дизайну до деплою на Kubernetes',
          description:
            'Повний редизайн, бекенд-логіка та адмін-панель. Реалізовано анімації, кастомні UI-елементи, архітектуру БД та власну RAG-систему. Повний деплой у продакшн-кластер Kubernetes.',
        },
        {
          subtitle: 'Єдиний застосунок для iOS та Android',
          description:
            'Повний паритет функцій з вебплатформою та унікальні мобільні можливості. Розроблено у відповідності до вебідентичності та захищено надійним шаром захисту персональних даних. Онлайн-бронювання, відгуки та захищені платежі.',
        },
      ],
    },
    contactPage: {
      title: "Зв'яжіться з нами",
      subtitle:
        'Маєте проєкт? Заповніть форму нижче — ми відповімо якнайшвидше.',
      fields: {
        name: "Ім'я",
        email: 'Email',
        company: 'Компанія',
        message: 'Повідомлення',
      },
      success: {
        title: 'Дякуємо!',
        subtitle:
          "Ваше повідомлення надіслано. Ми незабаром зв'яжемося з вами.",
        backHome: 'На головну',
      },
      submit: 'Надіслати',
      submitting: 'Надсилається...',
    },
    banner: {
      title: 'Давайте побудуємо щось видатне.',
      subtitle: 'Розкажіть нам про свій проєкт.',
      cta: "Зв'язатися",
    },
    footer: {
      description:
        'Студія програмної інженерії, що поєднує сильне технічне виконання з архітектурно-орієнтованим мисленням. Ми будуємо те, що працює.',
      copyright: '© 2026 thesis-i. Всі права захищені.',
      quickLinks: 'Посилання',
      contact: 'Контакти',
      links: {
        services: 'Послуги',
        portfolio: 'Портфоліо',
        techStack: 'Стек',
        team: 'Команда',
        contact: 'Контакти',
      },
    },
  },
};

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

type StatTranslation = {
  end: number;
  suffix: string;
  label: string;
};

// A result line can mix confirmed facts with metrics still pending real data
// (e.g. post-pilot, or awaiting client-side analytics) — isPlaceholder flags the latter.
type CaseResultItem = {
  text: string;
  isPlaceholder?: boolean;
};

type CasesPageCaseTranslation = {
  subtitle: string;
  description?: string;
  goal?: string;
  solution?: string;
  result?: CaseResultItem[];
};

export type Translations = {
  meta: { title: string; description: string };
  nav: {
    services: string;
    portfolio: string;
    techStack: string;
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
    labels: { goal: string; solution: string; result: string };
    cta: { title: string; subtitle: string; button: string };
    cases: CasesPageCaseTranslation[];
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
        {
          title: 'IBD Registry',
          category: 'MedTech / Patient Registry',
          description:
            'Centralized patient registry for inflammatory bowel disease (UC/CD) for Ukrainian medical institutions — doctors manage clinical records, patients submit periodic PRO2 self-assessments, with passwordless magic-link auth and role-based routing.',
          imageAlt: 'IBD Registry Dashboard',
        },
        {
          title: 'Cardiology Doc Audit',
          category: 'AI & HealthTech',
          description:
            'AI system for detecting discrepancies in cardiology patient documentation — NER extracts clinical entities, normalizes to ICD-10 codes, compares across forms, and generates plain-language explanations for doctors via LLM. Fully on-premise.',
          imageAlt: 'Cardiology Documentation Audit',
        },
        {
          title: 'QPick',
          category: 'Robotics & Retail',
          description:
            "A robotic-arm system that identifies and picks individual retail products under real shelf conditions — even with similar packaging, reflective, or dark materials — continuously improving from every pick attempt. Built for Żabka, one of Poland's largest retail chains.",
          imageAlt: 'Q-Pick Robotic Retail Kiosk',
        },
        {
          title: 'AI Agent for Compliance',
          category: 'AI & Compliance',
          description:
            'An AI assistant that answers employee questions from internal company documents in natural language — respecting role-based access, redacting sensitive data, and logging every exchange for audit.',
          imageAlt: 'AI Agent for Compliance Chat Interface',
        },
        {
          title: 'Butics',
          category: 'Retail / Mobile POS',
          description:
            'A mobile point-of-sale app for small retail stores, identifying products by barcode scan, product code, or visual catalogue — with basket management, discounts, payments, and returns built in.',
          imageAlt: 'Butics Mobile POS in Use',
        },
        {
          title: 'Nexus',
          category: 'Personal CRM / Privacy',
          description:
            'A private contact management platform where professionals keep their own contact space, share selectively with teams, and collaborate without losing control over private data.',
          imageAlt: 'Nexus Personal CRM Interface',
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
      badge: '10 cases · 7 live · 3 in dev',
      status: { live: 'Live', inDev: 'In Development' },
      visitLive: 'Visit live',
      labels: { goal: 'Goal', solution: 'Solution', result: 'Result' },
      cta: {
        title: 'Ready to build something great?',
        subtitle:
          "Let's discuss your project and see how we can help you ship faster and build better.",
        button: 'Get in touch',
      },
      cases: [
        {
          subtitle: 'Agentic B2B Outreach Platform',
          goal: "Automate ICP creation and upkeep so it doesn't rely on manual SDR work.",
          solution:
            'An autonomous Claude-powered GoalAgent that builds, refines, and tests Ideal Customer Profiles from onboarding goals and live user feedback.',
          result: [
            { text: '30% faster ICP turnaround' },
            { text: '120 leads processed per week' },
          ],
        },
        {
          subtitle: 'AI-Powered Clinical Documentation Audit',
          goal: 'Make sure no mandatory clinical document gets missed in acute stroke (AIS) wards.',
          solution:
            'A nightly AI assistant with a three-layer pipeline (rules engine, LLM content analysis, RAG protocol lookup) checking 37 required documents per patient episode against MoH protocols.',
          result: [
            { text: '37 automated checks per patient, every night' },
            { text: '70% reduction in manual review time' },
          ],
        },
        {
          subtitle: 'From Design to Kubernetes Deployment',
          goal: 'Cut operational overhead on internal reporting and documentation workflows.',
          solution:
            'A Next.js + Spring Boot platform with a custom RAG system, fully deployed on a production Kubernetes cluster.',
          result: [
            { text: '45% less time spent on reporting' },
            { text: '3 workflows automated' },
          ],
        },
        {
          subtitle: 'Universal App for iOS and Android',
          goal: 'Help families find a vetted babysitter faster.',
          solution:
            'Full-parity iOS/Android app with real-time booking, reviews, and a dedicated personal-data protection layer.',
          result: [
            { text: '1,714 active families' },
            { text: 'booking completed in 3 min' },
          ],
        },
        {
          subtitle: 'IBD Patient Registry for Ukrainian Clinics',
          description:
            "Centralized registry for inflammatory bowel disease patients — doctors manage structured clinical records for UC and Crohn's disease, patients submit periodic PRO2 self-assessments scored server-side, with passwordless magic-link auth and role-based routing for DOCTOR / MODERATOR / PATIENT / ADMIN roles. BFF layer on Next.js API routes proxies requests to a FastAPI backend, hiding tokens from the client.",
        },
        {
          subtitle: 'AI Error Detection in Cardiology Documentation',
          description:
            'Detects discrepancies in patient medical documentation before MoH submission — NER extracts clinical entities, normalizes to ICD-10 codes, compares across related forms per patient, and generates plain-language explanations for doctors via LLM. RAG is used only as an explanation layer, not a decision mechanism. Runs fully on-premise against a read-only 5 TB database copy.',
        },
        {
          subtitle: 'Robotic Product Picking for Retail Fulfillment',
          goal: 'Teach a robotic arm to reliably identify and pick individual retail products — even with similar packaging, transparent, reflective, or dark materials, and deformable items — under real shelf conditions, not just in a lab.',
          solution:
            'A system that recognizes individual products, determines where each can be safely gripped, executes a precise pick with a vacuum gripper, and keeps improving by learning from both successful and unsuccessful attempts.',
          result: [
            {
              text: "Clear path toward automating repetitive physical retail operations for Żabka, one of Poland's largest convenience retail chains",
            },
          ],
        },
        {
          subtitle: 'Internal Knowledge Base Assistant with Role-Based Access',
          goal: 'Let employees get answers already buried in internal company documents without manually digging through files, and without giving everyone access to everything.',
          solution:
            'An AI assistant that answers natural-language questions using only documents the employee is allowed to see, strips sensitive personal information where needed, refuses to answer when information is unavailable, and logs every exchange for audit.',
          result: [
            {
              text: 'Employees find internal information faster while the company keeps full control over who can access what',
            },
          ],
        },
        {
          subtitle: 'Mobile Point-of-Sale for Small Retail Stores',
          goal: 'Let store employees process sales quickly even when not every product has a barcode, without slowing them down with complicated workflows.',
          solution:
            'A mobile POS app that identifies products by camera barcode scan, internal product code, or a visual catalogue when no barcode exists — supporting basket management, discounts, payment, and returns.',
          result: [
            {
              text: 'A simpler sales workflow for employees, especially in small stores that cannot always rely on barcodes',
            },
          ],
        },
        {
          subtitle: 'Private Contact Sharing for Professional Networks',
          goal: 'Let people with large professional networks collaborate around shared contacts as a team, without losing control over their private data.',
          solution:
            'A contact management platform where each user keeps a private contact space, can share contacts selectively with different access levels, and teams can collaborate on the contacts explicitly shared with them — synced across devices.',
          result: [
            {
              text: 'A professional CRM experience with privacy built into the product rather than added on later',
            },
          ],
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
        {
          title: 'ЗЗК Реєстр',
          category: 'MedTech / Реєстр пацієнтів',
          description:
            'Централізований реєстр пацієнтів із запальними захворюваннями кишечника (ВК/ХК) для українських медичних закладів — лікарі ведуть клінічні записи, пацієнти подають самооцінки (PRO2), автентифікація magic link та рольовий доступ.',
          imageAlt: 'ЗЗК Реєстр',
        },
        {
          title: 'Аудит кардіодокументації',
          category: 'ШІ та MedTech',
          description:
            'Система виявлення розбіжностей у медичній документації кардіологічних пацієнтів — NER-екстракція сутностей, нормалізація до МКХ-10, порівняння між документами та формування пояснень лікарю природною мовою через LLM. Повністю on-premise.',
          imageAlt: 'Аудит кардіологічної документації',
        },
        {
          title: 'QPick',
          category: 'Робототехніка та рітейл',
          description:
            'Роботизована рука, що розпізнає та бере окремі товари в реальних умовах полиці — навіть зі схожим пакуванням, дзеркальними чи темними матеріалами — і постійно вдосконалюється з кожною спробою. Створено для Żabka, однієї з найбільших мереж рітейлу Польщі.',
          imageAlt: 'Q-Pick роботизований кіоск',
        },
        {
          title: 'AI Agent for Compliance',
          category: 'ШІ та комплаєнс',
          description:
            'AI-асистент, що відповідає на запитання співробітників на основі внутрішніх документів компанії природною мовою — з урахуванням рольового доступу, приховуванням чутливих даних та логуванням кожного обміну для аудиту.',
          imageAlt: 'AI Agent for Compliance чат-інтерфейс',
        },
        {
          title: 'Butics',
          category: 'Рітейл / Мобільний POS',
          description:
            'Мобільний POS-застосунок для невеликих магазинів, що ідентифікує товари скануванням штрихкоду, внутрішнім кодом або вибором із візуального каталогу — з кошиком, знижками, оплатою та поверненнями.',
          imageAlt: 'Butics мобільний POS у роботі',
        },
        {
          title: 'Nexus',
          category: 'Особистий CRM / Приватність',
          description:
            'Платформа управління контактами, де фахівці ведуть власний простір контактів, вибірково діляться ними з командою та співпрацюють, не втрачаючи контролю над приватними даними.',
          imageAlt: 'Nexus інтерфейс особистого CRM',
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
      badge: '10 кейсів · 7 активних · 3 в розробці',
      status: { live: 'Активний', inDev: 'В розробці' },
      visitLive: 'Відкрити',
      labels: { goal: 'Ціль', solution: 'Рішення', result: 'Результат' },
      cta: {
        title: 'Готові побудувати щось видатне?',
        subtitle:
          'Розкажіть про свій проєкт — разом знайдемо найкраще рішення.',
        button: "Зв'язатися",
      },
      cases: [
        {
          subtitle: 'Агентська B2B-платформа аутричу',
          goal: 'Автоматизувати побудову й підтримку ICP без ручної роботи SDR-команди.',
          solution:
            "Автономний GoalAgent на базі Claude, що формує, уточнює та тестує Ideal Customer Profile на основі цілей онбордингу та зворотного зв'язку.",
          result: [
            { text: '30% швидше формування ICP' },
            { text: '120 оброблених лідів/тиждень' },
          ],
        },
        {
          subtitle: 'AI-аудит клінічної документації',
          goal: 'Не допустити пропуску обов’язкової документації у відділеннях гострого інсульту.',
          solution:
            "Нічний AI-асистент з трирівневим пайплайном (правила, LLM-аналіз, RAG за протоколами МОЗ), що перевіряє 37 обов'язкових документів на епізод пацієнта.",
          result: [
            { text: '37 автоматичних перевірок/пацієнта щоночі' },
            { text: '70% скорочення часу ручної перевірки' },
          ],
        },
        {
          subtitle: 'Від дизайну до деплою на Kubernetes',
          goal: 'Зменшити операційне навантаження на звітність і документообіг відділу.',
          solution:
            'Платформа на Next.js + Spring Boot з кастомним RAG, повністю розгорнута на продакшн Kubernetes-кластері.',
          result: [
            { text: '45% менше часу на звітність' },
            { text: '3 автоматизовані процеси' },
          ],
        },
        {
          subtitle: 'Єдиний застосунок для iOS та Android',
          goal: 'Скоротити час пошуку перевіреного бебіситтера для сімей.',
          solution:
            'Застосунок з повною паритетністю до веб-платформи, бронювання в реальному часі, відгуки, окремий шар захисту персональних даних.',
          result: [
            { text: '1 714 активних сімей' },
            { text: 'бронювання за 3 хв' },
          ],
        },
        {
          subtitle: 'Реєстр пацієнтів із ЗЗК для українських клінік',
          description:
            'Централізований реєстр пацієнтів із запальними захворюваннями кишечника — лікарі ведуть структуровані клінічні записи для ВК та хвороби Крона, пацієнти подають PRO2-самооцінки з автоматичним розрахунком балів, автентифікація magic link без паролів та рольова маршрутизація (ЛІКАР / МОДЕРАТОР / ПАЦІЄНТ / АДМІН). BFF-шар на Next.js API routes проксує запити до FastAPI бекенду, приховуючи токен від клієнта.',
        },
        {
          subtitle: 'AI-виявлення помилок у кардіологічній документації',
          description:
            "Виявляє розбіжності в медичній документації кардіологічних пацієнтів до подання в МОЗ — NER-екстракція клінічних сутностей, нормалізація до МКХ-10, порівняння між пов'язаними формами одного пацієнта та формування пояснень лікарю природною мовою через LLM. RAG використовується лише як шар пояснення, а не механізм прийняття рішення. Повністю on-premise на read-only копії бази 5 ТБ.",
        },
        {
          subtitle: 'Роботизований підбір товарів для рітейл-фулфілменту',
          goal: 'Навчити роботизовану руку надійно розпізнавати та брати окремі товари в рітейлі — навіть зі схожим пакуванням, прозорими, дзеркальними чи темними матеріалами та товари, що деформуються — в реальних умовах полиці, а не лише в лабораторії.',
          solution:
            'Система, що розпізнає окремі товари, визначає, де їх можна безпечно захопити, виконує точний забір вакуумним захватом і постійно вдосконалюється, навчаючись як на вдалих, так і на невдалих спробах.',
          result: [
            {
              text: 'Чіткий шлях до автоматизації повторюваних фізичних операцій рітейлу для Żabka — однієї з найбільших мереж роздрібної торгівлі Польщі',
            },
          ],
        },
        {
          subtitle: 'AI-асистент бази знань з рольовим доступом',
          goal: 'Дати співробітникам швидкі відповіді на основі внутрішніх документів компанії без ручного пошуку по файлах — і без надання доступу до всього поспіль.',
          solution:
            'AI-асистент, що відповідає на запитання природною мовою, використовуючи лише документи, доступні конкретному співробітнику, приховує чутливі персональні дані, де потрібно, відмовляється відповідати за відсутності інформації та логує кожен обмін для аудиту.',
          result: [
            {
              text: 'Співробітники швидше знаходять внутрішню інформацію, а компанія зберігає повний контроль над тим, хто й до чого має доступ',
            },
          ],
        },
        {
          subtitle: 'Мобільний POS для невеликих роздрібних магазинів',
          goal: 'Дати змогу продавцям швидко оформлювати продажі навіть тоді, коли не кожен товар має штрихкод, без ускладнення робочого процесу.',
          solution:
            'Мобільний POS-застосунок, що ідентифікує товари скануванням штрихкоду камерою, внутрішнім кодом товару або вибором із візуального каталогу за відсутності штрихкоду — з підтримкою кошика, знижок, оплати та повернень.',
          result: [
            {
              text: 'Простіший робочий процес продажу для персоналу, особливо в невеликих магазинах, де не можна покладатися лише на штрихкоди',
            },
          ],
        },
        {
          subtitle: 'Приватний обмін контактами для професійних мереж',
          goal: 'Дати людям з великими професійними мережами змогу спільно працювати з контактами командою, не втрачаючи контролю над приватними даними.',
          solution:
            'Платформа управління контактами, де кожен користувач має власний приватний простір контактів, може вибірково ділитися контактами з різними рівнями доступу, а команди можуть спільно працювати над явно наданими контактами — синхронізовано між пристроями.',
          result: [
            {
              text: 'CRM-досвід професійного рівня з приватністю, закладеною в продукт, а не доданою згодом',
            },
          ],
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
        contact: 'Контакти',
      },
    },
  },
};

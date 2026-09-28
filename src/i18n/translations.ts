import type { CaseId } from '../data/cases';

export type Locale = 'en' | 'ua';

type Stat = { value: number; suffix: string; label: string; note: string };

type CaseResult = { text: string };

export type CaseTranslation = {
  title: string;
  category: string;
  /** One-line teaser used on the homepage. */
  summary: string;
  subtitle: string;
  goal?: string;
  solution?: string;
  result?: CaseResult[];
  /** Used instead of goal/solution/result when those aren't published. */
  description?: string;
  /** Caption for cases shown as a typographic figure instead of a screenshot. */
  figure?: string;
  tags: string[];
  imageAlt: string;
};

export type Translations = {
  meta: { title: string; description: string };
  nav: {
    services: string;
    work: string;
    process: string;
    about: string;
    faq: string;
    menu: string;
    close: string;
    skip: string;
  };
  common: {
    /** The one label for every contact CTA on the site. */
    bookCall: string;
    /** The one label for every "see the portfolio" CTA. */
    allCases: string;
    all: string;
    software: string;
    hardware: string;
    status: { completed: string; in_progress: string; prototype: string };
    viewCase: string;
    backToTop: string;
    theme: { toLight: string; toDark: string };
    switchLanguage: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    imageAlt: { extensa: string; qpick: string };
    stats: Stat[];
  };
  challenges: {
    title: string;
    description: string;
    proof: string;
    items: { problem: string; capability: string; answer: string }[];
  };
  services: {
    title: string;
    description: string;
    items: { title: string; description: string; stat: string }[];
  };
  work: { title: string; description: string; more: string };
  process: {
    title: string;
    description: string;
    deliverable: string;
    steps: { title: string; description: string; deliverable: string }[];
  };
  about: {
    statement: string;
    statementMuted: string;
    principles: { title: string; text: string }[];
  };
  techStack: { title: string; description: string; groups: string[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: {
    title: string;
    subtitle: string;
    benefitsLabel: string;
    benefits: string[];
    channelsLabel: string;
  };
  cases: Record<CaseId, CaseTranslation>;
  casesPage: {
    title: string;
    subtitle: string;
    count: { cases: string; software: string; hardware: string };
    filterLabel: string;
    visitLive: string;
    labels: { goal: string; solution: string; result: string; stack: string };
  };
  contactPage: {
    title: string;
    subtitle: string;
    nextLabel: string;
    next: string[];
    directLabel: string;
    fields: {
      name: string;
      email: string;
      company: string;
      message: string;
      messagePlaceholder: string;
    };
    optional: string;
    success: { title: string; subtitle: string; backHome: string };
    submit: string;
    submitting: string;
    errors: { config: string; generic: string; network: string };
  };
  footer: {
    tagline: string;
    description: string;
    navigate: string;
    contact: string;
    copyright: string;
    location: string;
  };
};

export const translations: Record<Locale, Translations> = {
  en: {
    meta: {
      title: 'thesis-i | Hardware & Software Development Studio in Lviv',
      description:
        'thesis-i builds AI systems, mobile and web products, backend platforms and embedded hardware, from idea and strategy to design, engineering and launch.',
    },
    nav: {
      services: 'Services',
      work: 'Work',
      process: 'Process',
      about: 'About',
      faq: 'FAQ',
      menu: 'Menu',
      close: 'Close',
      skip: 'Skip to content',
    },
    common: {
      bookCall: 'Book a call',
      allCases: 'All case studies',
      all: 'All',
      software: 'Software',
      hardware: 'Hardware',
      status: {
        completed: 'Delivered',
        in_progress: 'In development',
        prototype: 'Prototype',
      },
      viewCase: 'View case',
      backToTop: 'Back to top',
      theme: {
        toLight: 'Switch to light theme',
        toDark: 'Switch to dark theme',
      },
      switchLanguage: 'Українська версія',
    },
    hero: {
      eyebrow: 'Hardware & software development studio',
      headline: 'We turn complex problems into working products',
      subtitle:
        'AI systems, apps, platforms and devices, built by one team from idea to launch.',
      imageAlt: {
        extensa: 'Extensa AI outreach dashboard',
        qpick: 'QPick robotic picking kiosk built for Żabka',
      },
      stats: [
        {
          value: 10,
          suffix: '+',
          label: 'Products delivered',
          note: 'End-to-end launches across industries',
        },
        {
          value: 6,
          suffix: '',
          label: 'Industries',
          note: 'AI, FinTech, MedTech, IoT, Deep Tech, AgroTech',
        },
        {
          value: 7,
          suffix: '+',
          label: 'Years of experience',
          note: 'Complex, high-stakes projects',
        },
        {
          value: 50,
          suffix: 'M+',
          label: 'Users served',
          note: 'Across the products we shipped',
        },
      ],
    },
    challenges: {
      title: 'Found your challenge?',
      description:
        'Tired of uncertainty, poor quality and endless iterations? We turn complexity into simplicity and ideas into products that work.',
      proof: 'Where we did it',
      items: [
        {
          problem:
            "We have an idea, but don't know how to turn it into a product",
          capability: 'Build',
          answer:
            'We start with discovery: validate the idea, cut it down to a sharp first version and take it all the way to launch.',
        },
        {
          problem: 'Our existing platform no longer supports our growth',
          capability: 'Transform and scale',
          answer:
            'We audit what you have, stabilise it and re-architect the parts that block scale, without starting from scratch.',
        },
        {
          problem:
            'We want to use AI, but need to know where it truly creates value',
          capability: 'Applied AI',
          answer:
            'We find the workflows where AI pays for itself, prove it on real data and ship it with access control and audit logs.',
        },
        {
          problem: 'Our physical product needs a digital layer',
          capability: 'Hardware and software',
          answer:
            'Electronics, firmware, control systems and the apps on top, designed by one team so the device and the software work as a whole.',
        },
        {
          problem: 'A complex manual process needs to be automated',
          capability: 'Automate',
          answer:
            'We map the process, automate the repetitive steps in software or with a machine, and keep people in control of the decisions.',
        },
      ],
    },
    services: {
      title: 'Capabilities that pay for themselves',
      description:
        'Seven capability areas pointed at one goal: fewer surprises, faster delivery and technology that earns its keep.',
      items: [
        {
          title: 'Applied AI & automation',
          description:
            'AI that earns its budget line: agents, RAG and document analysis built around your real workflows, with access control, redaction and audit trails.',
          stat: '5+ AI systems',
        },
        {
          title: 'Mobile & web development',
          description:
            'One codebase, every platform, so you ship to iOS, Android and web without tripling your dev budget or your timeline.',
          stat: '8+ apps',
        },
        {
          title: 'Backend & API development',
          description:
            'Systems built to handle your busiest day, not just your demo day, so growth never turns into downtime.',
          stat: '12+ services',
        },
        {
          title: 'Hardware & embedded',
          description:
            'PCBs, control electronics, mechanics and robotics. Prototypes that leave the lab and hold up on a real shop floor.',
          stat: '4 hardware builds',
        },
        {
          title: 'Cloud & DevOps',
          description:
            "Deploys that don't need a war room. Automated pipelines and monitoring mean fewer 2am pages and faster releases.",
          stat: '5+ clusters',
        },
        {
          title: 'Architecture & consulting',
          description:
            'The right technical decisions made early, before they become expensive to undo six months in.',
          stat: '3 greenfields',
        },
        {
          title: 'Product stabilization',
          description:
            'An unstable app costs you users, time, and revenue. We restore broken functionality and eliminate the root causes of technical failures, so your product runs reliably, serves your customers, and is ready to grow.',
          stat: 'High ROI',
        },
      ],
    },
    work: {
      title: "Software and hardware we've shipped",
      description:
        'A glimpse into the projects we have delivered across industries. Details shared within NDA boundaries.',
      more: 'More projects',
    },
    process: {
      title: 'From ambiguity to a working product',
      description:
        'A trusted partner for the whole journey: we take ownership from the first idea to a working product and stay close at every step.',
      deliverable: 'You get',
      steps: [
        {
          title: 'Idea',
          description: 'Clarify goals and expected outcomes',
          deliverable: 'Goals, constraints and success metrics',
        },
        {
          title: 'Discovery',
          description: 'Research and validate hypotheses',
          deliverable: 'Validated assumptions and a risk map',
        },
        {
          title: 'Strategy',
          description: 'Define the product and technology direction',
          deliverable: 'Scope, roadmap and estimate',
        },
        {
          title: 'Design',
          description: 'Create the UX and system architecture',
          deliverable: 'UX flows and an architecture you can build on',
        },
        {
          title: 'Build',
          description: 'Develop and integrate the product',
          deliverable: 'A working product in production, with support',
        },
      ],
    },
    about: {
      statement:
        'We take ownership from the first challenge to the final product.',
      statementMuted:
        'No guesswork. No passing problems back to you. Just the expertise to build it right and make it work.',
      principles: [
        {
          title: 'Complex problems welcome',
          text: 'We take on challenges that need more than an off-the-shelf solution, the ones other studios pass on.',
        },
        {
          title: 'End-to-end ownership',
          text: 'From early ambiguity to production, we stay with you for the whole journey.',
        },
        {
          title: 'Cross-industry insight',
          text: 'Solving similar problems in very different sectors lets us bring proven patterns to yours.',
        },
        {
          title: 'Engineering meets business',
          text: 'Deep technical skill paired with business thinking at every decision.',
        },
      ],
    },
    techStack: {
      title: 'Technology stack',
      description:
        'Battle-tested technologies we use to deliver robust, scalable solutions across the full product lifecycle.',
      groups: ['Product', 'Platform', 'AI & hardware'],
    },
    faq: {
      title: 'Questions we hear often',
      items: [
        {
          q: "What if I'm not sure about my idea?",
          a: "Reach out anyway. We'll help you explore, validate and shape the idea during the discovery phase.",
        },
        {
          q: 'I already have a website. Do I need to rebuild it from scratch?',
          a: 'No. We support and improve existing websites, whatever technology they were built with.',
        },
        {
          q: 'Can you work with our existing development team?',
          a: 'Yes. We can join your team, fill specific expertise gaps or take ownership of particular parts of the product.',
        },
        {
          q: 'Can you take over a project built by another company?',
          a: "Yes. We'll understand the current state, identify the key issues and help you move forward without starting over.",
        },
        {
          q: 'Do you work with startups or only established companies?',
          a: 'Both. We adapt our approach to your stage, resources and business goals.',
        },
        {
          q: 'Can you build both hardware and software?',
          a: 'Yes. We bring hardware and software development together, so the product works as a whole.',
        },
      ],
    },
    cta: {
      title: "Have a complex problem? Let's turn it into something that works.",
      subtitle:
        'Still waiting for the right time to start? Book a free 30-minute discovery call. No commitment, just a conversation.',
      benefitsLabel: 'What you get',
      benefits: [
        'A free 30-minute discovery call',
        'A reply within 24 hours',
        "An honest answer on whether we're the right fit",
        'Work under NDA',
        'One team for hardware and software',
      ],
      channelsLabel: 'Or write to us directly',
    },
    cases: {
      extensa: {
        title: 'Extensa AI',
        category: 'Agentic outreach',
        summary:
          'A B2B platform where an autonomous Claude GoalAgent builds, refines and tests Ideal Customer Profiles from onboarding goals and live feedback.',
        subtitle: 'Agentic B2B outreach platform',
        goal: "Automate ICP creation and upkeep so it doesn't rely on manual SDR work.",
        solution:
          'An autonomous Claude-powered GoalAgent that builds, refines and tests Ideal Customer Profiles from onboarding goals and live user feedback.',
        result: [
          { text: '30% faster ICP turnaround' },
          { text: '120 leads processed per week' },
        ],
        tags: ['Sales Automation', 'Lead Generation', 'Agentic AI', 'B2B SaaS'],
        imageAlt: 'Extensa AI outreach dashboard',
      },
      gmi: {
        title: 'GMI Doc Verifier',
        category: 'AI & HealthTech',
        summary:
          'A nightly AI assistant for acute stroke wards that verifies 37 mandatory clinical documents per patient episode against official MoH protocols.',
        subtitle: 'AI-powered clinical documentation audit',
        goal: 'Make sure no mandatory clinical document gets missed in acute stroke (AIS) wards.',
        solution:
          'A nightly AI assistant with a three-layer pipeline (rules engine, LLM content analysis, RAG protocol lookup) checking 37 required documents per patient episode against MoH protocols.',
        result: [
          { text: '37 automated checks per patient, every night' },
          { text: '70% reduction in manual review time' },
        ],
        figure: 'mandatory documents checked per patient episode, every night',
        tags: [
          'Patient Safety',
          'Compliance Automation',
          'Clinical AI',
          'Risk Reduction',
        ],
        imageAlt: 'GMI Doc Verifier',
      },
      aidept: {
        title: 'AI Dept Platform',
        category: 'AI & Automation',
        summary:
          'A platform for the Lviv Polytechnic AI department that automates workflows, documentation and reporting, deployed on production Kubernetes.',
        subtitle: 'From design to Kubernetes deployment',
        goal: 'Cut operational overhead on internal reporting and documentation workflows.',
        solution:
          'A Next.js + Spring Boot platform with a custom RAG system, fully deployed on a production Kubernetes cluster.',
        result: [
          { text: '45% less time spent on reporting' },
          { text: '3 workflows automated' },
        ],
        tags: [
          'Ops Efficiency',
          'Internal Tooling',
          'Process Automation',
          'Enterprise Scale',
        ],
        imageAlt: 'AI Dept Platform website',
      },
      niania: {
        title: 'Niania24',
        category: 'Web & Mobile',
        summary:
          'A childcare marketplace connecting families with trusted specialists: web and mobile, with real-time booking, reviews and secure payments.',
        subtitle: 'Universal app for iOS and Android',
        goal: 'Help families find a vetted babysitter faster.',
        solution:
          'Full-parity iOS/Android app with real-time booking, reviews and a dedicated personal-data protection layer.',
        result: [
          { text: '1,714 active families' },
          { text: 'Booking completed in 3 min' },
        ],
        tags: [
          'Marketplace Growth',
          'Trust & Safety',
          'Consumer App',
          'Cross-Platform Reach',
        ],
        imageAlt: 'Niania24 platform homepage',
      },
      ibd: {
        title: 'IBD Registry',
        category: 'MedTech, patient registry',
        summary:
          'A centralized registry for inflammatory bowel disease: doctors manage clinical records, patients submit periodic PRO2 self-assessments.',
        subtitle: 'IBD patient registry for Ukrainian clinics',
        description:
          "Centralized registry for inflammatory bowel disease patients. Doctors manage structured clinical records for UC and Crohn's disease, patients submit periodic PRO2 self-assessments scored server-side, with passwordless magic-link auth and role-based routing for DOCTOR / MODERATOR / PATIENT / ADMIN roles. A BFF layer on Next.js API routes proxies requests to a FastAPI backend, hiding tokens from the client.",
        tags: [
          'Patient Outcomes',
          'Regulatory Compliance',
          'Clinical Data',
          'Care Coordination',
        ],
        imageAlt: 'IBD Registry admin dashboard',
      },
      cardio: {
        title: 'Cardiology Doc Audit',
        category: 'AI & HealthTech',
        summary:
          'Detects discrepancies in cardiology documentation before MoH submission, using NER, ICD-10 normalization and plain-language explanations. Fully on-premise.',
        subtitle: 'AI error detection in cardiology documentation',
        description:
          'Detects discrepancies in patient medical documentation before MoH submission. NER extracts clinical entities, normalizes them to ICD-10 codes, compares related forms per patient and generates plain-language explanations for doctors via LLM. RAG is used only as an explanation layer, not a decision mechanism. Runs fully on-premise against a read-only 5 TB database copy.',
        figure: 'read-only clinical database, analysed fully on-premise',
        tags: [
          'Documentation Accuracy',
          'Compliance Risk',
          'Clinical Auditing',
          'Data Privacy',
        ],
        imageAlt: 'Cardiology documentation audit',
      },
      qpick: {
        title: 'QPick',
        category: 'Robotics, retail automation',
        summary:
          "A robotic arm that identifies and picks individual retail products under real shelf conditions, built for Żabka, one of Poland's largest retail chains.",
        subtitle: 'Robotic product picking for retail fulfilment',
        goal: 'Teach a robotic arm to reliably identify and pick individual retail products under real shelf conditions, not just in a lab: similar packaging, transparent, reflective or dark materials, and deformable items.',
        solution:
          'A system that recognizes individual products, determines where each can be safely gripped, executes a precise pick with a vacuum gripper and keeps improving by learning from both successful and unsuccessful attempts.',
        result: [
          {
            text: "A clear path toward automating repetitive physical retail operations for Żabka, one of Poland's largest convenience retail chains",
          },
        ],
        tags: [
          'Labor Cost Reduction',
          'Retail Automation',
          'Fulfillment Speed',
          'Scalable Ops',
        ],
        imageAlt: 'QPick robotic retail kiosk',
      },
      compliance: {
        title: 'AI Agent for Compliance',
        category: 'AI & Compliance',
        summary:
          'An assistant that answers employee questions from internal documents, respecting role-based access, redacting sensitive data and logging every exchange.',
        subtitle: 'Internal knowledge assistant with role-based access',
        goal: 'Let employees get answers already buried in internal documents without digging through files, and without giving everyone access to everything.',
        solution:
          'An AI assistant that answers natural-language questions using only documents the employee is allowed to see, strips sensitive personal data where needed, refuses to answer when information is unavailable and logs every exchange for audit.',
        result: [
          {
            text: 'Employees find internal information faster while the company keeps full control over who can access what',
          },
        ],
        tags: [
          'Employee Productivity',
          'Compliance Risk',
          'Knowledge Access',
          'Data Governance',
        ],
        imageAlt: 'AI Agent for Compliance chat interface',
      },
      butics: {
        title: 'Butics',
        category: 'Retail, mobile POS',
        summary:
          'A mobile point of sale for small stores that identifies products by barcode, product code or visual catalogue, with discounts, payments and returns.',
        subtitle: 'Mobile point of sale for small retail stores',
        goal: 'Let store employees process sales quickly even when not every product has a barcode, without slowing them down with complicated workflows.',
        solution:
          'A mobile POS app that identifies products by camera barcode scan, internal product code or a visual catalogue when no barcode exists, with basket management, discounts, payment and returns.',
        result: [
          {
            text: 'A simpler sales workflow for employees, especially in small stores that cannot always rely on barcodes',
          },
        ],
        tags: [
          'Faster Checkout',
          'Retail Efficiency',
          'Small Business Tools',
          'Sales Enablement',
        ],
        imageAlt: 'Butics mobile POS in use',
      },
      nexus: {
        title: 'Nexus',
        category: 'Personal CRM, privacy',
        summary:
          'A private contact platform where professionals keep their own space, share selectively with teams and never lose control of private data.',
        subtitle: 'Private contact sharing for professional networks',
        goal: 'Let people with large professional networks collaborate around shared contacts as a team, without losing control over their private data.',
        solution:
          'A contact management platform where each user keeps a private contact space, shares contacts selectively with different access levels, and teams collaborate on what is explicitly shared with them, synced across devices.',
        result: [
          {
            text: 'A professional CRM experience with privacy built into the product rather than added on later',
          },
        ],
        tags: [
          'Network Monetization',
          'Privacy-First',
          'Team Collaboration',
          'Relationship Management',
        ],
        imageAlt: 'Nexus personal CRM interface',
      },
      wirebender: {
        title: 'Wire Bending Machine',
        category: 'Production equipment, antennas',
        summary:
          'A compact automatic machine that bends copper staples for cloverleaf antennas: 1,400 per hour with repeatable geometry, replacing a manual bottleneck.',
        subtitle: 'Automating precision antenna component manufacturing',
        goal: 'Replace manual bending of copper staples for cloverleaf antennas. It was a bottleneck with low throughput and dimensional scatter, which made antenna performance inconsistent.',
        solution:
          'A compact automatic machine: wire fed from a coil through straightening rollers, a bending mechanism with a programmable bend sequence and automatic cut-off. Aluminium housing, stepper-motor drives and in-house control electronics.',
        result: [
          { text: '1,400 staples per hour with repeatable geometry' },
          {
            text: 'Manual operation fully replaced; antenna reliability improved',
          },
        ],
        tags: [
          'Production Automation',
          'Precision Manufacturing',
          'Throughput',
          'Quality Consistency',
        ],
        imageAlt: 'Automatic wire bending machine with finished copper staples',
      },
      vtol: {
        title: 'VTOL Aircraft',
        category: 'Unmanned systems',
        summary:
          'A vertical take-off and landing prototype that flies longer and carries more than a drone of similar size, built at low cost from readily available materials.',
        subtitle: 'An aerial platform for hard-to-reach locations',
        goal: 'Build a platform that takes off and lands vertically in hard-to-reach places, yet flies longer and carries more than a multicopter of similar size. No runway needed.',
        solution:
          'A VTOL prototype from cheap, readily available materials: wing and fuselage from lightweight sheet panels, load-bearing nodes 3D-printed. Tilting motor mounts handle the transition to forward flight, driven by our own control system, with special attention to landing.',
        result: [
          { text: 'Flight-ready prototype assembled' },
          {
            text: 'Longer flight time and larger payload than a similar drone, at a low build cost',
          },
        ],
        tags: [
          'Unmanned Systems',
          'Rapid Prototyping',
          'Flight Control',
          'Low-Cost Build',
        ],
        imageAlt: 'VTOL aircraft prototype in the workshop',
      },
      crsf: {
        title: 'CRSF Fiber-Optic Converter',
        category: 'Communications',
        summary:
          'A JR-bay module that carries the CRSF control signal over fiber instead of radio: drone control that ignores jamming, plus extra peripheral channels.',
        subtitle: 'A jamming-resistant drone control link',
        goal: 'Bridge the CRSF signal from a standard radio transmitter onto a fiber-optic link, so the drone stays controllable under radio jamming, and add channels for on-board peripherals.',
        solution:
          'A board in the JR-module form factor that fits the standard transmitter bay: it receives CRSF, converts it for transmission over fiber and generates additional control channels. PCB designed, assembled and tested in-house.',
        result: [
          {
            text: 'Working prototype: transmitter → fiber → drone, no radio link',
          },
          {
            text: 'Extra channels for release mechanisms, lighting and cameras',
          },
        ],
        tags: [
          'Anti-Jamming',
          'Embedded Hardware',
          'PCB Design',
          'Resilient Comms',
        ],
        imageAlt: 'CRSF converter printed circuit board',
      },
    },
    casesPage: {
      title: 'Case studies',
      subtitle:
        'Published software and hardware projects. More work delivered under NDA, details on request.',
      count: {
        cases: 'case studies',
        software: 'software',
        hardware: 'hardware',
      },
      filterLabel: 'Filter case studies',
      visitLive: 'Visit live',
      labels: {
        goal: 'Goal',
        solution: 'Solution',
        result: 'Result',
        stack: 'Built with',
      },
    },
    contactPage: {
      title: 'Tell us about your project',
      subtitle:
        "Share a few details and we'll reply within 24 hours to set up a free 30-minute discovery call.",
      nextLabel: 'What happens next',
      next: [
        'We reply within 24 hours',
        'A free 30-minute discovery call',
        'A clear proposal: scope, timeline, estimate',
      ],
      directLabel: 'Prefer direct contact?',
      fields: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        message: 'Message',
        messagePlaceholder: 'What are you building, and where are you stuck?',
      },
      optional: 'optional',
      success: {
        title: 'Message sent',
        subtitle: "Thank you. We'll reply within 24 hours.",
        backHome: 'Back to homepage',
      },
      submit: 'Send message',
      submitting: 'Sending…',
      errors: {
        config:
          'The contact form is not configured yet. Please email us directly.',
        generic: 'Something went wrong. Please try again.',
        network: 'Connection failed. Check your connection and try again.',
      },
    },
    footer: {
      tagline: 'Hardware & software development studio',
      description:
        'A software and hardware engineering studio combining strong technical execution with architecture-driven thinking. We build things that work.',
      navigate: 'Navigate',
      contact: 'Contact',
      copyright: '© 2026 thesis-i. All rights reserved.',
      location: 'Lviv, Ukraine',
    },
  },

  ua: {
    meta: {
      title: 'thesis-i | Розробка hardware та software у Львові',
      description:
        'thesis-i створює AI-системи, мобільні та веб-продукти, бекенд-платформи й embedded-hardware: від ідеї та стратегії до дизайну, розробки й запуску.',
    },
    nav: {
      services: 'Послуги',
      work: 'Роботи',
      process: 'Процес',
      about: 'Про нас',
      faq: 'FAQ',
      menu: 'Меню',
      close: 'Закрити',
      skip: 'Перейти до змісту',
    },
    common: {
      bookCall: 'Замовити дзвінок',
      allCases: 'Усі кейси',
      all: 'Всі',
      software: 'Software',
      hardware: 'Hardware',
      status: {
        completed: 'Реалізовано',
        in_progress: 'В розробці',
        prototype: 'Прототип',
      },
      viewCase: 'Детальніше',
      backToTop: 'Нагору',
      theme: {
        toLight: 'Увімкнути світлу тему',
        toDark: 'Увімкнути темну тему',
      },
      switchLanguage: 'English version',
    },
    hero: {
      eyebrow: 'Студія розробки hardware та software',
      headline: 'Перетворюємо складні задачі на робочі продукти',
      subtitle:
        'AI-системи, застосунки, платформи й пристрої від однієї команди, від ідеї до запуску.',
      imageAlt: {
        extensa: 'Дашборд аутричу Extensa AI',
        qpick: 'Роботизований кіоск QPick для Żabka',
      },
      stats: [
        {
          value: 10,
          suffix: '+',
          label: 'Продуктів запущено',
          note: 'Від ідеї до продакшну в різних галузях',
        },
        {
          value: 6,
          suffix: '',
          label: 'Галузей',
          note: 'AI, FinTech, MedTech, IoT, Deep Tech, AgroTech',
        },
        {
          value: 7,
          suffix: '+',
          label: 'Років досвіду',
          note: 'Складні проєкти з високими ставками',
        },
        {
          value: 50,
          suffix: 'M+',
          label: 'Користувачів',
          note: 'У продуктах, які ми запустили',
        },
      ],
    },
    challenges: {
      title: 'Впізнали свою задачу?',
      description:
        'Втомилися від невизначеності, низької якості та нескінченних ітерацій? Ми перетворюємо складне на просте, а ідеї на продукти, що працюють.',
      proof: 'Де ми це робили',
      items: [
        {
          problem: 'Маємо ідею, але не знаємо, як перетворити її на продукт',
          capability: 'Створення',
          answer:
            'Починаємо з discovery: перевіряємо ідею, визначаємо чітку першу версію й доводимо її до запуску.',
        },
        {
          problem: 'Наша платформа більше не витримує зростання',
          capability: 'Модернізація',
          answer:
            'Аудитуємо те, що є, стабілізуємо й переробляємо архітектуру там, де вона гальмує масштаб, без переписування з нуля.',
        },
        {
          problem:
            'Хочемо використати ШІ, але треба зрозуміти, де він справді дає цінність',
          capability: 'Прикладний ШІ',
          answer:
            'Знаходимо процеси, де ШІ окупається, перевіряємо на реальних даних і впроваджуємо з контролем доступу та журналом аудиту.',
        },
        {
          problem: 'Нашому фізичному продукту потрібен цифровий шар',
          capability: 'Hardware та software',
          answer:
            'Електроніка, прошивка, системи керування та застосунки від однієї команди, тож пристрій і софт працюють як одне ціле.',
        },
        {
          problem: 'Складний ручний процес треба автоматизувати',
          capability: 'Автоматизація',
          answer:
            'Розкладаємо процес на кроки, автоматизуємо рутину програмно або за допомогою машини і залишаємо рішення за людьми.',
        },
      ],
    },
    services: {
      title: 'Можливості, що окупають себе',
      description:
        'Сім напрямів з однією метою: менше сюрпризів, швидша доставка та технології, які відпрацьовують свою вартість.',
      items: [
        {
          title: 'Прикладний ШІ та автоматизація',
          description:
            'ШІ, що відпрацьовує бюджет: агенти, RAG та аналіз документів, побудовані навколо ваших реальних процесів, з контролем доступу, приховуванням даних і журналом аудиту.',
          stat: '5+ AI-систем',
        },
        {
          title: 'Мобільна та веброзробка',
          description:
            'Один код для всіх платформ: iOS, Android і веб без потроєння бюджету й термінів розробки.',
          stat: '8+ застосунків',
        },
        {
          title: 'Бекенд та API-розробка',
          description:
            'Системи, розраховані на ваш найнавантаженіший день, а не лише на демо, щоб зростання не оберталося простоєм.',
          stat: '12+ сервісів',
        },
        {
          title: 'Hardware та embedded',
          description:
            'Друковані плати, електроніка керування, механіка та робототехніка. Прототипи, що виходять з лабораторії й працюють у реальному цеху.',
          stat: '4 hardware-проєкти',
        },
        {
          title: 'Хмара та DevOps',
          description:
            'Релізи без нічних авралів. Автоматизовані пайплайни та моніторинг: менше дзвінків о другій ночі, швидші релізи.',
          stat: '5+ кластерів',
        },
        {
          title: 'Архітектура та консалтинг',
          description:
            'Правильні технічні рішення, ухвалені рано, поки їх ще дешево змінити, а не через пів року.',
          stat: '3 greenfields',
        },
        {
          title: 'Стабілізація продукту',
          description:
            'Нестабільний застосунок коштує вам користувачів, часу й доходу. Ми відновлюємо роботу функцій та усуваємо причини технічних збоїв, щоб ваш продукт стабільно працював, задовольняв потреби клієнтів і був готовий до подальшого розвитку.',
          stat: 'Високий ROI',
        },
      ],
    },
    work: {
      title: 'Software та hardware, які ми запустили',
      description:
        'Огляд проєктів, реалізованих у різних галузях. Деталі надаються в межах NDA.',
      more: 'Інші проєкти',
    },
    process: {
      title: 'Від невизначеності до робочого продукту',
      description:
        'Надійний партнер на всьому шляху: відповідаємо за результат від першої ідеї до робочого продукту й залишаємося поруч на кожному кроці.',
      deliverable: 'Результат',
      steps: [
        {
          title: 'Ідея',
          description: 'Уточнюємо цілі та очікуваний результат',
          deliverable: 'Цілі, обмеження та метрики успіху',
        },
        {
          title: 'Discovery',
          description: 'Досліджуємо та перевіряємо гіпотези',
          deliverable: 'Перевірені припущення та карта ризиків',
        },
        {
          title: 'Стратегія',
          description: 'Визначаємо напрям продукту та технологій',
          deliverable: 'Обсяг робіт, роадмап і оцінка',
        },
        {
          title: 'Дизайн',
          description: 'Створюємо UX і системну архітектуру',
          deliverable: 'UX-сценарії та архітектура, на яку можна спертися',
        },
        {
          title: 'Розробка',
          description: 'Розробляємо та інтегруємо продукт',
          deliverable: 'Робочий продукт у продакшні та підтримка',
        },
      ],
    },
    about: {
      statement:
        'Ми відповідаємо за результат від першої задачі до готового продукту.',
      statementMuted:
        'Без здогадок. Без перекладання проблем на вас. Лише експертиза, щоб зробити правильно і щоб це працювало.',
      principles: [
        {
          title: 'Беремося за складне',
          text: 'Задачі, що потребують більшого, ніж готове рішення, і від яких відмовляються інші студії.',
        },
        {
          title: 'Відповідальність від і до',
          text: 'Від ранньої невизначеності до продакшну ми поруч на всьому шляху.',
        },
        {
          title: 'Досвід у різних галузях',
          text: 'Схожі задачі в дуже різних секторах дають нам перевірені підходи для вашого.',
        },
        {
          title: 'Інженерія + бізнес',
          text: 'Глибока технічна експертиза та бізнес-мислення в кожному рішенні.',
        },
      ],
    },
    techStack: {
      title: 'Технологічний стек',
      description:
        'Перевірені технології, якими ми користуємося для надійних, масштабованих рішень протягом усього продуктового циклу.',
      groups: ['Продукт', 'Платформа', 'ШІ та hardware'],
    },
    faq: {
      title: 'Часті запитання',
      items: [
        {
          q: 'Що, як я не впевнений у своїй ідеї?',
          a: 'Все одно напишіть нам. Ми допоможемо дослідити, перевірити та сформувати ідею на етапі discovery.',
        },
        {
          q: 'У мене вже є сайт. Чи треба робити все з нуля?',
          a: 'Ні. Ми підтримуємо й покращуємо наявні сайти незалежно від технологій, на яких їх створено.',
        },
        {
          q: 'Чи можете ви працювати з нашою командою розробки?',
          a: 'Так. Ми можемо приєднатися до вашої команди, закрити конкретні прогалини в експертизі або взяти на себе окремі частини продукту.',
        },
        {
          q: 'Чи візьмете проєкт, який робила інша компанія?',
          a: 'Так. Ми розберемося в поточному стані, визначимо ключові проблеми й допоможемо рухатися далі без переписування з нуля.',
        },
        {
          q: 'Ви працюєте зі стартапами чи лише з великими компаніями?',
          a: 'З обома. Ми підлаштовуємо підхід під вашу стадію, ресурси та бізнес-цілі.',
        },
        {
          q: 'Чи робите ви і hardware, і software?',
          a: 'Так. Ми поєднуємо розробку hardware та software, щоб продукт працював як єдине ціле.',
        },
      ],
    },
    cta: {
      title: 'Маєте складну задачу? Перетворимо її на те, що працює.',
      subtitle:
        'Досі чекаєте слушного моменту? Запишіться на безкоштовний 30-хвилинний дзвінок. Без зобов’язань, просто розмова.',
      benefitsLabel: 'Що ви отримуєте',
      benefits: [
        'Безкоштовний 30-хвилинний дзвінок',
        'Відповідь протягом 24 годин',
        'Чесну відповідь, чи підходимо ми вам',
        'Роботу під NDA',
        'Одну команду для hardware та software',
      ],
      channelsLabel: 'Або напишіть напряму',
    },
    cases: {
      extensa: {
        title: 'Extensa AI',
        category: 'Агентний аутрич',
        summary:
          'B2B-платформа, де автономний GoalAgent на базі Claude формує, уточнює й тестує профілі ідеальних клієнтів на основі цілей і зворотного зв’язку.',
        subtitle: 'Агентна B2B-платформа аутричу',
        goal: 'Автоматизувати побудову й підтримку ICP без ручної роботи SDR-команди.',
        solution:
          'Автономний GoalAgent на базі Claude, що формує, уточнює та тестує Ideal Customer Profile на основі цілей онбордингу та зворотного зв’язку.',
        result: [
          { text: '30% швидше формування ICP' },
          { text: '120 оброблених лідів на тиждень' },
        ],
        tags: [
          'Автоматизація продажів',
          'Генерація лідів',
          'Агентний ШІ',
          'B2B SaaS',
        ],
        imageAlt: 'Дашборд аутричу Extensa AI',
      },
      gmi: {
        title: 'GMI Doc Verifier',
        category: 'ШІ та MedTech',
        summary:
          'Нічний AI-асистент для відділень гострого інсульту, що перевіряє 37 обов’язкових документів на епізод пацієнта за протоколами МОЗ.',
        subtitle: 'AI-аудит клінічної документації',
        goal: 'Не допустити пропуску обов’язкової документації у відділеннях гострого інсульту.',
        solution:
          'Нічний AI-асистент із трирівневим пайплайном (правила, LLM-аналіз, RAG за протоколами МОЗ), що перевіряє 37 обов’язкових документів на епізод пацієнта.',
        result: [
          { text: '37 автоматичних перевірок на пацієнта щоночі' },
          { text: '70% скорочення часу ручної перевірки' },
        ],
        figure:
          'обов’язкових документів перевіряється на епізод пацієнта щоночі',
        tags: [
          'Безпека пацієнтів',
          'Автоматизація комплаєнсу',
          'Клінічний ШІ',
          'Зниження ризиків',
        ],
        imageAlt: 'GMI Doc Verifier',
      },
      aidept: {
        title: 'AI Dept Platform',
        category: 'ШІ та автоматизація',
        summary:
          'Платформа кафедри ШІ Львівської політехніки, що автоматизує процеси, документообіг і звітність. Розгорнута на продакшн Kubernetes.',
        subtitle: 'Від дизайну до деплою на Kubernetes',
        goal: 'Зменшити операційне навантаження на звітність і документообіг.',
        solution:
          'Платформа на Next.js + Spring Boot з кастомним RAG, повністю розгорнута на продакшн Kubernetes-кластері.',
        result: [
          { text: '45% менше часу на звітність' },
          { text: '3 автоматизовані процеси' },
        ],
        tags: [
          'Операційна ефективність',
          'Внутрішні інструменти',
          'Автоматизація процесів',
          'Корпоративний масштаб',
        ],
        imageAlt: 'Сайт AI Dept Platform',
      },
      niania: {
        title: 'Niania24',
        category: 'Веб та мобайл',
        summary:
          'Маркетплейс, що з’єднує сім’ї з перевіреними фахівцями з догляду за дітьми: веб і мобайл з онлайн-бронюванням, відгуками й захищеними платежами.',
        subtitle: 'Єдиний застосунок для iOS та Android',
        goal: 'Скоротити час пошуку перевіреного бебіситтера для сімей.',
        solution:
          'Застосунок із повною паритетністю до веб-платформи, бронювання в реальному часі, відгуки та окремий шар захисту персональних даних.',
        result: [
          { text: '1 714 активних сімей' },
          { text: 'Бронювання за 3 хв' },
        ],
        tags: [
          'Зростання маркетплейсу',
          'Довіра та безпека',
          'Споживчий застосунок',
          'Кросплатформність',
        ],
        imageAlt: 'Головна сторінка платформи Niania24',
      },
      ibd: {
        title: 'ЗЗК Реєстр',
        category: 'MedTech, реєстр пацієнтів',
        summary:
          'Централізований реєстр пацієнтів із запальними захворюваннями кишечника: лікарі ведуть записи, пацієнти подають PRO2-самооцінки.',
        subtitle: 'Реєстр пацієнтів із ЗЗК для українських клінік',
        description:
          'Централізований реєстр пацієнтів із запальними захворюваннями кишечника. Лікарі ведуть структуровані клінічні записи для ВК та хвороби Крона, пацієнти подають PRO2-самооцінки з автоматичним розрахунком балів, автентифікація magic link без паролів і рольова маршрутизація (ЛІКАР / МОДЕРАТОР / ПАЦІЄНТ / АДМІН). BFF-шар на Next.js API routes проксує запити до FastAPI-бекенду, приховуючи токен від клієнта.',
        tags: [
          'Результати лікування',
          'Регуляторний комплаєнс',
          'Клінічні дані',
          'Координація допомоги',
        ],
        imageAlt: 'Адмін-панель ЗЗК Реєстру',
      },
      cardio: {
        title: 'Аудит кардіодокументації',
        category: 'ШІ та MedTech',
        summary:
          'Виявляє розбіжності в кардіологічній документації до подання в МОЗ: NER, нормалізація до МКХ-10 і пояснення природною мовою. Повністю on-premise.',
        subtitle: 'AI-виявлення помилок у кардіологічній документації',
        description:
          'Виявляє розбіжності в медичній документації кардіологічних пацієнтів до подання в МОЗ. NER-екстракція клінічних сутностей, нормалізація до МКХ-10, порівняння пов’язаних форм одного пацієнта й пояснення лікарю природною мовою через LLM. RAG лише пояснює, а не ухвалює рішення. Працює повністю on-premise на read-only копії бази 5 ТБ.',
        figure: 'клінічна база лише для читання, аналіз повністю on-premise',
        tags: [
          'Точність документації',
          'Комплаєнс-ризики',
          'Клінічний аудит',
          'Приватність даних',
        ],
        imageAlt: 'Аудит кардіологічної документації',
      },
      qpick: {
        title: 'QPick',
        category: 'Робототехніка, рітейл',
        summary:
          'Роботизована рука, що розпізнає та бере окремі товари в реальних умовах полиці. Створено для Żabka, однієї з найбільших мереж рітейлу Польщі.',
        subtitle: 'Роботизований підбір товарів для рітейл-фулфілменту',
        goal: 'Навчити роботизовану руку надійно розпізнавати й брати окремі товари в реальних умовах полиці, а не лише в лабораторії: схоже пакування, прозорі, дзеркальні чи темні матеріали, товари, що деформуються.',
        solution:
          'Система, що розпізнає окремі товари, визначає, де їх можна безпечно захопити, виконує точний забір вакуумним захватом і постійно вдосконалюється, навчаючись як на вдалих, так і на невдалих спробах.',
        result: [
          {
            text: 'Чіткий шлях до автоматизації повторюваних фізичних операцій рітейлу для Żabka, однієї з найбільших мереж роздрібної торгівлі Польщі',
          },
        ],
        tags: [
          'Скорочення витрат на працю',
          'Автоматизація рітейлу',
          'Швидкість фулфілменту',
          'Масштабовані операції',
        ],
        imageAlt: 'Роботизований рітейл-кіоск QPick',
      },
      compliance: {
        title: 'AI Agent for Compliance',
        category: 'ШІ та комплаєнс',
        summary:
          'Асистент, що відповідає на запитання співробітників за внутрішніми документами, з рольовим доступом, приховуванням чутливих даних і логуванням.',
        subtitle: 'AI-асистент бази знань з рольовим доступом',
        goal: 'Дати співробітникам швидкі відповіді за внутрішніми документами без ручного пошуку по файлах і без доступу до всього поспіль.',
        solution:
          'AI-асистент, що відповідає природною мовою лише за документами, доступними конкретному співробітнику, приховує чутливі персональні дані, відмовляється відповідати за відсутності інформації та логує кожен обмін для аудиту.',
        result: [
          {
            text: 'Співробітники швидше знаходять внутрішню інформацію, а компанія зберігає повний контроль над тим, хто й до чого має доступ',
          },
        ],
        tags: [
          'Продуктивність команди',
          'Комплаєнс-ризики',
          'Доступ до знань',
          'Управління даними',
        ],
        imageAlt: 'Чат-інтерфейс AI Agent for Compliance',
      },
      butics: {
        title: 'Butics',
        category: 'Рітейл, мобільний POS',
        summary:
          'Мобільна каса для невеликих магазинів: товар за штрихкодом, кодом або з візуального каталогу, зі знижками, оплатою та поверненнями.',
        subtitle: 'Мобільний POS для невеликих магазинів',
        goal: 'Дати продавцям змогу швидко оформлювати продажі, навіть коли не кожен товар має штрихкод, без ускладнення робочого процесу.',
        solution:
          'Мобільний POS-застосунок, що ідентифікує товари скануванням штрихкоду камерою, внутрішнім кодом або вибором із візуального каталогу, з кошиком, знижками, оплатою та поверненнями.',
        result: [
          {
            text: 'Простіший процес продажу для персоналу, особливо в невеликих магазинах, де не можна покладатися лише на штрихкоди',
          },
        ],
        tags: [
          'Швидша каса',
          'Ефективність рітейлу',
          'Інструменти для малого бізнесу',
          'Підтримка продажів',
        ],
        imageAlt: 'Мобільний POS Butics у роботі',
      },
      nexus: {
        title: 'Nexus',
        category: 'Особистий CRM, приватність',
        summary:
          'Платформа контактів, де фахівці мають власний простір, вибірково діляться з командою й не втрачають контролю над приватними даними.',
        subtitle: 'Приватний обмін контактами для професійних мереж',
        goal: 'Дати людям із великими професійними мережами змогу працювати з контактами командою, не втрачаючи контролю над приватними даними.',
        solution:
          'Платформа управління контактами, де кожен має приватний простір, вибірково ділиться контактами з різними рівнями доступу, а команди працюють над явно наданими контактами із синхронізацією між пристроями.',
        result: [
          {
            text: 'CRM професійного рівня з приватністю, закладеною в продукт, а не доданою згодом',
          },
        ],
        tags: [
          'Монетизація мережі',
          'Приватність насамперед',
          'Командна співпраця',
          'Управління контактами',
        ],
        imageAlt: 'Інтерфейс особистого CRM Nexus',
      },
      wirebender: {
        title: 'Верстат для гнуття дроту',
        category: 'Виробниче обладнання, антени',
        summary:
          'Компактний автоматичний верстат, що гне мідні скоби для антен «клеверліф»: 1 400 на годину зі стабільною геометрією замість ручної роботи.',
        subtitle: 'Автоматизація виробництва точних компонентів антен',
        goal: 'Замінити ручне гнуття мідних скоб для антен «клеверліф». Це було вузьке місце з низькою продуктивністю та розкидом розмірів, через яке характеристики антен були нестабільними.',
        solution:
          'Компактний автоматичний верстат: подача дроту з котушки через рихтувальні ролики, механізм гнуття з програмованою послідовністю та автоматичне відрізання готової скоби. Алюмінієвий корпус, крокові двигуни, власна електроніка керування.',
        result: [
          { text: '1 400 скоб на годину зі стабільною геометрією' },
          { text: 'Ручну операцію повністю замінено, надійність антен зросла' },
        ],
        tags: [
          'Автоматизація виробництва',
          'Точне виготовлення',
          'Продуктивність',
          'Стабільна якість',
        ],
        imageAlt:
          'Автоматичний верстат для гнуття дроту з готовими мідними скобами',
      },
      vtol: {
        title: 'Літак VTOL',
        category: 'Безпілотні системи',
        summary:
          'Прототип із вертикальним злетом і посадкою, що летить довше й несе більше, ніж дрон схожого розміру. Недорого, з доступних матеріалів.',
        subtitle: 'Повітряна платформа для важкодоступних місць',
        goal: 'Створити платформу, яка злітає й сідає вертикально у важкодоступних місцях, але летить довше й несе більше, ніж мультикоптер схожого розміру. Без злітної смуги.',
        solution:
          'Прототип VTOL із дешевих доступних матеріалів: крило та фюзеляж з легких листових панелей, силові вузли надруковані на 3D-принтері. Поворотні кріплення моторів забезпечують перехід до горизонтального польоту під керуванням нашої системи; окрему увагу приділили посадці.',
        result: [
          { text: 'Зібрано прототип, готовий до польотів' },
          {
            text: 'Довший політ і більше корисне навантаження, ніж у схожого дрона, за низької вартості',
          },
        ],
        tags: [
          'Безпілотні системи',
          'Швидке прототипування',
          'Керування польотом',
          'Низька собівартість',
        ],
        imageAlt: 'Прототип літака VTOL у майстерні',
      },
      crsf: {
        title: 'CRSF-конвертер для оптоволокна',
        category: 'Зв’язок',
        summary:
          'Модуль у форм-факторі JR, що передає сигнал керування CRSF оптоволокном замість радіо: керування дроном, стійке до РЕБ, і додаткові канали.',
        subtitle: 'Стійка до завад лінія керування дроном',
        goal: 'Перенести сигнал CRSF зі стандартного пульта на оптоволоконну лінію, щоб дрон залишався керованим під радіозавадами, і додати канали для бортової периферії.',
        solution:
          'Плата у форм-факторі JR-модуля для штатного відсіку пульта: приймає CRSF, конвертує його для передачі оптоволокном і формує додаткові канали керування. Плату спроєктовано, зібрано й протестовано власними силами.',
        result: [
          {
            text: 'Робочий прототип: пульт → оптоволокно → дрон без радіоканалу',
          },
          { text: 'Додаткові канали для скидів, освітлення та камер' },
        ],
        tags: [
          'Стійкість до РЕБ',
          'Embedded hardware',
          'Проєктування плат',
          'Надійний зв’язок',
        ],
        imageAlt: 'Друкована плата CRSF-конвертера',
      },
    },
    casesPage: {
      title: 'Кейс-стаді',
      subtitle:
        'Опубліковані software- та hardware-проєкти. Більше робіт реалізовано під NDA, деталі за запитом.',
      count: { cases: 'кейсів', software: 'software', hardware: 'hardware' },
      filterLabel: 'Фільтр кейсів',
      visitLive: 'Відкрити',
      labels: {
        goal: 'Ціль',
        solution: 'Рішення',
        result: 'Результат',
        stack: 'Технології',
      },
    },
    contactPage: {
      title: 'Розкажіть про свій проєкт',
      subtitle:
        'Кілька деталей, і ми відповімо протягом 24 годин, щоб домовитися про безкоштовний 30-хвилинний дзвінок.',
      nextLabel: 'Що далі',
      next: [
        'Відповідаємо протягом 24 годин',
        'Безкоштовний 30-хвилинний дзвінок',
        'Зрозуміла пропозиція: обсяг, терміни, оцінка',
      ],
      directLabel: 'Зручніше напряму?',
      fields: {
        name: 'Ім’я',
        email: 'Email',
        company: 'Компанія',
        message: 'Повідомлення',
        messagePlaceholder: 'Що ви створюєте і де застрягли?',
      },
      optional: 'необов’язково',
      success: {
        title: 'Повідомлення надіслано',
        subtitle: 'Дякуємо. Ми відповімо протягом 24 годин.',
        backHome: 'На головну',
      },
      submit: 'Надіслати',
      submitting: 'Надсилаємо…',
      errors: {
        config: 'Форма ще не налаштована. Напишіть нам на пошту.',
        generic: 'Щось пішло не так. Спробуйте ще раз.',
        network: 'Немає з’єднання. Перевірте інтернет і спробуйте ще раз.',
      },
    },
    footer: {
      tagline: 'Студія розробки hardware та software',
      description:
        'Студія програмної та апаратної інженерії, що поєднує сильне технічне виконання з архітектурним мисленням. Ми будуємо те, що працює.',
      navigate: 'Навігація',
      contact: 'Контакти',
      copyright: '© 2026 thesis-i. Всі права захищені.',
      location: 'Львів, Україна',
    },
  },
};

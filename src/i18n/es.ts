import type { Translations } from './translations';

/* Spanish copy. Neutral Spanish for Spain and Latin America: the visitor is
 * addressed as "tú", questions to the studio use "ustedes". Product names
 * that are brands stay as they are. */
export const es: Translations = {
  meta: {
    title: 'thesis-i | Estudio de desarrollo de hardware y software en Lviv',
    description:
      'thesis-i crea sistemas de IA, productos móviles y web, plataformas backend y hardware embebido, desde la idea y la estrategia hasta el diseño, la ingeniería y el lanzamiento.',
  },
  nav: {
    services: 'Servicios',
    work: 'Proyectos',
    process: 'Proceso',
    about: 'Nosotros',
    faq: 'FAQ',
    menu: 'Menú',
    close: 'Cerrar',
    skip: 'Saltar al contenido',
  },
  common: {
    bookCall: 'Agendar llamada',
    allCases: 'Todos los casos',
    all: 'Todos',
    software: 'Software',
    hardware: 'Hardware',
    status: {
      completed: 'Entregado',
      in_progress: 'En desarrollo',
      prototype: 'Prototipo',
    },
    viewCase: 'Ver caso',
    backToTop: 'Volver arriba',
    theme: {
      toLight: 'Cambiar a tema claro',
      toDark: 'Cambiar a tema oscuro',
    },
    switchLanguage: 'Idioma',
  },
  hero: {
    eyebrow: 'Estudio de desarrollo de hardware y software',
    headline: 'Convertimos problemas complejos en *productos que funcionan*',
    subtitle:
      'Sistemas de IA, apps, plataformas y dispositivos, creados por un solo equipo de la idea al lanzamiento.',
    orbit: {
      label: 'Proyectos que hemos entregado',
      chips: ['Sistemas de IA', 'Hardware', 'Móvil y web'],
    },
    stats: [
      {
        value: 10,
        suffix: '+',
        label: 'Productos entregados',
        note: 'Lanzamientos de principio a fin en varios sectores',
      },
      {
        value: 6,
        suffix: '',
        label: 'Sectores',
        note: 'IA, FinTech, MedTech, IoT, Deep Tech, AgroTech',
      },
      {
        value: 7,
        suffix: '+',
        label: 'Años de experiencia',
        note: 'Proyectos complejos y de alto impacto',
      },
      {
        value: 50,
        suffix: 'M+',
        label: 'Usuarios atendidos',
        note: 'En los productos que hemos lanzado',
      },
    ],
  },
  challenges: {
    title: '¿Reconoces tu *reto*?',
    description:
      '¿Te cansan la incertidumbre, la baja calidad y las iteraciones sin fin? Convertimos lo complejo en simple y las ideas en productos que funcionan.',
    proof: 'Dónde lo hicimos',
    items: [
      {
        problem:
          'Tenemos una idea, pero no sabemos cómo convertirla en un producto',
        capability: 'Crear',
        answer:
          'Empezamos con discovery: validamos la idea, la reducimos a una primera versión clara y la llevamos hasta el lanzamiento.',
      },
      {
        problem: 'Nuestra plataforma actual ya no soporta nuestro crecimiento',
        capability: 'Transformar y escalar',
        answer:
          'Auditamos lo que tienes, lo estabilizamos y rediseñamos las partes que frenan el crecimiento, sin empezar de cero.',
      },
      {
        problem:
          'Queremos usar IA, pero necesitamos saber dónde aporta valor de verdad',
        capability: 'IA aplicada',
        answer:
          'Encontramos los procesos donde la IA se paga sola, lo demostramos con datos reales y la ponemos en marcha con control de acceso y registros de auditoría.',
      },
      {
        problem: 'Nuestro producto físico necesita una capa digital',
        capability: 'Hardware y software',
        answer:
          'Electrónica, firmware, sistemas de control y las apps que van encima, diseñados por un solo equipo para que el dispositivo y el software funcionen como un todo.',
      },
      {
        problem: 'Hay un proceso manual complejo que necesitamos automatizar',
        capability: 'Automatizar',
        answer:
          'Mapeamos el proceso, automatizamos los pasos repetitivos con software o con una máquina y dejamos las decisiones en manos de las personas.',
      },
    ],
  },
  services: {
    title: 'Capacidades que *se pagan solas*',
    description:
      'Siete áreas con un mismo objetivo: menos sorpresas, entregas más rápidas y tecnología que justifica lo que cuesta.',
    items: [
      {
        area: 'IA aplicada y automatización',
        title: 'Automatiza el trabajo rutinario con IA',
        description:
          'IA que justifica su presupuesto: agentes, RAG y análisis de documentos construidos en torno a tus procesos reales, con control de acceso, anonimización y registros de auditoría.',
        stat: '5+ sistemas de IA',
      },
      {
        area: 'Desarrollo móvil y web',
        title: 'Lanza en todas las plataformas a la vez',
        description:
          'Un solo código para todas las plataformas: publicas en iOS, Android y web sin triplicar tu presupuesto ni tus plazos.',
        stat: '8+ apps',
      },
      {
        area: 'Backend y APIs',
        title: 'Plataformas que escalan con la demanda',
        description:
          'Sistemas preparados para tu día de más carga, no solo para el día de la demo, para que el crecimiento nunca se convierta en caídas.',
        stat: '12+ servicios',
      },
      {
        area: 'Hardware y embebidos',
        title: 'Dispositivos hechos para el mundo real',
        description:
          'PCB, electrónica de control, mecánica y robótica. Prototipos que salen del laboratorio y aguantan en una planta de producción real.',
        stat: '4 desarrollos de hardware',
      },
      {
        area: 'Cloud y DevOps',
        title: 'Lanzamientos sin caídas',
        description:
          'Despliegues que no necesitan un gabinete de crisis. Pipelines automatizados y monitorización: menos alertas de madrugada y lanzamientos más rápidos.',
        stat: '5+ clústeres',
      },
      {
        area: 'Arquitectura y consultoría',
        title: 'Evita reescrituras costosas',
        description:
          'Las decisiones técnicas correctas, tomadas a tiempo, antes de que deshacerlas salga caro seis meses después.',
        stat: '3 proyectos desde cero',
      },
      {
        area: 'Estabilización de producto',
        title: 'Haz que tu producto vuelva a ser fiable',
        description:
          'Una app inestable te cuesta usuarios, tiempo e ingresos. Restauramos las funciones que fallan y eliminamos la causa raíz de los errores técnicos, para que tu producto funcione de forma fiable, atienda a tus clientes y esté listo para crecer.',
        stat: 'ROI alto',
      },
    ],
  },
  work: {
    title: 'Software y hardware *que hemos lanzado*',
    description:
      'Una muestra de los proyectos que hemos entregado en distintos sectores. Detalles compartidos dentro de los límites del NDA.',
    more: 'Más proyectos',
  },
  process: {
    title: 'De la incertidumbre a un *producto que funciona*',
    description:
      'Un socio de confianza en todo el camino: nos hacemos cargo desde la primera idea hasta un producto en funcionamiento y te acompañamos en cada paso.',
    deliverable: 'Recibes',
    steps: [
      {
        title: 'Idea',
        description: 'Aclaramos objetivos y resultados esperados',
        deliverable: 'Objetivos, restricciones y métricas de éxito',
      },
      {
        title: 'Discovery',
        description: 'Investigamos y validamos hipótesis',
        deliverable: 'Supuestos validados y un mapa de riesgos',
      },
      {
        title: 'Estrategia',
        description: 'Definimos la dirección del producto y la tecnología',
        deliverable: 'Alcance, roadmap y estimación',
      },
      {
        title: 'Diseño',
        description: 'Creamos la UX y la arquitectura del sistema',
        deliverable: 'Flujos UX y una arquitectura sobre la que construir',
      },
      {
        title: 'Desarrollo',
        description: 'Desarrollamos e integramos el producto',
        deliverable: 'Un producto funcionando en producción, con soporte',
      },
    ],
  },
  about: {
    statement:
      'Nos hacemos cargo desde el primer reto hasta el producto final.',
    statementMuted:
      'Sin conjeturas. Sin devolverte los problemas. Solo la experiencia para construirlo bien y hacer que funcione.',
    principles: [
      {
        title: 'Retos complejos, bienvenidos',
        text: 'Asumimos retos que necesitan algo más que una solución estándar, los que otros estudios rechazan.',
      },
      {
        title: 'Responsabilidad de principio a fin',
        text: 'Desde la incertidumbre inicial hasta producción, te acompañamos en todo el camino.',
      },
      {
        title: 'Experiencia en varios sectores',
        text: 'Resolver problemas parecidos en sectores muy distintos nos permite aplicar patrones probados en el tuyo.',
      },
      {
        title: 'Ingeniería con visión de negocio',
        text: 'Profunda capacidad técnica unida a pensamiento de negocio en cada decisión.',
      },
    ],
  },
  techStack: {
    title: 'Stack tecnológico',
    description:
      'Tecnologías probadas que usamos para entregar soluciones robustas y escalables en todo el ciclo de vida del producto.',
    groups: ['Producto', 'Plataforma', 'IA y hardware'],
    also: 'También',
  },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Y si no estoy seguro de mi idea?',
        a: 'Escríbenos de todos modos. Te ayudaremos a explorar, validar y dar forma a la idea durante la fase de discovery.',
      },
      {
        q: 'Ya tengo una web. ¿Tengo que rehacerla desde cero?',
        a: 'No. Mantenemos y mejoramos webs existentes, sea cual sea la tecnología con la que se crearon.',
      },
      {
        q: '¿Pueden trabajar con nuestro equipo de desarrollo actual?',
        a: 'Sí. Podemos unirnos a tu equipo, cubrir huecos de experiencia concretos o hacernos cargo de partes específicas del producto.',
      },
      {
        q: '¿Pueden retomar un proyecto creado por otra empresa?',
        a: 'Sí. Entenderemos el estado actual, identificaremos los problemas clave y te ayudaremos a avanzar sin empezar de nuevo.',
      },
      {
        q: '¿Trabajan con startups o solo con empresas consolidadas?',
        a: 'Con ambas. Adaptamos nuestro enfoque a tu etapa, tus recursos y tus objetivos de negocio.',
      },
      {
        q: '¿Pueden desarrollar tanto hardware como software?',
        a: 'Sí. Unimos el desarrollo de hardware y de software para que el producto funcione como un todo.',
      },
    ],
  },
  cta: {
    title: '¿Tienes un problema complejo? Convirtámoslo en algo que funcione.',
    subtitle:
      '¿Sigues esperando el momento adecuado para empezar? Agenda una llamada de discovery gratuita de 30 minutos. Sin compromiso, solo una conversación.',
    benefitsLabel: 'Qué recibes',
    benefits: [
      'Una llamada de discovery gratuita de 30 minutos',
      'Respuesta en menos de 24 horas',
      'Una respuesta honesta sobre si somos el equipo adecuado',
      'Trabajo bajo NDA',
      'Un solo equipo para hardware y software',
    ],
    channelsLabel: 'O escríbenos directamente',
  },
  cases: {
    extensa: {
      title: 'Extensa AI',
      category: 'Outreach con agentes de IA',
      summary:
        'Una plataforma B2B donde un GoalAgent autónomo basado en Claude crea, refina y prueba perfiles de cliente ideal a partir de los objetivos del onboarding y del feedback en tiempo real.',
      subtitle: 'Plataforma B2B de outreach con agentes de IA',
      goal: 'Automatizar la creación y el mantenimiento del ICP para no depender del trabajo manual de los SDR.',
      solution:
        'Un GoalAgent autónomo basado en Claude que crea, refina y prueba perfiles de cliente ideal a partir de los objetivos del onboarding y del feedback real de los usuarios.',
      result: [
        { text: 'ICP listos un 30% más rápido' },
        { text: '120 leads procesados por semana' },
      ],
      tags: [
        'Automatización de ventas',
        'Generación de leads',
        'IA agéntica',
        'SaaS B2B',
      ],
      imageAlt: 'Panel de outreach de Extensa AI',
    },
    gmi: {
      title: 'GMI Doc Verifier',
      category: 'IA y HealthTech',
      summary:
        'Un asistente de IA nocturno para unidades de ictus agudo que verifica 37 documentos clínicos obligatorios por episodio de paciente según los protocolos oficiales del Ministerio de Salud.',
      subtitle: 'Auditoría de documentación clínica con IA',
      goal: 'Garantizar que no falte ningún documento clínico obligatorio en las unidades de ictus agudo (AIS).',
      solution:
        'Un asistente de IA nocturno con un pipeline de tres capas (motor de reglas, análisis de contenido con LLM y consulta de protocolos con RAG) que revisa 37 documentos obligatorios por episodio de paciente según los protocolos del Ministerio de Salud.',
      result: [
        { text: '37 comprobaciones automáticas por paciente, cada noche' },
        { text: '70% menos tiempo de revisión manual' },
      ],
      figure:
        'documentos obligatorios revisados por episodio de paciente, cada noche',
      tags: [
        'Seguridad del paciente',
        'Cumplimiento automatizado',
        'IA clínica',
        'Reducción de riesgos',
      ],
      imageAlt:
        'Ilustración: un corte de TC cerebral junto a una lista nocturna de documentos clínicos, uno de ellos marcado',
    },
    aidept: {
      title: 'AI Dept Platform',
      category: 'IA y automatización',
      summary:
        'Una plataforma para el departamento de IA de la Universidad Politécnica de Lviv que automatiza procesos, documentación e informes, desplegada en Kubernetes en producción.',
      subtitle: 'Del diseño al despliegue en Kubernetes',
      goal: 'Reducir la carga operativa de los procesos internos de informes y documentación.',
      solution:
        'Una plataforma Next.js + Spring Boot con un sistema RAG propio, desplegada por completo en un clúster de Kubernetes en producción.',
      result: [
        { text: '45% menos tiempo dedicado a informes' },
        { text: '3 procesos automatizados' },
      ],
      tags: [
        'Eficiencia operativa',
        'Herramientas internas',
        'Automatización de procesos',
        'Escala empresarial',
      ],
      imageAlt: 'Sitio web de AI Dept Platform',
    },
    niania: {
      title: 'Niania24',
      category: 'Web y móvil',
      summary:
        'Un marketplace de cuidado infantil que conecta a familias con especialistas de confianza: web y móvil, con reservas en tiempo real, reseñas y pagos seguros.',
      subtitle: 'App universal para iOS y Android',
      goal: 'Ayudar a las familias a encontrar más rápido una niñera verificada.',
      solution:
        'App para iOS y Android con las mismas funciones en ambas plataformas, reservas en tiempo real, reseñas y una capa dedicada de protección de datos personales.',
      result: [
        { text: '1714 familias activas' },
        { text: 'Reserva completada en 3 min' },
      ],
      tags: [
        'Crecimiento del marketplace',
        'Confianza y seguridad',
        'App de consumo',
        'Alcance multiplataforma',
      ],
      imageAlt: 'Página principal de la plataforma Niania24',
    },
    ibd: {
      title: 'Registro EII',
      category: 'MedTech, registro de pacientes',
      summary:
        'Un registro centralizado de enfermedad inflamatoria intestinal: los médicos gestionan historiales clínicos y los pacientes envían autoevaluaciones periódicas PRO2.',
      subtitle: 'Registro de pacientes con EII para clínicas ucranianas',
      description:
        'Registro centralizado de pacientes con enfermedad inflamatoria intestinal. Los médicos gestionan historiales clínicos estructurados de colitis ulcerosa y enfermedad de Crohn, y los pacientes envían autoevaluaciones periódicas PRO2 que se puntúan en el servidor, con autenticación sin contraseña mediante magic link y rutas por rol para DOCTOR / MODERATOR / PATIENT / ADMIN. Una capa BFF en las API routes de Next.js redirige las peticiones a un backend FastAPI y oculta los tokens al cliente.',
      tags: [
        'Resultados del paciente',
        'Cumplimiento normativo',
        'Datos clínicos',
        'Coordinación asistencial',
      ],
      imageAlt: 'Panel de administración del Registro EII',
    },
    cardio: {
      title: 'Auditoría de documentación cardiológica',
      category: 'IA y HealthTech',
      summary:
        'Detecta discrepancias en la documentación de cardiología antes de enviarla al Ministerio de Salud, con NER, normalización a CIE-10 y explicaciones en lenguaje claro. Totalmente on-premise.',
      subtitle: 'Detección de errores con IA en documentación de cardiología',
      description:
        'Detecta discrepancias en la documentación médica de los pacientes antes de enviarla al Ministerio de Salud. El NER extrae entidades clínicas, las normaliza a códigos CIE-10, compara los formularios relacionados de cada paciente y genera con un LLM explicaciones en lenguaje claro para los médicos. RAG se usa solo como capa explicativa, no como mecanismo de decisión. Funciona totalmente on-premise sobre una copia de solo lectura de 5 TB de la base de datos.',
      figure:
        'base de datos clínica de solo lectura, analizada totalmente on-premise',
      tags: [
        'Precisión documental',
        'Riesgo de cumplimiento',
        'Auditoría clínica',
        'Privacidad de datos',
      ],
      imageAlt: 'Auditoría de documentación cardiológica',
    },
    qpick: {
      title: 'QPick',
      category: 'Robótica, automatización retail',
      summary:
        'Un brazo robótico que identifica y recoge productos individuales en condiciones reales de estantería, desarrollado para Żabka, una de las mayores cadenas minoristas de Polonia.',
      subtitle: 'Picking robótico de productos para retail',
      goal: 'Enseñar a un brazo robótico a identificar y recoger de forma fiable productos individuales en condiciones reales de estantería, no solo en un laboratorio: envases parecidos, materiales transparentes, reflectantes u oscuros y artículos deformables.',
      solution:
        'Un sistema que reconoce cada producto, determina dónde se puede agarrar con seguridad, ejecuta una recogida precisa con una pinza de vacío y sigue mejorando al aprender tanto de los intentos exitosos como de los fallidos.',
      result: [
        {
          text: 'Un camino claro hacia la automatización de operaciones físicas repetitivas para Żabka, una de las mayores cadenas de tiendas de conveniencia de Polonia',
        },
      ],
      tags: [
        'Menos costes laborales',
        'Automatización retail',
        'Preparación de pedidos más rápida',
        'Operaciones escalables',
      ],
      imageAlt: 'Quiosco robótico de retail QPick',
    },
    compliance: {
      title: 'Agente de IA para compliance',
      category: 'IA y compliance',
      summary:
        'Un asistente que responde a las preguntas de los empleados a partir de documentos internos, respeta el acceso por roles, oculta datos sensibles y registra cada conversación.',
      subtitle: 'Asistente de conocimiento interno con acceso por roles',
      goal: 'Que los empleados obtengan respuestas que ya están en los documentos internos sin buscar entre archivos y sin dar a todos acceso a todo.',
      solution:
        'Un asistente de IA que responde a preguntas en lenguaje natural usando solo los documentos que el empleado puede ver, elimina datos personales sensibles cuando hace falta, se niega a responder cuando la información no está disponible y registra cada conversación para auditoría.',
      result: [
        {
          text: 'Los empleados encuentran la información interna más rápido y la empresa mantiene el control total sobre quién accede a qué',
        },
      ],
      tags: [
        'Productividad del equipo',
        'Riesgo de cumplimiento',
        'Acceso al conocimiento',
        'Gobierno de datos',
      ],
      imageAlt: 'Interfaz de chat del agente de IA para compliance',
    },
    butics: {
      title: 'Butics',
      category: 'Retail, TPV móvil',
      summary:
        'Un punto de venta móvil para pequeñas tiendas que identifica productos por código de barras, código interno o catálogo visual, con descuentos, pagos y devoluciones.',
      subtitle: 'Punto de venta móvil para pequeñas tiendas',
      goal: 'Que el personal de la tienda pueda cobrar rápido aunque no todos los productos tengan código de barras, sin frenarlo con procesos complicados.',
      solution:
        'Una app de TPV móvil que identifica productos escaneando el código de barras con la cámara, por código interno o con un catálogo visual cuando no hay código de barras, con gestión de la cesta, descuentos, pago y devoluciones.',
      result: [
        {
          text: 'Un proceso de venta más sencillo para el personal, sobre todo en pequeñas tiendas que no siempre pueden depender de los códigos de barras',
        },
      ],
      tags: [
        'Cobro más rápido',
        'Eficiencia en retail',
        'Herramientas para pymes',
        'Impulso de ventas',
      ],
      imageAlt: 'TPV móvil Butics en uso',
    },
    nexus: {
      title: 'Nexus',
      category: 'CRM personal, privacidad',
      summary:
        'Una plataforma de contactos privada donde los profesionales tienen su propio espacio, comparten de forma selectiva con sus equipos y nunca pierden el control de sus datos privados.',
      subtitle: 'Contactos compartidos con privacidad para redes profesionales',
      goal: 'Permitir que personas con grandes redes profesionales colaboren en equipo con contactos compartidos sin perder el control de sus datos privados.',
      solution:
        'Una plataforma de gestión de contactos donde cada usuario tiene un espacio privado, comparte contactos de forma selectiva con distintos niveles de acceso y los equipos colaboran solo en lo que se ha compartido explícitamente con ellos, sincronizado entre dispositivos.',
      result: [
        {
          text: 'Una experiencia de CRM profesional con la privacidad integrada en el producto desde el principio, no añadida después',
        },
      ],
      tags: [
        'Monetización de la red',
        'Privacidad ante todo',
        'Colaboración en equipo',
        'Gestión de relaciones',
      ],
      imageAlt: 'Interfaz del CRM personal Nexus',
    },
    wirebender: {
      title: 'Máquina dobladora de alambre',
      category: 'Equipos de producción, antenas',
      summary:
        'Una máquina automática compacta que dobla grapas de cobre para antenas cloverleaf: 1400 por hora con geometría repetible, en lugar de un cuello de botella manual.',
      subtitle:
        'Automatización de la fabricación de componentes de antena de precisión',
      goal: 'Sustituir el doblado manual de grapas de cobre para antenas cloverleaf. Era un cuello de botella con poco rendimiento y variación dimensional, lo que hacía irregular el comportamiento de las antenas.',
      solution:
        'Una máquina automática compacta: el alambre llega desde una bobina a través de rodillos enderezadores, pasa por un mecanismo de doblado con secuencia programable y se corta automáticamente. Carcasa de aluminio, accionamientos con motores paso a paso y electrónica de control propia.',
      result: [
        { text: '1400 grapas por hora con geometría repetible' },
        {
          text: 'Operación manual sustituida por completo; antenas más fiables',
        },
      ],
      tags: [
        'Automatización de la producción',
        'Fabricación de precisión',
        'Capacidad de producción',
        'Calidad constante',
      ],
      imageAlt:
        'Máquina automática dobladora de alambre con grapas de cobre terminadas',
    },
    vtol: {
      title: 'Aeronave VTOL',
      category: 'Sistemas no tripulados',
      summary:
        'Un prototipo de despegue y aterrizaje vertical que vuela más tiempo y carga más que un dron de tamaño similar, construido a bajo coste con materiales fáciles de conseguir.',
      subtitle: 'Una plataforma aérea para lugares de difícil acceso',
      goal: 'Construir una plataforma que despegue y aterrice en vertical en lugares de difícil acceso, pero que vuele más tiempo y cargue más que un multicóptero de tamaño similar. Sin necesidad de pista.',
      solution:
        'Un prototipo VTOL hecho con materiales baratos y fáciles de conseguir: ala y fuselaje de paneles ligeros, nodos estructurales impresos en 3D. Los soportes basculantes de los motores gestionan la transición al vuelo horizontal con nuestro propio sistema de control, con especial atención al aterrizaje.',
      result: [
        { text: 'Prototipo ensamblado y listo para volar' },
        {
          text: 'Más autonomía y más carga útil que un dron similar, con un coste de fabricación bajo',
        },
      ],
      tags: [
        'Sistemas no tripulados',
        'Prototipado rápido',
        'Control de vuelo',
        'Construcción de bajo coste',
      ],
      imageAlt: 'Prototipo de aeronave VTOL en el taller',
    },
    crsf: {
      title: 'Conversor CRSF a fibra óptica',
      category: 'Comunicaciones',
      summary:
        'Un módulo para la bahía JR que lleva la señal de control CRSF por fibra en lugar de por radio: control del dron inmune a las interferencias y canales extra para periféricos.',
      subtitle: 'Un enlace de control de drones resistente a interferencias',
      goal: 'Llevar la señal CRSF de un transmisor de radio estándar a un enlace de fibra óptica, para que el dron siga siendo controlable bajo interferencias de radio, y añadir canales para los periféricos de a bordo.',
      solution:
        'Una placa con formato de módulo JR que encaja en la bahía estándar del transmisor: recibe la señal CRSF, la convierte para transmitirla por fibra y genera canales de control adicionales. PCB diseñada, ensamblada y probada por nuestro equipo.',
      result: [
        {
          text: 'Prototipo funcional: transmisor → fibra → dron, sin enlace de radio',
        },
        {
          text: 'Canales extra para mecanismos de liberación, iluminación y cámaras',
        },
      ],
      tags: [
        'Antiinterferencias',
        'Hardware embebido',
        'Diseño de PCB',
        'Comunicaciones resilientes',
      ],
      imageAlt: 'Placa de circuito impreso del conversor CRSF',
    },
  },
  casesPage: {
    title: 'Casos de estudio',
    subtitle:
      'Proyectos de software y hardware publicados. Hay más trabajo entregado bajo NDA, con detalles bajo petición.',
    count: {
      cases: 'casos',
      software: 'software',
      hardware: 'hardware',
    },
    filterLabel: 'Filtrar casos',
    visitLive: 'Ver en vivo',
    labels: {
      goal: 'Objetivo',
      solution: 'Solución',
      result: 'Resultado',
      stack: 'Tecnologías',
    },
  },
  contactPage: {
    title: 'Cuéntanos tu proyecto',
    subtitle:
      'Comparte algunos detalles y te responderemos en menos de 24 horas para agendar una llamada de discovery gratuita de 30 minutos.',
    nextLabel: 'Qué pasa después',
    next: [
      'Respondemos en menos de 24 horas',
      'Una llamada de discovery gratuita de 30 minutos',
      'Una propuesta clara: alcance, plazos y estimación',
    ],
    directLabel: '¿Prefieres el contacto directo?',
    fields: {
      name: 'Nombre',
      email: 'Correo electrónico',
      company: 'Empresa',
      message: 'Mensaje',
      messagePlaceholder: '¿Qué estás construyendo y dónde te has atascado?',
    },
    optional: 'opcional',
    success: {
      title: 'Mensaje enviado',
      subtitle: 'Gracias. Te responderemos en menos de 24 horas.',
      backHome: 'Volver al inicio',
    },
    submit: 'Enviar mensaje',
    submitting: 'Enviando…',
    errors: {
      config:
        'El formulario de contacto aún no está configurado. Escríbenos directamente por correo.',
      generic: 'Algo ha fallado. Inténtalo de nuevo.',
      network: 'Error de conexión. Revisa tu conexión e inténtalo de nuevo.',
    },
  },
  footer: {
    tagline: 'Estudio de desarrollo de hardware y software',
    description:
      'Un estudio de ingeniería de software y hardware que combina una ejecución técnica sólida con un enfoque guiado por la arquitectura. Construimos cosas que funcionan.',
    navigate: 'Navegación',
    contact: 'Contacto',
    copyright: '© 2026 thesis-i. Todos los derechos reservados.',
    location: 'Lviv, Ucrania',
  },
};

import type { PortfolioContent } from "@/types/content";

/**
 * Contenido en español (idioma principal).
 * Perfil completo, profesional y equilibrado de Ower Frank López Arela.
 */
export const es: PortfolioContent = {
  meta: {
    title: "Ower Frank López Arela — Backend & Data Engineer",
    description:
      "Estudiante de 9no ciclo de Ingeniería de Sistemas (UNSA) y Desarrollador Backend. Construyo APIs REST, pipelines de datos y servicios en la nube con Java, Spring Boot, Node.js y Python.",
    ogAlt:
      "Portafolio de Ower Frank López Arela — Backend & Data Engineer",
    keywords: [
      "Backend Developer",
      "Data Engineer",
      "Ingeniería de Datos",
      "Java",
      "Spring Boot",
      "NestJS",
      "Python",
      "PostgreSQL",
      "Docker",
      "Arequipa",
      "Perú",
    ],
  },

  nav: {
    work: "Proyectos",
    expertise: "Especialidad",
    experience: "Experiencia",
    about: "Sobre mí",
    contact: "Contacto",
    cta: "Hablemos",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    statusText: "Disponible para trabajar",
    soundOn: "Sonido activado",
    soundOff: "Sonido silenciado",
  },

  intro: {
    status: "Disponible para roles Junior Data Engineer & Backend",
    kicker: "INGENIERÍA BACKEND & PIPELINES DE DATOS · AREQUIPA, PERÚ",
    titleLines: ["Desarrollador Backend", "& Data Engineer"],
    titleAccent: "construyendo software confiable.",
    description:
      "Estudiante de 9no ciclo de Ingeniería de Sistemas en la UNSA y Desarrollador Backend en Fundación CALMA. Enfocado en diseño de APIs REST, optimización de bases de datos, pipelines de datos y despliegues en la nube.",
    primaryCta: "Ver proyectos",
    primaryTarget: "#work",
    secondaryCta: "Copiar correo",
    copiedFeedback: "Correo copiado al portapapeles.",
    scrollCue: "Conoce mis proyectos y experiencia",
    frameLabel: "ESTADO · ACTIVO",
  },

  marquee: [
    { name: "Java 17", category: "Backend" },
    { name: "Spring Boot 3.4", category: "Backend" },
    { name: "NestJS", category: "Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python 3.12", category: "Datos" },
    { name: "PostgreSQL", category: "Datos" },
    { name: "MongoDB", category: "Datos" },
    { name: "SQL Server", category: "Datos" },
    { name: "MySQL", category: "Datos" },
    { name: "Docker", category: "DevOps" },
    { name: "Oracle Cloud", category: "Cloud" },
    { name: "AWS", category: "Cloud" },
    { name: "Google Cloud", category: "Cloud" },
    { name: "ONNX Runtime", category: "IA" },
  ],

  mission: {
    kicker: "ENFOQUE DE INGENIERÍA",
    headingLead: "Arquitectura sólida,",
    headingAccent: "soluciones orientadas a valor.",
    paragraphs: [
      "La calidad de un sistema no se mide solo por las funcionalidades entregadas, sino por su estabilidad, la consistencia de sus datos y su facilidad de mantenimiento en producción. Cada API y cada flujo de datos debe estar diseñado para ser claro y confiable.",
      "Mi experiencia abarca desde el desarrollo de servicios backend en producción con Java y Node.js, hasta la gestión operativa de datos para más de 2,000 postulantes en procesos evaluativos y la integración de modelos de Machine Learning.",
    ],
    facts: [
      { key: "Perfil", value: "Backend & Data Engineering" },
      { key: "Especialidad", value: "APIs REST, SQL & Pipelines ETL" },
      { key: "Metodología", value: "Clean Architecture & Scrum" },
      { key: "Ubicación", value: "Arequipa, Perú · UTC-5" },
    ],
  },

  work: {
    kicker: "CATÁLOGO DE INGENIERÍA",
    heading: "Proyectos y software en producción",
    description:
      "Explora el catálogo completo de repositorios auditables: sistemas backend de alta concurrencia, pipelines de datos en tiempo real, inteligencia artificial aplicada y aplicaciones móviles.",
    filterLabels: {
      all: "Todos",
      backend: "Backend & APIs",
      data: "Data & Machine Learning",
      mobile: "Mobile & Sistemas Nativos",
    },
    viewModes: {
      grid: "Showroom Bento",
      carousel: "Vista Focal / Carrusel",
    },
    featuredLabel: "Proyecto Insignia",
    featured: {
      flag: "Destacado",
      category: "Plataforma de ML Empresarial & Backend",
      title: "ChurnInsight",
      summary:
        "Plataforma de predicción de abandono de clientes con inferencia de ML embebida directamente en el backend mediante ONNX Runtime, eliminando sobrecostos de red y dependencias de servicios externos.",
      tags: ["Java 17", "Spring Boot 3.4", "ONNX Runtime", "Random Forest", "MySQL", "JWT"],
      note: "Al ejecutar el modelo ONNX en el mismo proceso de Spring Boot, la latencia P99 se redujo de 2,000 ms a 20 ms. Incluye autenticación JWT, migraciones SQL versionadas y explicabilidad de modelo (XAI) con un Recall del 96%.",
      metrics: [
        { value: "96%", label: "Recall (Random Forest)", highlight: true },
        { value: "20 ms", label: "Inferencia P99 (ONNX)", highlight: true },
        { value: "99%", label: "Reducción de latencia" },
        { value: "0", label: "Llamadas externas ML" },
      ],
      links: [
        { label: "Ver Backend en GitHub", href: "https://github.com/OwerLopez/ChurnInsight-Backend", external: true },
        { label: "Ver Dashboard en GitHub", href: "https://github.com/OwerLopez/ChurnInsight-Frontend", external: true },
        { label: "Ver arquitectura", href: "#architecture" },
      ],
    },
    catalogLabel: "Catálogo completo de repositorios auditables",
    projects: [
      {
        index: "01",
        category: "data",
        categoryLabel: "Data & ML",
        tone: "violet",
        badge: "⚡ Tiempo Real · 28.7 FPS",
        title: "VisionTransit AI",
        repoName: "VisionTransit_AI",
        githubUrl: "https://github.com/OwerLopez/VisionTransit_AI",
        description:
          "Pipeline de visión computacional en tiempo real para monitoreo de transporte público. Arquitectura desacoplada en 6 capas con FastAPI, YOLO11 y WebSockets, sosteniendo 28.7 FPS sobre CPU.",
        metrics: [
          { label: "Rendimiento", value: "28.7 FPS (CPU)" },
          { label: "Arquitectura", value: "6 capas modulares" },
        ],
        tags: ["Python 3.12", "FastAPI", "YOLO11", "WebSockets", "Docker"],
        year: "2025",
      },
      {
        index: "02",
        category: "backend",
        categoryLabel: "Backend & APIs",
        tone: "gold",
        badge: "🏆 1er Puesto Hackathon IBM",
        title: "NEXIA 2026 (WeWin TI)",
        repoName: "wewinti-fullstack-app",
        githubUrl: "https://github.com/OwerLopez/wewinti-fullstack-app",
        description:
          "1er puesto en el Hackathon 'Build with AI' (IBM, GDG Arequipa y JAKU UNSA). Plataforma de innovación educativa construida en <48h con arquitectura NestJS, capa de servicios protegidos y consumo de APIs de IA generativa.",
        metrics: [
          { label: "Tiempo Entrega", value: "< 48 horas" },
          { label: "Reconocimiento", value: "1er Lugar Hackathon" },
        ],
        tags: ["Node.js", "NestJS", "TypeScript", "React 19", "APIs de IA"],
        year: "2026",
      },
      {
        index: "03",
        category: "mobile",
        categoryLabel: "Mobile & AI",
        tone: "cyan",
        badge: "🤖 Gemini AI Integrado",
        title: "AI Life OS Mobile",
        repoName: "AI_Life_OS_mobile",
        githubUrl: "https://github.com/OwerLopez/AI_Life_OS_mobile",
        description:
          "Aplicación nativa Android que centraliza notas y tareas personales integrando Google Gemini AI para resúmenes y clasificación inteligente. Construida bajo Clean Architecture, Jetpack Compose y sincronización Offline-First (Room + Firestore).",
        metrics: [
          { label: "Arquitectura", value: "Clean Arch + MVI" },
          { label: "Persistencia", value: "Offline-First (Room)" },
        ],
        tags: ["Kotlin", "Jetpack Compose", "Gemini AI", "Room", "Firestore"],
        year: "2026",
      },
      {
        index: "04",
        category: "backend",
        categoryLabel: "Backend & DevOps",
        tone: "emerald",
        badge: "🐳 Telemetría & Docker",
        title: "AI Workflow Recorder",
        repoName: "ai-workflow-recorder",
        githubUrl: "https://github.com/OwerLopez/ai-workflow-recorder",
        description:
          "Plataforma end-to-end para telemetría silenciosa en navegadores y automatización determinista de flujos de trabajo. Compuesto por extensión de navegador, backend de captura en Python y panel de control contenerizado en Docker.",
        metrics: [
          { label: "Despliegue", value: "Docker Compose" },
          { label: "Tipo", value: "Full-Stack Telemetry" },
        ],
        tags: ["Python", "FastAPI", "Chrome Extension", "Docker", "REST APIs"],
        year: "2026",
      },
      {
        index: "05",
        category: "data",
        categoryLabel: "Data Engineering",
        tone: "blue",
        badge: "📊 Data Science & Pipeline",
        title: "Telecom Churn ML Pipeline",
        repoName: "telecom-churn-ml-pipeline",
        githubUrl: "https://github.com/OwerLopez/telecom-churn-ml-pipeline",
        description:
          "Pipeline integral de análisis y machine learning para predicción de fuga de clientes: limpieza de datos estructurados, ingeniería de características (feature engineering), balanceo de clases y comparativa de modelos predictivos.",
        metrics: [
          { label: "Metodología", value: "EDA + Scikit-Learn" },
          { label: "Salida", value: "Modelos Exportados" },
        ],
        tags: ["Python", "Pandas", "Scikit-Learn", "NumPy", "EDA"],
        year: "2025",
      },
      {
        index: "06",
        category: "backend",
        categoryLabel: "Backend & Testing",
        tone: "violet",
        badge: "🧪 Suite Completa de Tests",
        title: "NovaChef Restaurant Platform",
        repoName: "novachef-restaurant-platform",
        githubUrl: "https://github.com/OwerLopez/novachef-restaurant-platform",
        description:
          "Plataforma backend de gestión de restaurantes con control de roles, pedidos, pasarela de pagos e inventario. Incluye una suite exhaustiva de pruebas automatizadas con PyTest (unitarias, integración, seguridad y análisis de valores límite BVA/EP).",
        metrics: [
          { label: "Cobertura QA", value: "Unit + Integration + Security" },
          { label: "Seguridad", value: "Role-Based Access" },
        ],
        tags: ["Python", "Django", "PyTest", "PostgreSQL", "QA Testing"],
        year: "2026",
      },
      {
        index: "07",
        category: "mobile",
        categoryLabel: "Sistemas C++",
        tone: "amber",
        badge: "🏛️ Desktop GIS & Analítica",
        title: "Qt Water Resources System",
        repoName: "qt-water-resources-system",
        githubUrl: "https://github.com/OwerLopez/qt-water-resources-system",
        description:
          "Sistema de información de escritorio de alto rendimiento para gestión de recursos hídricos: administración técnica de cuencas, presas y canales con visualizaciones gráficas y modelos hidrológicos en C++ y Qt Framework.",
        metrics: [
          { label: "Entorno", value: "Qt / C++ Nativo" },
          { label: "Dominio", value: "Hidroinformática" },
        ],
        tags: ["C++", "Qt Framework", "Desktop GUI", "Data Modeling"],
        year: "2024",
      },
      {
        index: "08",
        category: "mobile",
        categoryLabel: "Mobile Native",
        tone: "cyan",
        badge: "📱 Clean Architecture",
        title: "Gestor Tareas Pro",
        repoName: "GestorTareasPro",
        githubUrl: "https://github.com/OwerLopez/GestorTareasPro",
        description:
          "Gestor de tareas y hábitos para Android nativo con Jetpack Compose y Clean Architecture. Diseño offline-first con base de datos Room, calendario de progreso inmutable y sistema de rachas motivacionales.",
        metrics: [
          { label: "Arquitectura", value: "Clean Arch (Domain/Data/UI)" },
          { label: "Base de Datos", value: "Room SQLite" },
        ],
        tags: ["Kotlin", "Jetpack Compose", "Room", "Coroutines", "Flow"],
        year: "2026",
      },
    ],
    matrixTitle: "Matriz técnica ejecutiva de repositorios",
    matrixHeaders: {
      project: "Proyecto / Repo",
      domain: "Dominio",
      stack: "Stack Principal",
      result: "Métrica / Resultado Clave",
      role: "Rol",
      year: "Año",
    },
    matrix: [
      {
        project: "ChurnInsight",
        domain: "ML & Backend JVM",
        stack: "Java 17 · Spring Boot · ONNX",
        result: "Latencia 2000ms → 20ms · Recall 96%",
        role: "Backend + Data Science",
        year: "2025",
      },
      {
        project: "VisionTransit AI",
        domain: "Visión Computacional / Data",
        stack: "Python · FastAPI · YOLO11",
        result: "28.7 FPS en tiempo real · 6 capas",
        role: "Data Engineer + ML",
        year: "2025",
      },
      {
        project: "NEXIA 2026 (WeWin TI)",
        domain: "Backend & IA Generativa",
        stack: "Node.js · NestJS · LLM APIs",
        result: "MVP en < 48h · 1er Puesto Hackathon",
        role: "Backend Lead",
        year: "2026",
      },
      {
        project: "AI Life OS",
        domain: "Mobile Native & IA",
        stack: "Kotlin · Jetpack Compose · Gemini",
        result: "Offline-First + Resúmenes IA",
        role: "Android Developer",
        year: "2026",
      },
      {
        project: "AI Workflow Recorder",
        domain: "Backend & Telemetría",
        stack: "Python · FastAPI · Extension",
        result: "Automatización & Docker Compose",
        role: "Full-Stack Engineer",
        year: "2026",
      },
      {
        project: "NovaChef Platform",
        domain: "Backend & Testing QA",
        stack: "Python · Django · PyTest",
        result: "Suite de Pruebas BVA/EP + Seguridad",
        role: "Backend Developer",
        year: "2026",
      },
      {
        project: "Qt Water Resources",
        domain: "Sistemas de Escritorio C++",
        stack: "C++ · Qt Framework · GUI",
        result: "Modelado hidrológico de cuencas",
        role: "C++ Software Engineer",
        year: "2024",
      },
      {
        project: "Gestor Tareas Pro",
        domain: "Mobile Native Android",
        stack: "Kotlin · Jetpack Compose · Room",
        result: "Clean Arch + Persistencia Local",
        role: "Android Developer",
        year: "2026",
      },
    ],
  },

  architecture: {
    kicker: "ARQUITECTURA DE DATOS & ML",
    headingLead: "Ciclo de vida del dato:",
    headingAccent: "de la ingesta a producción.",
    description:
      "Estructura de pipeline en cinco etapas diseñada para asegurar integridad, baja latencia y alta mantenibilidad.",
    stages: [
      {
        index: "E1",
        label: "Fuentes de Datos",
        detail: "Bases de datos transaccionales, NoSQL y APIs",
        tech: "PostgreSQL · MySQL · SQL Server · MongoDB · APIs",
        power: "INGESTA 100%",
      },
      {
        index: "E2",
        label: "Procesamiento ETL",
        detail: "Extracción, limpieza, tipado y transformación",
        tech: "Python · Pandas · SQL · BULK INSERT",
        power: "PROCESAMIENTO",
      },
      {
        index: "E3",
        label: "Almacenamiento",
        detail: "Modelado relacional, consultas optimizadas y calidad",
        tech: "Modelado lógico/físico · CTEs · Window Functions",
        power: "INTEGRIDAD",
      },
      {
        index: "E4",
        label: "Inferencia ML",
        detail: "Modelos entrenados y predicción en memoria nativa",
        tech: "NumPy · Random Forest · ONNX Runtime · XAI",
        power: "INFERENCIA ONNX",
      },
      {
        index: "E5",
        label: "Capa de Servicio",
        detail: "Consumo seguro vía APIs REST y dashboards",
        tech: "Spring Boot · JWT · Swagger · Power BI",
        power: "API EN PRODUCCIÓN",
      },
    ],
    note: "Inferencia embebida: el modelo se ejecuta dentro del backend en memoria nativa, logrando una latencia P99 de 20 ms sin dependencias de red externa.",
  },

  stack: {
    kicker: "STACK TECNOLÓGICO & DOMINIOS",
    heading: "Tecnologías y herramientas principales",
    description:
      "Herramientas con las que diseño y construyo servicios backend robustos, pipelines de datos e integraciones cloud.",
    groups: [
      { name: "Backend", glow: "flame", items: ["Java 17", "Spring Boot 3.4", "NestJS", "Node.js", "REST APIs · Swagger"] },
      { name: "Datos", glow: "magenta", items: ["PostgreSQL", "MySQL · SQL Server", "MongoDB", "Pandas · NumPy", "Power BI"] },
      { name: "Cloud & DevOps", glow: "flame", items: ["Oracle Cloud (OCI)", "AWS EC2 · S3", "Google Cloud", "Docker", "Git"] },
      { name: "IA / Machine Learning", glow: "violet", items: ["Python 3.12", "ONNX Runtime", "Random Forest", "XAI"] },
    ],
    note: "Experiencia práctica en diseño backend, gestión de datos, despliegues cloud y metodologías ágiles.",
  },

  journey: {
    kicker: "EXPERIENCIA & TRAYECTORIA",
    heading: "Experiencia profesional y liderazgo",
    description:
      "Trayectoria enfocada en desarrollo backend en producción, soporte de plataformas de datos de alto volumen y liderazgo estudiantil.",
    items: [
      {
        period: "Feb 2026 → hoy",
        title: "Backend Developer (prácticas) — Fundación CALMA",
        description:
          "Desarrollo y mantenimiento de servicios backend con APIs REST, lógica de negocio, autenticación JWT y control de acceso. Gestión y optimización de bases de datos PostgreSQL, MySQL, SQL Server y MongoDB con metodología Scrum.",
        tone: "flame",
      },
      {
        period: "2024 — 2025",
        title: "Operador Informático & Gestión de Datos — ESAN / PRONABEC",
        description:
          "Soporte informático y verificación de datos para más de 2,000 postulantes de la región durante el Examen Nacional de Preselección (Beca 18), operando plataformas con altos estándares de confidencialidad e integridad.",
        tone: "glow",
      },
      {
        period: "2024 — 2025",
        title: "Secretario ACM Student Chapter · Quinto Superior UNSA",
        description:
          "Secretario de la directiva del ACM Chapter UNSA, coordinando talleres técnicos de IA y programación. Perteneciente al Quinto Superior (Top 20% de rendimiento académico en Ingeniería de Sistemas).",
        tone: "muted",
      },
    ],
  },

  github: {
    kicker: "ACTIVIDAD EN GITHUB",
    heading: "Repositorios y actividad de código",
    description:
      "Consultado en tiempo real desde la API de GitHub para mostrar actividad reciente y proyectos públicos.",
    metrics: [
      { label: "Repositorios públicos" },
      { label: "Seguidores" },
      { label: "Último commit" },
    ],
    viewAll: "Ver repositorios en GitHub",
    updatedLabel: "Actualizado en vivo",
    errorText: "No se pudo conectar a la API de GitHub en este momento.",
    loadingText: "Consultando actividad de GitHub…",
    logTitle: "Registro de actividad",
    logEmpty: "Esperando datos de la API…",
  },

  credentials: {
    kicker: "CREDENCIALES PROFESIONALES",
    heading: "Certificaciones oficiales verificadas",
    description:
      "Acreditaciones emitidas por proveedores líderes de la industria en computación en la nube, arquitectura de bases de datos y ciencia de datos.",
    credentialsLabel: "Credenciales verificadas en Credly",
    credentials: [
      { name: "Oracle Cloud Infrastructure 2025 Foundations", issuer: "Oracle", acronym: "OCI", href: "https://www.credly.com/search?q=Oracle%20Cloud%20Infrastructure%202025%20Foundations", glow: "flame" },
      { name: "Oracle APEX Cloud Developer Professional", issuer: "Oracle", acronym: "APEX", href: "https://www.credly.com/search?q=Oracle%20APEX%20Cloud%20Developer%20Professional", glow: "flame" },
      { name: "Google Cloud Computing Foundations", issuer: "Google Cloud", acronym: "GCP", href: "https://www.credly.com/search?q=Google%20Cloud%20Computing%20Foundations", glow: "magenta" },
      { name: "AWS Academy Graduate — Cloud Foundations", issuer: "AWS", acronym: "AWS", href: "https://www.credly.com/search?q=AWS%20Academy%20Graduate%20—%20Cloud%20Foundations", glow: "magenta" },
      { name: "ONE Tech — Data Science (440h)", issuer: "Alura Latam", acronym: "ONE", href: "https://www.credly.com/search?q=ONE%20Tech%20—%20Data%20Science%20(440h)", glow: "flame" },
      { name: "Especialización Microsoft SQL Server (avanzado)", issuer: "Datux Perú", acronym: "SQL", href: "https://www.credly.com/search?q=Especializacion%20Microsoft%20SQL%20Server%20(avanzado)", glow: "violet" },
    ],
    verifyCta: "Verificar en Credly",
  },

  philosophy: {
    kicker: "SOBRE MÍ & PERFIL PERSONAL",
    headingLead: "Detrás del código:",
    headingAccent: "enfoque, rigor y visión.",
    description:
      "Combino formación rigurosa en Ciencias de la Computación / Ingeniería de Sistemas con experiencia práctica construyendo servicios backend y pipelines de datos en producción.",
    bioHeading: "Ower Frank López Arela",
    bioText: [
      "Estudiante de 9no ciclo de Ingeniería de Sistemas en la UNSA (Quinto Superior) y Desarrollador Backend en Fundación CALMA. Me apasiona resolver problemas de rendimiento, diseñar arquitecturas limpias y transformar flujos de datos en servicios estables y confiables.",
      "Enfoco mi aprendizaje continuo en arquitecturas distribuidas, inferencia de baja latencia en la JVM y calidad de software. Como Secretario del ACM Student Chapter UNSA, impulso espacios de formación técnica en algoritmos y tecnologías emergentes.",
    ],
    principlesLabel: "Principios de Ingeniería",
    principles: [
      {
        index: "01",
        title: "Arquitectura limpia y mantenible",
        detail: "Diseño modular desacoplado, contratos de APIs rigurosos y tipado estricto preparado para escalar.",
      },
      {
        index: "02",
        title: "Integridad y calidad de datos",
        detail: "Modelado relacional eficiente, validaciones consistentes entre capas y pipelines ETL confiables.",
      },
      {
        index: "03",
        title: "Orientado a producción y rendimiento",
        detail: "Inferencia de baja latencia, documentación OpenAPI, migraciones SQL controladas y despliegues con Docker.",
      },
    ],
    momentsLabel: "Especialización & Visión Técnica",
    momentsKicker: "ENFOQUE & DEEP DIVES",
    moments: [
      {
        id: "low-latency-ml",
        title: "Inferencia ML Embebida en JVM",
        subtitle: "Spring Boot + ONNX Runtime",
        category: "Baja Latencia",
        image: "/assets/profile.jpg",
        description: "Ejecución de modelos predictivos en memoria nativa del backend, reduciendo la latencia de 2,000 ms a 20 ms sin dependencias de red externa.",
        tag: "Latencia 20ms",
        accent: "cyan",
      },
      {
        id: "data-engineering",
        title: "Modelado SQL & Pipelines ETL",
        subtitle: "Integridad & Procesamiento",
        category: "Data Engineering",
        image: "/assets/profile.jpg",
        description: "Estructuración de datos relacionales y NoSQL, consultas analíticas con CTEs/Window Functions y flujos automatizados de transformación.",
        tag: "SQL & ETL",
        accent: "amber",
      },
      {
        id: "community-leadership",
        title: "Liderazgo & Comunidad Técnica",
        subtitle: "ACM Student Chapter UNSA",
        category: "Comunidad & Formación",
        image: "/assets/profile.jpg",
        description: "Coordinación y gestión de talleres de inteligencia artificial, programación competitiva y mentoría académica en Ingeniería de Sistemas.",
        tag: "Directiva ACM",
        accent: "emerald",
      },
    ],
    facetsLabel: "Facetas & Datos Clave",
    facets: [
      { label: "Idiomas", value: "Español (Nativo) · Inglés (Técnico B2)", detail: "Lectura técnica y documentación fluida" },
      { label: "Área de Interés", value: "Low-Latency Backend & Data Streaming", detail: "Sistemas distribuidos e inferencia ML en JVM" },
      { label: "Rendimiento", value: "Quinto Superior (Top 20%)", detail: "Escuela Profesional de Ingeniería de Sistemas UNSA" },
      { label: "Ubicación", value: "Arequipa, Perú (UTC-5)", detail: "Disponible para trabajo remoto o híbrido" },
    ],
  },

  contact: {
    kicker: "COMUNICACIÓN DIRECTA",
    headingLead: "Iniciemos una",
    headingAccent: "conversación profesional.",
    description:
      "Disponible para oportunidades como Junior Data Engineer y Backend Developer. Si buscas a alguien motivado, proactivo y enfocado en entregar software de calidad, escríbeme.",
    terminalTitle: "contacto@owerlopez.dev",
    greeting: "iniciar — contacto",
    context:
      "Abierto a oportunidades para desarrollo backend, ingeniería de datos y proyectos de software en la nube.",
    request:
      "Puedes enviarme un correo directamente o conectar conmigo en LinkedIn.",
    emailLabel: "Email directo",
    copyLabel: "Copiar",
    copiedFeedback: "Copiado",
    responseTime: "Respuesta en < 24 h en días laborables",
    cards: [
      { label: "GitHub", value: "github.com/OwerLopez", href: "https://github.com/OwerLopez" },
      { label: "LinkedIn", value: "linkedin.com/in/owerlopez", href: "https://www.linkedin.com/in/owerlopez/" },
      { label: "Credly", value: "Credenciales verificadas", href: "https://www.credly.com/users/ower-frank-lopez-arela" },
    ],
    channels: [
      { kind: "link", label: "GitHub", handle: "@OwerLopez", href: "https://github.com/OwerLopez", external: true },
      { kind: "link", label: "LinkedIn", handle: "Ower Frank López Arela", href: "https://www.linkedin.com/in/owerlopez/", external: true },
      { kind: "link", label: "Credly", handle: "credly.com", href: "https://www.credly.com/users/ower-frank-lopez-arela", external: true },
      { kind: "location", label: "Ubicación", handle: "Arequipa, Perú · UTC-5", href: "https://maps.google.com/?q=Arequipa+Peru", external: true },
    ],
  },

  footer: {
    copyright: "© 2026 Ower Frank López Arela",
    rights: "Todos los derechos reservados.",
    tagline: "Backend · Datos · Cloud · IA — Arequipa, Perú (16.40°S 71.53°W)",
    credit: "Desarrollado por Ower F. López Arela",
    location: "Arequipa, Perú",
    timezone: "UTC-5",
    systemStatus: {
      availabilityLabel: "disponibilidad",
      availabilityValue: "Disponible para incorporación",
      zoneLabel: "zona",
      modeLabel: "estado",
      modeValue: "abierto a oportunidades",
    },
    navLabel: "Navegación principal",
    navTitle: "Secciones",
    navItems: {
      work: "Proyectos",
      expertise: "Especialidad",
      experience: "Experiencia",
      about: "Sobre mí",
      contact: "Contacto",
    },
    contactTitle: "Canales",
    contactItems: [
      { href: "https://github.com/OwerLopez", label: "github.com/OwerLopez", external: true },
      { href: "https://www.linkedin.com/in/owerlopez/", label: "linkedin.com/in/owerlopez", external: true },
      { href: "https://www.credly.com/users/ower-frank-lopez-arela", label: "credly.com — Credenciales", external: true },
    ],
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    credlyLabel: "Credly",
  },
};

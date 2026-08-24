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
    kicker: "PROYECTOS DESTACADOS",
    heading: "Proyectos y soluciones desarrolladas",
    description:
      "Una muestra diversa de proyectos en backend, ingeniería de datos, visión computacional y aplicaciones móviles con código auditable en GitHub.",
    featuredLabel: "Proyecto Insignia",
    featured: {
      flag: "Destacado",
      category: "Plataforma de ML Empresarial & Backend",
      title: "ChurnInsight",
      summary:
        "Plataforma de predicción de abandono de clientes con inferencia de ML embebida directamente en el backend mediante ONNX Runtime, eliminando sobrecostos de red y dependencias de servicios externos.",
      tags: ["Java 17", "Spring Boot 3.4", "ONNX Runtime", "Random Forest", "MySQL"],
      note: "Al ejecutar el modelo ONNX en el mismo proceso de Spring Boot, la latencia P99 se redujo de 2,000 ms a 20 ms. Incluye autenticación JWT, migraciones SQL versionadas y explicabilidad de modelo (XAI) con un Recall del 96%.",
      metrics: [
        { value: "96%", label: "Recall (Random Forest)", highlight: true },
        { value: "20 ms", label: "Inferencia P99 (ONNX)", highlight: true },
        { value: "99%", label: "Reducción de latencia" },
        { value: "0", label: "Llamadas externas ML" },
      ],
      links: [
        { label: "Ver en GitHub", href: "https://github.com/OwerLopez", external: true },
        { label: "Ver arquitectura", href: "#architecture" },
      ],
    },
    logLabel: "Otros proyectos seleccionados",
    log: [
      {
        index: "01",
        tone: "gold",
        title: "NEXIA 2026",
        description:
          "1er puesto en el Hackathon 'Build with AI' (organizado por IBM, GDG Arequipa y JAKU UNSA). MVP de innovación educativa construido en <48h con Node.js, NestJS e integración de APIs de IA.",
        tags: ["Node.js", "NestJS", "APIs de IA"],
      },
      {
        index: "02",
        tone: "violet",
        title: "VisionTransit AI",
        description:
          "Pipeline de visión computacional en tiempo real para monitoreo de transporte público: arquitectura desacoplada en 6 capas con FastAPI, YOLO11 y WebSockets, sosteniendo 28.7 FPS sobre CPU.",
        tags: ["Python", "FastAPI", "YOLO11"],
      },
      {
        index: "03",
        tone: "emerald",
        title: "Chakrita",
        description:
          "1er puesto en la Feria de Proyectos 2024 de Ingeniería de Sistemas (UNSA). Aplicación móvil de agricultura sostenible con integración IoT y sensores en Flutter.",
        tags: ["Flutter", "IoT", "UX/UI"],
      },
    ],
    matrixTitle: "Resumen técnico de proyectos",
    matrixHeaders: {
      project: "Proyecto",
      domain: "Dominio",
      stack: "Stack principal",
      result: "Resultado clave",
      role: "Rol",
      year: "Año",
    },
    matrix: [
      {
        project: "ChurnInsight",
        domain: "Plataforma ML / Backend",
        stack: "Java 17 · Spring Boot · ONNX",
        result: "Latencia 2000ms → 20ms · Recall 96%",
        role: "Backend + Data Science",
        year: "2025",
      },
      {
        project: "NEXIA 2026",
        domain: "IA aplicada a educación",
        stack: "Node.js · NestJS · APIs de IA",
        result: "MVP en < 48h · 1er puesto",
        role: "Backend + Integración IA",
        year: "2026",
      },
      {
        project: "VisionTransit AI",
        domain: "Visión computacional / Data",
        stack: "Python · FastAPI · YOLO11",
        result: "28.7 FPS en tiempo real · 6 capas",
        role: "Data Engineering + ML",
        year: "2025",
      },
      {
        project: "Chakrita",
        domain: "IoT / Agtech móvil",
        stack: "Flutter · IoT · Sensores",
        result: "1er puesto Feria UNSA",
        role: "UX/UI + Flutter",
        year: "2024",
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
      "Trayectoria enfocada en desarrollo backend, soporte de sistemas con alto volumen de datos y liderazgo estudiantil.",
    items: [
      {
        period: "Feb 2026 → hoy",
        title: "Backend Developer (prácticas) — Fundación CALMA",
        description:
          "Desarrollo y mantenimiento de servicios backend con APIs REST, lógica de negocio, autenticación JWT y control de acceso. Gestión y optimización de bases de datos PostgreSQL, MySQL, SQL Server y MongoDB con metodología Scrum.",
        tone: "flame",
      },
      {
        period: "2026",
        title: "1er puesto — Hackathon NEXIA \u201cBuild with AI\u201d",
        description:
          "Primer lugar con un MVP de innovación educativa construido en menos de 48 horas con Node.js, NestJS e integración de APIs de IA. Organizado por IBM, GDG Arequipa y JAKU Emprende UNSA.",
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
        period: "Comunidad & Académico",
        title: "Secretario ACM Student Chapter · Quinto Superior UNSA",
        description:
          "Secretario de la directiva del ACM Chapter UNSA (2024–2025), coordinando talleres técnicos de IA y programación. Perteneciente al Quinto Superior (Top 20% de rendimiento académico en Ingeniería de Sistemas).",
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
    kicker: "PREMIOS & CERTIFICACIONES",
    heading: "Reconocimientos y certificaciones principales",
    description:
      "Premios en competencias tecnológicas y certificaciones oficiales en cloud computing, arquitectura de bases de datos y ciencia de datos.",
    trophies: [
      { index: "01", title: "1er puesto — NEXIA 2026", detail: "Hackathon Build with AI (IBM / GDG)", value: "1", suffix: "", glow: "flame" },
      { index: "02", title: "1er puesto — Feria UNSA 2024", detail: "Feria de Proyectos (Cat. Avanzado)", value: "1", suffix: "", glow: "emerald" },
      { index: "03", title: "Quinto Superior", detail: "Top 20% en Ingeniería de Sistemas UNSA", value: "20", suffix: "%", glow: "magenta" },
    ],
    credentialsLabel: "Certificaciones oficiales verificadas",
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
    kicker: "SOBRE MÍ",
    headingLead: "Software bien estructurado,",
    headingAccent: "aprendizaje constante.",
    description:
      "Soy estudiante de 9no ciclo de Ingeniería de Sistemas en la Universidad Nacional de San Agustín de Arequipa (UNSA) y me desempeño como Desarrollador Backend en Fundación CALMA. Me apasiona diseñar arquitecturas limpias, optimizar el manejo de datos y construir APIs que resuelvan necesidades reales. He coordinado talleres técnicos como Secretario del ACM Student Chapter y mantengo mi rendimiento académico en el Quinto Superior (Top 20%). Busco sumarme a equipos dinámicos donde pueda aportar valor y continuar aprendiendo de ingenieros senior.",
    principles: [
      {
        index: "01",
        title: "Arquitectura limpia y mantenible",
        detail: "Diseño modular y desacoplado, aplicando contratos claros de APIs, tipado estricto y código mantenible orientado a escalabilidad.",
      },
      {
        index: "02",
        title: "Integridad y calidad de datos",
        detail: "Modelado relacional eficiente, validaciones consistentes entre capas y pipelines de procesamiento confiables.",
      },
      {
        index: "03",
        title: "Preparado para producción",
        detail: "Servicios REST documentados con OpenAPI, autenticación segura con JWT, migraciones SQL controladas y despliegues con Docker.",
      },
    ],
    panelTitle: "Perfil profesional",
    facts: [
      { key: "Rol actual", value: "Backend Developer (prácticas)" },
      { key: "Organización", value: "Fundación CALMA" },
      { key: "Tecnologías core", value: "Java · Python · SQL · Docker" },
      { key: "Formación", value: "Ingeniería de Sistemas · UNSA" },
      { key: "Ubicación", value: "Arequipa, Perú (UTC-5)" },
    ],
    panelFooter: { left: "UNSA · Ingeniería de Sistemas", right: "Quinto Superior (Top 20%)" },
  },

  faq: {
    kicker: "PREGUNTAS FRECUENTES",
    heading: "Perfil técnico & disponibilidad",
    description:
      "Resumen sobre fortalezas técnicas, objetivos profesionales y disponibilidad de incorporación.",
    items: [
      {
        index: "F1",
        category: "Especialidad",
        question: "¿Cuáles son tus principales fortalezas técnicas y áreas de interés?",
        answer:
          "Me especializo en desarrollo backend con Java (Spring Boot) y Node.js (NestJS), modelado y optimización de bases de datos relacionales (PostgreSQL, MySQL, SQL Server) y construcción de pipelines de datos con Python. Me apasiona crear sistemas robustos, seguros y eficientes.",
      },
      {
        index: "F2",
        category: "Disponibilidad",
        question: "¿Cuál es tu disponibilidad actual para roles e incorporación?",
        answer:
          "Actualmente curso el último año de Ingeniería de Sistemas en la UNSA y trabajo como practicante Backend en Fundación CALMA. Cuento con disponibilidad para roles de Junior Data Engineer o Backend Developer en modalidades remotas o híbridas.",
      },
    ],
  },

  contact: {
    kicker: "COMUNICACIÓN DIRECTA",
    headingLead: "Iniciemos una",
    headingAccent: "conversación profesional.",
    description:
      "Disponible para oportunidades como Junior Data Engineer y Backend Developer. Si buscas a alguien motivado, proactivo y enfocado en entregar software de calidad, escríbeme.",
    terminalTitle: "contacto@owerlopez.dev",
    greeting: "$ iniciar — contacto",
    context:
      "> Abierto a oportunidades para desarrollo backend, ingeniería de datos y proyectos de software en la nube.",
    request:
      "> Puedes enviarme un correo directamente o conectar conmigo en LinkedIn.",
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
    rights: "Ower Frank López Arela. Todos los derechos reservados.",
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

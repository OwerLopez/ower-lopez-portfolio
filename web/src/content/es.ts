import type { PortfolioContent } from "@/types/content";

/**
 * Contenido en espanol (idioma principal).
 * Toda la informacion proviene del CV de Ower Frank Lopez Arela.
 * Redaccion con tono de producto tecnologico: concreta, verificable, sin relleno.
 */
export const es: PortfolioContent = {
  meta: {
    title: "Ower Frank Lopez Arela — Backend, Data & AI Engineering",
    description:
      "Ingeniero de Sistemas enfocado en backend, ingenieria de datos e IA aplicada. Construyo APIs REST, pipelines de datos y modelos de ML embebidos con Java, Spring Boot, Node.js y Python.",
    ogAlt:
      "Portafolio de Ower Frank Lopez Arela — Backend, Data & AI Engineering",
    keywords: [
      "Backend Developer",
      "Data Engineer",
      "Ingenieria de Datos",
      "Java",
      "Spring Boot",
      "Python",
      "Machine Learning",
      "ONNX Runtime",
      "Arequipa",
      "Peru",
    ],
  },

  nav: {
    about: "Perfil",
    work: "Proyectos",
    architecture: "Arquitectura",
    stack: "Tecnologias",
    credentials: "Logros",
    faq: "Preguntas",
    contact: "Contacto",
    cta: "Discutir Proyecto",
    menuOpen: "Abrir menu",
    menuClose: "Cerrar menu",
    statusText: "DISPONIBLE Q3/Q4 2026",
  },

  hero: {
    status: "DISPONIBLE PARA ROLES JUNIOR DATA ENGINEER & BACKEND",
    titleLead: "Construyo backends que",
    titleAccent: "escalan de verdad.",
    description:
      "Estudiante de Ingenieria de Sistemas construyendo servicios backend listos para produccion, pipelines de datos y productos con IA — convirtiendo problemas complejos en arquitecturas claras y medibles.",
    primaryCta: "Explorar Proyectos",
    secondaryCta: "Iniciar Contacto",
    scroll: "DESLIZA PARA NAVEGAR",
    stats: [
      { value: 96, suffix: "%", label: "RECALL DEL MODELO" },
      { value: 99, suffix: "%", label: "LATENCIA REDUCIDA" },
      { value: 2, suffix: "", label: "PRIMEROS PUESTOS" },
      { value: 51, suffix: "", label: "CERTIFICACIONES" },
    ],
  },

  marquee: [
    "Java 17",
    "Spring Boot 3.4",
    "NestJS",
    "Node.js",
    "Python 3.12",
    "ONNX Runtime",
    "PostgreSQL",
    "MongoDB",
    "SQL Server",
    "JWT",
    "Docker",
    "Oracle Cloud",
    "AWS S3 & EC2",
    "Google Cloud",
  ],

  about: {
    eyebrow: "01 — PERFIL & FILOSOFÍA DE INGENIERÍA",
    heading:
      "Trato mis proyectos como sistemas de produccion, porque ese es el estandar en el que un equipo puede confiar.",
    paragraphs: [
      "Mi foco es el backend: disenar arquitecturas escalables, construir pipelines de datos confiables e integrar machine learning donde genera valor real. Me importan la latencia, la correctitud y los detalles que separan un demo de algo de lo que la gente depende a diario.",
      "Actualmente desarrollo servicios backend en produccion en Fundacion CALMA con Java, Spring Boot y Node.js sobre bases de datos relacionales y NoSQL, mientras oriento mi carrera hacia el Data Engineering con Python y SQL avanzado.",
    ],
    panelTitle: "METRICAS DE OPERACION",
    facts: [
      { label: "Rol Actual", value: "Backend Developer (Practicas)" },
      { label: "Organizacion", value: "Fundacion CALMA" },
      { label: "Core Tech", value: "Java · Python · SQL · ONNX" },
      { label: "Formacion", value: "Ingenieria de Sistemas · UNSA" },
      { label: "Ubicacion", value: "Arequipa, Peru (UTC-5)" },
    ],
  },

  experience: {
    eyebrow: "02 — TRAYECTORIA & HISTORIAL",
    heading: "El camino hasta aqui",
    description:
      "De soporte de datos a ingenieria backend en produccion. Cada etapa combina software real con resultados medibles.",
    items: [
      {
        period: "FEB 2026 → AHORA",
        title: "Backend Developer (Practicas) — Fundacion CALMA",
        description:
          "Desarrollo y mantenimiento de servicios backend con APIs REST, logica de negocio, autenticacion JWT y control de acceso. Gestion y optimizacion de bases de datos PostgreSQL, MySQL, SQL Server y MongoDB, con documentacion tecnica y metodologia Scrum.",
        tone: "accent",
      },
      {
        period: "2026",
        title: "Primer puesto — Hackathon NEXIA “Build with AI”",
        description:
          "Primer lugar. MVP de innovacion educativa construido en menos de 48 horas con Node.js, NestJS e integracion de APIs de IA. Ingenieria backend e integracion de IA bajo presion. Organizado por IBM, GDG Arequipa y JAKU Emprende UNSA.",
        tone: "accent",
      },
      {
        period: "NOV 2025",
        title: "Operador Informatico — Universidad ESAN · Beca 18",
        description:
          "Soporte informatico en registro, verificacion y gestion de datos para mas de 2000 postulantes de la region. Operacion de sistemas y control de datos bajo criterios de precision y confidencialidad.",
        tone: "outline",
      },
      {
        period: "2024",
        title: "Primer puesto — Feria de Proyectos UNSA (Avanzado)",
        description:
          "Primer lugar con Chakrita, aplicacion movil de agricultura sostenible en Flutter con integracion IoT y sensores. Rol de diseno UX/UI e interfaces centradas en el usuario.",
        tone: "outline",
      },
      {
        period: "2024 — 2025",
        title: "Operador Informatico — CTK · PRONABEC (Beca 18)",
        description:
          "Soporte y gestion para mas de 2000 postulantes durante el Examen Nacional de Preseleccion, operando sistemas criticos y plataformas evaluativas con altos estandares de integridad de datos.",
        tone: "muted",
      },
      {
        period: "2023 — 2024",
        title: "Monitor Academico — CEPRUNSA (3 periodos)",
        description:
          "Coordinacion de equipos de monitores y docentes, control de asistencia y verificacion en plataforma educativa. Seguimiento del temario en tres procesos consecutivos.",
        tone: "muted",
      },
      {
        period: "2023",
        title: "Programador (Practicas) — I.E.P. Linus Pauling",
        description:
          "Desarrollo y mantenimiento de sistemas de registro de asistencias y pagos con reportes dinamicos. Automatizacion de procesos administrativos, debugging e integracion de modulos, capacitando a usuarios.",
        tone: "outline",
      },
      {
        period: "COMUNIDAD",
        title: "Secretario ACM · Voluntario IEEE Computer Society",
        description:
          "Secretario de la directiva del ACM Student Chapter UNSA (2024–2025), coordinando talleres de IA, ciberseguridad y programacion competitiva. Voluntario en marketing y diseno de IEEE Computer Society. Quinto Superior: 20% mejor de la promocion.",
        tone: "muted",
      },
    ],
  },

  work: {
    eyebrow: "03 — PROYECTOS & CASOS DE ESTUDIO",
    heading: "Sistemas, no capturas de pantalla",
    description: "Cada proyecto es una decision de ingenieria con resultados medibles.",
    featured: {
      flag: "PROYECTO FLAGSHIP",
      category: "PLATAFORMA ML EMPRESARIAL",
      title: "ChurnInsight",
      summary:
        "Plataforma de prediccion de abandono de clientes que embebe la inferencia de ML directamente dentro del backend — sin llamadas externas, sin sobrecosto de red, sin dependencia de terceros.",
      tags: ["Java 17", "Spring Boot 3.4", "ONNX Runtime", "Random Forest", "MySQL"],
      note: "Mover la inferencia al mismo proceso redujo la latencia de 2000 ms a 20 ms. El modelo corre donde ya viven los datos, protegido con JWT y versionado con migraciones. Random Forest optimizado con 96% de recall y Explainable AI (XAI).",
      metrics: [
        { value: "96%", label: "RECALL" },
        { value: "99%", label: "LATENCIA REDUCIDA" },
        { value: "20ms", label: "INFERENCIA P99", highlight: true },
        { value: "0", label: "LLAMADAS ML EXTERNAS", highlight: true },
      ],
    },
    secondary: [
      {
        badge: "1ER PUESTO HACKATHON",
        badgeTone: "gold",
        meta: "MVP < 48H",
        title: "NEXIA 2026",
        description:
          "Ganador del hackathon “Build with AI”. MVP de innovacion educativa entregado de extremo a extremo en menos de dos dias como ingeniero backend e integrador de IA.",
        tags: ["Node.js", "NestJS", "APIs de IA"],
      },
      {
        badge: "1ER PUESTO FERIA UNSA",
        badgeTone: "green",
        meta: "IoT · MOVIL",
        title: "Chakrita",
        description:
          "Aplicacion movil de agricultura sostenible con IoT, ganadora de la Feria de Proyectos 2024 de Ingenieria de Sistemas UNSA. Lidere el diseno UX/UI y el desarrollo en Flutter.",
        tags: ["Flutter", "IoT", "UX/UI"],
      },
    ],
    comparisonTitle: "Matriz de Comparacion Tecnica",
    comparisonHeaders: {
      project: "Proyecto",
      domain: "Dominio",
      stack: "Stack principal",
      result: "Resultado clave",
      role: "Rol",
      year: "Año",
    },
    comparison: [
      {
        project: "ChurnInsight",
        domain: "Plataforma ML / Data",
        stack: "Java 17 · Spring Boot · ONNX",
        result: "Latencia 2000ms → 20ms · Recall 96%",
        role: "Backend + Data Science",
        year: "2025",
      },
      {
        project: "NEXIA 2026",
        domain: "IA aplicada a educacion",
        stack: "Node.js · NestJS · APIs de IA",
        result: "MVP en < 48h · 1er puesto",
        role: "Backend + Integracion IA",
        year: "2026",
      },
      {
        project: "Chakrita",
        domain: "IoT / Agtech movil",
        stack: "Flutter · IoT · Sensores",
        result: "1er puesto Feria UNSA",
        role: "UX/UI + Flutter",
        year: "2024",
      },
    ],
  },

  github: {
    eyebrow: "04 — TELEMETRÍA EN VIVO",
    heading: "Codigo real, actividad real",
    description:
      "Repositorios cargados en directo desde la API de GitHub. Lo que ves aqui es exactamente lo que hay en mi cuenta, ahora mismo.",
    viewAll: "Ver repositorios en GitHub",
    updatedLabel: "Ultimo push",
    reposLabel: "REPOSITORIOS PUBLICOS",
    followersLabel: "SEGUIDORES",
    errorText: "No se pudo conectar a la API de GitHub en este momento.",
    loadingText: "Consultando telemetria de GitHub en vivo…",
  },

  architecture: {
    eyebrow: "05 — ARQUITECTURA DE DATOS",
    heading: "Como pienso un sistema de datos",
    description:
      "Del origen al valor: una tuberia clara y medible donde cada capa tiene una responsabilidad y un contrato definido.",
    layers: [
      {
        label: "Fuentes",
        detail: "Operacionales y externas",
        tech: "PostgreSQL · MySQL · SQL Server · MongoDB · APIs",
      },
      {
        label: "Ingesta / ETL",
        detail: "Extraccion y limpieza",
        tech: "Python · Pandas · SQL · BULK INSERT",
      },
      {
        label: "Almacen",
        detail: "Modelado y calidad",
        tech: "Modelado logico/fisico · CTEs · Window Fns",
      },
      {
        label: "Proceso / ML",
        detail: "Analitica e inferencia",
        tech: "NumPy · Random Forest · ONNX · XAI",
      },
      {
        label: "Servicio",
        detail: "APIs y visualizacion",
        tech: "Spring Boot · JWT · Power BI",
      },
    ],
    note: "Inferencia embebida: el modelo corre donde viven los datos — sin llamadas externas, con latencia P99 de 20 ms.",
  },

  stack: {
    eyebrow: "06 — TECNOLOGÍAS & MATRIZ DE DOMINIO",
    heading: "El stack con el que trabajo",
    description:
      "Herramientas que uso para llevar ideas desde el modelo de datos hasta produccion.",
    groups: [
      {
        label: "LENGUAJES",
        items: ["Java 17", "Python", "JavaScript / TypeScript", "SQL · C++"],
      },
      {
        label: "BACKEND",
        items: ["Spring Boot · JPA", "NestJS", "Node.js", "REST APIs · JWT · Swagger"],
      },
      {
        label: "DATOS",
        items: ["PostgreSQL · MySQL", "SQL Server · MongoDB", "Pandas · NumPy", "Power BI"],
      },
      {
        label: "IA / ML",
        items: ["ONNX Runtime", "Machine Learning", "Random Forest · XAI", "Inferencia embebida"],
      },
      {
        label: "CLOUD",
        items: ["Oracle Cloud (OCI)", "AWS (EC2, S3)", "Google Cloud", "Oracle APEX"],
      },
      {
        label: "PRACTICAS",
        items: ["Arquitectura de sistemas", "Git · Docker", "Scrum · Kanban", "Seguridad de APIs"],
      },
    ],
  },

  credentials: {
    eyebrow: "07 — CREDENCIALES & CERTIFICACIONES",
    heading: "Ganado, no declarado",
    description:
      "Resultados verificables, formacion continua y liderazgo en la comunidad de ingenieria.",
    achievementsLabel: "LOGROS DE INGENIERÍA",
    certificationsLabel: "CERTIFICACIONES VERIFICADAS",
    certificationsTotal: "51 en total",
    verifyCta: "Verificar credenciales en Credly",
    achievements: [
      { title: "1er Puesto — NEXIA 2026", detail: "Hackathon Build with AI" },
      { title: "1er Puesto — Feria UNSA 2024", detail: "Feria de Proyectos, categoria Avanzado" },
      { title: "Quinto Superior", detail: "20% mejor de la promocion" },
      { title: "Oracle Next Education", detail: "Formacion en Data Science (440h)" },
      { title: "Secretario — ACM Chapter", detail: "Liderazgo estudiantil UNSA" },
      { title: "IEEE Computer Society", detail: "Voluntario, marketing y diseno" },
    ],
    certifications: [
      { name: "Oracle Cloud Infrastructure 2025 Foundations", issuer: "Oracle" },
      { name: "Oracle APEX Cloud Developer Professional", issuer: "Oracle" },
      { name: "Google Cloud Computing Foundations", issuer: "Google Cloud" },
      { name: "AWS Academy Graduate — Cloud Foundations", issuer: "AWS" },
      { name: "Especializacion Microsoft SQL Server (Avanzado)", issuer: "Datux Peru" },
      { name: "Especializacion Microsoft Power BI (Avanzado)", issuer: "Datux Peru" },
      { name: "ONE Tech — Data Science (440h)", issuer: "Alura Latam" },
      { name: "Programacion y Desarrollo con Python (80h)", issuer: "Univ. Continental" },
      { name: "SAP S/4HANA MM — Key User", issuer: "SUMMA Center" },
      { name: "Business Intelligence Foundation (BIFPC)", issuer: "CertiProf" },
      { name: "Scrum Foundation (SFPC)", issuer: "CertiProf" },
      { name: "Lean Six Sigma White Belt (LSSWBPC)", issuer: "CertiProf" },
      { name: "Machine Learning · Clasificacion y Regresion", issuer: "Alura Latam" },
      { name: "Estadistica · Probabilidad y Muestreo", issuer: "Alura Latam" },
      { name: "Ofimatica Profesional Nivel Avanzado (90h)", issuer: "ITEC" },
      { name: "Hacking Etico Gamificado", issuer: "HackerMentor" },
    ],
  },

  faq: {
    eyebrow: "08 — PREGUNTAS FRECUENTES & DECISIONES",
    heading: "Decisiones de Arquitectura & Colaboracion",
    description:
      "Claridad total sobre como abordo la construccion de software, la optimizacion de latencia y la integracion en equipos de alto rendimiento.",
    items: [
      {
        category: "ARQUITECTURA",
        question: "¿Por que integrar inferencia ML en el backend en lugar de microservicios dedicados?",
        answer:
          "En proyectos como ChurnInsight, exportar el modelo a ONNX Runtime y ejecutarlo en el mismo proceso de Java/Spring Boot elimino el overhead de red y serializacion JSON, reduciendo la latencia P99 de 2000 ms a 20 ms manteniendo cero dependencia de infraestructura externa.",
      },
      {
        category: "DISPONIBILIDAD",
        question: "¿Cual es tu disponibilidad actual para roles e incorporacion?",
        answer:
          "Actualmente me encuentro cursando los ultimos periodos de Ingenieria de Sistemas en la UNSA y trabajando como practicante Backend en Fundacion CALMA. Estoy disponible para roles de Junior Data Engineer o Backend Developer en modalidades remotas o hibridas.",
      },
      {
        category: "METODOLOGÍA",
        question: "¿Como garantizas la calidad del codigo y la paridad de datos?",
        answer:
          "Utilizo chequeos estrictos de tipos en TypeScript/Java, migraciones de base de datos declarativas (Flyway/Liquibase/SQL), documentacion OpenAPI/Swagger, y pruebas E2E automatizadas antes de cada despliegue.",
      },
      {
        category: "DATOS & CLOUD",
        question: "¿Que experiencia tienes con plataformas cloud como Oracle u AWS?",
        answer:
          "Cuento con certificaciones oficiales de Oracle Cloud Infrastructure (OCI Foundations & APEX Professional), AWS Academy Cloud Foundations y Google Cloud Foundations. He desplegado entornos contenerizados con Docker sobre instancias OCI y EC2.",
      },
    ],
  },

  contact: {
    eyebrow: "09 — HABLEMOS",
    headingLead: "Construyamos algo",
    headingAccent: "que escale.",
    description:
      "Disponible para roles Junior Data Engineer y Backend Engineering. Si buscas ingenieros que cuidan los detalles, conversemos.",
    emailCta: "Copiar Email Directo",
    linkedinCta: "Perfil en LinkedIn",
    githubCta: "Repositorios GitHub",
  },

  footer: {
    rights: "Ower Frank Lopez Arela. Todos los derechos reservados.",
    tagline: "Backend · Data · IA · Cloud — Arequipa, Peru (16.40°S 71.53°W)",
    builtWith: "Construido con Next.js 15, React 19, Tailwind CSS v4 & Framer Motion",
    backToTop: "Volver al inicio",
  },
};

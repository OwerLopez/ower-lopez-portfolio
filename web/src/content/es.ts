import type { PortfolioContent } from "@/types/content";

/**
 * Contenido en espanol (idioma principal). Version 6 — Aurora de Fuego.
 * Narrativa emocional: impacto → obsesión → prueba → energía → constelación
 * → ascenso → telemetría → trofeos → principios → confianza → contacto.
 * Toda la informacion proviene del CV de Ower Frank Lopez Arela.
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
    work: "Proyectos",
    expertise: "Expertise",
    experience: "Experiencia",
    about: "Sobre mi",
    contact: "Contacto",
    cta: "Hablemos",
    menuOpen: "Abrir menu",
    menuClose: "Cerrar menu",
    statusText: "Disponible Q3/Q4 2026",
    soundOn: "Sonido activado",
    soundOff: "Sonido silenciado",
  },

  intro: {
    status: "Disponible para roles Junior Data Engineer & Backend",
    kicker: "INGENIERIA BACKEND & DATA PIPELINES · AREQUIPA, PERU",
    titleLines: ["Cada milisegundo", "es una decision"],
    titleAccent: "que tomo en serio.",
    description:
      "Estudiante de Ingenieria de Sistemas UNSA (9no ciclo) en practicas como Desarrollador Backend. Backend, pipelines de datos y ML embebido en produccion, con mas de 25 proyectos documentados en GitHub. Donde la velocidad no se promete: se mide.",
    primaryCta: "Ver la prueba",
    primaryTarget: "#work",
    secondaryCta: "Copiar correo",
    copiedFeedback: "Correo copiado al portapapeles.",
    scrollCue: "Baja. Lo mejor viene en camino.",
    frameLabel: "REC · EN VIVO",
  },

  marquee: [
    { name: "Java 17", category: "Backend" },
    { name: "Spring Boot 3.4", category: "Backend" },
    { name: "NestJS", category: "Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python 3.12", category: "Datos" },
    { name: "ONNX Runtime", category: "IA" },
    { name: "PostgreSQL", category: "Datos" },
    { name: "MongoDB", category: "Datos" },
    { name: "SQL Server", category: "Datos" },
    { name: "JWT", category: "Seguridad" },
    { name: "Docker", category: "DevOps" },
    { name: "Oracle Cloud", category: "Cloud" },
    { name: "AWS", category: "Cloud" },
    { name: "Google Cloud", category: "Cloud" },
  ],

  mission: {
    kicker: "FILOSOFIA DE INGENIERIA",
    headingLead: "No escribo codigo.",
    headingAccent: "Enciendo motores.",
    paragraphs: [
      "Un demo se muestra treinta segundos. Un sistema en produccion se confia durante anos. La diferencia no esta en las lineas de codigo: esta en la obsesion por cada milisegundo, cada contrato de API y cada dato que entra limpio y sale correcto.",
      "Desde soporte de datos con mas de 2000 postulantes hasta servicios backend corriendo en produccion, mi metodo es el mismo: arquitectura rigurosa, datos limpios y resultados que se pueden medir con un cronometro.",
    ],
    facts: [
      { key: "Obsesion", value: "Latencia P99 de 20 ms" },
      { key: "Metodo", value: "Arquitectura + datos + ML" },
      { key: "Estandar", value: "Produccion, no demos" },
      { key: "Zona", value: "Arequipa, Peru · UTC-5" },
    ],
  },

  work: {
    kicker: "CASOS DE ESTUDIO & PRODUCCION",
    heading: "Proyectos que gritan numeros",
    description:
      "Sin capturas de pantalla decorativas: resultados verificables que se pueden auditar en GitHub.",
    featuredLabel: "Proyecto Destacado",
    featured: {
      flag: "Flagship",
      category: "Plataforma ML empresarial",
      title: "ChurnInsight",
      summary:
        "Prediccion de abandono de clientes con la inferencia de ML embebida dentro del backend — sin llamadas externas, sin sobrecosto de red, sin dependencia de terceros.",
      tags: ["Java 17", "Spring Boot 3.4", "ONNX Runtime", "Random Forest", "MySQL"],
      note: "Mover la inferencia al mismo proceso redujo la latencia de 2000 ms a 20 ms. El modelo corre donde ya viven los datos, protegido con JWT y versionado con migraciones. Random Forest optimizado con 96% de recall y Explainable AI (XAI).",
      metrics: [
        { value: "96%", label: "Recall", highlight: true },
        { value: "20 ms", label: "Inferencia P99", highlight: true },
        { value: "99%", label: "Latencia reducida" },
        { value: "0", label: "Llamadas ML externas" },
      ],
      links: [
        { label: "Ver en GitHub", href: "https://github.com/OwerLopez", external: true },
        { label: "Leer el caso", href: "#architecture" },
      ],
    },
    logLabel: "Registro de misiones — 03.02",
    log: [
      {
        index: "03.02",
        tone: "gold",
        title: "NEXIA 2026",
        description:
          "Ganador del hackathon \u201cBuild with AI\u201d. MVP de innovacion educativa entregado extremo a extremo en menos de 48 horas con Node.js, NestJS e integracion de APIs de IA.",
        tags: ["Node.js", "NestJS", "APIs de IA"],
      },
      {
        index: "03.03",
        tone: "emerald",
        title: "Chakrita",
        description:
          "Aplicacion movil de agricultura sostenible con IoT, ganadora de la Feria de Proyectos 2024 de Ingenieria de Sistemas UNSA. Liderazgo del diseno UX/UI y desarrollo en Flutter.",
        tags: ["Flutter", "IoT", "UX/UI"],
      },
      {
        index: "03.04",
        tone: "violet",
        title: "VisionTransit AI",
        description:
          "Pipeline de vision computacional en tiempo real para monitoreo de transporte publico: 6 capas desacopladas con FastAPI, YOLO11 y WebSocket, sosteniendo 28.7 FPS sobre CPU.",
        tags: ["Python", "FastAPI", "YOLO11"],
      },
      {
        index: "03.05",
        tone: "gold",
        title: "GestorTareasPro",
        description:
          "App nativa Android con Clean Architecture y calendario inmutable: 100% offline-first, persistencia garantizada y sistema de motivacion por rachas.",
        tags: ["Kotlin", "Jetpack Compose", "Offline-first"],
      },
    ],
    matrixTitle: "Matriz de comparacion tecnica",
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
      {
        project: "VisionTransit AI",
        domain: "Vision computacional / Data",
        stack: "Python · FastAPI · YOLO11",
        result: "28.7 FPS en tiempo real · 6 capas",
        role: "Data Engineering + ML",
        year: "2025",
      },
      {
        project: "GestorTareasPro",
        domain: "Movil Android",
        stack: "Kotlin · Jetpack Compose",
        result: "100% offline-first · Clean Arch",
        role: "Android Developer",
        year: "2025",
      },
    ],
  },

  architecture: {
    kicker: "ARQUITECTURA DE SISTEMAS & ML",
    headingLead: "Del dato crudo",
    headingAccent: "al valor de negocio.",
    description:
      "Cinco etapas, una responsabilidad cada una. Asi pienso cualquier sistema de datos antes de escribir codigo.",
    stages: [
      {
        index: "E1",
        label: "Fuentes",
        detail: "Operacionales y externas",
        tech: "PostgreSQL · MySQL · SQL Server · MongoDB · APIs",
        power: "INGESTA 100%",
      },
      {
        index: "E2",
        label: "Ingesta / ETL",
        detail: "Extraccion y limpieza",
        tech: "Python · Pandas · SQL · BULK INSERT",
        power: "PURIFICANDO",
      },
      {
        index: "E3",
        label: "Almacen",
        detail: "Modelado y calidad",
        tech: "Modelado logico/fisico · CTEs · Window Fns",
        power: "PARIDAD DE DATOS",
      },
      {
        index: "E4",
        label: "Proceso / ML",
        detail: "Analitica e inferencia",
        tech: "NumPy · Random Forest · ONNX · XAI",
        power: "INFERENCIA ACTIVA",
      },
      {
        index: "E5",
        label: "Servicio",
        detail: "APIs y visualizacion",
        tech: "Spring Boot · JWT · Power BI",
        power: "PRODUCCION EN VIVO",
      },
    ],
    note: "Inferencia embebida: el modelo corre donde viven los datos — sin llamadas externas, con latencia P99 de 20 ms.",
  },

  stack: {
    kicker: "STACK TECNOLOGICO & DOMINIOS",
    heading: "Cada tecnologia orbita un dominio",
    description:
      "No colecciono herramientas: domino las que llevan un sistema desde el modelo de datos hasta produccion.",
    groups: [
      { name: "Backend", glow: "flame", items: ["Java 17", "Spring Boot 3.4", "NestJS", "Node.js", "REST APIs · Swagger"] },
      { name: "Datos", glow: "magenta", items: ["PostgreSQL", "MySQL · SQL Server", "MongoDB", "Pandas · NumPy", "Power BI"] },
      { name: "IA / Machine Learning", glow: "violet", items: ["ONNX Runtime", "Random Forest", "XAI (explicabilidad)", "Inferencia embebida"] },
      { name: "Cloud & DevOps", glow: "flame", items: ["Oracle Cloud (OCI)", "AWS EC2 · S3", "Google Cloud", "Docker", "Oracle APEX"] },
      { name: "Ingenieria", glow: "amber", items: ["Git", "Scrum · Kanban", "Seguridad de APIs", "Arquitectura de sistemas"] },
    ],
    note: "Dominios en los que decido arquitectura: backend, datos, IA/ML, cloud y practicas de ingenieria.",
  },

  journey: {
    kicker: "TRAYECTORIA PROFESIONAL",
    heading: "Tres anos subiendo en fuego",
    description:
      "De soporte de datos a ingenieria backend en produccion. Cada etapa combina software real con resultados medibles.",
    items: [
      {
        period: "Feb 2026 → hoy",
        title: "Backend Developer (practicas) — Fundacion CALMA",
        description:
          "Desarrollo y mantenimiento de servicios backend con APIs REST, logica de negocio, autenticacion JWT y control de acceso. Gestion y optimizacion de bases de datos PostgreSQL, MySQL, SQL Server y MongoDB, con documentacion tecnica y metodologia Scrum.",
        tone: "flame",
      },
      {
        period: "2026",
        title: "Primer puesto — Hackathon NEXIA \u201cBuild with AI\u201d",
        description:
          "Primer lugar. MVP de innovacion educativa construido en menos de 48 horas con Node.js, NestJS e integracion de APIs de IA. Ingenieria backend e integracion de IA bajo presion. Organizado por IBM, GDG Arequipa y JAKU Emprende UNSA.",
        tone: "flame",
      },
      {
        period: "Nov 2025",
        title: "Operador Informatico — Universidad ESAN · Beca 18",
        description:
          "Soporte informatico en registro, verificacion y gestion de datos para mas de 2000 postulantes de la region. Operacion de sistemas y control de datos bajo criterios de precision y confidencialidad.",
        tone: "glow",
      },
      {
        period: "2024",
        title: "Primer puesto — Feria de Proyectos UNSA (avanzado)",
        description:
          "Primer lugar con Chakrita, aplicacion movil de agricultura sostenible en Flutter con integracion IoT y sensores. Rol de diseno UX/UI e interfaces centradas en el usuario.",
        tone: "glow",
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
        title: "Programador (practicas) — I.E.P. Linus Pauling",
        description:
          "Desarrollo y mantenimiento de sistemas de registro de asistencias y pagos con reportes dinamicos. Automatizacion de procesos administrativos, debugging e integracion de modulos, capacitando a usuarios.",
        tone: "glow",
      },
      {
        period: "Comunidad",
        title: "Secretario ACM · Voluntario IEEE Computer Society",
        description:
          "Secretario de la directiva del ACM Student Chapter UNSA (2024–2025), coordinando talleres de IA, ciberseguridad y programacion competitiva. Voluntario en marketing y diseno de IEEE Computer Society. Quinto Superior: 20% mejor de la promocion.",
        tone: "muted",
      },
    ],
  },

  github: {
    kicker: "ACTIVIDAD EN GITHUB",
    heading: "Actividad que no se puede fingir",
    description:
      "Cargado directamente desde la API de GitHub. Lo que ves aqui es exactamente lo que hay en mi cuenta ahora mismo.",
    metrics: [
      { label: "Repositorios publicos" },
      { label: "Seguidores" },
      { label: "Ultimo push" },
    ],
    viewAll: "Ver repositorios en GitHub",
    updatedLabel: "Actualizado en vivo",
    errorText: "No se pudo conectar a la API de GitHub en este momento.",
    loadingText: "Consultando actividad de GitHub en vivo…",
    logTitle: "Registro de actividad",
    logEmpty: "Esperando datos de la API…",
  },

  credentials: {
    kicker: "PREMIOS & CREDENCIALES",
    heading: "Ganado en batalla",
    description:
      "Primeros puestos, formacion intensiva y liderazgo en la comunidad — todo verificable, nada declarado.",
    trophies: [
      { index: "01", title: "1er puesto — NEXIA 2026", detail: "Hackathon Build with AI", value: "1", suffix: "", glow: "flame" },
      { index: "02", title: "1er puesto — Feria UNSA 2024", detail: "Feria de Proyectos, categoria Avanzado", value: "1", suffix: "", glow: "emerald" },
      { index: "03", title: "Quinto Superior", detail: "20% mejor de la promocion", value: "20", suffix: "%", glow: "magenta" },
      { index: "04", title: "Oracle Next Education", detail: "Formacion en Data Science", value: "440", suffix: "h", glow: "flame" },
      { index: "05", title: "Secretario — ACM Chapter", detail: "Liderazgo estudiantil UNSA", value: "1", suffix: "", glow: "violet" },
      { index: "06", title: "IEEE Computer Society", detail: "Voluntario, marketing y diseno", value: "1", suffix: "", glow: "amber" },
    ],
    credentialsLabel: "Certificaciones verificadas",
    credentials: [
      { name: "Oracle Cloud Infrastructure 2025 Foundations", issuer: "Oracle", acronym: "OCI", href: "https://www.credly.com/search?q=Oracle%20Cloud%20Infrastructure%202025%20Foundations", glow: "flame" },
      { name: "Oracle APEX Cloud Developer Professional", issuer: "Oracle", acronym: "APEX", href: "https://www.credly.com/search?q=Oracle%20APEX%20Cloud%20Developer%20Professional", glow: "flame" },
      { name: "Google Cloud Computing Foundations", issuer: "Google Cloud", acronym: "GCP", href: "https://www.credly.com/search?q=Google%20Cloud%20Computing%20Foundations", glow: "magenta" },
      { name: "AWS Academy Graduate — Cloud Foundations", issuer: "AWS", acronym: "AWS", href: "https://www.credly.com/search?q=AWS%20Academy%20Graduate%20—%20Cloud%20Foundations", glow: "magenta" },
      { name: "Especializacion Microsoft SQL Server (avanzado)", issuer: "Datux Peru", acronym: "SQL", href: "https://www.credly.com/search?q=Especializacion%20Microsoft%20SQL%20Server%20(avanzado)", glow: "violet" },
      { name: "Especializacion Microsoft Power BI (avanzado)", issuer: "Datux Peru", acronym: "PBI", href: "https://www.credly.com/search?q=Especializacion%20Microsoft%20Power%20BI%20(avanzado)", glow: "violet" },
      { name: "ONE Tech — Data Science (440h)", issuer: "Alura Latam", acronym: "ONE", href: "https://www.credly.com/search?q=ONE%20Tech%20—%20Data%20Science%20(440h)", glow: "flame" },
      { name: "Programacion y Desarrollo con Python (80h)", issuer: "Univ. Continental", acronym: "PY", href: "https://www.credly.com/search?q=Programacion%20y%20Desarrollo%20con%20Python%20(80h)", glow: "amber" },
      { name: "SAP S/4HANA MM — Key User", issuer: "SUMMA Center", acronym: "SAP", href: "https://www.credly.com/search?q=SAP%20S/4HANA%20MM%20—%20Key%20User", glow: "violet" },
      { name: "Business Intelligence Foundation (BIFPC)", issuer: "CertiProf", acronym: "BI", href: "https://www.credly.com/search?q=Business%20Intelligence%20Foundation%20(BIFPC)", glow: "flame" },
      { name: "Scrum Foundation (SFPC)", issuer: "CertiProf", acronym: "SCR", href: "https://www.credly.com/search?q=Scrum%20Foundation%20(SFPC)", glow: "magenta" },
      { name: "Lean Six Sigma White Belt (LSSWBPC)", issuer: "CertiProf", acronym: "LSS", href: "https://www.credly.com/search?q=Lean%20Six%20Sigma%20White%20Belt%20(LSSWBPC)", glow: "amber" },
      { name: "Machine Learning · Clasificacion y Regresion", issuer: "Alura Latam", acronym: "ML", href: "https://www.credly.com/search?q=Machine%20Learning%20·%20Clasificacion%20y%20Regresion", glow: "violet" },
      { name: "Estadistica · Probabilidad y Muestreo", issuer: "Alura Latam", acronym: "STAT", href: "https://www.credly.com/search?q=Estadistica%20·%20Probabilidad%20y%20Muestreo", glow: "amber" },
      { name: "Ofimatica Profesional Nivel Avanzado (90h)", issuer: "ITEC", acronym: "OFI", href: "https://www.credly.com/search?q=Ofimatica%20Profesional%20Nivel%20Avanzado%20(90h)", glow: "magenta" },
      { name: "Hacking Etico Gamificado", issuer: "HackerMentor", acronym: "SEC", href: "https://www.credly.com/search?q=Hacking%20Etico%20Gamificado", glow: "violet" },
    ],
    verifyCta: "Verificar en Credly",
  },

  philosophy: {
    kicker: "PRINCIPIOS DE INGENIERIA",
    headingLead: "Un demo se muestra.",
    headingAccent: "Un sistema se confia.",
    description:
      "Desarrollador Backend en practicas preprofesionales y estudiante de ultimo ciclo de Ingenieria de Sistemas UNSA. Mas de tres anos construyendo software real: desde soporte de datos con mas de 2000 postulantes hasta servicios backend en produccion. Mi metodo combina arquitectura rigurosa, datos limpios y resultados medibles en cada entrega.",
    principles: [
      {
        index: "01",
        title: "Latencia subsegundo",
        detail: "Inferencia ML embebida optimizada a P99 de 20 ms. Cuando el sistema no espera, el usuario tampoco.",
      },
      {
        index: "02",
        title: "Paridad de datos",
        detail: "Esquemas declarativos y contratos estrictos entre capas. Los datos entran limpios y salen correctos.",
      },
      {
        index: "03",
        title: "Listo para produccion",
        detail: "ETL sin caidas, APIs con JWT y documentacion OpenAPI. El standard es lo que un equipo pueda confiar a diario.",
      },
    ],
    panelTitle: "Perfil operativo",
    facts: [
      { key: "Rol actual", value: "Backend Developer (practicas)" },
      { key: "Organizacion", value: "Fundacion CALMA" },
      { key: "Core tech", value: "Java · Python · SQL · ONNX" },
      { key: "Formacion", value: "Ingenieria de Sistemas · UNSA" },
      { key: "Ubicacion", value: "Arequipa, Peru (UTC-5)" },
    ],
    panelFooter: { left: "UNSA · Ingenieria de Sistemas", right: "Quinto Superior" },
  },

  faq: {
    kicker: "DECISIONES TECNICAS",
    heading: "Decisiones de arquitectura & colaboracion",
    description:
      "Claridad total sobre como abordo la construccion de software, la optimizacion de latencia y la integracion en equipos de alto rendimiento.",
    items: [
      {
        index: "F1",
        category: "Arquitectura",
        question: "¿Por que integrar inferencia ML en el backend en lugar de microservicios dedicados?",
        answer:
          "En proyectos como ChurnInsight, exportar el modelo a ONNX Runtime y ejecutarlo en el mismo proceso de Java/Spring Boot elimino el overhead de red y serializacion JSON, reduciendo la latencia P99 de 2000 ms a 20 ms manteniendo cero dependencia de infraestructura externa.",
        questions: [
          {
            category: "Latencia",
            question: "¿Que impacto tiene la inferencia embebida en la experiencia de usuario?",
            answer:
              "La latencia P99 cae de 2000 ms a 20 ms: las predicciones se sirven donde viven los datos, sin llamadas externas ni sobrecosto de red.",
          },
          {
            category: "Costo",
            question: "¿Reduce costos frente a APIs de ML externas?",
            answer:
              "Elimina llamadas de terceros en el path critico: cero costo por inferencia y cero dependencia de disponibilidad externa.",
          },
        ],
      },
      {
        index: "F2",
        category: "Disponibilidad",
        question: "¿Cual es tu disponibilidad actual para roles e incorporacion?",
        answer:
          "Actualmente me encuentro cursando los ultimos periodos de Ingenieria de Sistemas en la UNSA y trabajando como practicante Backend en Fundacion CALMA. Estoy disponible para roles de Junior Data Engineer o Backend Developer en modalidades remotas o hibridas.",
        questions: [
          {
            category: "Modalidad",
            question: "¿Trabajas remoto o presencial?",
            answer:
              "Remoto e hibrido con disponibilidad completa en horario America/Lima (UTC-5).",
          },
        ],
      },
      {
        index: "F3",
        category: "Metodologia",
        question: "¿Como garantizas la calidad del codigo y la paridad de datos?",
        answer:
          "Utilizo chequeos estrictos de tipos en TypeScript/Java, migraciones de base de datos declarativas (Flyway/Liquibase/SQL), documentacion OpenAPI/Swagger, y pruebas E2E automatizadas antes de cada despliegue.",
      },
      {
        index: "F4",
        category: "Datos & Cloud",
        question: "¿Que experiencia tienes con plataformas cloud como Oracle u AWS?",
        answer:
          "Cuento con certificaciones oficiales de Oracle Cloud Infrastructure (OCI Foundations & APEX Professional), AWS Academy Cloud Foundations y Google Cloud Foundations. He desplegado entornos contenerizados con Docker sobre instancias OCI y EC2.",
      },
    ],
  },

  contact: {
    kicker: "COMUNICACION DIRECTA",
    headingLead: "Encendamos algo",
    headingAccent: "que deje huella.",
    description:
      "Disponible para roles Junior Data Engineer y Backend Engineering. Si buscas a alguien que cuida los detalles hasta el milisegundo, escribeme.",
    terminalTitle: "terminal@ower.dev",
    greeting: "$ iniciar — conversacion",
    context:
      "> Si tienes un producto que procesa datos, una API que necesita crecer o un modelo de ML que deberia vivir en produccion — hablemos.",
    request:
      "> Un correo basta. Respondo con contexto tecnico, no con plantillas.",
    emailLabel: "Email directo",
    copyLabel: "Copiar",
    copiedFeedback: "Copiado",
    responseTime: "respuesta < 24 h en dias habiles",
    cards: [
      { label: "GitHub", value: "github.com/OwerLopez", href: "https://github.com/OwerLopez" },
      { label: "LinkedIn", value: "linkedin.com/in/owerlopez", href: "https://www.linkedin.com/in/owerlopez/" },
      { label: "Credly", value: "Credenciales verificadas", href: "https://www.credly.com/users/ower-frank-lopez-arela" },
    ],
    channels: [
      { kind: "link", label: "GitHub", handle: "@OwerLopez", href: "https://github.com/OwerLopez", external: true },
      { kind: "link", label: "LinkedIn", handle: "Ower Frank Lopez Arela", href: "https://www.linkedin.com/in/owerlopez/", external: true },
      { kind: "link", label: "Credly", handle: "credly.com", href: "https://www.credly.com/users/ower-frank-lopez-arela", external: true },
      { kind: "location", label: "Ubicacion", handle: "Arequipa, Peru · UTC-5", href: "https://maps.google.com/?q=Arequipa+Peru", external: true },
    ],
  },

  footer: {
    copyright: "© 2026 Ower Frank Lopez Arela",
    rights: "Ower Frank Lopez Arela. Todos los derechos reservados.",
    tagline: "Backend · Data · IA · Cloud — Arequipa, Peru (16.40°S 71.53°W)",
    credit: "Diseño y desarrollo — Ower F. Lopez Arela",
    location: "Arequipa, Peru",
    timezone: "UTC-5",
    systemStatus: {
      availabilityLabel: "disponibilidad",
      availabilityValue: "Q3/Q4 2026 · en busca de mision",
      zoneLabel: "zona",
      modeLabel: "modo",
      modeValue: "activo · recibiendo señales",
    },
    navLabel: "Navegación principal",
    navTitle: "Secciones",
    navItems: {
      work: "Proyectos",
      expertise: "Expertise",
      experience: "Experiencia",
      about: "Sobre mi",
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

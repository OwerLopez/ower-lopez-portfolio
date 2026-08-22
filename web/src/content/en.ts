import type { PortfolioContent } from "@/types/content";

/**
 * English content (secondary locale). Version 6 — Fire Aurora.
 * Mirrors the es.ts structure field-for-field; typecheck enforces parity.
 */
export const en: PortfolioContent = {
  meta: {
    title: "Ower Frank Lopez Arela — Backend, Data & AI Engineering",
    description:
      "Systems Engineer focused on backend, data engineering and applied AI. Building REST APIs, data pipelines and embedded ML models with Java, Spring Boot, Node.js and Python.",
    ogAlt:
      "Portfolio of Ower Frank Lopez Arela — Backend, Data & AI Engineering",
    keywords: [
      "Backend Developer",
      "Data Engineer",
      "Data Engineering",
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
    work: "Projects",
    expertise: "Expertise",
    experience: "Experience",
    about: "About",
    contact: "Contact",
    cta: "Let's talk",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    statusText: "Available Q3/Q4 2026",
    soundOn: "Sound FX Enabled",
    soundOff: "Sound FX Muted",
  },

  intro: {
    status: "Available for Junior Data Engineer & Backend roles",
    kicker: "BACKEND ENGINEERING & DATA PIPELINES · AREQUIPA, PERU",
    titleLines: ["Every millisecond", "is a decision"],
    titleAccent: "I take seriously.",
    description:
      "Systems Engineering student at UNSA (9th semester) doing pre-professional internships as a Backend Developer. Backend, data pipelines and embedded ML in production, with 25+ projects documented on GitHub. Where speed is not promised — it is measured.",
    primaryCta: "See the proof",
    primaryTarget: "#work",
    secondaryCta: "Copy email",
    copiedFeedback: "Email copied to clipboard.",
    scrollCue: "Scroll down. The best is coming.",
    frameLabel: "REC · LIVE",
  },

  marquee: [
    { name: "Java 17", category: "Backend" },
    { name: "Spring Boot 3.4", category: "Backend" },
    { name: "NestJS", category: "Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python 3.12", category: "Data" },
    { name: "ONNX Runtime", category: "AI" },
    { name: "PostgreSQL", category: "Data" },
    { name: "MongoDB", category: "Data" },
    { name: "SQL Server", category: "Data" },
    { name: "JWT", category: "Security" },
    { name: "Docker", category: "DevOps" },
    { name: "Oracle Cloud", category: "Cloud" },
    { name: "AWS", category: "Cloud" },
    { name: "Google Cloud", category: "Cloud" },
  ],

  mission: {
    kicker: "ENGINEERING PHILOSOPHY",
    headingLead: "I don't write code.",
    headingAccent: "I ignite engines.",
    paragraphs: [
      "A demo gets shown for thirty seconds. A system in production earns trust for years. The difference is not in lines of code: it is in the obsession with every millisecond, every API contract and every piece of data that arrives clean and leaves correct.",
      "From supporting 2,000+ applicants with data operations to backend services running in production, my method is the same: rigorous architecture, clean data and results you can measure with a stopwatch.",
    ],
    facts: [
      { key: "Obsession", value: "P99 latency of 20 ms" },
      { key: "Method", value: "Architecture + data + ML" },
      { key: "Standard", value: "Production, not demos" },
      { key: "Zone", value: "Arequipa, Peru · UTC-5" },
    ],
  },

  work: {
    kicker: "CASE STUDIES & PRODUCTION",
    heading: "Projects that shout numbers",
    description:
      "No decorative screenshots: verifiable results you can audit on GitHub.",
    featuredLabel: "Featured Project",
    featured: {
      flag: "Flagship",
      category: "Enterprise ML platform",
      title: "ChurnInsight",
      summary:
        "Customer churn prediction with ML inference embedded inside the backend — no external calls, no network overhead, no third-party dependency.",
      tags: ["Java 17", "Spring Boot 3.4", "ONNX Runtime", "Random Forest", "MySQL"],
      note: "Moving inference into the same process cut latency from 2000 ms to 20 ms. The model runs where the data already lives, protected by JWT and versioned with migrations. Random Forest optimized to 96% recall with Explainable AI (XAI).",
      metrics: [
        { value: "96%", label: "Recall", highlight: true },
        { value: "20 ms", label: "Inference P99", highlight: true },
        { value: "99%", label: "Latency reduced" },
        { value: "0", label: "External ML calls" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/OwerLopez", external: true },
        { label: "Read the case", href: "#architecture" },
      ],
    },
    logLabel: "Mission log — 03.02",
    log: [
      {
        index: "03.02",
        tone: "gold",
        title: "NEXIA 2026",
        description:
          "Winner of the \u201cBuild with AI\u201d hackathon. End-to-end MVP for educational innovation delivered in under 48 hours with Node.js, NestJS and AI API integration.",
        tags: ["Node.js", "NestJS", "AI APIs"],
      },
      {
        index: "03.03",
        tone: "emerald",
        title: "Chakrita",
        description:
          "Sustainable agriculture mobile app with IoT, first place at the 2024 UNSA Systems Engineering Project Fair. Led UX/UI design and Flutter development.",
        tags: ["Flutter", "IoT", "UX/UI"],
      },
      {
        index: "03.04",
        tone: "violet",
        title: "VisionTransit AI",
        description:
          "Real-time computer vision pipeline for public transit monitoring: 6 decoupled layers with FastAPI, YOLO11 and WebSocket, sustaining 28.7 FPS on CPU.",
        tags: ["Python", "FastAPI", "YOLO11"],
      },
      {
        index: "03.05",
        tone: "gold",
        title: "GestorTareasPro",
        description:
          "Native Android app with Clean Architecture and an immutable progress calendar: 100% offline-first, guaranteed persistence and a streak-based motivation system.",
        tags: ["Kotlin", "Jetpack Compose", "Offline-first"],
      },
    ],
    matrixTitle: "Technical comparison matrix",
    matrixHeaders: {
      project: "Project",
      domain: "Domain",
      stack: "Core stack",
      result: "Key result",
      role: "Role",
      year: "Year",
    },
    matrix: [
      {
        project: "ChurnInsight",
        domain: "ML platform / Data",
        stack: "Java 17 · Spring Boot · ONNX",
        result: "Latency 2000ms → 20ms · 96% recall",
        role: "Backend + Data Science",
        year: "2025",
      },
      {
        project: "NEXIA 2026",
        domain: "AI for education",
        stack: "Node.js · NestJS · AI APIs",
        result: "MVP in < 48h · 1st place",
        role: "Backend + AI Integration",
        year: "2026",
      },
      {
        project: "Chakrita",
        domain: "IoT / Agtech mobile",
        stack: "Flutter · IoT · Sensors",
        result: "1st place UNSA Fair",
        role: "UX/UI + Flutter",
        year: "2024",
      },
      {
        project: "VisionTransit AI",
        domain: "Computer vision / Data",
        stack: "Python · FastAPI · YOLO11",
        result: "28.7 FPS real-time · 6 layers",
        role: "Data Engineering + ML",
        year: "2025",
      },
      {
        project: "GestorTareasPro",
        domain: "Mobile Android",
        stack: "Kotlin · Jetpack Compose",
        result: "100% offline-first · Clean Arch",
        role: "Android Developer",
        year: "2025",
      },
    ],
  },

  architecture: {
    kicker: "SYSTEMS & ML ARCHITECTURE",
    headingLead: "From raw data",
    headingAccent: "to business value.",
    description:
      "Five stages, one responsibility each. This is how I approach any data system before writing code.",
    stages: [
      {
        index: "E1",
        label: "Sources",
        detail: "Operational and external",
        tech: "PostgreSQL · MySQL · SQL Server · MongoDB · APIs",
        power: "INGESTION 100%",
      },
      {
        index: "E2",
        label: "Ingestion / ETL",
        detail: "Extraction and cleaning",
        tech: "Python · Pandas · SQL · BULK INSERT",
        power: "PURIFYING",
      },
      {
        index: "E3",
        label: "Warehouse",
        detail: "Modeling and quality",
        tech: "Logical/Physical modeling · CTEs · Window Fns",
        power: "DATA PARITY",
      },
      {
        index: "E4",
        label: "Process / ML",
        detail: "Analytics and inference",
        tech: "NumPy · Random Forest · ONNX · XAI",
        power: "ACTIVE INFERENCE",
      },
      {
        index: "E5",
        label: "Service",
        detail: "APIs and visualization",
        tech: "Spring Boot · JWT · Power BI",
        power: "LIVE PRODUCTION",
      },
    ],
    note: "Embedded inference: the model runs where data lives — without external calls, at 20 ms P99 latency.",
  },

  stack: {
    kicker: "TECH STACK & DOMAINS",
    heading: "Every technology orbits a domain",
    description:
      "I don't collect tools: I master those that take a system from data model to production.",
    groups: [
      { name: "Backend", glow: "flame", items: ["Java 17", "Spring Boot 3.4", "NestJS", "Node.js", "REST APIs · Swagger"] },
      { name: "Data", glow: "magenta", items: ["PostgreSQL", "MySQL · SQL Server", "MongoDB", "Pandas · NumPy", "Power BI"] },
      { name: "AI / Machine Learning", glow: "violet", items: ["ONNX Runtime", "Random Forest", "XAI (explainability)", "Embedded inference"] },
      { name: "Cloud & DevOps", glow: "flame", items: ["Oracle Cloud (OCI)", "AWS EC2 · S3", "Google Cloud", "Docker", "Oracle APEX"] },
      { name: "Engineering", glow: "amber", items: ["Git", "Scrum · Kanban", "API Security", "Systems architecture"] },
    ],
    note: "Domains where I make architecture decisions: backend, data, AI/ML, cloud, and engineering practices.",
  },

  journey: {
    kicker: "PROFESSIONAL TRAJECTORY",
    heading: "Three years rising in fire",
    description:
      "From data support to backend engineering in production. Every milestone combines real software with measurable results.",
    items: [
      {
        period: "Feb 2026 → Present",
        title: "Backend Developer (Intern) — Fundacion CALMA",
        description:
          "Development and maintenance of backend services with REST APIs, business logic, JWT authentication, and access control. Management and optimization of PostgreSQL, MySQL, SQL Server, and MongoDB databases, with technical documentation under Scrum methodology.",
        tone: "flame",
      },
      {
        period: "2026",
        title: "1st Place — Hackathon NEXIA \u201cBuild with AI\u201d",
        description:
          "First place winner. Built an end-to-end educational innovation MVP in under 48 hours with Node.js, NestJS, and AI API integration. Backend engineering and AI integration delivered under pressure. Organized by IBM, GDG Arequipa, and JAKU Emprende UNSA.",
        tone: "flame",
      },
      {
        period: "Nov 2025",
        title: "IT Operator — Universidad ESAN · Beca 18",
        description:
          "IT support in registration, verification, and data management for 2,000+ applicants across the region. System operation and data control under strict precision and confidentiality criteria.",
        tone: "glow",
      },
      {
        period: "2024",
        title: "1st Place — UNSA Projects Fair (Advanced)",
        description:
          "First place with Chakrita, a sustainable agriculture mobile application built with Flutter, IoT, and sensors. UX/UI design lead and user-centered interface architecture.",
        tone: "glow",
      },
      {
        period: "2024 — 2025",
        title: "IT Operator — CTK · PRONABEC (Beca 18)",
        description:
          "Operational and technical support for 2,000+ applicants during the National Preselection Exam, operating mission-critical systems and evaluation platforms with high data-integrity standards.",
        tone: "muted",
      },
      {
        period: "2023 — 2024",
        title: "Academic Monitor — CEPRUNSA (3 cycles)",
        description:
          "Coordination of monitor and instructor teams, attendance tracking, and verification across educational platforms. Syllabus progression tracking across three consecutive admission cycles.",
        tone: "muted",
      },
      {
        period: "2023",
        title: "Programmer (Intern) — I.E.P. Linus Pauling",
        description:
          "Development and maintenance of attendance and payment tracking systems with dynamic reporting. Administrative process automation, module debugging, and user training.",
        tone: "glow",
      },
      {
        period: "Community",
        title: "ACM Chapter Secretary · IEEE Computer Society Volunteer",
        description:
          "Secretary on the board of the ACM Student Chapter UNSA (2024–2025), coordinating AI, cybersecurity, and competitive programming workshops. Volunteer in marketing and design for IEEE Computer Society. Top 20% of graduating class (Quinto Superior).",
        tone: "muted",
      },
    ],
  },

  github: {
    kicker: "GITHUB ACTIVITY",
    heading: "Activity you can't fake",
    description:
      "Loaded live from the GitHub API. What you see here is precisely what is in my account right now.",
    metrics: [
      { label: "Public repos" },
      { label: "Followers" },
      { label: "Latest push" },
    ],
    viewAll: "View repositories on GitHub",
    updatedLabel: "Live update",
    errorText: "Could not reach the GitHub API at this moment.",
    loadingText: "Querying live GitHub activity…",
    logTitle: "Activity log",
    logEmpty: "Awaiting API response…",
  },

  credentials: {
    kicker: "AWARDS & CREDENTIALS",
    heading: "Earned in battle",
    description:
      "First places, intensive training, and community leadership — everything verifiable, nothing merely claimed.",
    trophies: [
      { index: "01", title: "1st Place — NEXIA 2026", detail: "Hackathon Build with AI", value: "1", suffix: "", glow: "flame" },
      { index: "02", title: "1st Place — UNSA Fair 2024", detail: "Projects Fair, Advanced Category", value: "1", suffix: "", glow: "emerald" },
      { index: "03", title: "Top 20% Class Rank", detail: "Quinto Superior in Systems Engineering", value: "20", suffix: "%", glow: "magenta" },
      { index: "04", title: "Oracle Next Education", detail: "Data Science Specialization", value: "440", suffix: "h", glow: "flame" },
      { index: "05", title: "ACM Chapter Secretary", detail: "UNSA Student Leadership", value: "1", suffix: "", glow: "violet" },
      { index: "06", title: "IEEE Computer Society", detail: "Volunteer, Marketing & Design", value: "1", suffix: "", glow: "amber" },
    ],
    credentialsLabel: "Verified Credentials",
    credentials: [
      { name: "Oracle Cloud Infrastructure 2025 Foundations", issuer: "Oracle", acronym: "OCI", href: "https://www.credly.com/search?q=Oracle%20Cloud%20Infrastructure%202025%20Foundations", glow: "flame" },
      { name: "Oracle APEX Cloud Developer Professional", issuer: "Oracle", acronym: "APEX", href: "https://www.credly.com/search?q=Oracle%20APEX%20Cloud%20Developer%20Professional", glow: "flame" },
      { name: "Google Cloud Computing Foundations", issuer: "Google Cloud", acronym: "GCP", href: "https://www.credly.com/search?q=Google%20Cloud%20Computing%20Foundations", glow: "magenta" },
      { name: "AWS Academy Graduate — Cloud Foundations", issuer: "AWS", acronym: "AWS", href: "https://www.credly.com/search?q=AWS%20Academy%20Graduate%20—%20Cloud%20Foundations", glow: "magenta" },
      { name: "Microsoft SQL Server Advanced Specialization", issuer: "Datux Peru", acronym: "SQL", href: "https://www.credly.com/search?q=Especializacion%20Microsoft%20SQL%20Server%20(avanzado)", glow: "violet" },
      { name: "Microsoft Power BI Advanced Specialization", issuer: "Datux Peru", acronym: "PBI", href: "https://www.credly.com/search?q=Especializacion%20Microsoft%20Power%20BI%20(avanzado)", glow: "violet" },
      { name: "ONE Tech — Data Science (440h)", issuer: "Alura Latam", acronym: "ONE", href: "https://www.credly.com/search?q=ONE%20Tech%20—%20Data%20Science%20(440h)", glow: "flame" },
      { name: "Python Programming and Development (80h)", issuer: "Univ. Continental", acronym: "PY", href: "https://www.credly.com/search?q=Programacion%20y%20Desarrollo%20con%20Python%20(80h)", glow: "amber" },
      { name: "SAP S/4HANA MM — Key User", issuer: "SUMMA Center", acronym: "SAP", href: "https://www.credly.com/search?q=SAP%20S/4HANA%20MM%20—%20Key%20User", glow: "violet" },
      { name: "Business Intelligence Foundation (BIFPC)", issuer: "CertiProf", acronym: "BI", href: "https://www.credly.com/search?q=Business%20Intelligence%20Foundation%20(BIFPC)", glow: "flame" },
      { name: "Scrum Foundation (SFPC)", issuer: "CertiProf", acronym: "SCR", href: "https://www.credly.com/search?q=Scrum%20Foundation%20(SFPC)", glow: "magenta" },
      { name: "Lean Six Sigma White Belt (LSSWBPC)", issuer: "CertiProf", acronym: "LSS", href: "https://www.credly.com/search?q=Lean%20Six%20Sigma%20White%20Belt%20(LSSWBPC)", glow: "amber" },
      { name: "Machine Learning · Classification & Regression", issuer: "Alura Latam", acronym: "ML", href: "https://www.credly.com/search?q=Machine%20Learning%20·%20Clasificacion%20y%20Regresion", glow: "violet" },
      { name: "Statistics · Probability and Sampling", issuer: "Alura Latam", acronym: "STAT", href: "https://www.credly.com/search?q=Estadistica%20·%20Probabilidad%20y%20Muestreo", glow: "amber" },
      { name: "Advanced Professional Office Automation (90h)", issuer: "ITEC", acronym: "OFI", href: "https://www.credly.com/search?q=Ofimatica%20Profesional%20Nivel%20Avanzado%20(90h)", glow: "magenta" },
      { name: "Gamified Ethical Hacking", issuer: "HackerMentor", acronym: "SEC", href: "https://www.credly.com/search?q=Hacking%20Etico%20Gamificado", glow: "violet" },
    ],
    verifyCta: "Verify on Credly",
  },

  philosophy: {
    kicker: "ENGINEERING PRINCIPLES",
    headingLead: "A demo gets shown.",
    headingAccent: "A system earns trust.",
    description:
      "Backend Developer intern and graduating Systems Engineering student at UNSA. Three-plus years building production-grade software: from operational data pipelines with 2,000+ applicants to live backend services. My approach pairs strict architectural contracts with clean data pipelines and measurable SLAs.",
    principles: [
      {
        index: "01",
        title: "Subsecond latency",
        detail: "Embedded ML inference optimized to 20 ms P99. When the backend doesn't wait, the user doesn't either.",
      },
      {
        index: "02",
        title: "Data parity",
        detail: "Declarative schemas and strict API contracts across layers. Data enters clean and exits correct.",
      },
      {
        index: "03",
        title: "Production ready",
        detail: "Zero-downtime ETL, JWT-authenticated endpoints, and OpenAPI specs. Production is what a team can rely on daily.",
      },
    ],
    panelTitle: "Operating profile",
    facts: [
      { key: "Current role", value: "Backend Developer (Intern)" },
      { key: "Organization", value: "Fundacion CALMA" },
      { key: "Core tech", value: "Java · Python · SQL · ONNX" },
      { key: "Education", value: "Systems Engineering · UNSA" },
      { key: "Location", value: "Arequipa, Peru (UTC-5)" },
    ],
    panelFooter: { left: "UNSA · Systems Engineering", right: "Top 20% Class Rank" },
  },

  faq: {
    kicker: "TECHNICAL DECISIONS",
    heading: "Architecture decisions & collaboration",
    description:
      "Full clarity on how I approach software design, latency optimization, and integration into high-velocity engineering teams.",
    items: [
      {
        index: "F1",
        category: "Architecture",
        question: "Why integrate ML inference inside the backend rather than using dedicated microservices?",
        answer:
          "In systems like ChurnInsight, exporting the model to ONNX Runtime and executing it directly within the Java/Spring Boot process eliminated network overhead and JSON serialization, dropping P99 latency from 2,000 ms to 20 ms while removing external infrastructure dependencies.",
        questions: [
          {
            category: "Latency",
            question: "What impact does embedded inference have on user experience?",
            answer:
              "P99 latency drops from 2,000 ms to 20 ms: predictions are served directly where the data lives, with zero external network hops.",
          },
          {
            category: "Cost",
            question: "Does it reduce costs compared to external ML APIs?",
            answer:
              "It removes third-party API calls from the critical path: zero cost per inference and zero dependency on external availability.",
          },
        ],
      },
      {
        index: "F2",
        category: "Availability",
        question: "What is your current availability for engineering roles and onboarding?",
        answer:
          "I am currently in the final stages of my Systems Engineering degree at UNSA and working as a Backend Developer Intern at Fundacion CALMA. I am available for Junior Data Engineer or Backend Developer roles under remote or hybrid arrangements.",
        questions: [
          {
            category: "Arrangement",
            question: "Do you work remotely or on-site?",
            answer:
              "Remote and hybrid, with full availability in the America/Lima timezone (UTC-5).",
          },
        ],
      },
      {
        index: "F3",
        category: "Methodology",
        question: "How do you guarantee code quality and data parity?",
        answer:
          "I use strict type validation in TypeScript and Java, declarative database schema migrations (Flyway/Liquibase/SQL), automated OpenAPI documentation, and end-to-end integration tests before any deployment.",
      },
      {
        index: "F4",
        category: "Data & Cloud",
        question: "What experience do you have with cloud platforms like Oracle and AWS?",
        answer:
          "I hold official certifications from Oracle Cloud Infrastructure (OCI Foundations & APEX Professional), AWS Academy Cloud Foundations, and Google Cloud Foundations. I have deployed containerized environments with Docker on both OCI and AWS EC2 instances.",
      },
    ],
  },

  contact: {
    kicker: "DIRECT COMMUNICATION",
    headingLead: "Let's build something",
    headingAccent: "that leaves a mark.",
    description:
      "Available for Junior Data Engineer and Backend Engineering roles. If you are looking for an engineer who measures down to the millisecond, get in touch.",
    terminalTitle: "terminal@ower.dev",
    greeting: "$ start — conversation",
    context:
      "> If you have a product that processes data, an API that needs to scale or an ML model that should live in production — let's talk.",
    request:
      "> One email is enough. I respond with technical context, not templates.",
    emailLabel: "Direct email",
    copyLabel: "Copy",
    copiedFeedback: "Copied",
    responseTime: "response < 24 h on business days",
    cards: [
      { label: "GitHub", value: "github.com/OwerLopez", href: "https://github.com/OwerLopez" },
      { label: "LinkedIn", value: "linkedin.com/in/owerlopez", href: "https://www.linkedin.com/in/owerlopez/" },
      { label: "Credly", value: "Verified credentials", href: "https://www.credly.com/users/ower-frank-lopez-arela" },
    ],
    channels: [
      { kind: "link", label: "GitHub", handle: "@OwerLopez", href: "https://github.com/OwerLopez", external: true },
      { kind: "link", label: "LinkedIn", handle: "Ower Frank Lopez Arela", href: "https://www.linkedin.com/in/owerlopez/", external: true },
      { kind: "link", label: "Credly", handle: "credly.com", href: "https://www.credly.com/users/ower-frank-lopez-arela", external: true },
      { kind: "location", label: "Location", handle: "Arequipa, Peru · UTC-5", href: "https://maps.google.com/?q=Arequipa+Peru", external: true },
    ],
  },

  footer: {
    copyright: "© 2026 Ower Frank Lopez Arela",
    rights: "Ower Frank Lopez Arela. All rights reserved.",
    tagline: "Backend · Data · AI · Cloud — Arequipa, Peru (16.40°S 71.53°W)",
    credit: "Design & development — Ower F. Lopez Arela",
    location: "Arequipa, Peru",
    timezone: "UTC-5",
    systemStatus: {
      availabilityLabel: "availability",
      availabilityValue: "Q3/Q4 2026 · seeking mission",
      zoneLabel: "zone",
      modeLabel: "mode",
      modeValue: "active · receiving signals",
    },
    navLabel: "Main navigation",
    navTitle: "Sections",
    navItems: {
      work: "Projects",
      expertise: "Expertise",
      experience: "Experience",
      about: "About",
      contact: "Contact",
    },
    contactTitle: "Channels",
    contactItems: [
      { href: "https://github.com/OwerLopez", label: "github.com/OwerLopez", external: true },
      { href: "https://www.linkedin.com/in/owerlopez/", label: "linkedin.com/in/owerlopez", external: true },
      { href: "https://www.credly.com/users/ower-frank-lopez-arela", label: "credly.com — Credentials", external: true },
    ],
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    credlyLabel: "Credly",
  },
};

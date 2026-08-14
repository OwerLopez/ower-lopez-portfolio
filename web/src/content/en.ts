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
    mission: "Mission",
    work: "Projects",
    architecture: "Architecture",
    stack: "Stack",
    journey: "Journey",
    github: "GitHub",
    credentials: "Trophies",
    philosophy: "Philosophy",
    faq: "Questions",
    contact: "Contact",
    cta: "Ignite Project",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    statusText: "Available Q3/Q4 2026",
  },

  intro: {
    status: "Available for Junior Data Engineer & Backend roles",
    kicker: "INTRO / SCENE 01 — AREQUIPA, PERU",
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
    kicker: "SCENE 02 — THE OBSESSION",
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
    kicker: "SCENE 03 — THE PROOF",
    heading: "Projects that shout numbers",
    description:
      "No decorative screenshots: verifiable results you can audit on GitHub.",
    featuredLabel: "Main piece — 03.01",
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
    kicker: "SCENE 04 — THE CIRCUIT",
    headingLead: "From raw data",
    headingAccent: "to business value.",
    description:
      "Five stages, one responsibility each. This is how I think through any data system before writing a single line of code.",
    stages: [
      {
        index: "E1",
        label: "Sources",
        detail: "Operational & external",
        tech: "PostgreSQL · MySQL · SQL Server · MongoDB · APIs",
        power: "INGEST 100%",
      },
      {
        index: "E2",
        label: "Ingestion / ETL",
        detail: "Extraction & cleaning",
        tech: "Python · Pandas · SQL · BULK INSERT",
        power: "PURIFYING",
      },
      {
        index: "E3",
        label: "Storage",
        detail: "Modeling & quality",
        tech: "Logical/physical modeling · CTEs · Window fns",
        power: "DATA PARITY",
      },
      {
        index: "E4",
        label: "Process / ML",
        detail: "Analytics & inference",
        tech: "NumPy · Random Forest · ONNX · XAI",
        power: "INFERENCE LIVE",
      },
      {
        index: "E5",
        label: "Service",
        detail: "APIs & visualization",
        tech: "Spring Boot · JWT · Power BI",
        power: "PRODUCTION AIRBORNE",
      },
    ],
    note: "Embedded inference: the model runs where the data lives — no external calls, 20 ms P99 latency.",
  },

  stack: {
    kicker: "SCENE 05 — THE CONSTELLATION",
    heading: "Every technology orbits a domain",
    description:
      "I don't collect tools: I master the ones that carry a system from data model to production.",
    groups: [
      { name: "Backend", glow: "flame", items: ["Java 17", "Spring Boot 3.4", "NestJS", "Node.js", "REST APIs · Swagger"] },
      { name: "Data", glow: "magenta", items: ["PostgreSQL", "MySQL · SQL Server", "MongoDB", "Pandas · NumPy", "Power BI"] },
      { name: "AI / Machine Learning", glow: "violet", items: ["ONNX Runtime", "Random Forest", "XAI (explainability)", "Embedded inference"] },
      { name: "Cloud & DevOps", glow: "flame", items: ["Oracle Cloud (OCI)", "AWS EC2 · S3", "Google Cloud", "Docker", "Oracle APEX"] },
      { name: "Engineering", glow: "amber", items: ["Git", "Scrum · Kanban", "API security", "System architecture"] },
    ],
    note: "Domains where I make architecture decisions: backend, data, AI/ML, cloud and engineering practices.",
  },

  journey: {
    kicker: "SCENE 06 — THE ASCENT",
    heading: "Three years rising in fire",
    description:
      "From data support to production backend engineering. Every stage combines real software with measurable results.",
    items: [
      {
        period: "Feb 2026 → today",
        title: "Backend Developer (intern) — Fundacion CALMA",
        description:
          "Development and maintenance of backend services with REST APIs, business logic, JWT authentication and access control. Managing and optimizing PostgreSQL, MySQL, SQL Server and MongoDB databases, with technical documentation and Scrum methodology.",
        tone: "flame",
      },
      {
        period: "2026",
        title: "First place — NEXIA \u201cBuild with AI\u201d hackathon",
        description:
          "First place. Educational innovation MVP built in under 48 hours with Node.js, NestJS and AI API integration. Backend engineering and AI integration under pressure. Organized by IBM, GDG Arequipa and JAKU Emprende UNSA.",
        tone: "flame",
      },
      {
        period: "Nov 2025",
        title: "IT Operator — ESAN University · Beca 18",
        description:
          "IT support in registration, verification and data management for over 2,000 regional applicants. Systems operation and data control under strict precision and confidentiality criteria.",
        tone: "glow",
      },
      {
        period: "2024",
        title: "First place — UNSA Project Fair (advanced)",
        description:
          "First place with Chakrita, a sustainable agriculture mobile app in Flutter with IoT and sensor integration. UX/UI design and user-centered interfaces.",
        tone: "glow",
      },
      {
        period: "2024 — 2025",
        title: "IT Operator — CTK · PRONABEC (Beca 18)",
        description:
          "Support and management for over 2,000 applicants during the National Preselection Exam, operating critical systems and evaluation platforms with high data-integrity standards.",
        tone: "muted",
      },
      {
        period: "2023 — 2024",
        title: "Academic Tutor — CEPRUNSA (3 terms)",
        description:
          "Coordination of tutor and teacher teams, attendance control and verification on the educational platform. Syllabus tracking across three consecutive processes.",
        tone: "muted",
      },
      {
        period: "2023",
        title: "Programmer (intern) — I.E.P. Linus Pauling",
        description:
          "Development and maintenance of attendance and payment tracking systems with dynamic reports. Administrative process automation, debugging, module integration and user training.",
        tone: "glow",
      },
      {
        period: "Community",
        title: "ACM Chapter Secretary · IEEE Computer Society volunteer",
        description:
          "Secretary of the ACM Student Chapter UNSA board (2024–2025), coordinating AI, cybersecurity and competitive programming workshops. Volunteer in marketing and design at IEEE Computer Society. Upper Fifth: top 20% of the cohort.",
        tone: "muted",
      },
    ],
  },

  github: {
    kicker: "SCENE 07 — TELEMETRY",
    heading: "Activity that cannot be faked",
    description:
      "Loaded directly from the GitHub API. What you see here is exactly what is on my account right now.",
    metrics: [
      { label: "Public repositories" },
      { label: "Followers" },
      { label: "Latest push" },
    ],
    viewAll: "View repositories on GitHub",
    updatedLabel: "Live updated",
    errorText: "Could not connect to the GitHub API at this moment.",
    loadingText: "Querying live GitHub activity…",
    logTitle: "Activity log",
    logEmpty: "Waiting for API data…",
  },

  credentials: {
    kicker: "SCENE 08 — THE TROPHY WALL",
    heading: "Earned in battle",
    description:
      "First-place wins, intensive training and community leadership — all verifiable, nothing declared.",
    trophies: [
      { index: "01", title: "1st place — NEXIA 2026", detail: "Build with AI hackathon", value: "1", suffix: "", glow: "flame" },
      { index: "02", title: "1st place — UNSA Fair 2024", detail: "Project Fair, Advanced category", value: "1", suffix: "", glow: "emerald" },
      { index: "03", title: "Upper Fifth", detail: "Top 20% of the cohort", value: "20", suffix: "%", glow: "magenta" },
      { index: "04", title: "Oracle Next Education", detail: "Data Science training", value: "440", suffix: "h", glow: "flame" },
      { index: "05", title: "Secretary — ACM Chapter", detail: "UNSA student leadership", value: "1", suffix: "", glow: "violet" },
      { index: "06", title: "IEEE Computer Society", detail: "Volunteer, marketing & design", value: "1", suffix: "", glow: "amber" },
    ],
    credentialsLabel: "Verified certifications",
    credentials: [
      { name: "Oracle Cloud Infrastructure 2025 Foundations", issuer: "Oracle", acronym: "OCI", href: "https://www.credly.com/search?q=Oracle%20Cloud%20Infrastructure%202025%20Foundations", glow: "flame" },
      { name: "Oracle APEX Cloud Developer Professional", issuer: "Oracle", acronym: "APEX", href: "https://www.credly.com/search?q=Oracle%20APEX%20Cloud%20Developer%20Professional", glow: "flame" },
      { name: "Google Cloud Computing Foundations", issuer: "Google Cloud", acronym: "GCP", href: "https://www.credly.com/search?q=Google%20Cloud%20Computing%20Foundations", glow: "magenta" },
      { name: "AWS Academy Graduate — Cloud Foundations", issuer: "AWS", acronym: "AWS", href: "https://www.credly.com/search?q=AWS%20Academy%20Graduate%20—%20Cloud%20Foundations", glow: "magenta" },
      { name: "Microsoft SQL Server Specialization (advanced)", issuer: "Datux Peru", acronym: "SQL", href: "https://www.credly.com/search?q=Microsoft%20SQL%20Server%20Specialization%20(advanced)", glow: "violet" },
      { name: "Microsoft Power BI Specialization (advanced)", issuer: "Datux Peru", acronym: "PBI", href: "https://www.credly.com/search?q=Microsoft%20Power%20BI%20Specialization%20(advanced)", glow: "violet" },
      { name: "ONE Tech — Data Science (440h)", issuer: "Alura Latam", acronym: "ONE", href: "https://www.credly.com/search?q=ONE%20Tech%20—%20Data%20Science%20(440h)", glow: "flame" },
      { name: "Programming & Development with Python (80h)", issuer: "Univ. Continental", acronym: "PY", href: "https://www.credly.com/search?q=Programming%20&%20Development%20with%20Python%20(80h)", glow: "amber" },
      { name: "SAP S/4HANA MM — Key User", issuer: "SUMMA Center", acronym: "SAP", href: "https://www.credly.com/search?q=SAP%20S/4HANA%20MM%20—%20Key%20User", glow: "violet" },
      { name: "Business Intelligence Foundation (BIFPC)", issuer: "CertiProf", acronym: "BI", href: "https://www.credly.com/search?q=Business%20Intelligence%20Foundation%20(BIFPC)", glow: "flame" },
      { name: "Scrum Foundation (SFPC)", issuer: "CertiProf", acronym: "SCR", href: "https://www.credly.com/search?q=Scrum%20Foundation%20(SFPC)", glow: "magenta" },
      { name: "Lean Six Sigma White Belt (LSSWBPC)", issuer: "CertiProf", acronym: "LSS", href: "https://www.credly.com/search?q=Lean%20Six%20Sigma%20White%20Belt%20(LSSWBPC)", glow: "amber" },
      { name: "Machine Learning · Classification & Regression", issuer: "Alura Latam", acronym: "ML", href: "https://www.credly.com/search?q=Machine%20Learning%20·%20Classification%20&%20Regression", glow: "violet" },
      { name: "Statistics · Probability & Sampling", issuer: "Alura Latam", acronym: "STAT", href: "https://www.credly.com/search?q=Statistics%20·%20Probability%20&%20Sampling", glow: "amber" },
      { name: "Professional Office Suite, Advanced (90h)", issuer: "ITEC", acronym: "OFI", href: "https://www.credly.com/search?q=Professional%20Office%20Suite,%20Advanced%20(90h)", glow: "magenta" },
      { name: "Gamified Ethical Hacking", issuer: "HackerMentor", acronym: "SEC", href: "https://www.credly.com/search?q=Gamified%20Ethical%20Hacking", glow: "violet" },
    ],
    verifyCta: "Verify on Credly",
  },

  philosophy: {
    kicker: "SCENE 09 — THE BRAIN",
    headingLead: "A demo gets shown.",
    headingAccent: "A system earns trust.",
    description:
      "Backend Developer in pre-professional internships and final-year Systems Engineering student at UNSA. Over three years building real software: from data support for 2,000+ applicants to backend services in production. My method combines rigorous architecture, clean data and measurable results in every delivery.",
    principles: [
      {
        index: "01",
        title: "Sub-second latency",
        detail: "Embedded ML inference optimized to a 20 ms P99. When the system does not wait, neither does the user.",
      },
      {
        index: "02",
        title: "Data parity",
        detail: "Declarative schemas and strict contracts between layers. Data arrives clean and leaves correct.",
      },
      {
        index: "03",
        title: "Production-ready",
        detail: "Resilient ETL, JWT-secured APIs and OpenAPI documentation. The standard is what a team can trust daily.",
      },
    ],
    panelTitle: "Operating profile",
    facts: [
      { key: "Current role", value: "Backend Developer (intern)" },
      { key: "Organization", value: "Fundacion CALMA" },
      { key: "Core tech", value: "Java · Python · SQL · ONNX" },
      { key: "Education", value: "Systems Engineering · UNSA" },
      { key: "Location", value: "Arequipa, Peru (UTC-5)" },
    ],
    panelFooter: { left: "UNSA · Systems Engineering", right: "Upper Fifth" },
  },

  faq: {
    kicker: "SCENE 10 — QUESTIONS",
    heading: "Architecture decisions & collaboration",
    description:
      "Full clarity on how I approach building software, optimizing latency and integrating into high-performance teams.",
    items: [
      {
        index: "F1",
        category: "Architecture",
        question: "Why embed ML inference in the backend instead of dedicated microservices?",
        answer:
          "In projects like ChurnInsight, exporting the model to ONNX Runtime and running it in the same Java/Spring Boot process removed network and JSON serialization overhead, cutting P99 latency from 2000 ms to 20 ms with zero external infrastructure dependency.",
        questions: [
          {
            category: "Latency",
            question: "What impact does embedded inference have on user experience?",
            answer:
              "P99 latency drops from 2000 ms to 20 ms: predictions are served where the data lives, with no external calls or network overhead.",
          },
          {
            category: "Cost",
            question: "Does it cut costs versus external ML APIs?",
            answer:
              "It removes third-party calls from the critical path: zero per-inference cost and zero external availability dependency.",
          },
        ],
      },
      {
        index: "F2",
        category: "Availability",
        question: "What is your current availability for roles and start date?",
        answer:
          "I am currently finishing my last terms of Systems Engineering at UNSA and working as a Backend intern at Fundacion CALMA. I am available for Junior Data Engineer or Backend Developer roles, remote or hybrid.",
        questions: [
          {
            category: "Mode",
            question: "Do you work remote or on-site?",
            answer:
              "Remote and hybrid, fully available in the America/Lima timezone (UTC-5).",
          },
        ],
      },
      {
        index: "F3",
        category: "Methodology",
        question: "How do you guarantee code quality and data parity?",
        answer:
          "I use strict type checks in TypeScript/Java, declarative database migrations (Flyway/Liquibase/SQL), OpenAPI/Swagger documentation and automated E2E tests before every deployment.",
      },
      {
        index: "F4",
        category: "Data & Cloud",
        question: "What cloud experience do you have, e.g., Oracle or AWS?",
        answer:
          "I hold official certifications in Oracle Cloud Infrastructure (OCI Foundations & APEX Professional), AWS Academy Cloud Foundations and Google Cloud Foundations. I have deployed containerized environments with Docker on OCI and EC2 instances.",
      },
    ],
  },

  contact: {
    kicker: "FINAL SCENE — CONTACT",
    headingLead: "Let's ignite something",
    headingAccent: "that leaves a mark.",
    description:
      "Available for Junior Data Engineer and Backend Engineering roles. If you need someone who cares about details down to the millisecond, write to me.",
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
    navLabel: "Main navigation",
    navTitle: "Scenes",
    navItems: {
      mission: "Mission",
          work: "Projects",
          architecture: "Architecture",
          stack: "Stack",
          journey: "Journey",
          github: "GitHub",
          credentials: "Trophies",
          philosophy: "Philosophy",
          faq: "Questions",
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

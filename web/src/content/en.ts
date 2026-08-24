import type { PortfolioContent } from "@/types/content";

/**
 * English content (secondary locale).
 * Comprehensive, authentic, and balanced profile of Ower Frank Lopez Arela.
 * Mirrors the es.ts structure field-for-field; typecheck enforces parity.
 */
export const en: PortfolioContent = {
  meta: {
    title: "Ower Frank Lopez Arela — Backend & Data Engineer",
    description:
      "9th-semester Systems Engineering student at UNSA and Backend Developer. Building REST APIs, data pipelines, and cloud services with Java, Spring Boot, Node.js, and Python.",
    ogAlt:
      "Portfolio of Ower Frank Lopez Arela — Backend & Data Engineer",
    keywords: [
      "Backend Developer",
      "Data Engineer",
      "Data Engineering",
      "Java",
      "Spring Boot",
      "NestJS",
      "Python",
      "PostgreSQL",
      "Docker",
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
    statusText: "Open to opportunities",
    soundOn: "Sound FX Enabled",
    soundOff: "Sound FX Muted",
  },

  intro: {
    status: "Available for Junior Data Engineer & Backend roles",
    kicker: "BACKEND ENGINEERING & DATA PIPELINES · AREQUIPA, PERU",
    titleLines: ["Backend Developer", "& Data Engineer"],
    titleAccent: "building reliable software.",
    description:
      "9th-semester Systems Engineering student at UNSA and Backend Developer at Fundación CALMA. Focused on REST API design, database optimization, data pipelines, and cloud deployments.",
    primaryCta: "View projects",
    primaryTarget: "#work",
    secondaryCta: "Copy email",
    copiedFeedback: "Email copied to clipboard.",
    scrollCue: "Explore my projects and background",
    frameLabel: "STATUS · ACTIVE",
  },

  marquee: [
    { name: "Java 17", category: "Backend" },
    { name: "Spring Boot 3.4", category: "Backend" },
    { name: "NestJS", category: "Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python 3.12", category: "Data" },
    { name: "PostgreSQL", category: "Data" },
    { name: "MongoDB", category: "Data" },
    { name: "SQL Server", category: "Data" },
    { name: "MySQL", category: "Data" },
    { name: "Docker", category: "DevOps" },
    { name: "Oracle Cloud", category: "Cloud" },
    { name: "AWS", category: "Cloud" },
    { name: "Google Cloud", category: "Cloud" },
    { name: "ONNX Runtime", category: "AI" },
  ],

  mission: {
    kicker: "ENGINEERING APPROACH",
    headingLead: "Solid architecture,",
    headingAccent: "value-driven solutions.",
    paragraphs: [
      "System quality is not just measured by delivered features, but by stability, data consistency, and long-term maintainability in production. Every API contract and data workflow must be designed with clarity and reliability.",
      "My experience spans developing production backend services with Java and Node.js, managing operational data systems for 2,000+ applicants in evaluation processes, and integrating Machine Learning models.",
    ],
    facts: [
      { key: "Profile", value: "Backend & Data Engineering" },
      { key: "Specialty", value: "REST APIs, SQL & ETL Pipelines" },
      { key: "Methodology", value: "Clean Architecture & Scrum" },
      { key: "Location", value: "Arequipa, Peru · UTC-5" },
    ],
  },

  work: {
    kicker: "FEATURED PROJECTS",
    heading: "Projects and engineering solutions",
    description:
      "A diverse sample of projects across backend engineering, data processing, computer vision, and mobile applications with auditable code on GitHub.",
    featuredLabel: "Flagship Project",
    featured: {
      flag: "Featured",
      category: "Enterprise ML Platform & Backend",
      title: "ChurnInsight",
      summary:
        "Customer churn prediction platform with ML inference embedded directly into the backend via ONNX Runtime, eliminating network overhead and external service dependencies.",
      tags: ["Java 17", "Spring Boot 3.4", "ONNX Runtime", "Random Forest", "MySQL"],
      note: "By executing the ONNX model within the same Spring Boot process, P99 latency dropped from 2,000 ms to 20 ms. Includes JWT authentication, versioned SQL migrations, and model explainability (XAI) with 96% recall.",
      metrics: [
        { value: "96%", label: "Recall (Random Forest)", highlight: true },
        { value: "20 ms", label: "Inference P99 (ONNX)", highlight: true },
        { value: "99%", label: "Latency reduction" },
        { value: "0", label: "External ML calls" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/OwerLopez", external: true },
        { label: "View architecture", href: "#architecture" },
      ],
    },
    logLabel: "Other selected projects",
    log: [
      {
        index: "01",
        tone: "gold",
        title: "NEXIA 2026",
        description:
          "1st place at the 'Build with AI' Hackathon (organized by IBM, GDG Arequipa, and JAKU UNSA). Educational innovation MVP delivered in under 48 hours with Node.js, NestJS, and AI APIs.",
        tags: ["Node.js", "NestJS", "AI APIs"],
      },
      {
        index: "02",
        tone: "violet",
        title: "VisionTransit AI",
        description:
          "Real-time computer vision pipeline for public transit monitoring: decoupled 6-layer architecture with FastAPI, YOLO11, and WebSockets, sustaining 28.7 FPS on CPU.",
        tags: ["Python", "FastAPI", "YOLO11"],
      },
      {
        index: "03",
        tone: "emerald",
        title: "Chakrita",
        description:
          "1st place at the 2024 UNSA Systems Engineering Project Fair. Sustainable agriculture mobile application with IoT sensor integration built in Flutter.",
        tags: ["Flutter", "IoT", "UX/UI"],
      },
    ],
    matrixTitle: "Technical project summary",
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
        domain: "ML Platform / Backend",
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
        project: "VisionTransit AI",
        domain: "Computer vision / Data",
        stack: "Python · FastAPI · YOLO11",
        result: "28.7 FPS real-time · 6 layers",
        role: "Data Engineering + ML",
        year: "2025",
      },
      {
        project: "Chakrita",
        domain: "IoT / Agtech mobile",
        stack: "Flutter · IoT · Sensors",
        result: "1st place UNSA Fair",
        role: "UX/UI + Flutter",
        year: "2024",
      },
    ],
  },

  architecture: {
    kicker: "DATA & ML ARCHITECTURE",
    headingLead: "Data lifecycle:",
    headingAccent: "from ingestion to production.",
    description:
      "Five-stage pipeline structure engineered for data integrity, low latency, and high maintainability.",
    stages: [
      {
        index: "E1",
        label: "Data Sources",
        detail: "Transactional databases, NoSQL and external APIs",
        tech: "PostgreSQL · MySQL · SQL Server · MongoDB · APIs",
        power: "INGESTION 100%",
      },
      {
        index: "E2",
        label: "ETL Processing",
        detail: "Extraction, cleaning, type safety and transformation",
        tech: "Python · Pandas · SQL · BULK INSERT",
        power: "PROCESSING",
      },
      {
        index: "E3",
        label: "Storage & Quality",
        detail: "Relational modeling, optimized queries and integrity",
        tech: "Logical/Physical modeling · CTEs · Window Functions",
        power: "INTEGRITY",
      },
      {
        index: "E4",
        label: "ML Inference",
        detail: "Trained models and low-latency in-memory prediction",
        tech: "NumPy · Random Forest · ONNX Runtime · XAI",
        power: "ONNX INFERENCE",
      },
      {
        index: "E5",
        label: "Service Layer",
        detail: "Secure consumption via REST APIs and dashboards",
        tech: "Spring Boot · JWT · Swagger · Power BI",
        power: "PRODUCTION API",
      },
    ],
    note: "Embedded inference: the model runs in-process inside the backend, achieving 20 ms P99 latency with zero external network overhead.",
  },

  stack: {
    kicker: "TECH STACK & DOMAINS",
    heading: "Core technologies and tools",
    description:
      "Tools I use to design and build robust backend services, data engineering pipelines, and cloud integrations.",
    groups: [
      { name: "Backend", glow: "flame", items: ["Java 17", "Spring Boot 3.4", "NestJS", "Node.js", "REST APIs · Swagger"] },
      { name: "Data", glow: "magenta", items: ["PostgreSQL", "MySQL · SQL Server", "MongoDB", "Pandas · NumPy", "Power BI"] },
      { name: "Cloud & DevOps", glow: "flame", items: ["Oracle Cloud (OCI)", "AWS EC2 · S3", "Google Cloud", "Docker", "Git"] },
      { name: "AI / Machine Learning", glow: "violet", items: ["Python 3.12", "ONNX Runtime", "Random Forest", "XAI"] },
    ],
    note: "Hands-on experience in backend design, data management, cloud deployments, and agile methodologies.",
  },

  journey: {
    kicker: "EXPERIENCE & BACKGROUND",
    heading: "Professional experience and leadership",
    description:
      "Background focused on backend development, high-volume data operations, and student leadership.",
    items: [
      {
        period: "Feb 2026 → Present",
        title: "Backend Developer (Intern) — Fundación CALMA",
        description:
          "Development and maintenance of backend services with REST APIs, business logic, JWT authentication, and access control. Management and optimization of PostgreSQL, MySQL, SQL Server, and MongoDB databases under Scrum methodology.",
        tone: "flame",
      },
      {
        period: "2026",
        title: "1st Place — Hackathon NEXIA \u201cBuild with AI\u201d",
        description:
          "First place with an educational innovation MVP built in under 48 hours using Node.js, NestJS, and AI API integrations. Organized by IBM, GDG Arequipa, and JAKU Emprende UNSA.",
        tone: "flame",
      },
      {
        period: "2024 — 2025",
        title: "IT Operator & Data Operations — ESAN / PRONABEC",
        description:
          "IT support and data verification for 2,000+ applicants during the National Preselection Exam (Beca 18), operating evaluation platforms under high confidentiality and data integrity standards.",
        tone: "glow",
      },
      {
        period: "Community & Academic",
        title: "ACM Chapter Secretary · Top 20% Rank (Quinto Superior)",
        description:
          "Secretary on the board of the ACM Student Chapter UNSA (2024–2025), coordinating technical AI and competitive programming workshops. Top 20% academic rank in Systems Engineering at UNSA.",
        tone: "muted",
      },
    ],
  },

  github: {
    kicker: "GITHUB ACTIVITY",
    heading: "Repositories and source code activity",
    description:
      "Queried in real time from the GitHub API to showcase recent activity and public repositories.",
    metrics: [
      { label: "Public repos" },
      { label: "Followers" },
      { label: "Latest commit" },
    ],
    viewAll: "View repositories on GitHub",
    updatedLabel: "Live update",
    errorText: "Could not reach the GitHub API at this moment.",
    loadingText: "Querying live GitHub activity…",
    logTitle: "Activity log",
    logEmpty: "Awaiting API response…",
  },

  credentials: {
    kicker: "AWARDS & CERTIFICATIONS",
    heading: "Core recognitions and certifications",
    description:
      "Awards in technology competitions and official certifications in cloud computing, database architecture, and data science.",
    trophies: [
      { index: "01", title: "1st Place — NEXIA 2026", detail: "Hackathon Build with AI (IBM / GDG)", value: "1", suffix: "", glow: "flame" },
      { index: "02", title: "1st Place — UNSA Fair 2024", detail: "Projects Fair (Advanced Category)", value: "1", suffix: "", glow: "emerald" },
      { index: "03", title: "Top 20% Class Rank", detail: "Quinto Superior in Systems Engineering UNSA", value: "20", suffix: "%", glow: "magenta" },
    ],
    credentialsLabel: "Official Verified Credentials",
    credentials: [
      { name: "Oracle Cloud Infrastructure 2025 Foundations", issuer: "Oracle", acronym: "OCI", href: "https://www.credly.com/search?q=Oracle%20Cloud%20Infrastructure%202025%20Foundations", glow: "flame" },
      { name: "Oracle APEX Cloud Developer Professional", issuer: "Oracle", acronym: "APEX", href: "https://www.credly.com/search?q=Oracle%20APEX%20Cloud%20Developer%20Professional", glow: "flame" },
      { name: "Google Cloud Computing Foundations", issuer: "Google Cloud", acronym: "GCP", href: "https://www.credly.com/search?q=Google%20Cloud%20Computing%20Foundations", glow: "magenta" },
      { name: "AWS Academy Graduate — Cloud Foundations", issuer: "AWS", acronym: "AWS", href: "https://www.credly.com/search?q=AWS%20Academy%20Graduate%20—%20Cloud%20Foundations", glow: "magenta" },
      { name: "ONE Tech — Data Science (440h)", issuer: "Alura Latam", acronym: "ONE", href: "https://www.credly.com/search?q=ONE%20Tech%20—%20Data%20Science%20(440h)", glow: "flame" },
      { name: "Microsoft SQL Server Advanced Specialization", issuer: "Datux Peru", acronym: "SQL", href: "https://www.credly.com/search?q=Especializacion%20Microsoft%20SQL%20Server%20(avanzado)", glow: "violet" },
    ],
    verifyCta: "Verify on Credly",
  },

  philosophy: {
    kicker: "ABOUT ME",
    headingLead: "Well-structured software,",
    headingAccent: "continuous learning.",
    description:
      "I am a 9th-semester Systems Engineering student at Universidad Nacional de San Agustín de Arequipa (UNSA) working as a Backend Developer at Fundación CALMA. I am passionate about designing clean architectures, optimizing data workflows, and building reliable APIs that solve real-world problems. I have coordinated technical workshops as Secretary of the ACM Student Chapter and maintained academic excellence in the Top 20% (Quinto Superior). I look forward to joining dynamic teams where I can deliver value in backend and data engineering while continuing to learn from senior engineers.",
    principles: [
      {
        index: "01",
        title: "Clean and maintainable architecture",
        detail: "Modular and decoupled software design, clear API contracts, strict typing, and scalable code standards.",
      },
      {
        index: "02",
        title: "Data integrity and quality",
        detail: "Efficient relational modeling, robust data consistency across service layers, and dependable ETL pipelines.",
      },
      {
        index: "03",
        title: "Production ready",
        detail: "REST services documented with OpenAPI, secure JWT authentication, controlled database migrations, and Docker deployments.",
      },
    ],
    panelTitle: "Professional profile",
    facts: [
      { key: "Current role", value: "Backend Developer (Intern)" },
      { key: "Organization", value: "Fundación CALMA" },
      { key: "Core tech", value: "Java · Python · SQL · Docker" },
      { key: "Education", value: "Systems Engineering · UNSA" },
      { key: "Location", value: "Arequipa, Peru (UTC-5)" },
    ],
    panelFooter: { left: "UNSA · Systems Engineering", right: "Top 20% Class Rank (Quinto Superior)" },
  },

  faq: {
    kicker: "FREQUENT QUESTIONS",
    heading: "Technical profile & availability",
    description:
      "Summary of technical strengths, career objectives, and onboarding availability.",
    items: [
      {
        index: "F1",
        category: "Specialty",
        question: "What are your core technical strengths and areas of focus?",
        answer:
          "I specialize in backend development with Java (Spring Boot) and Node.js (NestJS), relational database modeling and optimization (PostgreSQL, MySQL, SQL Server), and data pipeline engineering with Python. I love building robust, secure, and efficient systems.",
      },
      {
        index: "F2",
        category: "Availability",
        question: "What is your current availability for engineering roles and onboarding?",
        answer:
          "I am currently in my final year of Systems Engineering at UNSA and working as a Backend Developer Intern at Fundación CALMA. I am available for Junior Data Engineer or Backend Developer roles under remote or hybrid arrangements.",
      },
    ],
  },

  contact: {
    kicker: "DIRECT COMMUNICATION",
    headingLead: "Let's start a",
    headingAccent: "professional conversation.",
    description:
      "Available for Junior Data Engineer and Backend Developer opportunities. If you are looking for a motivated, proactive engineer focused on delivering quality software, feel free to reach out.",
    terminalTitle: "contact@owerlopez.dev",
    greeting: "$ init — contact",
    context:
      "> Open to opportunities in backend development, data engineering pipelines, and cloud software projects.",
    request:
      "> You can send me an email directly or connect with me on LinkedIn.",
    emailLabel: "Direct email",
    copyLabel: "Copy",
    copiedFeedback: "Copied",
    responseTime: "Response in < 24 h on business days",
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
    tagline: "Backend · Data · Cloud · AI — Arequipa, Peru (16.40°S 71.53°W)",
    credit: "Developed by Ower F. Lopez Arela",
    location: "Arequipa, Peru",
    timezone: "UTC-5",
    systemStatus: {
      availabilityLabel: "availability",
      availabilityValue: "Available for hire",
      zoneLabel: "zone",
      modeLabel: "status",
      modeValue: "open to opportunities",
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

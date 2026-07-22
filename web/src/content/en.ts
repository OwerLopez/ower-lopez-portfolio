import type { PortfolioContent } from "@/types/content";

/**
 * English content (secondary locale). Mirrors `es` exactly in structure.
 */
export const en: PortfolioContent = {
  meta: {
    title: "Ower Frank Lopez Arela — Backend, Data & AI Engineering",
    description:
      "Systems Engineering student focused on backend, data engineering and applied AI. I build REST APIs, data pipelines and embedded ML models with Java, Spring Boot, Node.js and Python.",
    ogAlt: "Portfolio of Ower Frank Lopez Arela — Backend, Data & AI Engineering",
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
    about: "About",
    work: "Work",
    architecture: "Architecture",
    stack: "Stack",
    credentials: "Credentials",
    contact: "Contact",
    cta: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  hero: {
    status: "OPEN TO JUNIOR DATA ENGINEER ROLES",
    titleLead: "I build backends that",
    titleAccent: "actually scale.",
    description:
      "Systems Engineering student crafting production-ready backend services, data pipelines and AI-powered products — turning complex problems into clear, measurable architectures.",
    primaryCta: "View my work",
    secondaryCta: "Get in touch",
    scroll: "SCROLL",
    stats: [
      { value: 96, suffix: "%", label: "MODEL RECALL" },
      { value: 99, suffix: "%", label: "LATENCY CUT" },
      { value: 2, suffix: "", label: "FIRST-PLACE WINS" },
      { value: 51, suffix: "", label: "CERTIFICATIONS" },
    ],
  },

  marquee: [
    "Java 17",
    "Spring Boot",
    "NestJS",
    "Node.js",
    "Python",
    "ONNX Runtime",
    "PostgreSQL",
    "MongoDB",
    "SQL Server",
    "JWT",
    "Docker",
    "Oracle Cloud",
    "AWS",
    "Google Cloud",
  ],

  about: {
    eyebrow: "01 — PROFILE",
    heading:
      "I treat my projects like production systems — because that's the standard a team can trust.",
    paragraphs: [
      "My focus is the backend: designing scalable architectures, building reliable data pipelines and embedding machine learning where it creates real leverage. I care about latency, correctness and the small details that separate a demo from something people depend on every day.",
      "Right now I'm shipping production backend services at Fundacion CALMA with Java, Spring Boot and Node.js over relational and NoSQL databases, while steering my career toward Data Engineering with Python and advanced SQL.",
    ],
    panelTitle: "CURRENTLY",
    facts: [
      { label: "Role", value: "Backend Developer Intern" },
      { label: "Organization", value: "Fundacion CALMA" },
      { label: "Focus", value: "Backend · Data · AI · Cloud" },
      { label: "Studying", value: "Systems Engineering · UNSA" },
      { label: "Based", value: "Arequipa, Peru" },
    ],
  },

  experience: {
    eyebrow: "02 — TRAJECTORY",
    heading: "The path so far",
    description:
      "From data support to production backend engineering. Each stage blends real software with measurable outcomes.",
    items: [
      {
        period: "FEB 2026 → NOW",
        title: "Backend Developer Intern — Fundacion CALMA",
        description:
          "Building and maintaining backend services with REST APIs, business logic, JWT authentication and access control. Managing and optimizing PostgreSQL, MySQL, SQL Server and MongoDB databases, with technical documentation and a Scrum workflow.",
        tone: "accent",
      },
      {
        period: "2026",
        title: "Winner — NEXIA “Build with AI” Hackathon",
        description:
          "First place. An educational-innovation MVP built in under 48 hours with Node.js, NestJS and AI API integration. Backend engineering and AI integration under pressure. Hosted by IBM, GDG Arequipa and JAKU Emprende UNSA.",
        tone: "accent",
      },
      {
        period: "NOV 2025",
        title: "IT Operator — Universidad ESAN · Beca 18",
        description:
          "IT support for registration, verification and data management for 2000+ regional applicants. Systems operation and data control under strict precision and confidentiality standards.",
        tone: "outline",
      },
      {
        period: "2024",
        title: "Winner — UNSA Engineering Project Fair (Advanced)",
        description:
          "First place with Chakrita, a sustainable-agriculture mobile app in Flutter with IoT and sensor integration. Led UX/UI design and user-centered interfaces.",
        tone: "outline",
      },
      {
        period: "2024 — 2025",
        title: "IT Operator — CTK · PRONABEC (Beca 18)",
        description:
          "Support and data management for 2000+ applicants during the National Pre-selection Exam, operating critical systems and assessment platforms with high data-integrity standards.",
        tone: "muted",
      },
      {
        period: "2023 — 2024",
        title: "Academic Monitor — CEPRUNSA (3 terms)",
        description:
          "Coordinated teams of monitors and teachers, attendance control and tracking on the education platform across three consecutive terms.",
        tone: "muted",
      },
      {
        period: "2023",
        title: "Programmer Intern — I.E.P. Linus Pauling",
        description:
          "Built and maintained attendance and payment registration systems with dynamic reports. Automated administrative processes, debugging and module integration, training end users.",
        tone: "outline",
      },
      {
        period: "COMMUNITY",
        title: "Secretary, ACM · Volunteer, IEEE Computer Society",
        description:
          "Board secretary of the ACM Student Chapter UNSA (2024–2025), coordinating workshops on AI, cybersecurity and competitive programming. Volunteer on IEEE Computer Society marketing and design. Upper Fifth: top 20% of the cohort.",
        tone: "muted",
      },
    ],
  },

  work: {
    eyebrow: "03 — FEATURED WORK",
    heading: "Systems, not screenshots",
    description: "Each project is an engineering decision with measurable outcomes.",
    featured: {
      flag: "FLAGSHIP",
      category: "ENTERPRISE ML PLATFORM",
      title: "ChurnInsight",
      summary:
        "A customer-churn prediction platform that embeds ML inference directly inside the backend — no external hops, no network tax, no vendor lock-in.",
      tags: ["Java 17", "Spring Boot 3.4", "ONNX Runtime", "Random Forest", "MySQL"],
      note: "Moving inference in-process cut latency from 2000ms to 20ms. The model runs where the data already lives, secured with JWT and versioned with migrations. Random Forest optimized to 96% recall with Explainable AI (XAI).",
      metrics: [
        { value: "96%", label: "RECALL" },
        { value: "99%", label: "LATENCY CUT" },
        { value: "20ms", label: "P99 INFERENCE", highlight: true },
        { value: "0", label: "EXTERNAL ML CALLS", highlight: true },
      ],
    },
    secondary: [
      {
        badge: "1ST PLACE",
        badgeTone: "gold",
        meta: "MVP < 48H",
        title: "NEXIA 2026",
        description:
          "Winner of the “Build with AI” hackathon. An educational-innovation MVP shipped end-to-end in under two days as backend engineer and AI integrator.",
        tags: ["Node.js", "NestJS", "AI APIs"],
      },
      {
        badge: "1ST PLACE",
        badgeTone: "green",
        meta: "IoT · MOBILE",
        title: "Chakrita",
        description:
          "A sustainable-agriculture IoT mobile app, winner of the 2024 UNSA Systems Engineering Project Fair. Led UX/UI and Flutter development end to end.",
        tags: ["Flutter", "IoT", "UX/UI"],
      },
    ],
    comparisonTitle: "Project comparison",
    comparisonHeaders: {
      project: "Project",
      domain: "Domain",
      stack: "Core stack",
      result: "Key result",
      role: "Role",
      year: "Year",
    },
    comparison: [
      {
        project: "ChurnInsight",
        domain: "ML / Data platform",
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
        domain: "IoT / Mobile agtech",
        stack: "Flutter · IoT · Sensors",
        result: "1st place, UNSA Fair",
        role: "UX/UI + Flutter",
        year: "2024",
      },
    ],
  },

  github: {
    eyebrow: "GITHUB — LIVE",
    heading: "Real code, real activity",
    description:
      "Repositories loaded live from the GitHub API. What you see here is exactly what's on my account, right now.",
    viewAll: "View all repositories",
    updatedLabel: "Updated",
    reposLabel: "PUBLIC REPOS",
    followersLabel: "FOLLOWERS",
    errorText: "Couldn't load GitHub right now.",
    loadingText: "Querying the GitHub API…",
  },

  architecture: {
    eyebrow: "04 — DATA ARCHITECTURE",
    heading: "How I think about a data system",
    description:
      "From source to value: a clear, measurable pipeline where every layer owns one responsibility and a defined contract.",
    layers: [
      {
        label: "Sources",
        detail: "Operational & external",
        tech: "PostgreSQL · MySQL · SQL Server · MongoDB · APIs",
      },
      {
        label: "Ingest / ETL",
        detail: "Extract & clean",
        tech: "Python · Pandas · SQL · BULK INSERT",
      },
      {
        label: "Store",
        detail: "Modeling & quality",
        tech: "Logical/physical modeling · CTEs · Window Fns",
      },
      {
        label: "Process / ML",
        detail: "Analytics & inference",
        tech: "NumPy · Random Forest · ONNX · XAI",
      },
      {
        label: "Serve",
        detail: "APIs & visualization",
        tech: "Spring Boot · JWT · Power BI",
      },
    ],
    note: "Embedded inference: the model runs where the data lives — no external calls, with a 20ms P99 latency.",
  },

  stack: {
    eyebrow: "05 — TOOLKIT",
    heading: "The stack I reach for",
    description: "The tools I use to take ideas from the data model to production.",
    groups: [
      {
        label: "LANGUAGES",
        items: ["Java 17", "Python", "JavaScript / TypeScript", "SQL · C++"],
      },
      {
        label: "BACKEND",
        items: ["Spring Boot · JPA", "NestJS", "Node.js", "REST APIs · JWT · Swagger"],
      },
      {
        label: "DATA",
        items: ["PostgreSQL · MySQL", "SQL Server · MongoDB", "Pandas · NumPy", "Power BI"],
      },
      {
        label: "AI / ML",
        items: ["ONNX Runtime", "Machine Learning", "Random Forest · XAI", "Embedded inference"],
      },
      {
        label: "CLOUD",
        items: ["Oracle Cloud (OCI)", "AWS (EC2, S3)", "Google Cloud", "Oracle APEX"],
      },
      {
        label: "PRACTICES",
        items: ["System architecture", "Git · Docker", "Scrum · Kanban", "API security"],
      },
    ],
  },

  credentials: {
    eyebrow: "06 — PROOF",
    heading: "Earned, not claimed",
    description: "Verifiable outcomes, continuous learning and engineering-community leadership.",
    achievementsLabel: "ACHIEVEMENTS",
    certificationsLabel: "CERTIFICATIONS",
    certificationsTotal: "51 total",
    verifyCta: "Verify credentials on Credly",
    achievements: [
      { title: "1st Place — NEXIA 2026", detail: "Build with AI hackathon" },
      { title: "1st Place — UNSA Fair 2024", detail: "Engineering Project Fair, Advanced" },
      { title: "Upper Fifth", detail: "Top 20% of the cohort" },
      { title: "Oracle Next Education", detail: "Data Science program (440h)" },
      { title: "Secretary — ACM Chapter", detail: "Student leadership at UNSA" },
      { title: "IEEE Computer Society", detail: "Volunteer, marketing & design" },
    ],
    certifications: [
      { name: "Oracle Cloud Infrastructure 2025 Foundations", issuer: "Oracle" },
      { name: "Oracle APEX Cloud Developer Professional", issuer: "Oracle" },
      { name: "Google Cloud Computing Foundations", issuer: "Google Cloud" },
      { name: "AWS Academy Graduate — Cloud Foundations", issuer: "AWS" },
      { name: "Microsoft SQL Server Specialization (Advanced)", issuer: "Datux Peru" },
      { name: "Microsoft Power BI Specialization (Advanced)", issuer: "Datux Peru" },
      { name: "ONE Tech — Data Science (440h)", issuer: "Alura Latam" },
      { name: "Python Programming & Development (80h)", issuer: "Univ. Continental" },
      { name: "SAP S/4HANA MM — Key User", issuer: "SUMMA Center" },
      { name: "Business Intelligence Foundation (BIFPC)", issuer: "CertiProf" },
      { name: "Scrum Foundation (SFPC)", issuer: "CertiProf" },
      { name: "Lean Six Sigma White Belt (LSSWBPC)", issuer: "CertiProf" },
      { name: "Machine Learning · Classification & Regression", issuer: "Alura Latam" },
      { name: "Statistics · Probability & Sampling", issuer: "Alura Latam" },
      { name: "Professional Office Suite — Advanced (90h)", issuer: "ITEC" },
      { name: "Gamified Ethical Hacking", issuer: "HackerMentor" },
    ],
  },

  contact: {
    eyebrow: "07 — LET'S TALK",
    headingLead: "Let's build something",
    headingAccent: "that scales.",
    description:
      "Open to Junior Data Engineer and Backend Engineering roles. If you're hiring engineers who sweat the details, I'd love to talk.",
    emailCta: "Email me",
    linkedinCta: "LinkedIn",
    githubCta: "GitHub",
  },

  footer: {
    rights: "Ower Frank Lopez Arela. All rights reserved.",
    tagline: "Backend · Data · AI · Cloud — Arequipa, Peru",
    builtWith: "Built with Next.js, React and Tailwind CSS",
    backToTop: "Back to top",
  },
};

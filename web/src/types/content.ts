/**
 * Modelo de contenido tipado del portafolio (v6 — Aurora de Fuego).
 * Organizacion emocional del portafolio como experiencia cinematografica:
 *   00 Intro/Hero  (impacto: titulo gigante sobre aurora)
 *   01 Mission     (la obsesion por el milisegundo)
 *   02 Work        (galeria: flagship + logros numerados)
 *   03 Architecture (circuito de energia E1-E5)
 *   04 Stack       (constelacion de tecnologias)
 *   05 Journey     (linea de fuego ascendente)
 *   06 Github      (telemetria en vivo)
 *   07 Credentials (muro de trofeos)
 *   08 Philosophy  (arte neural + principios)
 *   09 Faq         (acordeon)
 *   10 Contact     (CTA monumental)
 * Cada diccionario (es/en) debe satisfacer `PortfolioContent` para paridad total.
 */

export interface NavContent {
  mission: string;
  work: string;
  architecture: string;
  stack: string;
  journey: string;
  github: string;
  credentials: string;
  philosophy: string;
  faq: string;
  contact: string;
  cta: string;
  menuOpen: string;
  menuClose: string;
  statusText: string;
}

export interface IdentityFact {
  key: string;
  value: string;
}

export interface IntroHero {
  status: string;
  kicker: string;
  titleLines: string[];
  titleAccent: string;
  description: string;
  primaryCta: string;
  primaryTarget: string;
  secondaryCta: string;
  copiedFeedback: string;
  scrollCue: string;
  frameLabel: string;
}

export interface MarqueeItem {
  name: string;
  category: string;
}

export interface MissionSection {
  kicker: string;
  headingLead: string;
  headingAccent: string;
  paragraphs: string[];
  facts: IdentityFact[];
}

export interface FeaturedProject {
  flag: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  note: string;
  metrics: { value: string; label: string; highlight?: boolean }[];
  links: { label: string; href: string; external?: boolean }[];
}

export interface LogEntry {
  index: string;
  tone: "gold" | "emerald" | "violet";
  title: string;
  description: string;
  tags: string[];
}

export interface WorkSection {
  kicker: string;
  heading: string;
  description: string;
  featuredLabel: string;
  featured: FeaturedProject;
  logLabel: string;
  log: LogEntry[];
  matrixTitle: string;
  matrixHeaders: {
    project: string;
    domain: string;
    stack: string;
    result: string;
    role: string;
    year: string;
  };
  matrix: {
    project: string;
    domain: string;
    stack: string;
    result: string;
    role: string;
    year: string;
  }[];
}

export interface CircuitStage {
  index: string;
  label: string;
  detail: string;
  tech: string;
  power: string;
}

export interface ArchitectureSection {
  kicker: string;
  headingLead: string;
  headingAccent: string;
  description: string;
  stages: CircuitStage[];
  note: string;
}

export interface ConstellationGroup {
  name: string;
  glow: "flame" | "magenta" | "violet" | "amber";
  items: string[];
}

export interface StackSection {
  kicker: string;
  heading: string;
  description: string;
  groups: ConstellationGroup[];
  note: string;
}

export interface JourneyItem {
  period: string;
  title: string;
  description: string;
  tone: "flame" | "glow" | "muted";
}

export interface JourneySection {
  kicker: string;
  heading: string;
  description: string;
  items: JourneyItem[];
}

export interface GithubSection {
  kicker: string;
  heading: string;
  description: string;
  metrics: { label: string }[];
  viewAll: string;
  updatedLabel: string;
  errorText: string;
  loadingText: string;
  logTitle: string;
  logEmpty: string;
}

export interface Trophy {
  index: string;
  title: string;
  detail: string;
  value: string;
  suffix: string;
  glow: "flame" | "magenta" | "violet" | "amber" | "emerald";
}

export interface Credential {
  name: string;
  issuer: string;
  acronym: string;
  href: string;
  glow: "flame" | "magenta" | "violet" | "amber" | "emerald";
}

export interface CredentialsSection {
  kicker: string;
  heading: string;
  description: string;
  trophies: Trophy[];
  credentialsLabel: string;
  credentials: Credential[];
  verifyCta: string;
}

export interface Principle {
  index: string;
  title: string;
  detail: string;
}

export interface PhilosophySection {
  kicker: string;
  headingLead: string;
  headingAccent: string;
  description: string;
  principles: Principle[];
  panelTitle: string;
  facts: IdentityFact[];
  panelFooter: { left: string; right: string };
}

export interface FaqQuestion {
  category: string;
  question: string;
  answer: string;
}

export interface FaqItem {
  index: string;
  category?: string;
  question: string;
  answer: string;
  questions?: FaqQuestion[];
}

export interface FaqSection {
  kicker: string;
  heading: string;
  description: string;
  items: FaqItem[];
}

export interface ContactChannel {
  kind: "link" | "location";
  label: string;
  handle: string;
  href: string;
  external?: boolean;
}

export interface ContactSection {
  kicker: string;
  headingLead: string;
  headingAccent: string;
  description: string;
  terminalTitle: string;
  greeting: string;
  context: string;
  request: string;
  emailLabel: string;
  copyLabel: string;
  copiedFeedback: string;
  responseTime: string;
  cards: { label: string; value: string; href: string }[];
  channels: ContactChannel[];
}

export interface FooterSection {
  copyright: string;
  rights: string;
  tagline: string;
  credit: string;
  location: string;
  timezone: string;
  navLabel: string;
  navTitle: string;
  navItems: {
    mission: string;
    work: string;
    architecture: string;
    stack: string;
    journey: string;
    github: string;
    credentials: string;
    philosophy: string;
    faq: string;
    contact: string;
  };
  contactTitle: string;
  contactItems: { href: string; label: string; external?: boolean }[];
  githubLabel: string;
  linkedinLabel: string;
  credlyLabel: string;
}

export interface MetaContent {
  title: string;
  description: string;
  ogAlt: string;
  keywords: string[];
}

export interface PortfolioContent {
  meta: MetaContent;
  nav: NavContent;
  intro: IntroHero;
  marquee: MarqueeItem[];
  mission: MissionSection;
  work: WorkSection;
  architecture: ArchitectureSection;
  stack: StackSection;
  journey: JourneySection;
  github: GithubSection;
  credentials: CredentialsSection;
  philosophy: PhilosophySection;
  faq: FaqSection;
  contact: ContactSection;
  footer: FooterSection;
}

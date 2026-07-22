/**
 * Modelo de contenido tipado del portafolio.
 * Cada diccionario de idioma (es/en) debe satisfacer `PortfolioContent`,
 * garantizando paridad total entre versiones.
 */

export interface NavContent {
  about: string;
  work: string;
  architecture: string;
  stack: string;
  credentials: string;
  contact: string;
  cta: string;
  menuOpen: string;
  menuClose: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroContent {
  status: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  scroll: string;
  stats: StatItem[];
}

export interface AboutFact {
  label: string;
  value: string;
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  panelTitle: string;
  facts: AboutFact[];
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
  tone: "accent" | "outline" | "muted";
}

export interface ExperienceContent {
  eyebrow: string;
  heading: string;
  description: string;
  items: TimelineItem[];
}

export interface WorkMetric {
  value: string;
  label: string;
  highlight?: boolean;
}

export interface FeaturedProject {
  flag: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  note: string;
  metrics: WorkMetric[];
}

export interface SecondaryProject {
  badge: string;
  badgeTone: "gold" | "green";
  meta: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectComparisonRow {
  project: string;
  domain: string;
  stack: string;
  result: string;
  role: string;
  year: string;
}

export interface WorkContent {
  eyebrow: string;
  heading: string;
  description: string;
  featured: FeaturedProject;
  secondary: SecondaryProject[];
  comparisonTitle: string;
  comparisonHeaders: {
    project: string;
    domain: string;
    stack: string;
    result: string;
    role: string;
    year: string;
  };
  comparison: ProjectComparisonRow[];
}

export interface GithubContent {
  eyebrow: string;
  heading: string;
  description: string;
  viewAll: string;
  updatedLabel: string;
  reposLabel: string;
  followersLabel: string;
  errorText: string;
  loadingText: string;
}

export interface ArchitectureLayer {
  label: string;
  detail: string;
  tech: string;
}

export interface ArchitectureContent {
  eyebrow: string;
  heading: string;
  description: string;
  layers: ArchitectureLayer[];
  note: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface StackContent {
  eyebrow: string;
  heading: string;
  description: string;
  groups: StackGroup[];
}

export interface Achievement {
  title: string;
  detail: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface CredentialsContent {
  eyebrow: string;
  heading: string;
  description: string;
  achievementsLabel: string;
  certificationsLabel: string;
  certificationsTotal: string;
  verifyCta: string;
  achievements: Achievement[];
  certifications: Certification[];
}

export interface ContactContent {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  description: string;
  emailCta: string;
  linkedinCta: string;
  githubCta: string;
}

export interface FooterContent {
  rights: string;
  tagline: string;
  builtWith: string;
  backToTop: string;
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
  hero: HeroContent;
  marquee: string[];
  about: AboutContent;
  experience: ExperienceContent;
  work: WorkContent;
  github: GithubContent;
  architecture: ArchitectureContent;
  stack: StackContent;
  credentials: CredentialsContent;
  contact: ContactContent;
  footer: FooterContent;
}

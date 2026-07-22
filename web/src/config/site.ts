/**
 * Configuracion global del sitio: datos que no dependen del idioma
 * (URLs, identidad, enlaces sociales, metadatos base).
 */

export const siteConfig = {
  name: "Ower Frank Lopez Arela",
  shortName: "Ower F. Lopez",
  initials: "OF",
  role: {
    es: "Junior Data Engineer & Backend Developer",
    en: "Junior Data Engineer & Backend Developer",
  },
  url: "https://owerlopez.dev",
  location: {
    es: "Arequipa, Peru",
    en: "Arequipa, Peru",
  },
  email: "owerfrank2004@gmail.com",
  phone: "+51 959 068 128",
  /** Usuario real de GitHub (verificado via API — "oFrank777" ya no existe). */
  githubUser: "OwerLopez",
  links: {
    github: "https://github.com/OwerLopez",
    linkedin: "https://www.linkedin.com/in/owerfrank-data/",
    credly: "https://www.credly.com/users/ower-frank-lopez-arela",
    email: "mailto:owerfrank2004@gmail.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;

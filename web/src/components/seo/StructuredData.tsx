import type { Locale } from "@/i18n/config";
import { siteConfig } from "@/config/site";
import { getContent } from "@/content";

/** JSON-LD (schema.org/Person) para enriquecer los resultados de busqueda. */
export function StructuredData({ locale }: { locale: Locale }) {
  const content = getContent(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    email: siteConfig.email,
    jobTitle: siteConfig.role[locale],
    description: content.meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Arequipa",
      addressCountry: "PE",
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: [
      "Backend Development",
      "Data Engineering",
      "Machine Learning",
      "Java",
      "Spring Boot",
      "Python",
      "SQL",
      "Cloud Computing",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad Nacional de San Agustin de Arequipa",
    },
  };

  return (
    <script
      type="application/ld+json"
      // El contenido es estatico y controlado; seguro para inyectar.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

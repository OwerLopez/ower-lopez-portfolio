import type { Locale } from "@/i18n/config";
import { siteConfig } from "@/config/site";
import { getContent } from "@/content";

/** JSON-LD (schema.org/Person) for rich search engine indexing. */
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
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.credly,
    ],
    knowsAbout: [
      "Backend Development",
      "Data Engineering",
      "Machine Learning",
      "ONNX Runtime",
      "Java",
      "Spring Boot",
      "Python",
      "SQL",
      "Cloud Computing",
      "PostgreSQL",
      "Docker",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad Nacional de San Agustin de Arequipa",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

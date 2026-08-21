import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description:
      "Portafolio de ingenieria — Backend, Data & AI. Ower Frank Lopez Arela.",
    start_url: "/es",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    lang: "es",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

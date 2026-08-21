import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getContent } from "@/content";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = "Ower Frank Lopez Arela — Backend, Data & AI Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const raw = (await Promise.resolve(params)).locale;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const content = getContent(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.35), transparent 65%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ color: "#a1a1aa", fontSize: 24, letterSpacing: 3, textTransform: "uppercase" }}>
            {siteConfig.role[locale]}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#fafafa",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            {content.intro.titleLines.join(" ")} {content.intro.titleAccent}
          </div>
          <div style={{ color: "#a1a1aa", fontSize: 28 }}>
            {siteConfig.name} · Arequipa, Peru
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Java · Spring Boot", "Python · SQL", "ONNX · Machine Learning"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  padding: "10px 22px",
                  color: "#d4d4d8",
                  fontSize: 22,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {chip}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}

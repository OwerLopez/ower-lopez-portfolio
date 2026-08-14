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
          background: "#08070a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(240, 112, 13,0.55), transparent 62%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(52, 230, 212,0.35), transparent 62%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #f0700d, #ffab38)",
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
          <div style={{ color: "#a7a0ac", fontSize: 26, letterSpacing: 4 }}>
            {siteConfig.role[locale].toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#f6f3ee",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {content.intro.titleLines.join(" ")} {content.intro.titleAccent}
          </div>
          <div style={{ color: "#a7a0ac", fontSize: 30 }}>
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
                  padding: "12px 24px",
                  color: "#d8d2c8",
                  fontSize: 24,
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

import { ImageResponse } from "@vercel/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface PostOgImageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostOgImage({ params }: PostOgImageProps) {
  const { slug } = await params;

  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const date = "";
  const tags: string[] = [];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1025 50%, #0f1a2e 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            width: "100%",
            zIndex: 1,
          }}
        >
          {/* Tags */}
          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "12px",
                    color: "rgba(139,92,246,0.9)",
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    borderRadius: "9999px",
                    padding: "4px 14px",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 40 ? "48px" : "56px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          {/* Date */}
          {date && (
            <div
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.05em",
                marginBottom: "40px",
              }}
            >
              {date}
            </div>
          )}

          {/* Bottom bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "40px",
                background: "linear-gradient(90deg, rgba(139,92,246,0.6), transparent)",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.05em",
              }}
            >
              Aura
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.15)",
              }}
            >
              ·
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.05em",
              }}
            >
              aura.blog
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

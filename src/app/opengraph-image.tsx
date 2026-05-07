import { ImageResponse } from "@vercel/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
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
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
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
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                color: "rgba(139,92,246,0.8)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Digital Garden
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Aura
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.4,
              maxWidth: "600px",
              fontWeight: 400,
            }}
          >
            Ethereal Digital Garden — Exploring design, code, and the quiet beauty of restraint.
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "48px",
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
              aura.blog
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

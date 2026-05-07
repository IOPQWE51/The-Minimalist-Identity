import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Aura";
  const description = searchParams.get("description") || "Ethereal Digital Garden";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#050505",
          padding: "60px",
          justifyContent: "space-between",
          fontFamily: "system-ui",
        }}
      >
        {/* Aurora-like background orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,132,255,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "15%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div
            style={{
              fontSize: "14px",
              color: "rgba(168,132,255,0.8)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Aura — Digital Garden
          </div>
          <div
            style={{
              fontSize: title.length > 50 ? "36px" : "48px",
              fontWeight: 700,
              color: "#f5f5f5",
              lineHeight: 1.2,
              maxWidth: "800px",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: "18px",
                color: "rgba(160,160,160,0.8)",
                marginTop: "16px",
                maxWidth: "600px",
                lineHeight: 1.5,
              }}
            >
              {description.length > 120 ? description.slice(0, 120) + "..." : description}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: 700,
              color: "#f5f5f5",
            }}
          >
            A
          </div>
          <span style={{ fontSize: "14px", color: "rgba(160,160,160,0.6)" }}>
            aura.garden
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

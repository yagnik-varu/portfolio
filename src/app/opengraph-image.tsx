import { ImageResponse } from "next/og";

export const alt = "Yagnik Varu | Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0B", // background color (tailwind surface/background)
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top/Brand Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#0A0A0B",
            }}
          >
            Y
          </div>
          <span style={{ color: "#E2E8F0", fontSize: "32px", fontWeight: "600", letterSpacing: "-0.02em" }}>
            yagnikvaru.dev
          </span>
        </div>

        {/* Center/Title Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ color: "#94A3B8", fontSize: "32px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Portfolio & Architecture Lab
          </div>
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "800",
              color: "#F8FAFC",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            Backend Engineer & Systems Architect.
          </h1>
        </div>

        {/* Bottom Section */}
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ color: "#14b8a6", fontSize: "24px", fontWeight: "600" }}>Node.js</span>
            <span style={{ color: "#64748B", fontSize: "24px" }}>/</span>
            <span style={{ color: "#14b8a6", fontSize: "24px", fontWeight: "600" }}>TypeScript</span>
            <span style={{ color: "#64748B", fontSize: "24px" }}>/</span>
            <span style={{ color: "#14b8a6", fontSize: "24px", fontWeight: "600" }}>PostgreSQL</span>
          </div>
          <div style={{ color: "#64748B", fontSize: "24px", display: "flex", gap: "12px", alignItems: "center" }}>
            One Developer. Two Perspectives.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

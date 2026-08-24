import { ImageResponse } from "next/og";
import { getProjects } from "@/lib/mdx/projects";


export const alt = "Project Architecture & Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);

  if (!project) {
    return new Response("Not Found", { status: 404 });
  }

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
          backgroundColor: "#0A0A0B",
          padding: "80px",
          fontFamily: "sans-serif",
          border: "4px solid #14b8a6", // Primary color border accent
        }}
      >
        {/* Top/Brand Section */}
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
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
          
          <div style={{ color: "#14b8a6", fontSize: "24px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "600" }}>
            Project Case Study
          </div>
        </div>

        {/* Center/Title Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "950px" }}>
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "800",
              color: "#F8FAFC",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "#94A3B8",
              lineHeight: 1.4,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.summary}
          </p>
        </div>

        {/* Bottom Section */}
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", maxWidth: "800px" }}>
            {project.stack?.backend?.slice(0, 3).map((tech, i) => (
              <div key={tech} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ color: "#14b8a6", fontSize: "28px", fontWeight: "600" }}>{tech}</span>
                {i < Math.min((project.stack?.backend?.length || 0) - 1, 2) && (
                  <span style={{ color: "#64748B", fontSize: "28px" }}>/</span>
                )}
              </div>
            ))}
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
            <span style={{ color: "#64748B", fontSize: "20px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Architecture</span>
            <span style={{ color: "#F8FAFC", fontSize: "28px", fontWeight: "600" }}>{project.architectureType}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

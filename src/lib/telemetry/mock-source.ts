import type { Telemetry, TelemetryAdapter } from "../validation/telemetry.schema";

/**
 * A static mock implementation of the TelemetryAdapter contract.
 * Serves as an interchangeable source to build/test the UI without external API dependencies,
 * and acts as a safe fallback when external APIs fail.
 */
export const getMockTelemetry: TelemetryAdapter = async (): Promise<Telemetry> => {
  // Simulate network delay to ensure the UI gracefully handles loading states
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    provider: "mock-static-data",
    contributions: 1337,
    repositories: 42,
    languages: [
      { name: "TypeScript", percentage: 65.5 },
      { name: "Python", percentage: 20.0 },
      { name: "Go", percentage: 10.5 },
      { name: "Rust", percentage: 4.0 },
    ],
  };
};

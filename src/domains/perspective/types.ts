export type Perspective = "overview" | "architecture";

export interface PerspectiveConfig {
  id: Perspective;
  label: string;
  description: string;
  densityLevel: string;
  enabledModules: string[];
}

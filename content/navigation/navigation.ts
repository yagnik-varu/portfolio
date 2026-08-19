import type { NavigationItem } from "@/lib/validation/navigation.schema";

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/", perspectives: ["overview", "architecture"] },
  { label: "Projects", href: "/projects", perspectives: ["overview", "architecture"] },
  { label: "Experience", href: "/#experience", perspectives: ["overview", "architecture"] },
  { label: "Contact", href: "/#contact", perspectives: ["overview", "architecture"] },
  { label: "Architecture Lab", href: "/architecture-lab", perspectives: ["architecture"] },
  { label: "Telemetry", href: "/telemetry", perspectives: ["architecture"] },
];

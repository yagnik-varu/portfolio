import type { NavigationItem } from "@/lib/validation/navigation.schema";

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/", perspectives: ["overview", "architecture"] },
  { label: "Projects", href: "/projects", perspectives: ["overview", "architecture"] },
  { label: "Experience", href: "/#experience", perspectives: ["overview", "architecture"] },
  // Engineer-only items sit before Contact so the extra links read as
  // "capabilities added" rather than appended (docs/02 §7).
  { label: "Architecture Lab", href: "/architecture-lab", perspectives: ["architecture"] },
  { label: "Telemetry", href: "/telemetry", perspectives: ["architecture"] },
  { label: "Contact", href: "/#contact", perspectives: ["overview", "architecture"] },
];

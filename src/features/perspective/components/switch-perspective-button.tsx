"use client";

import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store-provider";
import { getPerspectiveLabel } from "@/domains/perspective/config";
import { Button, type ButtonProps } from "@/shared/components/button/button";

interface SwitchPerspectiveButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  to: Perspective;
  children?: React.ReactNode;
}

/**
 * Small client leaf so Server Components (teasers, sections) can offer a
 * one-click perspective switch without becoming client components themselves.
 */
export function SwitchPerspectiveButton({ to, children, ...props }: SwitchPerspectiveButtonProps) {
  const setPerspective = usePerspectiveStore((state) => state.setPerspective);

  return (
    <Button {...props} onClick={() => setPerspective(to)}>
      {children ?? `Switch to ${getPerspectiveLabel(to)} view`}
    </Button>
  );
}

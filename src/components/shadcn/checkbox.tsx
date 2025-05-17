"use client";

import { cn } from "@/utils/cn";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import * as React from "react";
import { HelperText } from "../commons/helper-text";

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: string;
  description?: string;
  helperText?: string;
  hasError?: boolean;
}

function Checkbox({
  label,
  description,
  helperText,
  hasError,
  disabled,
  className,
  ...props
}: CheckboxProps) {
  return (
    <label className="flex flex-col gap-2">
      <div className="flex items-center gap-3 rounded-md border p-4">
        <CheckboxPrimitive.Root
          data-slot="checkbox"
          className={cn(
            "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-current transition-none"
          >
            <CheckIcon className="size-3.5" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        <div className="flex flex-col gap-1">
          <div className="text-sm leading-none font-medium">{label}</div>
          <div className="text-muted-foreground text-sm">{description}</div>
        </div>
      </div>

      {helperText && (
        <HelperText
          className={cn(disabled && "opacity-70", hasError && "text-red-500")}
        >
          {helperText}
        </HelperText>
      )}
    </label>
  );
}

export { Checkbox };

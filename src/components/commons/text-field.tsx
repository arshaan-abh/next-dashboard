"use client";

import { cn } from "@/utils/cn";
import {
  ComponentProps,
  ReactNode,
  FC,
  InputHTMLAttributes,
  useMemo,
} from "react";
import { Input } from "../shadcn/input";
import { HelperText } from "./helper-text";

export interface TextFieldProps extends ComponentProps<typeof Input> {
  type?: "number" | "email" | "password" | "search" | "tel" | "text" | "url";
  label?: ReactNode;
  helperText?: ReactNode;
  hasError?: boolean;
}

export const TextField: FC<TextFieldProps> = ({
  type = "text",
  label,
  helperText,
  hasError,

  className,
  disabled,
  ...otherInputProps
}) => {
  const inputModes: Record<
    typeof type,
    InputHTMLAttributes<HTMLInputElement>["inputMode"]
  > = useMemo(
    () => ({
      number: "numeric",
      email: "email",
      password: undefined, // text
      search: "search",
      tel: "tel",
      text: undefined, // text
      url: "url",
    }),
    [],
  );

  const dirs: Record<
    typeof type,
    InputHTMLAttributes<HTMLInputElement>["dir"]
  > = useMemo(
    () => ({
      number: "ltr",
      email: "ltr",
      password: "ltr",
      search: "rtl",
      tel: "ltr",
      text: "rtl",
      url: "ltr",
    }),
    [],
  );

  return (
    <label className="flex flex-col gap-2">
      {label && (
        <div
          className={cn(
            "text-sm leading-none font-medium",
            disabled && "opacity-70",
          )}
        >
          {label}
        </div>
      )}

      <Input
        type="text"
        dir={dirs[type]}
        inputMode={inputModes[type]}
        className={cn("b", hasError && "", className)}
        disabled={disabled}
        {...otherInputProps}
      />

      {helperText && (
        <HelperText
          className={cn(disabled && "opacity-70", hasError && "text-red-500")}
        >
          {helperText}
        </HelperText>
      )}
    </label>
  );
};

// TODO format price

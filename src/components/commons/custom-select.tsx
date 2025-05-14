"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/shadcn/select";
import { cn } from "@/utils/cn";
import { ComponentProps, ReactNode, FC, useMemo } from "react";
import { HelperText } from "./helper-text";

interface CustomSelectProps extends ComponentProps<typeof Select> {
  options: { value: string; children: ReactNode }[];
  optionsLabel?: ReactNode;
  label?: ReactNode;
  placeholder?: ReactNode;
  helperText?: ReactNode;
  hasError?: boolean;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  options,
  optionsLabel,
  label,
  placeholder,
  helperText,
  hasError,
  disabled,
  ...props
}) => {
  const indexedOptions = useMemo(
    () => options.map((option, index) => ({ ...option, index })),
    [options],
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

      <Select {...props}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionsLabel && <SelectLabel>{optionsLabel}</SelectLabel>}
            {indexedOptions.map(({ index, value, children }) => (
              <SelectItem key={index} value={value}>
                {children}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

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

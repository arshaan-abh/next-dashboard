"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { Button } from "../shadcn/button";
import { cn } from "@/utils/cn";

interface Option {
  label: string;
  value: string | number;
}

interface ControlledDropdownFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

export const ControlledDropdownField = <T extends FieldValues>({
  name,
  options,
  placeholder = "Select...",
  disabled,
  label,
}: ControlledDropdownFieldProps<T>) => {
  const { control } = useFormContext<T>();
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selected = options.find((opt) => opt.value === field.value);

        return (
          <div className="w-full">
            {label && (
              <label
                htmlFor={name}
                className={cn(
                  "text-sm leading-none font-medium",
                  disabled && "opacity-70",
                )}
              >
                {label}
              </label>
            )}
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-between ${
                    error ? "border-red-500" : ""
                  }`}
                  disabled={disabled}
                >
                  {selected?.label || placeholder}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {options.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => {
                      field.onChange(option.value);
                      setOpen(false);
                    }}
                    className={
                      option.value === field.value ? "font-semibold" : ""
                    }
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {error && (
              <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

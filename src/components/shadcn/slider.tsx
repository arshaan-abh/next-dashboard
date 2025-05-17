"use client";

import { cn } from "@/utils/cn";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { HelperText } from "../commons/helper-text";

function Slider({
  unit,
  helperText,
  hasError,
  disabled,
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: {
  unit?: React.ReactNode;
  helperText?: string;
  hasError?: boolean;
} & React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <label className="flex flex-col gap-4">
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          >
            <SliderThumbPopup>
              {[_values[index], unit]
                .filter((item) => item !== undefined)
                .join(" ")}
            </SliderThumbPopup>
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>

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

function SliderThumbPopup({
  side = "right",
  className,
  children,
  ...otherDivProps
}: {
  side?: "right" | "bottom" | "left"; // | "top";
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground pointer-events-none relative z-50 flex w-max items-center justify-center rounded-md border px-4 py-2 shadow-md outline-hidden",
        side === "right" && "translate-x-[calc(0%+24px)] translate-y-[-14px]",
        side === "bottom" && "translate-x-[calc(-50%+7px)] translate-y-[24px]",
        side === "left" && "translate-x-[calc(-100%-10px)] translate-y-[-14px]",
        className,
      )}
      {...otherDivProps}
    >
      <svg
        width={
          side === "bottom"
            ? "10"
            : side === "right" || side === "left"
              ? "5"
              : undefined
        }
        height={
          side === "bottom"
            ? "5"
            : side === "right" || side === "left"
              ? "10"
              : undefined
        }
        viewBox={
          side === "bottom"
            ? "0 0 30 10"
            : side === "right" || side === "left"
              ? "0 0 10 30"
              : undefined
        }
        preserveAspectRatio="none"
        className={cn(
          "fill-border absolute block",
          side === "right" && "-left-px -translate-x-full",
          side === "bottom" && "-top-px -translate-y-full",
          side === "left" && "-right-px translate-x-full",
        )}
      >
        {side === "right" && <polygon points="10,0 10,30 0,15" />}
        {side === "bottom" && <polygon points="0,10 30,10 15,0" />}
        {side === "left" && <polygon points="0,0 0,30 10,15" />}
      </svg>
      {children}
    </div>
  );
}

export { Slider };

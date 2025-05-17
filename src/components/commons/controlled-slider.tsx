"use client";

import { Slider } from "@/components/shadcn/slider";
import { ComponentProps, FormEvent, useCallback } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

interface ControlledSliderProps<T extends FieldValues>
  extends ComponentProps<typeof Slider> {
  name: Path<T>;
  saveAsNumber?: boolean;
}

export const ControlledSlider = <T extends FieldValues>({
  name,
  saveAsNumber,

  helperText,
  ...otherSliderProps
}: ControlledSliderProps<T>) => {
  const { control } = useFormContext();

  const getValueFromEvent = useCallback(
    (event: FormEvent<HTMLDivElement>) =>
      (event.target as HTMLInputElement).value,
    [],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...otherFieldProps },
        fieldState: { error },
      }) => (
        <Slider
          defaultValue={[value]}
          onChange={(e) =>
            onChange(
              saveAsNumber
                ? parseInt(getValueFromEvent(e))
                : getValueFromEvent(e),
            )
          }
          helperText={error?.message ?? helperText}
          hasError={error ? true : false}
          {...otherFieldProps}
          {...otherSliderProps}
        />
      )}
    />
  );
};

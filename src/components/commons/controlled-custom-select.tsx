"use client";

import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { CustomSelect } from "./custom-select";

interface ControlledSelectProps<T extends FieldValues>
  extends ComponentProps<typeof CustomSelect> {
  name: Path<T>;
}

export const ControlledCustomSelect = <T extends FieldValues>({
  name,
  helperText,
  ...otherCustomSelectProps
}: ControlledSelectProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...otherFieldProps },
        fieldState: { error },
      }) => (
        <CustomSelect
          value={value}
          onValueChange={onChange}
          helperText={error?.message ?? helperText}
          hasError={error ? true : false}
          {...otherCustomSelectProps}
          {...otherFieldProps}
        />
      )}
    />
  );
};

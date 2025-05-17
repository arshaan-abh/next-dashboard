"use client";

import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Checkbox } from "../shadcn/checkbox";

interface ControlledCheckboxProps<T extends FieldValues>
  extends ComponentProps<typeof Checkbox> {
  name: Path<T>;
}

export const ControlledCheckbox = <T extends FieldValues>({
  name,
  helperText,
  ...otherCheckboxProps
}: ControlledCheckboxProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...otherFieldProps },
        fieldState: { error },
      }) => (
        <Checkbox
          checked={value}
          onCheckedChange={onChange}
          helperText={error?.message ?? helperText}
          hasError={error ? true : false}
          {...otherFieldProps}
          {...otherCheckboxProps}
        />
      )}
    />
  );
};

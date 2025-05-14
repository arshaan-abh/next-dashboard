"use client";

import { ComponentProps } from "react";
import { FieldValues, Path, useFormContext, Controller } from "react-hook-form";
import { CustomSelect } from "./custom-select";

interface ControlledSelectProps<T extends FieldValues>
  extends ComponentProps<typeof CustomSelect> {
  name: Path<T>;
  saveAsNumber?: boolean;
}

export const ControlledCustomSelect = <T extends FieldValues>({
  name,
  saveAsNumber,
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
          {...otherCustomSelectProps}
          {...otherFieldProps}
        />
      )}
    />
  );
};

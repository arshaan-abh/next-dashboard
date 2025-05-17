"use client";

import { ComponentProps } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormStateReturn,
} from "react-hook-form";
import { Button } from "../shadcn/button";

interface ControlledButtonProps<T extends FieldValues>
  extends ComponentProps<typeof Button> {
  name: Path<T>;
  value: FieldPathValue<T, Path<T>>;
  generateButtonProps?: (props: {
    field: ControllerRenderProps<FieldValues, Path<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => ComponentProps<typeof Button>;
}

export const ControlledButton = <T extends FieldValues>({
  name,
  value: buttonValue,
  generateButtonProps,
  onClick,
  ...otherButtonProps
}: ControlledButtonProps<T>) => {
  return (
    <Controller
      name={name}
      render={(props) => {
        const { onChange } = props.field;
        return (
          <Button
            onClick={(e) => {
              onChange(buttonValue);
              onClick?.(e);
            }}
            {...otherButtonProps}
            {...generateButtonProps?.(props)}
          />
        );
      }}
    />
  );
};

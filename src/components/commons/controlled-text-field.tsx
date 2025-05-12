"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "./text-field";
import { ChangeEvent, useCallback } from "react";
import { convertPersianToEnglishNumbers } from "@/utils/convert-persian-to-english-numbers";

interface ControlledTextFieldProps<T extends FieldValues>
  extends TextFieldProps {
  name: Path<T>;
  saveAsNumber?: boolean;
}

export const ControlledTextField = <T extends FieldValues>({
  name,
  saveAsNumber,
  // text field props:
  helperText,
  ...otherTextFieldProps
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext();

  const extractDigitsOnly = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      convertPersianToEnglishNumbers(e.target.value).replace(/\D/g, ""),
    [],
  );

  const extractNumberFromInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      parseInt(extractDigitsOnly(event)),
    [extractDigitsOnly],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...otherFieldProps },
        fieldState: { error },
      }) => (
        <TextField
          hasError={error ? true : false}
          helperText={error?.message ?? helperText}
          value={value ?? ""}
          onChange={(e) =>
            onChange(
              otherTextFieldProps.type === "number"
                ? saveAsNumber
                  ? isNaN(extractNumberFromInput(e))
                    ? 0
                    : extractNumberFromInput(e)
                  : extractDigitsOnly(e)
                : e.target.value,
            )
          }
          {...otherFieldProps}
          {...otherTextFieldProps}
        />
      )}
    />
  );
};

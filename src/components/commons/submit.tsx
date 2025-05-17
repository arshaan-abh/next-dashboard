"use client";

import { ComponentProps, FC } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../shadcn/button";
import { Loading } from "./loading";

export const Submit: FC<ComponentProps<typeof Button>> = ({
  disabled,
  children,
  ...otherProps
}) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button type="submit" disabled={disabled || isSubmitting} {...otherProps}>
      {isSubmitting ? <Loading /> : children}
    </Button>
  );
};

// TODO handle form errors

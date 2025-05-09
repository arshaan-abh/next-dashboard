"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/utils/cn";
import { LoaderCircle, LucideProps } from "lucide-react";
import { useLinkStatus } from "next/link";
import { FC } from "react";

export const LoadingIndicator: FC<LucideProps> = ({
  className,
  ...otherProps
}) => {
  const { pending } = useLinkStatus();
  const { debouncedState } = useDebounce(pending, 300);

  return debouncedState ? (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", className)}
      {...otherProps}
    />
  ) : null;
};

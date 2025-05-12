import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export const HelperText = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("text-muted-foreground text-sm", className)}>
      {children}
    </div>
  );
};

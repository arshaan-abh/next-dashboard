import { cn } from "@/utils/cn";
import { LoaderCircle, LucideProps } from "lucide-react";
import { FC } from "react";

export const Loading: FC<LucideProps> = ({ className, ...otherProps }) => {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", className)}
      {...otherProps}
    />
  );
};

import { cn } from "@/utils/cn";
import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  align?: "left" | "center" | "right";
  as?: "h1" | "h2" | "h3" | "h4" | "p";
}

export function Typography({
  children,
  className,
  size = "lg",
  align = "left",
  as: Tag = "h2",
  ...props
}: TypographyProps) {
  const sizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-2xl",
    lg: "text-[32px]",
    xl: "text-4xl font-bold",
  };

  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Tag className={cn(sizeMap[size], alignMap[align], className)} {...props}>
      {children}
    </Tag>
  );
}

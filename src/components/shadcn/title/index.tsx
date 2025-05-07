/**
 * @module Title
 * @description
 * A customizable heading component for displaying titles with different sizes and text alignments.
 *
 * This component supports semantic HTML heading tags (h1 - h4) and offers utility-based styling
 * with customizable size and alignment options. The component is built using Tailwind CSS and
 * the `cn` utility for class name merging.
 *
 * @example
 * ```tsx
 * import { Title } from "@/components/ui/title";
 *
 * function Page() {
 *   return (
 *     <Title size="xl" align="center" as="h1">
 *       Welcome to the Dashboard
 *     </Title>
 *   );
 * }
 * ```
 */

import React from "react";
import { cn } from "@/utils/cn";

/**
 * @typedef {"sm" | "md" | "lg" | "xl"} TitleSize
 * @typedef {"left" | "center" | "right"} TitleAlign
 * @typedef {"h1" | "h2" | "h3" | "h4"} TitleTag
 */

/**
 * @typedef {Object} TitleProps
 * @property {React.ReactNode} children - The content of the title.
 * @property {TitleSize} [size="lg"] - The visual size of the title.
 * @property {TitleAlign} [align="left"] - The text alignment.
 * @property {TitleTag} [as="h2"] - The HTML tag to render the title as.
 * @property {string} [className] - Additional class names to apply.
 * @property {React.HTMLAttributes<HTMLHeadingElement>} [props] - Additional props passed to the heading.
 */

/**
 * Title component
 *
 * @param {TitleProps} props
 * @returns {JSX.Element}
 */

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  align?: "left" | "center" | "right";
  as?: "h1" | "h2" | "h3" | "h4";
}

export function Title({
  children,
  className,
  size = "lg",
  align = "left",
  as: Tag = "h2",
  ...props
}: TitleProps) {
  const sizeMap = {
    xs: "text-xs",
    sm: "text-xl",
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
    <Tag
      className={cn(
        "tracking-tight",
        sizeMap[size],
        alignMap[align],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

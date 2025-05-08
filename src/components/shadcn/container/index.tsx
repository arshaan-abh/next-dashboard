import React from "react";
import { cn } from "@/utils/cn";

/**
 * `Container` is a layout component used to wrap content with consistent horizontal padding and
 * optional width constraints based on the selected variant.
 *
 * ### Variants:
 * - `"small"`: Applies a max width of `max-w-md` (~28rem), centers the content.
 * - `"large"` (default): Applies a max width of `max-w-7xl` (~80rem), centers the content.
 * - `"full"`: Applies full width with horizontal padding.
 *
 * ### Props:
 * @prop {React.ReactNode} children - The content to render inside the container.
 * @prop {string} [className] - Optional additional Tailwind CSS classes.
 * @prop {"small" | "large" | "full"} [variant="large"] - Defines the container's max width and layout.
 * @prop {React.HTMLAttributes<HTMLDivElement>} [props] - Any other native div props are supported.
 *
 * ### Example:
 * ```tsx
 * <Container variant="small" className="bg-gray-100">
 *   <p>Hello, world!</p>
 * </Container>
 * ```
 */

type ContainerVariant = "small" | "large" | "full";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ContainerVariant;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  variant = "full",
  ...props
}) => {
  const variantClass = {
    small: "max-w-[1200px] mx-auto px-4",
    large: "max-w-7xl mx-auto px-4",
    full: "w-full px-[72px]",
  };

  return (
    <div className={cn(variantClass[variant], className)} {...props}>
      {children}
    </div>
  );
};

export default Container;

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const variants = cva(
  "m-0 inline-flex cursor-pointer items-center justify-center gap-[4px] border border-solid border-transparent bg-transparent p-0",
  {
    variants: {
      variant: {
        contained: "text-white shadow-sm",
        outline: "border-2 bg-transparent hover:text-white",
        text: "bg-transparent border-0 hover:bg-opacity-10",
      },
      size: {
        small: "text-sm px-3 py-1.5 h-8",
        medium: "text-sm px-4 py-2 h-10",
        large: "text-base px-6 py-3 h-12",
      },
      color: {
        primary: "",
        secondary: "",
        warning: "",
        danger: "",
        success: "",
      },
    },
    compoundVariants: [
      // Primary variants
      {
        variant: "contained",
        color: "primary",
        className: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      },
      {
        variant: "outline",
        color: "primary",
        className:
          "border-blue-600 text-blue-600 hover:bg-blue-600 focus:ring-blue-500",
      },
      {
        variant: "text",
        color: "primary",
        className: "text-blue-600 hover:bg-blue-100 focus:ring-blue-500",
      },
      // Secondary variants
      {
        variant: "contained",
        color: "secondary",
        className: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-gray-600 text-gray-600 hover:bg-gray-600 focus:ring-gray-500",
      },
      {
        variant: "text",
        color: "secondary",
        className: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
      },
      // Warning variants
      {
        variant: "contained",
        color: "warning",
        className: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "border-yellow-500 text-yellow-600 hover:bg-yellow-500 focus:ring-yellow-400",
      },
      {
        variant: "text",
        color: "warning",
        className: "text-yellow-600 hover:bg-yellow-100 focus:ring-yellow-400",
      },
      // Danger variants
      {
        variant: "contained",
        color: "danger",
        className: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "border-red-600 text-red-600 hover:bg-red-600 focus:ring-red-500",
      },
      {
        variant: "text",
        color: "danger",
        className: "text-red-600 hover:bg-red-100 focus:ring-red-500",
      },
      // Success variants
      {
        variant: "contained",
        color: "success",
        className: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "border-green-600 text-green-600 hover:bg-green-600 focus:ring-green-500",
      },
      {
        variant: "text",
        color: "success",
        className: "text-green-600 hover:bg-green-100 focus:ring-green-500",
      },
    ],
    defaultVariants: {
      variant: "contained",
      size: "medium",
      color: "primary",
    },
  }
);

interface ButtonProps
  extends Omit<BaseButtonProps, "color">,
    VariantProps<typeof variants> {
  isLoading?: boolean;
}

function Button({
  children,
  className,
  color,
  variant,
  size,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = isLoading || disabled;

  return (
    <button
      disabled={isDisabled}
      className={twMerge(variants({ variant, color, size }), className)}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}

export type { ButtonProps };
export { Button };

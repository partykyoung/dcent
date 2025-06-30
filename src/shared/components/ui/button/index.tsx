import { type VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const variants = cva("rounded-[4px] transition-colors", {
  variants: {
    variant: {
      contained: "",
      outline: "",
      text: "",
    },
    size: {
      small: "caption px-[10px] py-[4px]",
      medium: "body-2 px-[12px] py-[8px]",
      large: "body-2 px-[12px] py-[10px]",
    },
    color: {
      primary: "bg-primary border-primary text-primary hover:bg-primary/80",
      secondary:
        "bg-secondary border-secondary text-secondary hover:bg-secondary/80",
      warning: "bg-warning border-warning text-warning  hover:bg-warning/80",
      danger: "bg-danger border-danger text-danger hover:bg-danger/80",
      success: "bg-success border-success text-success hover:bg-success/80",
    },
  },
  compoundVariants: [
    {
      variant: "contained",
      className: "border-transparent text-white",
    },
    {
      variant: "outline",
      className: "bg-transparent hover:border-transparent hover:text-white",
    },
    {
      variant: "text",
      className: "bg-transparent border-transparent  hover:text-white",
    },
  ],
  defaultVariants: {
    variant: "contained",
    size: "small",
    color: "primary",
  },
});

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
  size = "small",
  isLoading,
  ...props
}: ButtonProps) {
  const disabled = isLoading || props.disabled;

  return (
    <button
      disabled={disabled}
      className={twMerge(
        variants({ variant, color, size, className }),
        disabled && "pointer-events-none opacity-50"
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export type { ButtonProps };
export { Button };

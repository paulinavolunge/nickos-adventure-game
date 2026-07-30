import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const bigButtonVariants = cva(
  "inline-flex min-h-14 items-center justify-center gap-3 rounded-3xl px-7 py-4 text-lg font-display font-extrabold tracking-wide transition-transform duration-150 active:translate-y-1 active:shadow-none disabled:opacity-60 disabled:active:translate-y-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-[var(--shadow-toy)]",
        sunny: "bg-sunny text-sunny-foreground shadow-[var(--shadow-toy)]",
        coral: "bg-coral text-coral-foreground shadow-[var(--shadow-toy)]",
        grape: "bg-grape text-grape-foreground shadow-[var(--shadow-toy)]",
        accent: "bg-accent text-accent-foreground shadow-[var(--shadow-toy)]",
        quiet: "bg-card text-card-foreground border-4 border-border",
      },
      size: {
        default: "",
        lg: "min-h-16 px-9 text-2xl",
        icon: "min-h-14 min-w-14 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof bigButtonVariants>;

export function BigButton({ className, variant, size, ...props }: Props) {
  return <button className={cn(bigButtonVariants({ variant, size }), className)} {...props} />;
}
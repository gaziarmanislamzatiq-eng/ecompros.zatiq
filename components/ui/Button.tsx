import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type LinkButtonProps = CommonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof LinkProps | "children" | "className"
  > &
  LinkProps & {
    href: LinkProps["href"];
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  ghost: "btn--ghost",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "btn--sm",
  md: "btn--md",
  lg: "btn--lg",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Button(props: ButtonProps) {
  if ("href" in props && props.href !== undefined) {
    const {
      children,
      className,
      size = "md",
      variant = "primary",
      href,
      ...linkProps
    } = props;

    return (
      <Link
        className={cn("btn", variantClasses[variant], sizeClasses[size], className)}
        {...linkProps}
        href={href}
      >
        {children}
      </Link>
    );
  }

  const {
    children,
    className,
    size = "md",
    type = "button",
    variant = "primary",
    ...buttonProps
  } = props;

  return (
    <button
      className={cn("btn", variantClasses[variant], sizeClasses[size], className)}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

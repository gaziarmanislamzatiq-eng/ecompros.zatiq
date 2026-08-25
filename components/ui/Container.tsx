import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerSize = "default" | "narrow" | "wide" | "full";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-[var(--container)]",
  narrow: "max-w-4xl",
  wide: "max-w-[88rem]",
  full: "max-w-none",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  size = "default",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

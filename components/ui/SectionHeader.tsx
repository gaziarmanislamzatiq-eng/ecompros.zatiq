import type { ReactNode } from "react";

type SectionHeaderProps = {
  align?: "left" | "center";
  body?: string;
  className?: string;
  cta?: ReactNode;
  eyebrow?: string;
  title: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SectionHeader({
  align = "left",
  body,
  className,
  cta,
  eyebrow,
  title,
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCentered && "items-center text-center",
        className
      )}
    >
      <div className={cn("max-w-3xl space-y-3", isCentered && "items-center")}>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
          {title}
        </h2>
        {body ? (
          <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            {body}
          </p>
        ) : null}
      </div>
      {cta ? <div>{cta}</div> : null}
    </div>
  );
}

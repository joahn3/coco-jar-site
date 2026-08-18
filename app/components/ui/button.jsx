import Link from "next/link";
import { cn } from "./cn";

const variants = {
  primary:
    "bg-[var(--ds-accent)] text-[var(--ds-text-on-primary)] hover:brightness-105 shadow-[var(--ds-shadow-cta)] focus-visible:ring-offset-[var(--ds-surface-page)]",
  whatsapp:
    "bg-[var(--color-whatsapp)] text-[var(--ds-text-on-primary)] shadow-[var(--ds-shadow-elevated)] hover:brightness-105 focus-visible:ring-offset-[var(--ds-surface-page)]",
  secondary:
    "border border-[color:var(--ds-border)] bg-[var(--ds-surface-subtle)] text-[var(--ds-text-primary)] hover:border-[var(--ds-accent)] hover:bg-[color-mix(in srgb,var(--ds-surface-card) 88%,transparent)] focus-visible:ring-offset-[var(--ds-surface-page)]",
  ghost:
    "border border-[color:var(--ds-border)] bg-transparent text-[var(--ds-text-primary)] hover:border-[var(--ds-accent)] hover:text-[var(--ds-accent)] hover:bg-[color-mix(in srgb,var(--ds-accent) 8%,transparent)] focus-visible:ring-offset-[var(--ds-surface-page)]",
};

export default function Button({
  as = "a",
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const baseClass =
    "inline-flex min-h-11 min-w-11 touch-target items-center justify-center rounded-full px-4 py-2.5 text-sm sm:text-base font-semibold tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--ds-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ds-surface-page)] disabled:cursor-not-allowed disabled:opacity-65 relative overflow-hidden";

  const combined = cn(baseClass, variants[variant], className);

  if (as === "button") {
    return (
      <button className={combined} {...props}>
        {children}
      </button>
    );
  }

  if (as === "next-link") {
    return (
      <Link className={combined} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a className={combined} href={href} {...props}>
      {children}
    </a>
  );
}

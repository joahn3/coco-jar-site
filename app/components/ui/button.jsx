import Link from "next/link";
import { cn } from "./cn";

const variants = {
  primary:
    "bg-gradient-to-r from-brand-500 to-brand-700 text-ink-overlay hover:brightness-110 shadow-elevated hover:from-brand-400 hover:to-brand-800 focus-visible:ring-offset-surface-base",
  whatsapp:
    "bg-gradient-to-r from-jar-ember to-brand-700 text-ink-overlay shadow-elevated hover:from-brand-500 hover:to-brand-800 hover:brightness-110 focus-visible:ring-offset-surface-base",
  ghost:
    "border border-line-soft bg-surface-raised/65 text-ink-title hover:border-brand-500 hover:text-brand-400 hover:bg-surface-raised",
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
    "inline-flex min-h-11 w-max touch-target items-center justify-center rounded-full px-4 py-2.5 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base transform active:translate-y-px active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-65 relative overflow-hidden premium-cta";

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

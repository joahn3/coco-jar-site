import { cn } from "./cn";

export default function Card({ className = "", children, ...props }) {
  return (
    <article
      className={cn(
        "group card-hover jar-card surface-card rounded-[var(--ds-radius-lg)] border border-[color:var(--ds-border)] bg-[var(--ds-surface-card)] p-5 sm:p-6 md:p-6 focus-within:border-[color:var(--ds-accent)]/70",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}

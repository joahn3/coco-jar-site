import { cn } from "./cn";

export default function Card({ className = "", children, ...props }) {
  return (
    <article
      className={cn(
        "group card-hover jar-card surface-card vibe-card p-5 sm:p-6 md:p-6 focus-within:border-brand-600/70",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}

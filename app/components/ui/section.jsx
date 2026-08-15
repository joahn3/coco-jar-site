import { cn } from "./cn";

export default function Section({ className = "", title, subtitle, children, ...props }) {
  return (
    <section
      className={cn(
        "relative section-shell space-y-6 sm:space-y-7",
        className,
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="space-y-2 md:space-y-3">
          {title ? <h2 className="text-title-lg sm:text-display-md">{title}</h2> : null}
          {subtitle ? <p className="max-w-content text-body-lg text-ink-muted prose-balance">{subtitle}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}

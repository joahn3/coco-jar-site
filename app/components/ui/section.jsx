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
        <header className="space-y-2 md:space-y-3">
          {title ? (
            <h2 className="section-title sm:text-[clamp(2rem,4vw,2.35rem)]">{title}</h2>
          ) : null}
          {subtitle ? <p className="max-w-content jar-copy prose-balance">{subtitle}</p> : null}
        </header>
      )}
      {children}
    </section>
  );
}

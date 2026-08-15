import { cn } from "./cn";

export default function Container({ as = "div", className = "", children, ...props }) {
  const Tag = as;

  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-page px-4 sm:px-5 lg:px-7 xl:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

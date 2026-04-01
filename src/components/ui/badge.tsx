import { cn } from "@/lib/utils";

export function Badge({ children, className, variant = "default" }: {
  children: React.ReactNode; className?: string; variant?: "default" | "outline" | "accent";
}): React.JSX.Element {
  const v = { default: "bg-secondary text-secondary-foreground", outline: "border border-border text-muted-foreground", accent: "bg-accent/10 text-accent border border-accent/20" } as const;
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", v[variant], className)}>{children}</span>;
}

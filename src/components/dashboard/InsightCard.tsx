import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InsightCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  variant?: "primary" | "accent" | "success" | "warning";
  delay?: number;
}

export function InsightCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "primary",
  delay = 0,
}: InsightCardProps) {
  const variants = {
    primary: {
      bg: "bg-primary/10",
      border: "border-primary/30",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
      valueColor: "text-primary",
    },
    accent: {
      bg: "bg-accent/10",
      border: "border-accent/30",
      iconBg: "bg-accent/20",
      iconColor: "text-accent",
      valueColor: "text-accent",
    },
    success: {
      bg: "bg-success/10",
      border: "border-success/30",
      iconBg: "bg-success/20",
      iconColor: "text-success",
      valueColor: "text-success",
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-500",
      valueColor: "text-yellow-500",
    },
  };

  const style = variants[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-4 animate-fade-in",
        style.bg,
        style.border
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className={cn("rounded-lg p-2", style.iconBg)}>
          <Icon className={cn("h-5 w-5", style.iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {title}
          </p>
          <p className={cn("font-display text-2xl font-bold mt-1", style.valueColor)}>
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

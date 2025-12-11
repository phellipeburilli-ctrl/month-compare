import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "accent" | "success";
  delay?: number;
}

export function MetricCard({
  title,
  value,
  previousValue,
  subtitle,
  icon,
  variant = "primary",
  delay = 0,
}: MetricCardProps) {
  const growth = previousValue ? ((value - previousValue) / previousValue) * 100 : null;
  const isPositive = growth && growth > 0;

  const variants = {
    primary: {
      bg: "bg-gradient-to-br from-primary/20 to-primary/5",
      border: "border-primary/30",
      accent: "text-primary",
      glow: "shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]",
    },
    accent: {
      bg: "bg-gradient-to-br from-accent/20 to-accent/5",
      border: "border-accent/30",
      accent: "text-accent",
      glow: "shadow-[0_0_30px_-5px_hsl(var(--accent)/0.3)]",
    },
    success: {
      bg: "bg-gradient-to-br from-success/20 to-success/5",
      border: "border-success/30",
      accent: "text-success",
      glow: "shadow-[0_0_30px_-5px_hsl(var(--success)/0.3)]",
    },
  };

  const style = variants[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-5 animate-fade-in transition-all duration-300 hover:scale-[1.02]",
        style.bg,
        style.border,
        style.glow
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</span>
          {icon && <div className={cn("opacity-60", style.accent)}>{icon}</div>}
        </div>
        
        <div className="mt-3 flex items-baseline gap-3">
          <span className={cn("font-display text-3xl font-bold", style.accent)}>
            {value.toLocaleString("pt-BR")}
          </span>
          
          {growth !== null && (
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                isPositive
                  ? "bg-success/20 text-success"
                  : "bg-destructive/20 text-destructive"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(growth).toFixed(1)}%
            </div>
          )}
        </div>
        
        {subtitle && (
          <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

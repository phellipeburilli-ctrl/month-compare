import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  badge?: string;
}

export function ChartCard({ title, subtitle, children, className, delay = 0, badge }: ChartCardProps) {
  return (
    <div
      className={cn(
        "powerbi-card p-5 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-card-foreground">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {badge && (
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-primary/20 text-primary">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

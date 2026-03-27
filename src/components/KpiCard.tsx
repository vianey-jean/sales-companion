import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
}

const KpiCard = ({ title, value, subtitle, icon: Icon, trend }: KpiCardProps) => (
  <div className="bg-card rounded-lg border p-6 animate-fade-in">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
        <Icon className="h-4 w-4 text-accent" />
      </div>
    </div>
    <p className="text-3xl font-display font-bold tracking-tight">{value}</p>
    <div className="flex items-center gap-2 mt-2">
      {trend && (
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${trend.positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
          {trend.positive ? "↑" : "↓"} {trend.value}
        </span>
      )}
      {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
    </div>
  </div>
);

export default KpiCard;

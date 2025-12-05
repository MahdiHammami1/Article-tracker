import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  delay?: number;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className, delay = 0 }: StatCardProps) {
  return (
    <Card 
      className={cn("overflow-hidden animate-slide-up", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-display text-3xl font-bold tracking-tight">{value}</h3>
              {subtitle && (
                <span className="text-sm text-muted-foreground">{subtitle}</span>
              )}
            </div>
            {trend && (
              <div className="flex items-center gap-1">
                <span className={cn(
                  "text-sm font-medium",
                  trend.value >= 0 ? "text-status-accepted" : "text-destructive"
                )}>
                  {trend.value >= 0 ? '+' : ''}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">{trend.label}</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-md">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  trendColor?: 'success' | 'destructive' | 'warning';
}

export const KPICard = ({ label, value, trend, trendDirection = 'neutral', trendColor = 'success' }: KPICardProps) => {
  const colorMap = {
    success: 'text-success',
    destructive: 'text-destructive',
    warning: 'text-warning',
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-card">
      <div className="font-mono text-kpi text-foreground">{value}</div>
      <div className="text-kpi-label text-muted-foreground mt-1">{label}</div>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-xs ${colorMap[trendColor]}`}>
          {trendDirection === 'up' && <TrendingUp size={12} />}
          {trendDirection === 'down' && <TrendingDown size={12} />}
          {trendDirection === 'neutral' && <Minus size={12} />}
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

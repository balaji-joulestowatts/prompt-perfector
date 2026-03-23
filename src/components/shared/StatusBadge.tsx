import { cn } from '@/lib/utils';

type BadgeVariant = 'critical' | 'low' | 'ok' | 'overstock' | 'warning' | 'info' | 'pending';

const variantStyles: Record<BadgeVariant, string> = {
  critical: 'bg-destructive/10 text-destructive',
  low: 'bg-warning/10 text-warning',
  ok: 'bg-success/10 text-success',
  overstock: 'bg-chart-4/10 text-chart-4',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-primary/10 text-primary',
  pending: 'bg-chart-4/10 text-chart-4',
};

export const StatusBadge = ({ variant, children, className }: { variant: BadgeVariant; children: React.ReactNode; className?: string }) => (
  <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold', variantStyles[variant], className)}>
    {children}
  </span>
);

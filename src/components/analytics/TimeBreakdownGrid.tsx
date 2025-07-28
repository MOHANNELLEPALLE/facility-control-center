import React from 'react';
import { TimeBreakdown } from '@/types/analytics';

interface TimeBreakdownGridProps {
  breakdown: TimeBreakdown;
  className?: string;
}

const formatPeriodLabel = (period: string): string => {
  return period === 'halfYear' ? 'Half Year' : period;
};

const TimeBreakdownGrid: React.FC<TimeBreakdownGridProps> = React.memo(({ 
  breakdown, 
  className = "grid grid-cols-2 md:grid-cols-3 gap-4" 
}) => {
  return (
    <div className={className}>
      {Object.entries(breakdown).map(([period, value]) => (
        <div key={period} className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-sm text-muted-foreground capitalize mb-1">
            {formatPeriodLabel(period)}
          </div>
          <div className="text-2xl font-bold text-foreground">{value}</div>
        </div>
      ))}
    </div>
  );
});

TimeBreakdownGrid.displayName = 'TimeBreakdownGrid';

export default TimeBreakdownGrid;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { SummaryData, TimeFilterType } from '@/types/analytics';
import TimeRangeSelect from './TimeRangeSelect';
import TimeBreakdownGrid from './TimeBreakdownGrid';

interface TimeRangeCardProps {
  title: string;
  data: SummaryData;
  icon: LucideIcon;
  timeFilter: TimeFilterType;
  onTimeFilterChange: (filter: TimeFilterType) => void;
  showFilter?: boolean;
}

const TimeRangeCard: React.FC<TimeRangeCardProps> = React.memo(({
  title,
  data,
  icon: Icon,
  timeFilter,
  onTimeFilterChange,
  showFilter = true,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {title} ({data.total})
          </CardTitle>
          {showFilter && (
            <TimeRangeSelect
              value={timeFilter}
              onChange={onTimeFilterChange}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <TimeBreakdownGrid breakdown={data.breakdown} />
      </CardContent>
    </Card>
  );
});

TimeRangeCard.displayName = 'TimeRangeCard';

export default TimeRangeCard;
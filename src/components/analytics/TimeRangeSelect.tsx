import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeFilterType } from '@/types/analytics';

interface TimeRangeSelectProps {
  value: TimeFilterType;
  onChange: (value: TimeFilterType) => void;
  className?: string;
}

const timeRangeOptions = [
  { value: 'year', label: 'Year' },
  { value: 'halfYear', label: 'Half Year' },
  { value: 'quarter', label: 'Quarter' },
  { value: 'month', label: 'Month' },
  { value: 'week', label: 'Week' },
  { value: 'today', label: 'Today' },
] as const;

const TimeRangeSelect: React.FC<TimeRangeSelectProps> = React.memo(({ 
  value, 
  onChange, 
  className = "w-32 h-8" 
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {timeRangeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

TimeRangeSelect.displayName = 'TimeRangeSelect';

export default TimeRangeSelect;
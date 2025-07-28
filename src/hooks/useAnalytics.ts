import { useState, useCallback, useMemo } from 'react';
import { TimeFilterType } from '@/types/analytics';
import { analyticsData } from '@/data/analyticsData';

export const useAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>('year');

  const updateTimeFilter = useCallback((filter: TimeFilterType) => {
    setTimeFilter(filter);
  }, []);

  const data = useMemo(() => analyticsData, []);

  const filteredData = useMemo(() => {
    return {
      ...data,
      // You could add filtering logic here if needed
      // For now, returning the full dataset
    };
  }, [data, timeFilter]);

  return {
    timeFilter,
    updateTimeFilter,
    data: filteredData,
  };
};
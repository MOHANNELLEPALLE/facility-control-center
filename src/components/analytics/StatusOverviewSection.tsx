import React from 'react';
import { BarChart3 } from 'lucide-react';
import { RequestStatus } from '@/types/analytics';
import StatusCard from './StatusCard';

interface StatusOverviewSectionProps {
  statuses: RequestStatus[];
}

const StatusOverviewSection: React.FC<StatusOverviewSectionProps> = React.memo(({ statuses }) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Health Request Status Overview</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statuses.map((status) => (
          <StatusCard key={status.label} status={status} />
        ))}
      </div>
    </section>
  );
});

StatusOverviewSection.displayName = 'StatusOverviewSection';

export default StatusOverviewSection;
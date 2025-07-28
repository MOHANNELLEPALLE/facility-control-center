import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RequestStatus } from '@/types/analytics';

interface StatusCardProps {
  status: RequestStatus;
}

const StatusCard: React.FC<StatusCardProps> = React.memo(({ status }) => {
  const IconComponent = status.icon;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {status.label}
            </p>
            <p className="text-3xl font-bold">{status.value}</p>
          </div>
          <div className={`p-3 rounded-full ${status.color}`}>
            <IconComponent className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

StatusCard.displayName = 'StatusCard';

export default StatusCard;
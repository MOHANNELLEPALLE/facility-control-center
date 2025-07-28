import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserTypeData } from '@/types/analytics';
import TimeBreakdownGrid from './TimeBreakdownGrid';

interface UserTypeCardProps {
  userData: UserTypeData;
}

const UserTypeCard: React.FC<UserTypeCardProps> = React.memo(({ userData }) => {
  const IconComponent = userData.icon;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-3">
          <div className={`p-2 rounded-lg ${userData.color} text-white`}>
            <IconComponent className="h-5 w-5" />
          </div>
          {userData.type} ({userData.total})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TimeBreakdownGrid breakdown={userData.breakdown} />
      </CardContent>
    </Card>
  );
});

UserTypeCard.displayName = 'UserTypeCard';

export default UserTypeCard;
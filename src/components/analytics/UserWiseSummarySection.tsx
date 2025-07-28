import React from 'react';
import { Users } from 'lucide-react';
import { UserTypeData } from '@/types/analytics';
import UserTypeCard from './UserTypeCard';

interface UserWiseSummarySectionProps {
  userTypes: UserTypeData[];
}

const UserWiseSummarySection: React.FC<UserWiseSummarySectionProps> = React.memo(({ userTypes }) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">User-wise Summary</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {userTypes.map((userData) => (
          <UserTypeCard key={userData.type} userData={userData} />
        ))}
      </div>
    </section>
  );
});

UserWiseSummarySection.displayName = 'UserWiseSummarySection';

export default UserWiseSummarySection;
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';
import { User as UserType } from '@/types/request';

interface UserSelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  users: UserType[];
}

const UserSelectField: React.FC<UserSelectFieldProps> = ({ value, onChange, users }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="user-select" className="text-sm font-medium flex items-center gap-2">
        <User className="h-4 w-4" />
        Create Request for User *
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.value} value={user.value}>
              {user.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelectField;
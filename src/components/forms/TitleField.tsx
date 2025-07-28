import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MessageSquare } from 'lucide-react';

interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const TitleField: React.FC<TitleFieldProps> = ({ value, onChange, maxLength = 50 }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        Title to Your Problem *
      </Label>
      <div className="space-y-1">
        <Input
          id="title"
          value={value}
          onChange={handleChange}
          placeholder="Add title to your request"
          className="w-full"
        />
        <div className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default TitleField;
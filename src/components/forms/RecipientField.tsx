import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RecipientFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const RecipientField: React.FC<RecipientFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Recipient</Label>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="self" id="self" />
          <Label htmlFor="self" className="text-sm cursor-pointer">
            Self
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="someone-else" id="someone-else" />
          <Label htmlFor="someone-else" className="text-sm cursor-pointer">
            Someone else
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RecipientField;
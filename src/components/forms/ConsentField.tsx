import React from 'react';
import { Label } from '@/components/ui/label';

interface ConsentFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ConsentField: React.FC<ConsentFieldProps> = ({ checked, onChange }) => {
  return (
    <div className="space-y-3 border-t pt-6">
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border border-input bg-background text-theme-primary focus:ring-2 focus:ring-ring"
        />
        <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
          By clicking submit, I agree that I have read and accepted the{' '}
          <a 
            href="#" 
            className="text-theme-primary hover:underline font-medium"
            onClick={(e) => e.preventDefault()}
          >
            Terms of Use
          </a>
          .
        </Label>
      </div>
    </div>
  );
};

export default ConsentField;
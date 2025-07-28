import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { CreateRequestFormData, CreateRequestFormProps } from '@/types/request';
import UserSelectField from './UserSelectField';
import TitleField from './TitleField';
import RecipientField from './RecipientField';
import ConsentField from './ConsentField';

const CreateRequestForm: React.FC<CreateRequestFormProps> = ({ onSubmit, onCancel, users }) => {
  const [formData, setFormData] = useState<CreateRequestFormData>({
    selectedUser: '',
    title: '',
    description: '',
    recipient: 'self',
    agreedToTerms: false,
  });

  const updateFormField = useCallback(<K extends keyof CreateRequestFormData>(
    field: K,
    value: CreateRequestFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const isFormValid = useMemo(() => {
    return formData.selectedUser && 
           formData.title.trim() && 
           formData.description.trim() && 
           formData.agreedToTerms;
  }, [formData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formData);
    }
  }, [formData, isFormValid, onSubmit]);

  const handleReset = useCallback(() => {
    setFormData({
      selectedUser: '',
      title: '',
      description: '',
      recipient: 'self',
      agreedToTerms: false,
    });
    onCancel();
  }, [onCancel]);

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          <FileText className="h-6 w-6 text-theme-primary" />
          Request Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <UserSelectField
            value={formData.selectedUser}
            onChange={(value) => updateFormField('selectedUser', value)}
            users={users}
          />

          <TitleField
            value={formData.title}
            onChange={(value) => updateFormField('title', value)}
          />

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormField('description', e.target.value)}
              placeholder="Describe your healthcare request in detail..."
              className="min-h-[120px] resize-none"
            />
          </div>

          <RecipientField
            value={formData.recipient}
            onChange={(value) => updateFormField('recipient', value as 'self' | 'someone-else')}
          />

          <ConsentField
            checked={formData.agreedToTerms}
            onChange={(checked) => updateFormField('agreedToTerms', checked)}
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button 
              type="submit" 
              className="flex-1 sm:flex-none"
              disabled={!isFormValid}
            >
              Submit Request
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateRequestForm;
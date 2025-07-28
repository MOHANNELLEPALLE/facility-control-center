import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileText, User, MessageSquare } from 'lucide-react';

const CreateRequest = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('self');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { toast } = useToast();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setTitle(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser || !title.trim() || !description.trim() || !agreedToTerms) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and agree to the terms.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Request Submitted",
      description: "Your healthcare request has been submitted successfully.",
    });

    // Reset form
    setSelectedUser('');
    setTitle('');
    setDescription('');
    setRecipient('self');
    setAgreedToTerms(false);
  };

  const handleCancel = () => {
    setSelectedUser('');
    setTitle('');
    setDescription('');
    setRecipient('self');
    setAgreedToTerms(false);
  };

  // Mock users for dropdown
  const users = [
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Create Healthcare Request</h1>
        <p className="text-muted-foreground">Submit a new healthcare request for yourself or someone else</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-theme-primary" />
            Request Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Create Request for User */}
            <div className="space-y-2">
              <Label htmlFor="user-select" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Create Request for User *
              </Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
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

            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Title to Your Problem *
              </Label>
              <div className="space-y-1">
                <Input
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Add title to your request"
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground text-right">
                  {title.length}/50
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your healthcare request in detail..."
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Recipient Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Recipient</Label>
              <RadioGroup value={recipient} onValueChange={setRecipient} className="space-y-2">
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

            {/* Consent Section */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button 
                type="submit" 
                className="flex-1 sm:flex-none"
                disabled={!selectedUser || !title.trim() || !description.trim() || !agreedToTerms}
              >
                Submit Request
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRequest;
export interface User {
  value: string;
  label: string;
}

export interface CreateRequestFormData {
  selectedUser: string;
  title: string;
  description: string;
  recipient: 'self' | 'someone-else';
  agreedToTerms: boolean;
}

export interface CreateRequestFormProps {
  onSubmit: (data: CreateRequestFormData) => void;
  onCancel: () => void;
  users: User[];
}
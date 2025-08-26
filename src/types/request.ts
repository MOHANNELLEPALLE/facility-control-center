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

export interface RequestDetails {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
  createdDate: string;
  imageUrl?: string;
  creator: {
    name: string;
    id: string;
    role: string;
    email?: string;
  };
  assignedDoctor?: {
    name: string;
    specialization: string;
    email?: string;
    phone?: string;
    hospital?: string;
  };
  applicantsCount: number;
  attachedDocuments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedAt: string;
  }>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCompletionDate?: string;
  notes?: string;
}
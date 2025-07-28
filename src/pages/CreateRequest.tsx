import React, { useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageHeader from '@/components/dashboard/PageHeader';
import CreateRequestForm from '@/components/forms/CreateRequestForm';
import { useCreateRequest } from '@/hooks/useCreateRequest';
import { mockUsers } from '@/data/mockUsers';
import { CreateRequestFormData } from '@/types/request';

const CreateRequest = () => {
  const { submitRequest } = useCreateRequest();

  const handleSubmit = useCallback((data: CreateRequestFormData) => {
    const result = submitRequest(data);
    if (result.success) {
      // TODO: Navigate to requests list or show success state
    }
  }, [submitRequest]);

  const handleCancel = useCallback(() => {
    // TODO: Navigate back or show confirmation dialog
    console.log('Form cancelled');
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader 
          title="Create Healthcare Request" 
          description="Submit a new healthcare request for yourself or someone else"
        />

        <CreateRequestForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          users={mockUsers}
        />
      </div>
    </DashboardLayout>
  );
};

export default CreateRequest;
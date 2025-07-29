import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';
import Facilities from '@/pages/Facilities';
import Doctors from '@/pages/Doctors';
import Organizations from '@/pages/Organizations';
import AddDoctor from '@/pages/AddDoctor';
import Requests from '@/pages/Requests';
import BulkUploadUsers from '@/pages/BulkUploadUsers';
import BulkUploadFacilities from '@/pages/BulkUploadFacilities';
import ManageSpecialities from '@/pages/ManageSpecialities';
import ManageFacilityServices from '@/pages/ManageFacilityServices';
import AddHospital from '@/pages/AddHospital';
import AddPatient from '@/pages/AddPatient';
import AdminSettings from '@/pages/AdminSettings';
import Login from '@/pages/Login';
import Analytics from '@/pages/Analytics';
import CreateRequest from '@/pages/CreateRequest';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/organizations" element={<Organizations />} />
      <Route path="/add-doctor" element={<AddDoctor />} />
      <Route path="/add-patient" element={<AddPatient />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/bulk-upload-users" element={<BulkUploadUsers />} />
      <Route path="/bulk-upload-facilities" element={<BulkUploadFacilities />} />
      <Route path="/specialities" element={<ManageSpecialities />} />
      <Route path="/facility-services" element={<ManageFacilityServices />} />
      <Route path="/add-hospital" element={<AddHospital />} />
      <Route path="/admin-settings" element={<AdminSettings />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/create-request" element={<CreateRequest />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
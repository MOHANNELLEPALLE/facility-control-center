
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Facilities from "./pages/Facilities";
import Doctors from "./pages/Doctors";
import Organizations from "./pages/Organizations";
import AddDoctor from "./pages/AddDoctor";
import Requests from "./pages/Requests";
import BulkUploadUsers from "./pages/BulkUploadUsers";
import BulkUploadFacilities from "./pages/BulkUploadFacilities";
import ManageSpecialities from "./pages/ManageSpecialities";
import ManageFacilityServices from "./pages/ManageFacilityServices";
import AddHospital from "./pages/AddHospital";
import AdminSettings from "./pages/AdminSettings";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/bulk-upload-users" element={<BulkUploadUsers />} />
          <Route path="/bulk-upload-facilities" element={<BulkUploadFacilities />} />
          <Route path="/specialities" element={<ManageSpecialities />} />
          <Route path="/facility-services" element={<ManageFacilityServices />} />
          <Route path="/add-hospital" element={<AddHospital />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

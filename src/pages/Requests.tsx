
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Trash2, Search, Calendar, ArrowUpDown } from "lucide-react";
import RequestManagementModal from "@/components/modals/RequestManagementModal";

const mockRequests = [
  {
    id: 1,
    title: "New Equipment Request",
    creatorType: "Doctor",
    assignedTo: "Admin Staff",
    createdDate: "2023-05-21",
    updatedDate: "2023-05-23",
    status: "Pending",
    acceptanceStatus: "Under Review",
    createdFor: "Cardiology Dept.",
  },
  {
    id: 2,
    title: "Patient Transfer Request",
    creatorType: "Nurse",
    assignedTo: "Dr. Johnson",
    createdDate: "2023-06-15",
    updatedDate: "2023-06-16",
    status: "In Progress",
    acceptanceStatus: "Accepted",
    createdFor: "Emergency Room",
  },
  {
    id: 3,
    title: "Medical Supply Request",
    creatorType: "Administrator",
    assignedTo: "Procurement Team",
    createdDate: "2023-07-03",
    updatedDate: "2023-07-05",
    status: "Completed",
    acceptanceStatus: "Approved",
    createdFor: "Surgery Ward",
  },
  {
    id: 4,
    title: "Maintenance Request",
    creatorType: "Facility Manager",
    assignedTo: "Maintenance Staff",
    createdDate: "2023-08-12",
    updatedDate: "2023-08-14",
    status: "Pending",
    acceptanceStatus: "Under Review",
    createdFor: "Radiology Dept.",
  },
  {
    id: 5,
    title: "Staff Training Request",
    creatorType: "HR Manager",
    assignedTo: "Dr. Wilson",
    createdDate: "2023-09-27",
    updatedDate: "2023-09-30",
    status: "Rejected",
    acceptanceStatus: "Declined",
    createdFor: "All Departments",
  },
];

const Requests = () => {
  const [selectedRequest, setSelectedRequest] = useState<typeof mockRequests[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewRequest = (request: typeof mockRequests[0]) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Manage Requests" 
        description="View and manage facility and doctor requests in the system." 
      />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Date Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Role Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="facility">Facility Manager</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search requests..." 
                className="pl-10" 
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="flex items-center space-x-1">
                  <span>Title</span>
                  <ArrowUpDown className="h-3 w-3" />
                </th>
                <th>Creator Type</th>
                <th>Assigned To</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Status</th>
                <th>Acceptance Status</th>
                <th>Created For</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRequests.map((request) => (
                <tr key={request.id}>
                  <td className="font-medium">{request.title}</td>
                  <td>{request.creatorType}</td>
                  <td>{request.assignedTo}</td>
                  <td>{request.createdDate}</td>
                  <td>{request.updatedDate}</td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      request.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      request.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                      request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      request.acceptanceStatus === 'Approved' ? 'bg-green-100 text-green-800' : 
                      request.acceptanceStatus === 'Declined' ? 'bg-red-100 text-red-800' : 
                      request.acceptanceStatus === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.acceptanceStatus}
                    </span>
                  </td>
                  <td>{request.createdFor}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleViewRequest(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
                <span className="font-medium">15</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <Button variant="outline" className="rounded-l-md">Previous</Button>
                <Button variant="default" className="bg-health-600 hover:bg-health-700 mx-1">1</Button>
                <Button variant="outline" className="mx-1">2</Button>
                <Button variant="outline" className="mx-1">3</Button>
                <Button variant="outline" className="rounded-r-md">Next</Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      <RequestManagementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
      />
    </DashboardLayout>
  );
};

export default Requests;

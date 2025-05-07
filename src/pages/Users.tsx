
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Eye, Check, X, Calendar as CalendarIcon, Search, ArrowDown } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    date: "2023-05-21",
    name: "John Smith",
    organization: "General Hospital",
    role: "Doctor",
    email: "john.smith@example.com",
    contact: "+1 (555) 123-4567",
    verified: true,
    status: "Active"
  },
  {
    id: 2,
    date: "2023-06-15",
    name: "Emily Johnson",
    organization: "City Medical Center",
    role: "Administrator",
    email: "emily.johnson@example.com",
    contact: "+1 (555) 234-5678",
    verified: true,
    status: "Active"
  },
  {
    id: 3,
    date: "2023-07-03",
    name: "Michael Brown",
    organization: "Wellness Clinic",
    role: "Nurse",
    email: "michael.brown@example.com",
    contact: "+1 (555) 345-6789",
    verified: false,
    status: "Pending"
  },
  {
    id: 4,
    date: "2023-08-12",
    name: "Sarah Davis",
    organization: "Community Health Services",
    role: "Doctor",
    email: "sarah.davis@example.com",
    contact: "+1 (555) 456-7890",
    verified: true,
    status: "Active"
  },
  {
    id: 5,
    date: "2023-09-27",
    name: "Robert Wilson",
    organization: "Metro Hospital",
    role: "Administrator",
    email: "robert.wilson@example.com",
    contact: "+1 (555) 567-8901",
    verified: false,
    status: "Inactive"
  }
];

const Users = () => {
  return (
    <DashboardLayout>
      <PageHeader 
        title="Manage Users" 
        description="View and manage all users in the system."
      />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
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
            
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Role Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="search" 
                  placeholder="Search users..." 
                  className="pl-10" 
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
            <div className="flex space-x-2 mb-4 md:mb-0">
              <Button variant="default" className="bg-health-600 hover:bg-health-700">Apply</Button>
              <Button variant="outline">Clear</Button>
            </div>
            <Button variant="outline" className="justify-start flex items-center">
              <ArrowDown className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Organization Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Account Verified?</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.date}</td>
                  <td>{user.name}</td>
                  <td>{user.organization}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.verified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      user.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
                <span className="font-medium">25</span> results
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
    </DashboardLayout>
  );
};

export default Users;

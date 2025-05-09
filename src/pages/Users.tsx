
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
import { Calendar as CalendarIcon, Search, ArrowDown, Eye, Check, X, UserPlus } from "lucide-react";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  // Calculate summary data
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => user.status === "Active").length;
  const pendingUsers = mockUsers.filter(user => user.status === "Pending").length;
  
  return (
    <DashboardLayout>
      <PageHeader 
        title="Manage Users" 
        description="View and manage all users in the system."
      />
      
      {/* More compact summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="shadow-sm">
          <CardContent className="pt-4 pb-4 px-4">
            <div className="text-xl font-bold">{totalUsers}</div>
            <div className="text-sm text-theme-secondary">Total Users</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4 pb-4 px-4">
            <div className="text-xl font-bold">{activeUsers}</div>
            <div className="text-sm text-theme-secondary">Active Users</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-4 pb-4 px-4">
            <div className="text-xl font-bold">{pendingUsers}</div>
            <div className="text-sm text-theme-secondary">Pending Verification</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <Button variant="default" className="bg-theme-primary hover:bg-theme-primary/90 mb-4 md:mb-0">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="justify-start flex items-center text-theme-secondary border-theme-secondary/30">
                <ArrowDown className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-theme-secondary" />
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-secondary" />
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
              <Button variant="default" className="bg-theme-primary hover:bg-theme-primary/90">Apply</Button>
              <Button variant="outline" className="text-theme-secondary border-theme-secondary/30">Clear</Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">Organization Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">Contact Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">Account Verified?</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.organization}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.verified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      user.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-theme-secondary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-theme-primary hover:text-theme-primary/90">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="py-4 px-6 border-t border-gray-200">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive className="bg-theme-primary">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;

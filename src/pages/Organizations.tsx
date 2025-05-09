
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, Eye, Search, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockOrganizations = [
  {
    id: 1,
    name: "General Hospital",
    location: "New York, NY",
    type: "Hospital",
    contactPerson: "John Smith",
    email: "contact@generalhospital.org",
    phone: "+1 (555) 123-4567",
    employees: 450,
    status: "Active",
  },
  {
    id: 2,
    name: "City Medical Center",
    location: "Los Angeles, CA",
    type: "Medical Center",
    contactPerson: "Emily Johnson",
    email: "info@citymedical.com",
    phone: "+1 (555) 234-5678",
    employees: 320,
    status: "Active",
  },
  {
    id: 3,
    name: "Wellness Clinic",
    location: "Chicago, IL",
    type: "Clinic",
    contactPerson: "Michael Brown",
    email: "hello@wellnessclinic.net",
    phone: "+1 (555) 345-6789",
    employees: 85,
    status: "Pending",
  },
  {
    id: 4,
    name: "Community Health Services",
    location: "Houston, TX",
    type: "Health Center",
    contactPerson: "Sarah Davis",
    email: "info@communityhealth.org",
    phone: "+1 (555) 456-7890",
    employees: 120,
    status: "Active",
  },
  {
    id: 5,
    name: "Metro Hospital",
    location: "Phoenix, AZ",
    type: "Hospital",
    contactPerson: "Robert Wilson",
    email: "contact@metrohospital.com",
    phone: "+1 (555) 567-8901",
    employees: 380,
    status: "Inactive",
  },
];

const Organizations = () => {
  // Calculate summary data
  const totalOrganizations = mockOrganizations.length;
  const activeOrganizations = mockOrganizations.filter(org => org.status === "Active").length;
  const totalEmployees = mockOrganizations.reduce((acc, org) => acc + org.employees, 0);

  return (
    <DashboardLayout>
      <PageHeader
        title="Manage Organizations"
        description="View and manage healthcare organizations in the system."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalOrganizations}</div>
            <div className="text-sm text-gray-500">Total Organizations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activeOrganizations}</div>
            <div className="text-sm text-gray-500">Active Organizations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <div className="text-sm text-gray-500">Total Employees</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <Button variant="default" className="bg-health-600 hover:bg-health-700 mb-4 md:mb-0">
              <Building className="mr-2 h-4 w-4" />
              Add Organization
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" className="justify-start flex items-center">
                <ArrowDown className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="clinic">Clinic</SelectItem>
                <SelectItem value="center">Medical Center</SelectItem>
                <SelectItem value="health">Health Center</SelectItem>
              </SelectContent>
            </Select>

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

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search organizations..." className="pl-10" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
            <div className="flex space-x-2 mb-4 md:mb-0">
              <Button variant="default" className="bg-health-600 hover:bg-health-700">Apply</Button>
              <Button variant="outline">Clear</Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockOrganizations.map((org) => (
                <tr key={org.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{org.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.contactPerson}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.employees}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        org.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : org.status === "Inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {org.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
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
    </DashboardLayout>
  );
};

export default Organizations;

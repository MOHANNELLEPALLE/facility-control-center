
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, Eye, Search, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.org",
    specialty: "Cardiology",
    organization: "General Hospital",
    phone: "+1 (555) 123-4567",
    yearsExperience: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Michael Williams",
    email: "michael.williams@cityhealth.com",
    specialty: "Neurology",
    organization: "City Medical Center",
    phone: "+1 (555) 234-5678",
    yearsExperience: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Jessica Brown",
    email: "jessica.brown@wellnessclinic.net",
    specialty: "Pediatrics",
    organization: "Wellness Clinic",
    phone: "+1 (555) 345-6789",
    yearsExperience: 15,
    status: "On Leave",
  },
  {
    id: 4,
    name: "Dr. Robert Davis",
    email: "robert.davis@health.org",
    specialty: "Orthopedics",
    organization: "Community Health Services",
    phone: "+1 (555) 456-7890",
    yearsExperience: 10,
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. Emily Wilson",
    email: "emily.wilson@hospital.com",
    specialty: "Dermatology",
    organization: "Metro Hospital",
    phone: "+1 (555) 567-8901",
    yearsExperience: 7,
    status: "Inactive",
  },
];

const Doctors = () => {
  // Calculate summary data
  const totalDoctors = mockDoctors.length;
  const activeDoctors = mockDoctors.filter((doctor) => doctor.status === "Active").length;
  const specialties = new Set(mockDoctors.map((doctor) => doctor.specialty)).size;

  return (
    <DashboardLayout>
      <PageHeader
        title="Manage Doctors"
        description="View and manage all doctors in the healthcare system."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalDoctors}</div>
            <div className="text-sm text-gray-500">Total Doctors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activeDoctors}</div>
            <div className="text-sm text-gray-500">Active Doctors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{specialties}</div>
            <div className="text-sm text-gray-500">Specialties</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <Button variant="default" className="bg-health-600 hover:bg-health-700 mb-4 md:mb-0">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" className="justify-start flex items-center">
                <ArrowDown className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Specialty Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Organization Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                <SelectItem value="general">General Hospital</SelectItem>
                <SelectItem value="city">City Medical Center</SelectItem>
                <SelectItem value="wellness">Wellness Clinic</SelectItem>
                <SelectItem value="community">Community Health</SelectItem>
                <SelectItem value="metro">Metro Hospital</SelectItem>
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
                <SelectItem value="onleave">On Leave</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search doctors..." className="pl-10" />
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{doctor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.organization}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doctor.yearsExperience} years</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doctor.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : doctor.status === "Inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {doctor.status}
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
                <span className="font-medium">35</span> results
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

export default Doctors;

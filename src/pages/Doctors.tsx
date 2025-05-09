
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{doctor.organization}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.yearsExperience} years</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="py-4 px-6 border-t border-gray-200">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
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

export default Doctors;


import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, Eye, Search, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

const mockFacilities = [
  {
    id: 1,
    facility: "General Hospital",
    location: "New York, NY",
    website: "www.generalhospital.org",
    user: "John Smith",
    facilityType: "Hospital",
    createdAt: "2023-05-21",
    status: "Active",
  },
  {
    id: 2,
    facility: "City Medical Center",
    location: "Los Angeles, CA",
    website: "www.citymedical.com",
    user: "Emily Johnson",
    facilityType: "Medical Center",
    createdAt: "2023-06-15",
    status: "Active",
  },
  {
    id: 3,
    facility: "Wellness Clinic",
    location: "Chicago, IL",
    website: "www.wellnessclinic.net",
    user: "Michael Brown",
    facilityType: "Clinic",
    createdAt: "2023-07-03",
    status: "Pending",
  },
  {
    id: 4,
    facility: "Community Health Services",
    location: "Houston, TX",
    website: "www.communityhealth.org",
    user: "Sarah Davis",
    facilityType: "Health Center",
    createdAt: "2023-08-12",
    status: "Active",
  },
  {
    id: 5,
    facility: "Metro Hospital",
    location: "Phoenix, AZ",
    website: "www.metrohospital.com",
    user: "Robert Wilson",
    facilityType: "Hospital",
    createdAt: "2023-09-27",
    status: "Inactive",
  },
];

const Facilities = () => {
  // Calculate summary data
  const totalFacilities = mockFacilities.length;
  const activeFacilities = mockFacilities.filter(facility => facility.status === "Active").length;
  const hospitals = mockFacilities.filter(facility => facility.facilityType === "Hospital").length;
  
  return (
    <DashboardLayout>
      <PageHeader 
        title="Manage Facilities" 
        description="View and manage all healthcare facilities in the system." 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalFacilities}</div>
            <div className="text-sm text-gray-500">Total Facilities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activeFacilities}</div>
            <div className="text-sm text-gray-500">Active Facilities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{hospitals}</div>
            <div className="text-sm text-gray-500">Hospitals</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <Button variant="default" className="bg-health-600 hover:bg-health-700">
            <Building className="mr-2 h-4 w-4" />
            Add Facility
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search facilities..." 
                className="pl-10" 
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <ArrowDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Facility</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Facility Type</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFacilities.map((facility) => (
                <TableRow key={facility.id}>
                  <TableCell className="font-medium">{facility.facility}</TableCell>
                  <TableCell>{facility.location}</TableCell>
                  <TableCell>
                    <a href={`https://${facility.website}`} target="_blank" rel="noopener noreferrer" className="text-health-600 hover:underline">
                      {facility.website}
                    </a>
                  </TableCell>
                  <TableCell>{facility.user}</TableCell>
                  <TableCell>{facility.facilityType}</TableCell>
                  <TableCell>{facility.createdAt}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      facility.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      facility.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {facility.status}
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

export default Facilities;


import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, Eye, Search, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockFacilities.map((facility) => (
                <tr key={facility.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{facility.facility}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{facility.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={`https://${facility.website}`} target="_blank" rel="noopener noreferrer" className="text-health-600 hover:underline">
                      {facility.website}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{facility.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{facility.facilityType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{facility.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      facility.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      facility.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {facility.status}
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
                <span className="font-medium">20</span> results
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

export default Facilities;

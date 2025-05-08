import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Trash2 } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Mock data to simulate uploaded facilities
const mockFacilities = [
  { id: 1, role: "Hospital", phone: "+1 (555) 123-4567", firstName: "General", lastName: "Hospital", email: "info@generalhospital.com", source: "Manual Entry" },
  { id: 2, role: "Clinic", phone: "+1 (555) 987-6543", firstName: "Family", lastName: "Care", email: "contact@familycare.org", source: "Website" },
  { id: 3, role: "Laboratory", phone: "+1 (555) 456-7890", firstName: "Advanced", lastName: "Diagnostics", email: "lab@advdiag.com", source: "Partner" },
  { id: 4, role: "Pharmacy", phone: "+1 (555) 789-0123", firstName: "City", lastName: "Pharmacy", email: "rx@citypharmacy.com", source: "Referral" },
];

const BulkUploadFacilities = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFacilities, setUploadedFacilities] = useState(mockFacilities);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    // In a real application, this would process the CSV/Excel file
    // For now, we'll just use the mock data
    console.log("File uploaded:", selectedFile?.name);
    // We're keeping the mock data as is
  };

  const handleDeleteFacility = (id: number) => {
    setUploadedFacilities(uploadedFacilities.filter(facility => facility.id !== id));
  };

  // Calculate pagination
  const totalPages = Math.ceil(uploadedFacilities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFacilities = uploadedFacilities.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DashboardLayout>
      <PageHeader
        title="Bulk Upload Facilities"
        description="Upload multiple facilities at once using CSV or Excel files."
      />

      <div className="mt-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Upload File</h2>
          
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="max-w-md"
            />
            <Button 
              onClick={handleFileUpload}
              disabled={!selectedFile}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Accepted formats: .csv, .xlsx, .xls</p>
            <p>Maximum file size: 5MB</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Uploaded Facilities</h2>
            <p className="text-sm text-gray-500">Number of user emails: {uploadedFacilities.length}</p>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Source of Signup</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFacilities.length > 0 ? (
                  currentFacilities.map((facility) => (
                    <TableRow key={facility.id}>
                      <TableCell>{facility.role}</TableCell>
                      <TableCell>{facility.phone}</TableCell>
                      <TableCell>{facility.firstName}</TableCell>
                      <TableCell>{facility.lastName}</TableCell>
                      <TableCell>{facility.email}</TableCell>
                      <TableCell>{facility.source}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteFacility(facility.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      No facilities have been uploaded yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {uploadedFacilities.length > 0 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink 
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BulkUploadFacilities;

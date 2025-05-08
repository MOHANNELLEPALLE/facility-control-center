
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Image } from "lucide-react";

// Mock data for specialties
const mockSpecialties = [
  { id: 1, title: "Cardiology", coverPhoto: "/placeholder.svg", createdAt: "2025-04-23" },
  { id: 2, title: "Neurology", coverPhoto: "/placeholder.svg", createdAt: "2025-04-22" },
  { id: 3, title: "Pediatrics", coverPhoto: "/placeholder.svg", createdAt: "2025-04-21" },
  { id: 4, title: "Orthopedics", coverPhoto: "/placeholder.svg", createdAt: "2025-04-20" },
  { id: 5, title: "Dermatology", coverPhoto: "/placeholder.svg", createdAt: "2025-04-19" },
];

const ManageSpecialities = () => {
  const [specialties, setSpecialties] = useState(mockSpecialties);

  const handleAddSpeciality = () => {
    console.log("Add Speciality clicked");
    // In a real app, this would open a modal or navigate to a form
  };

  const handleEditSpeciality = (id: number) => {
    console.log("Edit Speciality:", id);
    // In a real app, this would open a modal with the specialty details for editing
  };

  const handleDeleteSpeciality = (id: number) => {
    setSpecialties(specialties.filter(specialty => specialty.id !== id));
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Manage Specialities"
        description="Add, edit, or remove medical specialities for your healthcare system."
        actionLabel="+ Add Speciality"
        onAction={handleAddSpeciality}
      />

      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cover Photo</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specialties.length > 0 ? (
                  specialties.map((specialty) => (
                    <TableRow key={specialty.id}>
                      <TableCell>
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                          {specialty.coverPhoto ? (
                            <img 
                              src={specialty.coverPhoto} 
                              alt={specialty.title} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Image className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{specialty.title}</TableCell>
                      <TableCell>{specialty.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditSpeciality(specialty.id)}
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteSpeciality(specialty.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                      No specialities found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageSpecialities;

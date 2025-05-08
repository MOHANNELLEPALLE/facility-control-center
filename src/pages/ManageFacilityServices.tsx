
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Image } from "lucide-react";

// Mock data for facility services
const mockServices = [
  { id: 1, title: "X-Ray Imaging", coverPhoto: "/placeholder.svg", createdAt: "2025-04-23" },
  { id: 2, title: "Laboratory Testing", coverPhoto: "/placeholder.svg", createdAt: "2025-04-22" },
  { id: 3, title: "Physical Therapy", coverPhoto: "/placeholder.svg", createdAt: "2025-04-21" },
  { id: 4, title: "Emergency Services", coverPhoto: "/placeholder.svg", createdAt: "2025-04-20" },
  { id: 5, title: "Outpatient Surgery", coverPhoto: "/placeholder.svg", createdAt: "2025-04-19" },
];

const ManageFacilityServices = () => {
  const [services, setServices] = useState(mockServices);

  const handleAddService = () => {
    console.log("Add Service clicked");
    // In a real app, this would open a modal or navigate to a form
  };

  const handleEditService = (id: number) => {
    console.log("Edit Service:", id);
    // In a real app, this would open a modal with the service details for editing
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Manage Facility Services"
        description="Add, edit, or remove services that facilities can offer."
        actionLabel="+ Add Service"
        onAction={handleAddService}
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
                {services.length > 0 ? (
                  services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                          {service.coverPhoto ? (
                            <img 
                              src={service.coverPhoto} 
                              alt={service.title} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Image className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>{service.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditService(service.id)}
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteService(service.id)}
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
                      No services found
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

export default ManageFacilityServices;

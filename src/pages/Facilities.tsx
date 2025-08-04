import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, Eye, Search, Building } from "lucide-react";
import FacilityManagementModal from "@/components/modals/FacilityManagementModal";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationBar from "@/components/common/PaginationBar";
import {
  useDeleteOrganizationMutation,
  useLazyGetOrganizationsToExportcsvQuery,
  useLazyGetOrganizationsQuery,
  useUpdateOrganizationStatusMutation,
} from "@/store/features/faciltyApis";
import { toast } from "@/hooks/use-toast";
import IconTooltip from "@/components/common/IconTooltip";
import { useDebounce } from "@/hooks/useDebounce";

const Facilities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [page, setPage] = useState(1); // current page
  const pageSize = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  const [isFileDownload, setIsFileDownload] = useState(false);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);
  console.log("Hello from Facilities page", debouncedKeyword);

  const [trigger, { data, error, isLoading }] = useLazyGetOrganizationsQuery();
  const [updateOrganizationStatus] = useUpdateOrganizationStatusMutation();
  const [getOrganizationsToExportcsv] =
    useLazyGetOrganizationsToExportcsvQuery();
  const [deleteOrganization] = useDeleteOrganizationMutation();

  // Trigger the API when page changes
  useEffect(() => {
    trigger({
      sourceOfCreation: "talhospitals",
      limit: pageSize,
      offset: (page - 1) * pageSize,
      keyword: debouncedKeyword || "",
    });
  }, [page, pageSize, trigger, debouncedKeyword]);

  useEffect(() => {
    if (typeof data?.totalCountOfRecords === "number") {
      setTotalRecords(data.totalCountOfRecords);
    } else if (typeof data?.totalCount === "number") {
      setTotalRecords(data.totalCount);
    } else if (Array.isArray(data?.data)) {
      setTotalRecords(data.data.length); // fallback
    } else {
      setTotalRecords(0);
    }
  }, [data]);
  const getStatusLabel = (status) => {
    if (status === -1) {
      return "Rejected";
    } else if (status === 0) {
      return "Pending";
    } else if (status === 1) {
      return "Approved";
    }
  };
  const handleViewFacility = (facility: any) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };
  const totalCount =
    typeof data?.totalCountOfRecords === "number"
      ? data.totalCountOfRecords
      : "";

  const handleUpdateStatus = async (id: string, newStatus: number) => {
    try {
      const response = await updateOrganizationStatus({
        orgId: id,
        data: { status: newStatus },
      }).unwrap();
      if (response.statusCode !== 200) {
        throw new Error(`Failed to update status: ${response.message}`);
      } else if (response.statusCode === 200) {
        toast({
          title: "Status Update",
          description: `Facility status updated to ${getStatusLabel(
            newStatus
          )}`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      // Optionally show error toast
      toast({
        title: "Status Update Failed",
        description: `Failed to update facility status: ${error.message}`,
        variant: "destructive",
      });
    }
  };
  const handleDeleteFacility = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this facility?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteOrganization(id).unwrap(); // 👈 mutation from RTK
      if (response.statusCode === 200) {
        toast({
          title: "Facility Deleted",
          description: "The facility was deleted successfully.",
          variant: "default",
        });
        trigger({
          // Re-fetch the list
          sourceOfCreation: "talhospitals",
          limit: pageSize,
          offset: (page - 1) * pageSize,
        });
      } else {
        throw new Error(response.message || "Failed to delete facility");
      }
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };
  const exportToCSV = async () => {
    try {
      const isDownload = true;
      setIsFileDownload(true);
      const result = await getOrganizationsToExportcsv({
        limit: 0,
        offset: 0,
        keyword: debouncedKeyword,
        isDownload,
      }).unwrap();
      console.log("Export result:", result);

      if (!result || typeof result !== "string") {
        toast({
          title: "Export Failed",
          description: "Invalid export response from server.",
          variant: "destructive",
        });
        return;
      }

      const blob = new Blob([result], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Organisation_Data-${new Date().getTime()}.csv`;
      document.body.appendChild(link); // required for Firefox
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "CSV has been downloaded.",
      });
    } catch (err) {
      console.error("Export error:", err);
      toast({
        title: "Export Failed",
        description: "Something went wrong while exporting.",
        variant: "destructive",
      });
    } finally {
      setIsFileDownload(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Manage Facilities"
        description="View and manage all healthcare facilities in the system."
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <Button
            variant="default"
            className="bg-health-600 hover:bg-health-700"
          >
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
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center"
              onClick={exportToCSV}
              disabled={isFileDownload}
            >
              <ArrowDown className="mr-2 h-4 w-4" />
              {isFileDownload ? "Exporting..." : "Export"}
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
              {data?.data?.map((facility, index) => {
                return (
                  <TableRow key={facility.id ?? `facility-${index}`}>
                    <TableCell className="font-medium">
                      {facility.orgName}
                    </TableCell>
                    <TableCell>
                      {[
                        facility?.orgAddress?.city,
                        facility?.orgAddress?.state,
                        facility?.orgAddress?.country,
                      ]
                        .filter(Boolean) // removes null or undefined
                        .join(", ")}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://${facility.websiteUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-health-600 hover:underline"
                      >
                        {facility.websiteUrl}
                      </a>
                    </TableCell>
                    <TableCell>
                      {facility.user_info?.name?.first_name || ""}{" "}
                      {facility.user_info?.name?.last_name || "N/A"}
                      <br />
                      {facility.user_info?.email || "N/A"}
                      <br />
                      {facility.user_info?.phone || "N/A"}
                    </TableCell>
                    <TableCell>{facility.orgType || "N/A"}</TableCell>
                    <TableCell>
                      {facility.createdAt
                        ? new Date(facility.createdAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <span>
                        <div className="flex gap-1 ml-2 mb-4">
                          <button
                            title="Approve"
                            onClick={() => handleUpdateStatus(facility._id, 1)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Check className="h-4 w-4" />
                          </button>

                          <button
                            title="Reject"
                            onClick={() => handleUpdateStatus(facility._id, -1)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          facility.status === 1
                            ? "bg-green-100 text-green-800"
                            : facility.status === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {getStatusLabel(facility?.status) ||
                          "Yet to take action"}{" "}
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {/* View Button */}
                      <>
                        <IconTooltip label="View Facility">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleViewFacility(facility?._id)}
                            title="View Facility"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </IconTooltip>
                        <IconTooltip label="Delete Facility">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteFacility(facility?._id)}
                            title="Delete Facility"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </IconTooltip>
                      </>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="py-4 px-6 border-t border-gray-200">
          <PaginationBar
            page={page}
            totalPages={Math.ceil(totalRecords / pageSize)} // ✅ Use totalRecords
            setPage={setPage}
            totalRecords={totalRecords}
            pageSize={pageSize}
          />
        </div>
      </div>

      <FacilityManagementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        facility={selectedFacility}
      />
    </DashboardLayout>
  );
};

export default Facilities;

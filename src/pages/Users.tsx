import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Calendar as CalendarIcon,
  Search,
  ArrowDown,
  Eye,
  Check,
  X,
} from "lucide-react";
import {
  useLazyGetUsersQuery,
  useUpdateProfileMutation,
} from "@/store/features/userApi";
import PaginationBar from "@/components/common/PaginationBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDebounce } from "use-debounce"; // Add this import (install with: npm install use-debounce)
import UserDetailsModal from "@/components/modals/UserDetailsModal";

import { useToast } from "@/hooks/use-toast";

const Users = () => {
  const navigate = useNavigate();
  const [trigger, { data, isLoading, error }] = useLazyGetUsersQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [role, setRole] = useState<string>(
    "patient,doctor,facility,organization"
  );
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);
  const [dateRange, setDateRange] = useState<{
    startDate?: number;
    endDate?: number;
  }>({
    startDate: new Date(
      oneWeekAgo.getFullYear(),
      oneWeekAgo.getMonth(),
      oneWeekAgo.getDate()
    ).getTime(),
    endDate: now.getTime(),
  });
  const [debouncedSearch] = useDebounce(search, 400); // 400ms debounce

  // Fetch users when page changes
  useEffect(() => {
    trigger({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      roles: role || undefined,
      search: debouncedSearch || undefined,
      status: status === "all" ? undefined : status,
    });
  }, [trigger, page, role, debouncedSearch, status, dateRange, pageSize]);

  // Use API data or fallback to empty array
  const users = Array.isArray(data?.data) ? data.data : [];
  const totalCount =
    typeof data?.totalCountOfRecords === "number"
      ? data.totalCountOfRecords
      : users.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const getStatusLabel = (status) => {
    if (status === -1) {
      return "Rejected";
    } else if (status === 0) {
      return "Pending";
    } else if (status === 1) {
      return "Approved";
    }
  };

  const handleClearFilters = () => {
    setRole("patient,doctor,facility,organization");
    setSearch("");
    setStatus("all");
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    setDateRange({
      startDate: new Date(
        oneWeekAgo.getFullYear(),
        oneWeekAgo.getMonth(),
        oneWeekAgo.getDate()
      ).getTime(),
      endDate: now.getTime(),
    });
    setPage(1);
    trigger({
      limit: pageSize,
      offset: 0,
      startDate: new Date(
        oneWeekAgo.getFullYear(),
        oneWeekAgo.getMonth(),
        oneWeekAgo.getDate()
      ).getTime(),
      endDate: now.getTime(),
      roles: "patient,doctor,facility,organization",
    });
  };
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}-${String(
    today.getHours()
  ).padStart(2, "0")}-${String(today.getMinutes()).padStart(2, "0")}-${String(
    today.getSeconds()
  ).padStart(2, "0")}`;

  const handleExportClick = async () => {
    try {
      const response = await trigger({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        roles: role || undefined,
        search: debouncedSearch || undefined,
        status: status === "all" ? undefined : status,
        isDownload: true,
      }).unwrap();

      const hiddenElement = document.createElement("a");
      hiddenElement.href =
        "data:text/csv;charset=utf-8," + encodeURIComponent(response.data);
      hiddenElement.target = "_blank";
      hiddenElement.download = `Users-Report-${formattedDate}.csv`;
      hiddenElement.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const handleUpdate = async (userStatus, userId) => {
    try {
      const response = await updateProfile({
        userId: userId,
        values: { profileVerificationStatus: userStatus },
      }).unwrap();
      toast({
        title: "Profile Status Updated",
        description: `User ID: ${userId} has been ${
          userStatus === 1 ? "accepted" : "rejected"
        } successfully.`,
      });
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Manage Users"
        description="View and manage all users in the system."
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="justify-start flex items-center text-theme-secondary border-theme-secondary/30"
                onClick={handleExportClick}
              >
                <ArrowDown className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range Picker */}
            <div className="flex items-center space-x-2 relative z-10">
              <CalendarIcon className="h-5 w-5 text-theme-secondary" />
              <span className="font-medium">Date Range:</span>
              <DatePicker
                selected={
                  dateRange.startDate ? new Date(dateRange.startDate) : null
                }
                onChange={(date: Date) =>
                  setDateRange((prev) => ({
                    ...prev,
                    startDate: date ? date.getTime() : undefined,
                  }))
                }
                selectsStart
                startDate={
                  dateRange.startDate ? new Date(dateRange.startDate) : null
                }
                endDate={dateRange.endDate ? new Date(dateRange.endDate) : null}
                placeholderText="Start Date"
                maxDate={
                  dateRange.endDate ? new Date(dateRange.endDate) : undefined
                }
                popperPlacement="bottom-start"
                popperClassName="z-50"
              />
              <span>to</span>
              <DatePicker
                selected={
                  dateRange.endDate ? new Date(dateRange.endDate) : null
                }
                onChange={(date: Date) =>
                  setDateRange((prev) => ({
                    ...prev,
                    endDate: date ? date.getTime() : undefined,
                  }))
                }
                selectsEnd
                startDate={
                  dateRange.startDate ? new Date(dateRange.startDate) : null
                }
                endDate={dateRange.endDate ? new Date(dateRange.endDate) : null}
                minDate={
                  dateRange.startDate
                    ? new Date(dateRange.startDate)
                    : undefined
                }
                placeholderText="End Date"
                maxDate={new Date()}
                popperPlacement="bottom-start"
                popperClassName="z-50"
              />
            </div>

            {/* Role Filter */}
            <div>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Role Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient,doctor,facility,organization">
                    All Roles
                  </SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="facility">Facility</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="0">Pending</SelectItem>
                  <SelectItem value="1">Approved</SelectItem>
                  <SelectItem value="-1">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-secondary" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
            <div className="flex space-x-2 mb-4 md:mb-0">
              <Button
                variant="outline"
                className="text-theme-secondary border-theme-secondary/30"
                onClick={handleClearFilters}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Org Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Contact Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Account Verified?
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="text-center py-8">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <button
                         className="text-theme-primary hover:text-theme-primary/80 hover:underline font-medium cursor-pointer"
                         onClick={() => navigate(`/users/${user._id}`)}
                       >
                         {user?.name?.first_name} {user?.name?.last_name}
                       </button>
                     </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user?.facilities?.length > 0
                        ? user?.facilities?.map((data) => (
                            <span key={data._id}>
                              {" "}
                              {data?.orgName ? data.orgName : "--"}
                            </span>
                          ))
                        : "--"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {Array.isArray(user?.roles)
                        ? user.roles.map((role: string, index: number) => (
                            <span key={index}>
                              {role === "doctor"
                                ? "Doctor"
                                : role === "patient"
                                ? "Patient"
                                : role === "facility"
                                ? "Facility"
                                : role === "organization"
                                ? "Organization"
                                : ""}
                            </span>
                          ))
                        : user?.roles || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user?.phone || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user?.account_verified !== undefined
                        ? user?.account_verified
                          ? "Yes"
                          : "No"
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${
        user?.profileVerificationStatus === 1
          ? "bg-green-100 text-green-800"
          : user?.profileVerificationStatus === 0
          ? "bg-orange-100 text-orange-800"
          : user?.profileVerificationStatus === -1
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800"
      }`}
                      >
                        {getStatusLabel(user?.profileVerificationStatus) ||
                          "Unknown"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 text-theme-secondary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-600 hover:text-green-700"
                          onClick={() => handleUpdate(1, user._id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-theme-primary hover:text-theme-primary/90"
                          onClick={() => handleUpdate(-1, user._id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="py-4 px-6 border-t border-gray-200">
          <PaginationBar
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>

      <UserDetailsModal
        user={selectedUser}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </DashboardLayout>
  );
};

export default Users;

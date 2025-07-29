import React, { useEffect, useState } from "react";
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
  Download,
  Eye,
  Check,
  X,
  UserPlus,
  Users as UsersIcon,
  UserCheck,
  Clock,
  Filter,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLazyGetUsersQuery } from "@/store/features/userApi";
import PaginationBar from "@/components/common/PaginationBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDebounce } from "use-debounce";
import UserDetailsModal from "@/components/modals/UserDetailsModal";

const Users = () => {
  const [trigger, { data, isLoading, error }] = useLazyGetUsersQuery();
  const [page, setPage] = useState(1);
  const pageSize = 12; // Changed to 12 for better card layout
  const [role, setRole] = useState<string>(
    "patient,doctor,facility,organization"
  );
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  
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
  const [debouncedSearch] = useDebounce(search, 400);

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

  useEffect(() => {
    if (data) {
      console.log("Fetched users data:", data);
    }
    if (error) {
      console.error("Error fetching users:", error);
    }
  }, [data, error]);

  // Use API data or fallback to empty array
  const users = Array.isArray(data?.data) ? data.data : [];
  const totalCount =
    typeof data?.totalCountOfRecords === "number"
      ? data.totalCountOfRecords
      : users.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Calculate summary stats from actual data
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.profileVerificationStatus === 1).length;
  const pendingUsers = users.filter(user => user.profileVerificationStatus === 0).length;
  const rejectedUsers = users.filter(user => user.profileVerificationStatus === -1).length;

  const getStatusLabel = (status: number) => {
    if (status === -1) return "Rejected";
    if (status === 0) return "Pending";
    if (status === 1) return "Approved";
    return "Unknown";
  };

  const getStatusVariant = (status: number) => {
    if (status === -1) return "destructive";
    if (status === 0) return "secondary";
    if (status === 1) return "default";
    return "outline";
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "doctor": return "bg-blue-100 text-blue-800";
      case "patient": return "bg-green-100 text-green-800";
      case "facility": return "bg-purple-100 text-purple-800";
      case "organization": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatUserName = (user: any) => {
    const firstName = user?.name?.first_name || "";
    const lastName = user?.name?.last_name || "";
    return `${firstName} ${lastName}`.trim() || "N/A";
  };

  const formatAddress = (address: any) => {
    if (!address || typeof address !== 'object') return "--";
    const parts = [
      address.line1,
      address.line2,
      address.locality,
      address.city,
      address.state,
      address.country
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "--";
  };

  const formatOrgName = (user: any) => {
    if (user?.facilities?.length > 0) {
      return user.facilities.map((facility: any) => facility?.orgName || "--").join(", ");
    }
    return "--";
  };

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

      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}-${String(
        today.getHours()
      ).padStart(2, "0")}-${String(today.getMinutes()).padStart(2, "0")}-${String(
        today.getSeconds()
      ).padStart(2, "0")}`;

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

  const UserCard = ({ user }: { user: any }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {formatUserName(user).split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {formatUserName(user)}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-[60]">
              <DropdownMenuItem onClick={() => {
                setSelectedUser(user);
                setIsModalOpen(true);
              }}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-green-600">
                <Check className="h-4 w-4 mr-2" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <X className="h-4 w-4 mr-2" />
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Role:</span>
            <div className="flex flex-wrap gap-1">
              {Array.isArray(user?.roles) ? user.roles.map((role: string, index: number) => (
                <Badge key={index} variant="secondary" className={`text-xs ${getRoleColor(role)}`}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Badge>
              )) : (
                <Badge variant="secondary" className="text-xs">
                  {user?.roles || "N/A"}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge variant={getStatusVariant(user?.profileVerificationStatus)}>
              {getStatusLabel(user?.profileVerificationStatus)}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Phone:</span>
            <span className="text-sm font-medium">{user?.phone || "N/A"}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Verified:</span>
            <Badge variant={user?.account_verified ? "default" : "secondary"}>
              {user?.account_verified ? "Yes" : "No"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Joined:</span>
            <span className="text-sm text-muted-foreground">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Manage Users"
          description="View and manage all users in the system with advanced filtering and analytics."
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">{totalCount}</p>
                </div>
                <UsersIcon className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold text-foreground">{activeUsers}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-foreground">{pendingUsers}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-3xl font-bold text-foreground">{rejectedUsers}</p>
                </div>
                <X className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <Button className="w-fit">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={handleExportClick}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                {/* Date Range Picker */}
                <div className="col-span-full lg:col-span-2">
                  <div className="flex items-center space-x-2 relative">
                    <CalendarIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium whitespace-nowrap text-sm">Date Range:</span>
                    <div className="flex items-center space-x-2 flex-wrap">
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
                        popperClassName="!z-[60]"
                        className="w-32 text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-muted-foreground">to</span>
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
                        popperClassName="!z-[60]"
                        className="w-32 text-sm border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Role Filter */}
                <div className="relative">
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Role Filter" />
                    </SelectTrigger>
                    <SelectContent className="z-[50]">
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
                <div className="relative">
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status Filter" />
                    </SelectTrigger>
                    <SelectContent className="z-[50]">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="0">Pending</SelectItem>
                      <SelectItem value="1">Approved</SelectItem>
                      <SelectItem value="-1">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search */}
                <div className="col-span-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users by name, email, or phone..."
                      className="pl-10"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Grid */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-muted h-12 w-12"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-3 bg-muted rounded w-32"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex justify-between">
                          <div className="h-3 bg-muted rounded w-16"></div>
                          <div className="h-3 bg-muted rounded w-20"></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : users.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user: any, idx: number) => (
                <UserCard key={idx} user={user} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <PaginationBar
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </div>
        )}
      </div>

      {/* User Details Modal */}
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
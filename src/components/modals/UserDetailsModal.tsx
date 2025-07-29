import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Shield, 
  MapPin,
  Users
} from "lucide-react";

interface UserDetailsModalProps {
  user: any;
  open: boolean;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ 
  user, 
  open, 
  onClose 
}) => {
  if (!user) return null;

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

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "-";
  };

  const formatAddress = (address: any) => {
    if (!address || typeof address !== 'object') return "-";
    
    const addressParts = [
      address.line1,
      address.line2,
      address.locality,
      address.village,
      address.mandal,
      address.district,
      address.city,
      address.state,
      address.country,
      address.zip_code
    ].filter(Boolean);
    
    return addressParts.length > 0 ? addressParts.join(", ") : "-";
  };

  const formatRoles = (roles: string[] | string) => {
    if (Array.isArray(roles)) {
      return roles.map(role => 
        role.charAt(0).toUpperCase() + role.slice(1)
      ).join(", ");
    }
    return typeof roles === 'string' ? roles : "-";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-sm font-medium">
                    {user?.name?.first_name} {user?.name?.last_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">User ID</label>
                  <p className="text-sm font-mono">{user?._id || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Roles</label>
                  <p className="text-sm">{formatRoles(user?.roles)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                  <p className="text-sm">{formatDate(user?.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{user?.email || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{user?.phone || "-"}</p>
                </div>
                {user?.address && (
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                    <p className="text-sm">{formatAddress(user.address)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Verified</label>
                  <div className="mt-1">
                    <Badge variant={user?.account_verified ? "default" : "secondary"}>
                      {user?.account_verified !== undefined 
                        ? (user?.account_verified ? "Yes" : "No") 
                        : "-"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Profile Status</label>
                  <div className="mt-1">
                    <Badge variant={getStatusVariant(user?.profileVerificationStatus)}>
                      {getStatusLabel(user?.profileVerificationStatus)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organization Information */}
          {user?.facilities && user.facilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Organization Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.facilities.map((facility: any, index: number) => (
                  <div key={facility._id || index} className="p-3 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Organization Name</label>
                        <p className="text-sm">{facility?.orgName || "-"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Organization ID</label>
                        <p className="text-sm font-mono">{facility?._id || "-"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Additional Information */}
          {(user?.specialties || user?.qualifications || user?.experience) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {user?.specialties && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Specialties</label>
                      <p className="text-sm">{user.specialties}</p>
                    </div>
                  )}
                  {user?.qualifications && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Qualifications</label>
                      <p className="text-sm">{user.qualifications}</p>
                    </div>
                  )}
                  {user?.experience && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Experience</label>
                      <p className="text-sm">{user.experience}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
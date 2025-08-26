import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Phone, Mail, FileText, Download, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { RequestDetails as RequestDetailsType } from '@/types/request';

// Mock data - replace with actual API call
const mockRequestDetails: RequestDetailsType = {
  id: "1",
  title: "Annual Health Checkup",
  description: "I need a comprehensive annual health checkup including blood tests, heart examination, and general physical assessment. I have been experiencing some fatigue lately and want to ensure everything is normal.",
  status: "pending",
  createdDate: "2024-01-15",
  imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  creator: {
    name: "John Smith",
    id: "user_001",
    role: "Patient",
    email: "john.smith@email.com"
  },
  assignedDoctor: {
    name: "Dr. Sarah Johnson",
    specialization: "Internal Medicine",
    email: "dr.sarah@hospital.com",
    phone: "+1 (555) 123-4567",
    hospital: "City Medical Center"
  },
  applicantsCount: 5,
  attachedDocuments: [
    {
      id: "doc_1",
      name: "Previous Medical Reports.pdf",
      url: "#",
      type: "application/pdf",
      size: 2048000,
      uploadedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "doc_2", 
      name: "Insurance Card.jpg",
      url: "#",
      type: "image/jpeg",
      size: 1024000,
      uploadedAt: "2024-01-15T10:32:00Z"
    }
  ],
  priority: "medium",
  estimatedCompletionDate: "2024-01-25",
  notes: "Patient prefers morning appointments due to work schedule."
};

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In real implementation, fetch request details based on ID
  const request = mockRequestDetails;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800', 
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/requests')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Requests
          </Button>
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(request.status)}>
              {request.status.replace('-', ' ').toUpperCase()}
            </Badge>
            <Badge className={getPriorityColor(request.priority)}>
              {request.priority.toUpperCase()} PRIORITY
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{request.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {request.imageUrl && (
                  <img
                    src={request.imageUrl}
                    alt={request.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {request.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Created: {new Date(request.createdDate).toLocaleDateString()}</span>
                  </div>
                  {request.estimatedCompletionDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Est. Completion: {new Date(request.estimatedCompletionDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {request.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Additional Notes</h3>
                    <p className="text-muted-foreground bg-muted p-3 rounded-lg">
                      {request.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attached Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Attached Documents ({request.attachedDocuments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {request.attachedDocuments.length > 0 ? (
                  <div className="space-y-3">
                    {request.attachedDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No documents attached</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Request Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{request.creator.name}</p>
                  <p className="text-sm text-muted-foreground">{request.creator.role}</p>
                </div>
                {request.creator.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{request.creator.email}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Assigned Doctor */}
            {request.assignedDoctor && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Assigned Doctor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">{request.assignedDoctor.name}</p>
                    <p className="text-sm text-muted-foreground">{request.assignedDoctor.specialization}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    {request.assignedDoctor.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{request.assignedDoctor.email}</span>
                      </div>
                    )}
                    {request.assignedDoctor.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{request.assignedDoctor.phone}</span>
                      </div>
                    )}
                    {request.assignedDoctor.hospital && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{request.assignedDoctor.hospital}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applicants</span>
                  <Badge variant="secondary">{request.applicantsCount}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority</span>
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="default">
                  Edit Request
                </Button>
                <Button className="w-full" variant="outline">
                  Assign Doctor
                </Button>
                <Button className="w-full" variant="outline">
                  Update Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RequestDetails;
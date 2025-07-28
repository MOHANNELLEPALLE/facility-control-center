import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload, X, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RequestManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    id: number;
    title: string;
    creatorType: string;
    assignedTo: string;
    createdDate: string;
    status: string;
    acceptanceStatus: string;
    createdFor: string;
  } | null;
}

const RequestManagementModal: React.FC<RequestManagementModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  const [status, setStatus] = useState<string>("");
  const [isPremiumCampaign, setIsPremiumCampaign] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).filter(file => {
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';
      return isImage || isPdf;
    });
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!status) {
      toast({
        title: "Error",
        description: "Please select a status before submitting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Request has been updated successfully.",
    });
    
    onClose();
  };

  const renderFilePreview = (file: File, index: number) => {
    const isImage = file.type.startsWith('image/');
    
    return (
      <div key={index} className="relative group">
        <div className="bg-card rounded-xl border border-border p-3 hover:bg-accent/50 transition-colors">
          <div className="flex items-center space-x-3">
            {isImage ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileImage className="w-6 h-6 text-primary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => removeFile(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded-full"
            >
              <X className="w-4 h-4 text-destructive" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Manage Request
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {request?.title || "Request Details"}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Request Details Card */}
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <h3 className="font-medium text-foreground">Request Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Creator:</span>
                <span className="ml-2 text-foreground">{request?.creatorType}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Assigned To:</span>
                <span className="ml-2 text-foreground">{request?.assignedTo}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Created Date:</span>
                <span className="ml-2 text-foreground">{request?.createdDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Department:</span>
                <span className="ml-2 text-foreground">{request?.createdFor}</span>
              </div>
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-3">
            <Label htmlFor="status" className="text-sm font-medium text-foreground">
              Request Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select new status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approve">
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    Approve
                  </span>
                </SelectItem>
                <SelectItem value="reject">
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    Reject
                  </span>
                </SelectItem>
                <SelectItem value="pending">
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    Pending
                  </span>
                </SelectItem>
                <SelectItem value="in-progress">
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    In Progress
                  </span>
                </SelectItem>
                <SelectItem value="under-review">
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    Under Review
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Premium Campaign Toggle */}
          <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
            <div className="space-y-1">
              <Label htmlFor="premium-toggle" className="text-sm font-medium text-foreground">
                Is Premium Campaign
              </Label>
              <p className="text-xs text-muted-foreground">
                Enable premium features and priority handling for this request
              </p>
            </div>
            <Switch
              id="premium-toggle"
              checked={isPremiumCampaign}
              onCheckedChange={setIsPremiumCampaign}
            />
          </div>

          {/* File Upload Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Supporting Documents
            </Label>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/30"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <div className="space-y-2">
                  <p className="text-sm text-foreground">
                    <label
                      htmlFor="file-upload"
                      className="font-medium text-primary hover:text-primary/80 cursor-pointer"
                    >
                      Click to upload
                    </label>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, PDF up to 10MB each
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </div>
            </div>

            {/* File Previews */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">
                  Uploaded Files ({uploadedFiles.length})
                </p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uploadedFiles.map((file, index) => renderFilePreview(file, index))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Submit Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestManagementModal;
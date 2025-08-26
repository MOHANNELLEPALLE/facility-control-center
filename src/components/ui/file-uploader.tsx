import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  X,
  File,
  FileText,
  Image,
  Video,
  Download,
  Eye,
  Edit3,
  Trash2,
  AlertCircle,
} from "lucide-react";
import {
  UploadedFile,
  FileUploaderConfig,
  FilePreview,
  SUPPORTED_FILE_TYPES,
  DEFAULT_CONFIG,
} from "@/types/fileUploader";
import { useFirebaseFileUpload } from "@/hooks/useFirebaseFileUpload";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface FileUploaderProps {
  config?: Partial<FileUploaderConfig>;
  initialFiles?: UploadedFile[];
  className?: string;
  name?: string;
  onChange?: (files: UploadedFile[]) => void;
  multiple?: boolean;
  acceptedTypes?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  config = {},
  initialFiles = [],
  className,
  name,
  onChange,
}) => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [editingMetadata, setEditingMetadata] = useState<UploadedFile | null>(
    null
  );
  const [metadataForm, setMetadataForm] = useState({
    tags: "",
    description: "",
  });

  const {
    uploadedFiles,
    uploadProgress,
    isUploading,
    uploadFiles,
    deleteFile,
    updateFileMetadata,
    loadExistingFiles,
    setUploadedFiles,
  } = useFirebaseFileUpload(mergedConfig);

  // Initialize with existing files
  useEffect(() => {
    if (initialFiles.length > 0) {
      setUploadedFiles(initialFiles);
    }
  }, [initialFiles, setUploadedFiles]);

  // Notify parent component of file changes
  useEffect(() => {
    onChange?.(uploadedFiles);
  }, [uploadedFiles, onChange]);

  // Load existing files on mount
  useEffect(() => {
    loadExistingFiles();
  }, [loadExistingFiles]);

  const getFileIcon = (type: string) => {
    if (SUPPORTED_FILE_TYPES.images.includes(type)) return Image;
    if (SUPPORTED_FILE_TYPES.videos.includes(type)) return Video;
    if (SUPPORTED_FILE_TYPES.documents.includes(type)) return FileText;
    return File;
  };

  const getFileTypeCategory = (
    type: string
  ): "image" | "video" | "document" | "other" => {
    if (SUPPORTED_FILE_TYPES.images.includes(type)) return "image";
    if (SUPPORTED_FILE_TYPES.videos.includes(type)) return "video";
    if (SUPPORTED_FILE_TYPES.documents.includes(type)) return "document";
    return "other";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const createFilePreview = useCallback((file: File): FilePreview => {
    const id = `preview_${Date.now()}_${Math.random()}`;
    const preview: FilePreview = {
      id,
      file,
      type: getFileTypeCategory(file.type),
    };

    if (preview.type === "image") {
      preview.preview = URL.createObjectURL(file);
    }

    return preview;
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Validate file count
      if (!mergedConfig.allowMultiple && acceptedFiles.length > 1) {
        toast({
          title: "Multiple Files Not Allowed",
          description: "Please select only one file.",
          variant: "destructive",
        });
        return;
      }

      if (uploadedFiles.length + acceptedFiles.length > mergedConfig.maxFiles) {
        toast({
          title: "Too Many Files",
          description: `Maximum ${mergedConfig.maxFiles} files allowed.`,
          variant: "destructive",
        });
        return;
      }

      // Validate file sizes
      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > mergedConfig.maxFileSize
      );
      if (oversizedFiles.length > 0) {
        toast({
          title: "File Too Large",
          description: `Maximum file size is ${formatFileSize(
            mergedConfig.maxFileSize
          )}.`,
          variant: "destructive",
        });
        return;
      }

      // Create previews
      const previews = acceptedFiles.map(createFilePreview);
      setFilePreviews((prev) => [...prev, ...previews]);

      // Upload files
      uploadFiles(acceptedFiles);
    },
    [uploadedFiles.length, mergedConfig, createFilePreview, uploadFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: mergedConfig.acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    multiple: mergedConfig.allowMultiple,
    disabled: isUploading,
  });

  const removePreview = (previewId: string) => {
    setFilePreviews((prev) => {
      const preview = prev.find((p) => p.id === previewId);
      if (preview?.preview) {
        URL.revokeObjectURL(preview.preview);
      }
      return prev.filter((p) => p.id !== previewId);
    });
  };

  const handleMetadataUpdate = async () => {
    if (!editingMetadata) return;

    const metadata = {
      tags: metadataForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      description: metadataForm.description,
    };

    await updateFileMetadata(editingMetadata, metadata);
    setEditingMetadata(null);
    setMetadataForm({ tags: "", description: "" });
  };

  const openMetadataEditor = (file: UploadedFile) => {
    setEditingMetadata(file);
    setMetadataForm({
      tags: file.metadata?.tags?.join(", ") || "",
      description: file.metadata?.description || "",
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Zone */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
          >
            <input {...getInputProps()} name={name} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse files
            </p>
            <Button type="button" variant="outline" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Choose Files"}
            </Button>
            <div className="mt-4 text-xs text-muted-foreground">
              <p>
                Max {mergedConfig.maxFiles} files,{" "}
                {formatFileSize(mergedConfig.maxFileSize)} each
              </p>
              <p>Supported: Images, Videos, Documents</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Upload Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {uploadProgress.map((progress) => (
              <div key={progress.fileId} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="truncate">{progress.fileName}</span>
                  <span>{Math.round(progress.progress)}%</span>
                </div>
                <Progress value={progress.progress} className="h-2" />
                {progress.status === "error" && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{progress.error}</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Uploaded Files ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {uploadedFiles.map((file) => {
                const IconComponent = getFileIcon(file.type);
                const fileCategory = getFileTypeCategory(file.type);

                return (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    {fileCategory === "image" ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-12 w-12 object-cover rounded cursor-pointer"
                        onClick={() => setSelectedFile(file)}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                        <IconComponent className="h-6 w-6" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <Badge variant="secondary" className="text-xs">
                          {fileCategory}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedFile(file)}
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(file.downloadURL, "_blank")}
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteFile(file)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Preview Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              {getFileTypeCategory(selectedFile.type) === "image" ? (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  className="w-full h-auto max-h-96 object-contain rounded"
                />
              ) : getFileTypeCategory(selectedFile.type) === "video" ? (
                <video
                  src={selectedFile.url}
                  controls
                  className="w-full h-auto max-h-96 rounded"
                />
              ) : (
                <div className="text-center p-8">
                  <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <p>Document preview not available</p>
                  <Button
                    className="mt-4"
                    onClick={() =>
                      window.open(selectedFile.downloadURL, "_blank")
                    }
                  >
                    Open in New Tab
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label>File Size</Label>
                  <p>{formatFileSize(selectedFile.size)}</p>
                </div>
                <div>
                  <Label>Upload Date</Label>
                  <p>{selectedFile.uploadedAt.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileUploader;
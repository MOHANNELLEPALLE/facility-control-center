export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  downloadURL: string;
  path: string;
  uploadedAt: Date;
  metadata?: Record<string, any>;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error' | 'paused';
  error?: string;
}

export interface FileUploaderConfig {
  maxFiles: number;
  maxFileSize: number; // in bytes
  acceptedFileTypes: string[];
  allowMultiple: boolean;
  storagePath: string;
  showPreviews: boolean;
  enableMetadata: boolean;
  onUploadComplete: (files: UploadedFile[]) => void;
  onUploadProgress: (progress: UploadProgress[]) => void;
  onUploadError: (error: string, file?: File) => void;
  onFileDelete: (file: UploadedFile) => void;
}

export interface FilePreview {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'video' | 'document' | 'other';
}

export const SUPPORTED_FILE_TYPES = {
  images: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  videos: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'],
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv'
  ]
};

export const DEFAULT_CONFIG: Required<FileUploaderConfig> = {
  maxFiles: 10,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  acceptedFileTypes: [
    ...SUPPORTED_FILE_TYPES.images,
    ...SUPPORTED_FILE_TYPES.videos,
    ...SUPPORTED_FILE_TYPES.documents
  ],
  allowMultiple: true,
  storagePath: 'uploads',
  showPreviews: true,
  enableMetadata: true,
  onUploadComplete: () => {},
  onUploadProgress: () => {},
  onUploadError: () => {},
  onFileDelete: () => {}
};
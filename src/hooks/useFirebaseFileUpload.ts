import { useState, useCallback } from 'react';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject, 
  listAll, 
  getMetadata,
  updateMetadata 
} from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { UploadedFile, UploadProgress, FileUploaderConfig } from '@/types/fileUploader';
import { toast } from '@/hooks/use-toast';

export const useFirebaseFileUpload = (config: FileUploaderConfig) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Generate unique file ID
  const generateFileId = () => `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Upload single file
  const uploadFile = useCallback(async (file: File, customPath?: string): Promise<UploadedFile> => {
    const fileId = generateFileId();
    const fileName = `${fileId}_${file.name}`;
    const filePath = customPath || config.storagePath || 'uploads';
    const storageRef = ref(storage, `${filePath}/${fileName}`);

    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Update progress
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          
          setUploadProgress(prev => {
            const existingIndex = prev.findIndex(p => p.fileId === fileId);
            const progressItem: UploadProgress = {
              fileId,
              fileName: file.name,
              progress,
              status: 'uploading'
            };

            if (existingIndex >= 0) {
              const updated = [...prev];
              updated[existingIndex] = progressItem;
              return updated;
            }
            return [...prev, progressItem];
          });

          config.onUploadProgress?.(uploadProgress);
        },
        (error) => {
          setUploadProgress(prev => 
            prev.map(p => 
              p.fileId === fileId 
                ? { ...p, status: 'error' as const, error: error.message }
                : p
            )
          );
          config.onUploadError?.(error.message, file);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            const uploadedFile: UploadedFile = {
              id: fileId,
              name: file.name,
              size: file.size,
              type: file.type,
              url: downloadURL,
              downloadURL,
              path: `${filePath}/${fileName}`,
              uploadedAt: new Date(),
              metadata: config.enableMetadata ? {
                originalName: file.name,
                uploadedBy: 'current-user', // You can customize this
                tags: []
              } : undefined
            };

            // Update progress to completed
            setUploadProgress(prev => 
              prev.map(p => 
                p.fileId === fileId 
                  ? { ...p, status: 'completed' as const, progress: 100 }
                  : p
              )
            );

            resolve(uploadedFile);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }, [config, uploadProgress]);

  // Upload multiple files
  const uploadFiles = useCallback(async (files: File[], customPath?: string) => {
    if (!files.length) return;

    setIsUploading(true);
    const uploadedFilesList: UploadedFile[] = [];

    try {
      for (const file of files) {
        const uploadedFile = await uploadFile(file, customPath);
        uploadedFilesList.push(uploadedFile);
        setUploadedFiles(prev => [...prev, uploadedFile]);
      }

      config.onUploadComplete?.(uploadedFilesList);
      toast({
        title: "Upload Successful",
        description: `${uploadedFilesList.length} file(s) uploaded successfully.`
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload files",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Clear completed progress after a delay
      setTimeout(() => {
        setUploadProgress(prev => prev.filter(p => p.status !== 'completed'));
      }, 3000);
    }
  }, [uploadFile, config]);

  // Delete file
  const deleteFile = useCallback(async (file: UploadedFile) => {
    try {
      const fileRef = ref(storage, file.path);
      await deleteObject(fileRef);
      
      setUploadedFiles(prev => prev.filter(f => f.id !== file.id));
      config.onFileDelete?.(file);
      
      toast({
        title: "File Deleted",
        description: `${file.name} has been deleted successfully.`
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: error instanceof Error ? error.message : "Failed to delete file",
        variant: "destructive"
      });
    }
  }, [config]);

  // Update file metadata
  const updateFileMetadata = useCallback(async (file: UploadedFile, newMetadata: Record<string, any>) => {
    try {
      const fileRef = ref(storage, file.path);
      await updateMetadata(fileRef, { customMetadata: newMetadata });
      
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === file.id 
            ? { ...f, metadata: { ...f.metadata, ...newMetadata } }
            : f
        )
      );

      toast({
        title: "Metadata Updated",
        description: `Metadata for ${file.name} has been updated.`
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update metadata",
        variant: "destructive"
      });
    }
  }, []);

  // Load existing files from storage
  const loadExistingFiles = useCallback(async (storagePath?: string) => {
    try {
      const path = storagePath || config.storagePath || 'uploads';
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      
      const files: UploadedFile[] = [];
      
      for (const itemRef of result.items) {
        try {
          const downloadURL = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          
          files.push({
            id: itemRef.name,
            name: itemRef.name,
            size: metadata.size,
            type: metadata.contentType || 'application/octet-stream',
            url: downloadURL,
            downloadURL,
            path: itemRef.fullPath,
            uploadedAt: new Date(metadata.timeCreated),
            metadata: metadata.customMetadata
          });
        } catch (error) {
          console.warn(`Failed to load file ${itemRef.name}:`, error);
        }
      }
      
      setUploadedFiles(files);
      return files;
    } catch (error) {
      console.error('Failed to load existing files:', error);
      return [];
    }
  }, [config.storagePath]);

  return {
    uploadedFiles,
    uploadProgress,
    isUploading,
    uploadFile,
    uploadFiles,
    deleteFile,
    updateFileMetadata,
    loadExistingFiles,
    setUploadedFiles
  };
};
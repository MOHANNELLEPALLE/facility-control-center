import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUploader from "@/components/ui/file-uploader";
import { UploadedFile, FileUploaderConfig } from "@/types/fileUploader";
import { toast } from "@/hooks/use-toast";

const FileUploaderExample: React.FC = () => {
  // Example configuration for different use cases
  const singleImageConfig: Partial<FileUploaderConfig> = {
    maxFiles: 1,
    allowMultiple: false,
    acceptedFileTypes: ["image/jpeg", "image/png", "image/gif"],
    maxFileSize: 5 * 1024 * 1024, // 5MB
    storagePath: "profile-images",
    onUploadComplete: (files) => {
      console.log("Profile image uploaded:", files);
      toast({
        title: "Profile Image Updated",
        description: "Your profile image has been successfully updated.",
      });
    },
  };

  const documentConfig: Partial<FileUploaderConfig> = {
    maxFiles: 5,
    allowMultiple: true,
    acceptedFileTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxFileSize: 10 * 1024 * 1024, // 10MB
    storagePath: "documents",
    enableMetadata: true,
    onUploadComplete: (files) => {
      console.log("Documents uploaded:", files);
    },
  };

  const mediaConfig: Partial<FileUploaderConfig> = {
    maxFiles: 10,
    allowMultiple: true,
    acceptedFileTypes: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/avi",
      "video/mov",
    ],
    maxFileSize: 50 * 1024 * 1024, // 50MB for videos
    storagePath: "media-library",
    showPreviews: true,
    enableMetadata: true,
    onUploadComplete: (files) => {
      console.log("Media files uploaded:", files);
    },
  };

  const handleFilesChange = (files: UploadedFile[]) => {
    console.log("Files changed:", files);
    // Handle file changes for form integration
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Firebase File Uploader Examples
        </h1>
        <p className="text-muted-foreground">
          Comprehensive file upload component with Firebase Storage integration
        </p>
      </div>

      {/* Single Image Upload Example */}
      <Card>
        <CardHeader>
          <CardTitle>Single Image Upload (Profile Picture)</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader
            config={singleImageConfig}
            onChange={handleFilesChange}
          />
        </CardContent>
      </Card>

      {/* Document Upload Example */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple Document Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader config={documentConfig} onChange={handleFilesChange} />
        </CardContent>
      </Card>

      {/* Media Library Example */}
      <Card>
        <CardHeader>
          <CardTitle>Media Library (Images & Videos)</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader config={mediaConfig} onChange={handleFilesChange} />
        </CardContent>
      </Card>

      {/* React Hook Form Integration Example */}
      <Card>
        <CardHeader>
          <CardTitle>React Hook Form Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To integrate with React Hook Form, use the `name` and `onChange`
              props:
            </p>
            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              {`// In your form component
import { useForm } from 'react-hook-form';

const MyForm = () => {
  const { register, setValue, watch } = useForm();
  const files = watch('attachments');

  return (
    <FileUploader 
      name="attachments"
      onChange={(files) => setValue('attachments', files)}
      config={{
        maxFiles: 3,
        allowMultiple: true,
        storagePath: 'form-attachments'
      }}
    />
  );
};`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Options */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Basic Options</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    • <code>maxFiles</code>: Maximum number of files
                  </li>
                  <li>
                    • <code>maxFileSize</code>: Maximum file size in bytes
                  </li>
                  <li>
                    • <code>allowMultiple</code>: Enable multiple file selection
                  </li>
                  <li>
                    • <code>acceptedFileTypes</code>: Array of MIME types
                  </li>
                  <li>
                    • <code>storagePath</code>: Firebase Storage path
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Advanced Options</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    • <code>showPreviews</code>: Show file previews
                  </li>
                  <li>
                    • <code>enableMetadata</code>: Enable metadata editing
                  </li>
                  <li>
                    • <code>onUploadComplete</code>: Upload completion callback
                  </li>
                  <li>
                    • <code>onUploadProgress</code>: Progress tracking callback
                  </li>
                  <li>
                    • <code>onFileDelete</code>: File deletion callback
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">1. Firebase Configuration</h4>
              <p className="text-muted-foreground mb-2">
                Update <code>src/lib/firebase.ts</code> with your Firebase
                project configuration:
              </p>
              <pre className="bg-muted p-3 rounded overflow-x-auto">
                {`const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium mb-2">2. Firebase Storage Rules</h4>
              <p className="text-muted-foreground mb-2">
                Configure your Firebase Storage security rules:
              </p>
              <pre className="bg-muted p-3 rounded overflow-x-auto">
                {`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium mb-2">3. Basic Usage</h4>
              <pre className="bg-muted p-3 rounded overflow-x-auto">
                {`import FileUploader from '@/components/ui/file-uploader';

<FileUploader 
  config={{
    maxFiles: 5,
    allowMultiple: true,
    storagePath: 'my-uploads'
  }}
  onChange={(files) => console.log('Files:', files)}
/>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploaderExample;

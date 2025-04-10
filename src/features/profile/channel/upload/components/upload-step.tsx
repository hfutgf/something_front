'use client';

import { UploadCloud, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export type UploadStepProps = {
  videoFile: File | null;
  uploadProgress: number;
  isUploading: boolean;
  error?: string;
  onVideoDrop: (acceptedFiles: File[]) => void;
  onRemoveVideo: () => void;
  onUpload: () => void;
};

export function UploadStep({
  videoFile,
  uploadProgress,
  isUploading,
  error,
  onVideoDrop,
  onRemoveVideo,
  onUpload,
}: UploadStepProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onVideoDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    maxFiles: 1,
  });

  return (
    <>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-gray-800'
            : 'border-gray-700 hover:bg-gray-800'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <UploadCloud className="h-12 w-12 text-gray-500" />
          <div>
            <p className="font-medium">
              {videoFile
                ? videoFile.name
                : 'Drag & drop your video here, or click to select'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              MP4, MOV or AVI. Max 1GB.
            </p>
          </div>
          {videoFile && (
            <Button
              type="button"
              variant="outline"
              className="mt-4 bg-gray-800 border-gray-700 hover:bg-gray-700 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveVideo();
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Remove Video
            </Button>
          )}
        </div>
      </div>

      {videoFile && (
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {isUploading ? 'Uploading...' : 'Ready to upload'}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(videoFile.size / 1024 / 1024)} MB
            </span>
          </div>
          {isUploading && (
            <Progress
              value={uploadProgress}
              className="h-2 bg-white [&>div]:bg-[#1e40af]"
            />
          )}
          <Button
            className="w-full mt-2 bg-white text-black hover:opacity-70 rounded-full"
            variant={'ghost'}
            onClick={onUpload}
            disabled={isUploading}
          >
            {isUploading ? `Uploading (${uploadProgress}%)` : 'Upload Video'}
          </Button>
        </div>
      )}
    </>
  );
}

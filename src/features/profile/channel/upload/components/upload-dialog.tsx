'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { UploadFormData, uploadSchema } from '../schema/upload.schema';
import { CompleteStep } from './complete-step';
import { DetailsStep } from './details-step';
import { UploadStep } from './upload-step';

export function UploadDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'upload' | 'details'>('upload');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleVideoDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setVideoFile(file);
    setValue('video', file);
    trigger('video');
  };

  const handleCoverDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setCoverFile(file);
    setValue('cover', file);
  };

  const handleVideoUpload = async () => {
    const isValid = await trigger('video');
    if (!isValid || !videoFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setStep('details');
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  };

  const onSubmit = (data: UploadFormData) => {
    console.log('Form data:', data);
    setIsUploadComplete(true);
  };

  const resetUpload = () => {
    setVideoFile(null);
    setCoverFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsUploadComplete(false);
    setStep('upload');
  };

  const uploadStepProps = {
    videoFile,
    uploadProgress,
    isUploading,
    error: errors.video?.message,
    onVideoDrop: handleVideoDrop,
    onRemoveVideo: () => {
      setVideoFile(null);
      setValue('video', null as unknown as File);
    },
    onUpload: handleVideoUpload,
  };

  const detailsStepProps = {
    register,
    errors,
    coverFile,
    onCoverDrop: handleCoverDrop,
    onBack: () => setStep('upload'),
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-white text-black hover:opacity-70 rounded-full"
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Video
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          {isUploadComplete ? (
            <CompleteStep
              onClose={() => {
                resetUpload();
                setIsOpen(false);
              }}
            />
          ) : step === 'upload' ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Upload Video</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Select a video file to upload
                </DialogDescription>
              </DialogHeader>
              <UploadStep {...uploadStepProps} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Video Details</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add information about your video
                </DialogDescription>
              </DialogHeader>
              <DetailsStep {...detailsStepProps} />
              <Button
                type="submit"
                variant={'ghost'}
                className="mt-4 bg-white text-black hover:opacity-70 w-full  rounded-full"
              >
                Publish Video
              </Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

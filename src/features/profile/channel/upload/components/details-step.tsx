'use client';

import { useDropzone } from 'react-dropzone';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { UploadFormData } from '../schema/upload.schema';

export type DetailsStepProps = {
  register: UseFormRegister<UploadFormData>;
  errors: FieldErrors<UploadFormData>;
  coverFile: File | null;
  onCoverDrop: (acceptedFiles: File[]) => void;
  onBack: () => void;
};

export function DetailsStep({
  register,
  errors,
  onCoverDrop,
  onBack,
}: DetailsStepProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onCoverDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input
          {...register('title')}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="Enter video title"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          {...register('description')}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="Enter video description"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Thumbnail</label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-800 transition-colors"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-medium">
              Drag & drop a thumbnail image, or click to select
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG. Recommended size: 1280x720
            </p>
          </div>
        </div>
        {errors.cover && (
          <p className="text-sm text-red-500 mt-1">{errors.cover.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="bg-gray-800 border-gray-700 hover:bg-gray-700 rounded-full"
        >
          Back
        </Button>
      </div>
    </div>
  );
}

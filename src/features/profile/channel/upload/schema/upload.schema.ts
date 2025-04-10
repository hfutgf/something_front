import { z } from 'zod';

export const uploadSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().max(500).optional(),
  video: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1000000000,
      'File size should be less than 1GB',
    ),
  cover: z.instanceof(File).optional(),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

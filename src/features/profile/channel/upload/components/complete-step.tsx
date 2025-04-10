'use client';

import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export type CompleteStepProps = {
  onClose: () => void;
};

export function CompleteStep({ onClose }: CompleteStepProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <span className="text-base text-white/60">
        Video uploaded successfully
      </span>
      <Button
        className="mt-4 bg-white text-black hover:opacity-70 rounded-full"
        variant={'ghost'}
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
}

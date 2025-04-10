import Image from 'next/image';
import React from 'react';

import { UploadDialog } from './components/upload-dialog';

const Upload = () => {
  const videos = [];
  return (
    <div className="flex-1 items-center justify-center mt-6">
      <div className="flex flex-col items-center gap-6">
        {videos.length ? (
          <>
            <Image
              src={'/image/bg-upload.png'}
              width={350}
              height={200}
              alt="upload-img"
              className="rounded-full"
            />
          </>
        ) : (
          <>
            <Image
              src={'/image/bg-upload.png'}
              width={350}
              height={200}
              alt="upload-img"
              className="rounded-full"
            />
            <span className="text-base text-white/60">
              There is nothing here yet
            </span>
          </>
        )}

        <UploadDialog />
      </div>
    </div>
  );
};

export default Upload;

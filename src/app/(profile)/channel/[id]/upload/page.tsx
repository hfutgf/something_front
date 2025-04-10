import React from 'react';

import Upload from '@/features/profile/channel/upload/upload';
import FilterVideos from '@/features/profile/channel/videos/filter-videos';

const UploadPage = () => {
  return (
    <div className="w-full">
      <FilterVideos />
      <Upload />
    </div>
  );
};

export default UploadPage;

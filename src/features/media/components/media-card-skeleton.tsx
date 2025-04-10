const MediaCardSkeleton = () => {
  return (
    <div className="w-full max-w-[360px]">
      <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl bg-gray-700 animate-pulse"></div>

      <div className="mt-3 flex gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-700 animate-pulse"></div>

        <div className="w-full">
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-full"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default MediaCardSkeleton;

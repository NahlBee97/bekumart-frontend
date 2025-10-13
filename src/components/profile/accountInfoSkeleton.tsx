export default function AccountInfoSkeleton() {
  return (
    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="animate-pulse">
          <div className="h-6 w-1/3 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded-md mt-2"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-20 mt-6">
          {/* Profile Picture Skeleton */}
          <div className="animate-pulse h-32 w-32 md:h-44 md:w-44 bg-gray-300 rounded-xl"></div>

          {/* Form Skeleton */}
          <div className="md:w-[400px] w-[200px] space-y-6">
            {/* Input 1 Skeleton */}
            <div className="animate-pulse space-y-2">
              <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-full bg-gray-300 rounded-md"></div>
            </div>

            {/* Input 2 Skeleton */}
            <div className="animate-pulse space-y-2">
              <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-full bg-gray-300 rounded-md"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-4">
              <div className="animate-pulse h-10 w-24 bg-gray-300 rounded-md"></div>
              <div className="animate-pulse h-10 w-32 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

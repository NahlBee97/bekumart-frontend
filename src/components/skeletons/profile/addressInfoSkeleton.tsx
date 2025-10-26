export const AddressInfoSkeleton = () => {
  return (
    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-gray-300 rounded-md"></div>
          </div>
          <div className="animate-pulse h-10 w-52 bg-gray-300 rounded-md"></div>
        </div>

        {/* Address List Skeleton */}
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {[...Array(2)].map((_, i) => (
              <li key={i} className="py-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  {/* Address Details Skeleton */}
                  <div className="flex items-start gap-3 w-full">
                    <div className="animate-pulse h-7 w-7 bg-gray-300 rounded-md mt-1"></div>
                    <div className="w-full space-y-2 animate-pulse">
                      <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                      <div className="h-4 w-full bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  {/* Action Buttons Skeleton */}
                  <div className="flex items-center gap-4 self-end sm:self-center flex-shrink-0">
                    <div className="animate-pulse h-6 w-14 bg-gray-300 rounded-full"></div>
                    <div className="animate-pulse h-6 w-6 bg-gray-300 rounded"></div>
                    <div className="animate-pulse h-6 w-6 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

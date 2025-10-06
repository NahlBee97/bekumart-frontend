export const AddressInfoSkeleton = () => {
  return (
    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden animate-pulse">
      <div className="p-6">
        {/* Skeleton for the Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          {/* Title placeholder */}
          <div className="h-7 bg-gray-300 rounded w-48"></div>
          {/* "Add Address" button placeholder */}
          <div className="h-10 bg-gray-300 rounded-md w-52"></div>
        </div>

        {/* Skeleton for the Address List */}
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {/* Render 2-3 placeholder items */}
            {[...Array(2)].map((_, index) => (
              <li key={index} className="py-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  {/* Left Side: Icon and Address Lines */}
                  <div className="flex items-start gap-3 w-full sm:w-auto">
                    <div className="h-6 w-6 bg-gray-300 rounded-md mt-1 flex-shrink-0"></div>
                    <div className="w-full max-w-xs">
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-5 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>

                  {/* Right Side: Action Buttons */}
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="h-6 bg-gray-300 rounded w-32"></div>
                    <div className="h-6 w-6 bg-gray-300 rounded"></div>
                    <div className="h-6 w-6 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

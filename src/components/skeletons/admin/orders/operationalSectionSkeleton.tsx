const StatusLine = () => (
  <div className="flex w-full py-1 px-2 justify-between items-center">
    <span className="h-4 px-2.5 py-0.5 bg-gray-200 rounded-lg w-1/2 animate-pulse"></span>
    <span className="h-4 w-1/4 bg-gray-200 rounded-lg animate-pulse"></span>
  </div>
);

export const OperationalSectionSkeleton = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 mb-4 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>
          <div className="space-y-3">
            <StatusLine />
            <StatusLine />
            <StatusLine />
            <StatusLine />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 mb-4 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>
          <div className="space-y-3">
            <StatusLine/>
            <StatusLine/>
            <StatusLine/>
            <StatusLine/>
          </div>
        </div>
      </div>
    </section>
  );
};
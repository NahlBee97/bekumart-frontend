export const StickyAddToCartSkeleton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="pt-2 grid grid-cols-4 h-16 py-2 md:py-3 animate-pulse">
          <div className="w-32 h-11 bg-gray-200 rounded-md"></div>
          <div></div>
          <div className="w-40 h-11 col-span-2 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

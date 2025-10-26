const ProductListItemSkeleton = () => (
  <li className="flex justify-between items-center py-1">
    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
  </li>
);

export const ProductSectionSkeleton = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* --- Skeleton untuk Kartu Best Sellers --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Placeholder untuk Judul */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          
          {/* Placeholder untuk List */}
          <ul className="space-y-3">
            <ProductListItemSkeleton />
            <ProductListItemSkeleton />
            <ProductListItemSkeleton />
            <ProductListItemSkeleton />
          </ul>
        </div>
        
        {/* --- Skeleton untuk Kartu Low Stock --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Placeholder untuk Judul */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          
          {/* Placeholder untuk List */}
          <ul className="space-y-3">
            <ProductListItemSkeleton />
            <ProductListItemSkeleton />
            <ProductListItemSkeleton />
          </ul>
        </div>
      </div>
    </section>
  );
};
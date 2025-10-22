"use client";

interface ProductsTableStatusProps {
  loading: boolean;
  isEmpty: boolean;
  searchTerm: string;
}

const SkeletonRow = () => (
  <tr className="bg-white border-b border-gray-200 animate-pulse">
    {/* Product Column */}
    <td className="px-3 py-2">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-md bg-gray-200"></div>
        <div>
          <div className="h-4 w-32 rounded bg-gray-200"></div>
          <div className="mt-2 h-3 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
    </td>
    {/* Kategori Column */}
    <td className="px-3 py-2">
      <div className="h-5 w-20 rounded-full bg-gray-200"></div>
    </td>
    {/* Harga Column */}
    <td className="px-3 py-2 text-right">
      <div className="h-4 w-24 rounded bg-gray-200 ml-auto"></div>
    </td>
    {/* Stok Column */}
    <td className="px-3 py-2 text-center">
      <div className="h-4 w-8 rounded bg-gray-200 mx-auto"></div>
    </td>
    {/* Berat Column */}
    <td className="px-3 py-2 text-center">
      <div className="h-4 w-8 rounded bg-gray-200 mx-auto"></div>
    </td>
    {/* Tindakan Column */}
    <td className="px-3 py-2">
      <div className="flex items-center justify-center space-x-4">
        <div className="h-6 w-6 rounded-full bg-gray-200"></div>
        <div className="h-6 w-6 rounded-full bg-gray-200"></div>
      </div>
    </td>
  </tr>
);

export default function ProductsTableSkeleton({
  loading,
  isEmpty,
  searchTerm,
}: ProductsTableStatusProps) {
  if (loading) {
    return (
      <>
        {/* Show 5 skeleton rows */}
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </>
    );
  }

  if (isEmpty) {
    return (
      <tr className="bg-white">
        <td colSpan={6} className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-700">
            No Products Found
          </h3>
          <p className="mt-1 text-gray-500">
            Your search for <span className="font-semibold">{searchTerm}</span>{" "}
            did not match any products.
          </p>
        </td>
      </tr>
    );
  }

  return null;
}

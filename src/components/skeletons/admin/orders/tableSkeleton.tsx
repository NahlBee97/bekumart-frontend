"use client";

const SkeletonRow = () => (
  <tr className="bg-white border-b border-gray-200 animate-pulse">
    {/* Customer Column */}
    <td className="px-3 py-2">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 rounded bg-gray-200"></div>
        <div className="h-3 w-40 rounded bg-gray-200"></div>
      </div>
    </td>
    {/* Tanggal Column */}
    <td className="px-3 py-2">
      <div className="h-4 w-24 rounded bg-gray-200"></div>
    </td>
    {/* Total Column */}
    <td className="px-3 py-2">
      <div className="h-4 w-20 rounded bg-gray-200"></div>
    </td>
    {/* Fulfillment Column */}
    <td className="px-3 py-2">
      <div className="h-4 w-24 rounded bg-gray-200"></div>
    </td>
    {/* Status Column */}
    <td className="px-3 py-2 text-center">
      <div className="h-8 w-36 rounded-lg bg-gray-200 mx-auto"></div>
    </td>
  </tr>
);

const OrdersTableSkeleton = () => {
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
};

export default OrdersTableSkeleton;

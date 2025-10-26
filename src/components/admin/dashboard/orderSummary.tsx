import { statusColors, statusLabels } from "@/helper/variable";
import { IStatusCounts, ITotalOrders } from "@/interfaces/dataInterfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface props {
  totalOrders: ITotalOrders;
  statusCounts: IStatusCounts[];
}

export const OrderSummary = ({ totalOrders, statusCounts }: props) => {
  const router = useRouter();
  const pathname = usePathname();
  const keyword = useSearchParams().get("status");
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-blue-500 mb-4">Rangkuman Pesanan</h3>
      <div className="space-y-3">
        <div
          className={`flex py-1 px-2 rounded-md justify-between items-center cursor-pointer hover:bg-gray-300 ${
            !keyword && "bg-gray-300"
          }`}
          onClick={() => router.push(`${pathname}`)}
        >
          <span className="text-base font-semibold px-2.5 py-0.5 rounded">
            Semua
          </span>
          <span className="font-semibold">{totalOrders._count.id} Pesanan</span>
        </div>
        {statusCounts.map((item, index: number) => (
          <div
            key={index}
            className={`flex py-1 px-2 rounded-md justify-between items-center cursor-pointer hover:bg-gray-300 ${
              keyword === item.status && "bg-gray-300"
            }`}
            onClick={() => router.push(`${pathname}?status=${item.status}`)}
          >
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                statusColors[item.status] || ""
              }`}
            >
              {statusLabels[item.status]}
            </span>
            <span className="font-semibold">{item._count.status} Pesanan</span>
          </div>
        ))}
      </div>
    </div>
  );
};

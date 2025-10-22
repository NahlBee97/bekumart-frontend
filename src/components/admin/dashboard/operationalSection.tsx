"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OperationalSectionSkeleton from "@/components/skeletons/admin/orders/operationalSectionSkeleton";

const statusColors: { [key: string]: string } = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  READY_FOR_PICKUP: "bg-indigo-100 text-indigo-800",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-800",
};

const statusLabels: { [key: string]: string } = {
  PENDING: "Menunggu",
  PROCESSING: "Dalam Proses",
  READY_FOR_PICKUP: "Siap Diambil",
  OUT_FOR_DELIVERY: "Dalam Pengiriman",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

const OperationalSection = () => {
  const { isAuthLoading } = useAuthStore();
  const keyword = useSearchParams().get("status");
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isAuthLoading) return;
    const fetchData = async () => {
      try {
        const response = await api.get("api/dashboard/operational-summary");
        setData(response.data.operationalSummary);
      } catch (error) {
        console.error("Failed to load operational data:" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isAuthLoading]);

  if (isLoading) return <OperationalSectionSkeleton/>;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <span className="font-semibold">{data.totalOrders._count.id} Pesanan</span>
            </div>
            {data.statusCounts.map((item: any, index: number) => (
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-blue-500 mb-4">Pesanan Terbaru</h3>
          <ul className="space-y-4">
            {data.recentOrders.map((order: any) => (
              <li
                key={order.id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-semibold">{order.user.name}</p>
                  <p className="text-gray-500">
                    Rp {order.totalAmount.toLocaleString("id-ID")}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                    statusColors[order.status] || ""
                  }`}
                >
                  {statusLabels[order.status]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OperationalSection;

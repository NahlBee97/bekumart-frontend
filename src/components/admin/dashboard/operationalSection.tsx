"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";

const statusColors: { [key: string]: string } = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  READY_FOR_PICKUP: "bg-indigo-100 text-indigo-800",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-800",
};

const OperationalSection = () => {
  const { isLoading } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    const fetchData = async () => {
      try {
        const response = await api.get("api/dashboard/operational-summary");
        setData(response.data.operationalSummary);
      } catch (error) {
        console.error("Failed to load operational data:" + error);
        setError("Failed to load operational data");
      }
    };
    fetchData();
  }, [isLoading]);

  if (isLoading) return <div>Loading operational data...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return (
    <section>
      <h2 className="text-2xl text-blue-500 font-bold mb-4">Operations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-blue-500 mb-4">Current Order Status</h3>
          <div className="space-y-3">
            {data.statusCounts.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                    statusColors[item.status] || ""
                  }`}
                >
                  {item.status}
                </span>
                <span className="font-bold">{item._count.status} orders</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-blue-500 mb-4">Recent Orders</h3>
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
                  {order.status}
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

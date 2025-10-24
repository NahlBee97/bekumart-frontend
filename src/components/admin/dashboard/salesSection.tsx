"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatCard from "./statCard";
import api from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";
import FilterDropdown from "./filterDropdown";
import { useSearchParams } from "next/navigation";
import { SalesSectionSkeleton } from "@/components/skeletons/admin/salesSectionSkeleton";

const SalesSection = () => {
  const filter = useSearchParams().get("value");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthLoading } = useAuthStore();
  const [data, setData] = useState<any | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    if (isAuthLoading) return;
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/api/dashboard/sales-summary?value=${filter}`
        );
        setData(response.data.salesSummary);
      } catch (error) {
        console.error("Failed to load sales data:" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isAuthLoading, filter]);

  // Conditional rendering for loading and error states
  if (isLoading) return <SalesSectionSkeleton />;

  return (
    <section>
      <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-3 gap-2 md:gap-4 mb-6">
        <div className="col-span-2 md:col-span-1">
          <StatCard
            title="Total Pendapatan"
            value={`Rp ${data.totalRevenue.toLocaleString("id-ID")}`}
            icon={<span>💰</span>}
          />
        </div>
        <StatCard
          title="Total Pesanan"
          value={data.totalOrders}
          icon={<span>📦</span>}
        />
        <StatCard
          title="Rata-Rata"
          value={`Rp ${Math.round(data.averageOrderValue).toLocaleString(
            "id-ID"
          )}`}
          icon={<span>🛒</span>}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between">
          <h3 className="font-bold text-blue-500 mb-4">Pendapatan</h3>
          <FilterDropdown />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis
              fontSize={12}
              tickFormatter={(value) => `Rp${Number(value) / 1000}k`}
            />
            <Tooltip
              formatter={(value) =>
                `Rp ${Number(value).toLocaleString("id-ID")}`
              }
            />
            <Line
              type="monotone"
              dataKey="Revenue"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SalesSection;

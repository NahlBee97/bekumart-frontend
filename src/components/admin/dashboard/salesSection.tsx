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
import { ISalesSummary } from "@/interfaces/dashboardInterface";

const SalesSection = () => {
  // State for data, loading, and errors
  const { isLoading } = useAuthStore();
  const [data, setData] = useState<ISalesSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    if (isLoading) return;
    const fetchData = async () => {
      try {
        const response = await api.get("/api/dashboard/sales-summary");
        setData(response.data.salesSummary);
      } catch (error) {
        setError("Failed to load sales data");
        console.error("Failed to load sales data:" + error);
      }
    };
    fetchData();
  }, [isLoading]);

  // Conditional rendering for loading and error states
  if (isLoading) return <div>Loading sales data...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return (
    <section>
      <h2 className="text-2xl text-blue-500 font-bold mb-4">Sales & Revenue</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value={`Rp ${data.totalRevenue.toLocaleString("id-ID")}`}
          icon={<span>💰</span>}
        />
        <StatCard
          title="Total Orders"
          value={data.totalOrders}
          icon={<span>📦</span>}
        />
        <StatCard
          title="Average Order Value"
          value={`Rp ${Math.round(data.averageOrderValue).toLocaleString(
            "id-ID"
          )}`}
          icon={<span>🛒</span>}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-bold mb-4">Revenue (Last 30 Days)</h3>
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

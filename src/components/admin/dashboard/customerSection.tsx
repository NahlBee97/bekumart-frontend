"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";
import StatCard from "./statCard";

const CustomerSection = () => {
  const { isLoading } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    const fetchData = async () => {
      try {
        const response = await api.get("api/dashboard/customer-insights");
        setData(response.data.customerInsights);
      } catch (error) {
        console.error("Failed to load customer data:" + error);
        setError("Failed to load customer data");
      }
    };
    fetchData();
  }, [isLoading]);

  if (isLoading) return <div>Loading customer data...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return (
    <section>
      <div className="grid grid-cols-1 grid-rows-2 gap-4">
          <StatCard
            title="Total Customers"
            value={data.totalUsers}
            icon={<span>👥</span>}
          />
          <StatCard
            title="New Customers (Last 30d)"
            value={data.newUsers}
            icon={<span>👋</span>}
          />
      </div>
    </section>
  );
};

export default CustomerSection;

"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";
import StatCard from "./statCard";
import { CustomerSectionSkeleton } from "@/components/skeletons/admin/customerSectionSkeleton";

const CustomerSection = () => {
  const { isAuthLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isAuthLoading) return;
    const fetchData = async () => {
      try {
        const response = await api.get("api/dashboard/customer-insights");
        setData(response.data.customerInsights);
      } catch (error) {
        console.error("Failed to load customer data:" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isAuthLoading]);

  if (isLoading) return <CustomerSectionSkeleton />;

  return (
    <section>
      <div className="grid grid-cols-1 grid-rows-2 gap-4">
        <StatCard
          title="Total Pelanggan"
          value={data.totalUsers}
          icon={<span>👥</span>}
        />
        <StatCard
          title="Pelanggan Baru (30 Hari Terakhir)"
          value={data.newUsers}
          icon={<span>👋</span>}
        />
      </div>
    </section>
  );
};

export default CustomerSection;

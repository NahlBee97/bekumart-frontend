"use client";

import api from "@/lib/axios";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

import { OperationalSectionSkeleton } from "@/components/skeletons/admin/orders/operationalSectionSkeleton";
import {
  IOperationalSummary,
  IRecentOrders,
  IStatusCounts,
  ITotalOrders,
} from "@/interfaces/dataInterfaces";
import { OrderSummary } from "./orderSummary";
import { RecentOrder } from "./recentOrder";

export const OperationalSection = () => {
  const { isAuthLoading } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IOperationalSummary | null>(null);

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

  if (isLoading) return <OperationalSectionSkeleton />;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderSummary
          totalOrders={data?.totalOrders as ITotalOrders}
          statusCounts={data?.statusCounts as IStatusCounts[]}
        />
        <RecentOrder recentOrders={data?.recentOrders as IRecentOrders[]} />
      </div>
    </section>
  );
};

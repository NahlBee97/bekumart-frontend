"use client";

import { useState, useEffect } from "react";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";
import api from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";
import { generateHslColors } from "@/utils/generateHslColors";
import { OriginSectionSkeleton } from "@/components/skeletons/admin/originSectionSkeleton";

const OriginSection = () => {
  const { isAuthLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<{ location: string; count: number }[]>([]);

  // Fetch data on component mount
  useEffect(() => {
    if (isAuthLoading) return;
    const fetchData = async () => {
      try {
        const response = await api.get("/api/dashboard/origin-summary");
        setData(response.data.summary);
      } catch (error) {
        console.error("Failed to load origin data:" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isAuthLoading]);

  const totalCount = data.reduce((acc, point) => {
    return (acc += point.count);
  }, 0);

  const colors = generateHslColors(data.length);

  // Conditional rendering for loading and error states
  if (isLoading) return <OriginSectionSkeleton />;

  return (
    <section>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="count"
              nameKey="location"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ location, count }) =>
                `${location} ${(((count as number) / totalCount) * 100).toFixed(
                  2
                )}%`
              }
              labelLine={false}
              // 2. Remove the single `fill` prop from here
            >
              {/* 3. Map over your data to create a <Cell> for each slice */}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default OriginSection;

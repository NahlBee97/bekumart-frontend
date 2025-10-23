"use client";

import { useState, useEffect, useMemo } from "react";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";
import api from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";
import { generateHslColors } from "@/utils/generateHslColors";
import { OriginSectionSkeleton } from "@/components/skeletons/admin/originSectionSkeleton";
import { useWindowSize } from "@/hooks/useWindowSize";

const OriginSection = () => {
  const { isAuthLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<{ location: string; count: number }[]>([]);
  const windowSize = useWindowSize();

  // Calculate responsive radius based on screen size
  const chartDimensions = useMemo(() => {
    const baseRadius = 100;
    const width = windowSize.width || 0;

    if (width < 640) {
      // sm
      return {
        outerRadius: baseRadius * 0.7,
        fontSize: "10px",
        height: 250,
      };
    } else if (width < 768) {
      // md
      return {
        outerRadius: baseRadius * 0.85,
        fontSize: "12px",
        height: 300,
      };
    } else {
      // lg and above
      return {
        outerRadius: baseRadius,
        fontSize: "14px",
        height: 350,
      };
    }
  }, [windowSize.width]);

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
        <ResponsiveContainer width="100%" height={chartDimensions.height}>
          <PieChart>
            <Tooltip
              contentStyle={{ fontSize: chartDimensions.fontSize }}
              formatter={(value, name) => [
                `${value} (${((Number(value) / totalCount) * 100).toFixed(
                  1
                )}%)`,
                name,
              ]}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="location"
              cx="50%"
              cy="50%"
              outerRadius={chartDimensions.outerRadius}
              label={({ location, count }) => {
                const percentage = ((count as number) / totalCount) * 100;
                // Only show label if percentage is greater than 5%
                return percentage > 5
                  ? `${location} ${percentage.toFixed(1)}%`
                  : "";
              }}
              labelLine={false}
              style={{ fontSize: chartDimensions.fontSize }}
            >
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

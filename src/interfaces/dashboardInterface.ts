export interface ISalesSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  chartData: {
    name: Date;
    Revenue: number;
  }[];
}

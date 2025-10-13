export interface ISalesSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  chartData: {
    name: Date;
    Revenue: number;
  }[];
}

export interface IProductInsights {
  bestSellers: { name: string; quantitySold: number }[];
  lowStockProducts: { name: string; stock: number }[];
}

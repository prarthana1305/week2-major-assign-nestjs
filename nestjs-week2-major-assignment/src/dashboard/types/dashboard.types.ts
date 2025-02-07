export interface MetricCard {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    date?: string;
  }
  
  export interface PopularDish {
    id: string;
    name: string;
    price: number;
    image: string;
    status: 'In Stock' | 'Out of Stock';
  }
  
  export interface GraphDataPoint {
    month: string;
    sales: number;
    revenue: number;
  }
  
  export interface DashboardMetrics {
    dailySales: MetricCard;
    monthlyRevenue: MetricCard;
    tableOccupancy: MetricCard;
  }
  
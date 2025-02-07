import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

interface MetricCard {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  date?: string;
}

interface DashboardMetrics {
  dailySales: MetricCard;
  monthlyRevenue: MetricCard;
  tableOccupancy: MetricCard;
}

interface PopularDish {
  id: string;
  name: string;
  price: number;
  image: string;
  status: 'In Stock' | 'Out of Stock';
}

interface GraphDataPoint {
  month: string;
  sales: number;
  revenue: number;
}

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  getMetricCards(): Promise<DashboardMetrics> {
    return this.dashboardService.getMetricCards();
  }

  @Get('dishes')
  getPopularDishes(): Promise<PopularDish[]> {
    return this.dashboardService.getPopularDishes();
  }

  @Get('graph')
  getGraphData(): Promise<GraphDataPoint[]> {
    return this.dashboardService.getGraphData();
  }

  @Get()
  getDashboardData(): Promise<{
    metrics: DashboardMetrics;
    popularDishes: PopularDish[];
    graphData: GraphDataPoint[];
  }> {
    return this.dashboardService.getDashboardData();
  }
}
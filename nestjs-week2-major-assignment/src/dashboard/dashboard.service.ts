import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';

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

@Injectable()
export class DashboardService {
  constructor(private readonly httpService: HttpService) {}
  
  private readonly apiUrl = 'http://localhost:8081'; // adjust port if different

  async getMetricCards(): Promise<DashboardMetrics> {
    try {
      const response = await this.httpService.get(`${this.apiUrl}/metricCards`)
        .pipe(map(response => response.data))
        .toPromise();
      return response;
    } catch (error) {
      throw new Error('Failed to fetch metric cards');
    }
  }

  async getPopularDishes(): Promise<PopularDish[]> {
    try {
      const response = await this.httpService.get(`${this.apiUrl}/popularDishes`)
        .pipe(map(response => response.data))
        .toPromise();
      return response;
    } catch (error) {
      throw new Error('Failed to fetch popular dishes');
    }
  }

  async getGraphData(): Promise<GraphDataPoint[]> {
    try {
      const response = await this.httpService.get(`${this.apiUrl}/graphData`)
        .pipe(map(response => response.data))
        .toPromise();
      return response;
    } catch (error) {
      throw new Error('Failed to fetch graph data');
    }
  }

  async getDashboardData(): Promise<{
    metrics: DashboardMetrics;
    popularDishes: PopularDish[];
    graphData: GraphDataPoint[];
  }> {
    try {
      const [metrics, popularDishes, graphData] = await Promise.all([
        this.getMetricCards(),
        this.getPopularDishes(),
        this.getGraphData()
      ]);
      return {
        metrics,
        popularDishes,
        graphData
      };
    } catch (error) {
      throw new Error('Failed to fetch dashboard data');
    }
  }
}